import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/auth-store";

/**
 * GET /api/auth/users
 * Возвращает список всех зарегистрированных пользователей (без паролей).
 * Этот эндпоинт открыт для целей тестирования.
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": PublicUser[],
 *   "count": number
 * }
 */
export function GET() {
  const users = getAllUsers();

  return NextResponse.json({
    success: true,
    data: users,
    count: users.length,
  });
}
