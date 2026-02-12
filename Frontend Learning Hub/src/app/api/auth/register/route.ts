import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  findUserByEmail,
  createUser,
  createSession,
  toPublicUser,
} from "@/lib/auth-store";

/**
 * POST /api/auth/register
 * Регистрация нового пользователя.
 *
 * Request Body (JSON):
 * {
 *   "name": string,           // 2–50 символов
 *   "email": string,          // валидный email
 *   "password": string,       // 6–100 символов, минимум 1 цифра
 *   "confirmPassword": string // должен совпадать с password
 * }
 *
 * Response 201:
 * {
 *   "success": true,
 *   "message": "Регистрация прошла успешно",
 *   "data": {
 *     "user": PublicUser,
 *     "token": string,
 *     "expiresAt": string
 *   }
 * }
 *
 * Response 400: Ошибка валидации
 * Response 409: Email уже зарегистрирован
 */

const registerSchema = z
  .object({
    name: z
      .string({ error: "Поле 'name' обязательно" })
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(50, "Имя не должно превышать 50 символов")
      .trim(),
    email: z
      .string({ error: "Поле 'email' обязательно" })
      .email("Введите корректный email")
      .trim(),
    password: z
      .string({ error: "Поле 'password' обязательно" })
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
      .regex(/[a-zA-Zа-яА-Я]/, "Пароль должен содержать хотя бы одну букву"),
    confirmPassword: z.string({
      error: "Поле 'confirmPassword' обязательно",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
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
    const result = registerSchema.safeParse(body);
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

    const { name, email, password } = result.data;

    // Check if email already exists
    if (findUserByEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Пользователь с таким email уже зарегистрирован",
          field: "email",
        },
        { status: 409 }
      );
    }

    // Create user and session
    const user = createUser(name, email, password);
    const session = createSession(user.id);

    return NextResponse.json(
      {
        success: true,
        message: "Регистрация прошла успешно. Теперь войдите в систему.",
        data: {
          user: toPublicUser(user),
          token: session.token,
          expiresAt: session.expiresAt,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
