import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/contact
 * Отправка формы обратной связи. Валидирует данные и возвращает результат.
 *
 * Request Body (JSON):
 * {
 *   "name": string,     // 2–50 символов
 *   "email": string,    // валидный email
 *   "message": string   // 10–1000 символов
 * }
 *
 * Response 200:
 * {
 *   "success": true,
 *   "message": "Сообщение успешно отправлено",
 *   "data": {
 *     "id": string,
 *     "name": string,
 *     "email": string,
 *     "message": string,
 *     "createdAt": string
 *   }
 * }
 *
 * Response 400:
 * {
 *   "success": false,
 *   "error": "Ошибка валидации",
 *   "details": ZodError[]
 * }
 *
 * Response 500:
 * {
 *   "success": false,
 *   "error": string
 * }
 */

const contactSchema = z.object({
  name: z
    .string({ error: "Поле 'name' обязательно" })
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов"),
  email: z
    .string({ error: "Поле 'email' обязательно" })
    .email("Введите корректный email"),
  message: z
    .string({ error: "Поле 'message' обязательно" })
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(1000, "Сообщение не должно превышать 1000 символов"),
});

// In-memory storage for submitted messages (resets on server restart)
const messages: Array<{
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Некорректный JSON в теле запроса",
        },
        { status: 400 }
      );
    }

    // Validate with Zod
    const result = contactSchema.safeParse(body);

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

    // Create message record
    const messageRecord = {
      id: crypto.randomUUID(),
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
      createdAt: new Date().toISOString(),
    };

    messages.push(messageRecord);

    return NextResponse.json({
      success: true,
      message: "Сообщение успешно отправлено",
      data: messageRecord,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Внутренняя ошибка сервера",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Возвращает все отправленные сообщения (для тестирования).
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": Message[],
 *   "count": number
 * }
 */
export function GET() {
  return NextResponse.json({
    success: true,
    data: messages,
    count: messages.length,
  });
}
