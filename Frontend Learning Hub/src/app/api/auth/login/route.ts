import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  findUserByEmail,
  createSession,
  toPublicUser,
} from "@/lib/auth-store";

/**
 * POST /api/auth/login
 * Авторизация пользователя.
 *
 * Request Body (JSON):
 * {
 *   "email": string,
 *   "password": string
 * }
 *
 * Response 200:
 * {
 *   "success": true,
 *   "message": "Авторизация успешна",
 *   "data": {
 *     "user": PublicUser,
 *     "token": string,
 *     "expiresAt": string
 *   }
 * }
 *
 * Response 400: Ошибка валидации
 * Response 401: Неверный email или пароль
 */

const loginSchema = z.object({
  email: z
    .string({ error: "Поле 'email' обязательно" })
    .email("Введите корректный email")
    .trim(),
  password: z
    .string({ error: "Поле 'password' обязательно" })
    .min(1, "Пароль не может быть пустым"),
});

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Некорректный JSON в теле запроса" },
        { status: 400 }
      );
    }

    // Validate
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Ошибка валидации",
          details: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
            code: issue.code,
          })),
        },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    // Find user
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: "Неверный email или пароль",
        },
        { status: 401 }
      );
    }

    // Create session
    const session = createSession(user.id);

    return NextResponse.json({
      success: true,
      message: "Авторизация успешна",
      data: {
        user: toPublicUser(user),
        token: session.token,
        expiresAt: session.expiresAt,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
