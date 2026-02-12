import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  getUserFromToken,
  toPublicUser,
  updateUser,
  deleteUser,
  deleteSession,
  deleteAllUserSessions,
  findUserByEmail,
} from "@/lib/auth-store";

/**
 * GET /api/auth/me
 * Получить профиль текущего пользователя.
 *
 * Headers:
 *   Authorization: Bearer <token>
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": PublicUser
 * }
 *
 * Response 401: Не авторизован / токен невалиден
 */
export async function GET(request: NextRequest) {
  const auth = getUserFromToken(request.headers.get("authorization"));

  if (!auth) {
    return NextResponse.json(
      {
        success: false,
        error: "Не авторизован. Передайте заголовок Authorization: Bearer <token>",
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: toPublicUser(auth.user),
  });
}

/**
 * PATCH /api/auth/me
 * Обновить профиль текущего пользователя.
 *
 * Headers:
 *   Authorization: Bearer <token>
 *
 * Request Body (JSON) — все поля опциональны:
 * {
 *   "name": string,
 *   "email": string,
 *   "password": string,
 *   "avatar": string
 * }
 *
 * Response 200:
 * {
 *   "success": true,
 *   "message": "Профиль обновлён",
 *   "data": PublicUser
 * }
 *
 * Response 400: Ошибка валидации
 * Response 401: Не авторизован
 * Response 409: Email уже занят
 */
const updateSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов")
    .trim()
    .optional(),
  email: z
    .string()
    .email("Введите корректный email")
    .trim()
    .optional(),
  password: z
    .string()
    .min(6, "Пароль должен содержать минимум 6 символов")
    .max(100, "Пароль не должен превышать 100 символов")
    .regex(/\d/, "Пароль должен содержать хотя бы одну цифру")
    .regex(/[a-zA-Zа-яА-Я]/, "Пароль должен содержать хотя бы одну букву")
    .optional(),
  avatar: z
    .string()
    .url("Avatar должен быть валидным URL")
    .optional(),
});

export async function PATCH(request: NextRequest) {
  const auth = getUserFromToken(request.headers.get("authorization"));

  if (!auth) {
    return NextResponse.json(
      {
        success: false,
        error: "Не авторизован. Передайте заголовок Authorization: Bearer <token>",
      },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Некорректный JSON в теле запроса" },
      { status: 400 }
    );
  }

  const result = updateSchema.safeParse(body);
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

  // Check email uniqueness if changing email
  if (result.data.email) {
    const existing = findUserByEmail(result.data.email);
    if (existing && existing.id !== auth.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Пользователь с таким email уже существует",
          field: "email",
        },
        { status: 409 }
      );
    }
  }

  const updated = updateUser(auth.user.id, result.data);
  if (!updated) {
    return NextResponse.json(
      { success: false, error: "Пользователь не найден" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Профиль обновлён",
    data: toPublicUser(updated),
  });
}

/**
 * DELETE /api/auth/me
 * Удалить аккаунт текущего пользователя.
 *
 * Headers:
 *   Authorization: Bearer <token>
 *
 * Response 200:
 * {
 *   "success": true,
 *   "message": "Аккаунт удалён"
 * }
 *
 * Response 401: Не авторизован
 */
export async function DELETE(request: NextRequest) {
  const auth = getUserFromToken(request.headers.get("authorization"));

  if (!auth) {
    return NextResponse.json(
      {
        success: false,
        error: "Не авторизован. Передайте заголовок Authorization: Bearer <token>",
      },
      { status: 401 }
    );
  }

  deleteUser(auth.user.id);

  return NextResponse.json({
    success: true,
    message: "Аккаунт удалён",
  });
}
