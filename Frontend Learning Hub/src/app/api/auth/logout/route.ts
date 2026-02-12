import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken, deleteSession, deleteAllUserSessions } from "@/lib/auth-store";

/**
 * POST /api/auth/logout
 * Выход из системы (удаляет текущую сессию).
 *
 * Headers:
 *   Authorization: Bearer <token>
 *
 * Query-параметры:
 *   all — если "true", удаляет все сессии пользователя
 *
 * Response 200:
 * {
 *   "success": true,
 *   "message": "Вы вышли из системы"
 * }
 *
 * Response 401: Не авторизован
 */
export async function POST(request: NextRequest) {
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

  const { searchParams } = new URL(request.url);
  const logoutAll = searchParams.get("all") === "true";

  if (logoutAll) {
    const count = deleteAllUserSessions(auth.user.id);
    return NextResponse.json({
      success: true,
      message: `Все сессии удалены (${count})`,
    });
  }

  deleteSession(auth.session.token);

  return NextResponse.json({
    success: true,
    message: "Вы вышли из системы",
  });
}
