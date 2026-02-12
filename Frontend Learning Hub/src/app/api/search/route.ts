import { NextRequest, NextResponse } from "next/server";
import { searchArticles, getArticles } from "@/lib/data";

/**
 * GET /api/search
 * Поиск статей по ключевым словам (заголовок, описание, теги, контент).
 *
 * Query-параметры:
 *   q     — поисковый запрос (обязательный, минимум 1 символ)
 *   page  — номер страницы (по умолчанию: 1)
 *   limit — количество результатов на странице (по умолчанию: 6, макс: 50)
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": Article[],
 *   "query": string,
 *   "pagination": {
 *     "page": number,
 *     "limit": number,
 *     "total": number,
 *     "totalPages": number,
 *     "hasNextPage": boolean,
 *     "hasPrevPage": boolean
 *   }
 * }
 *
 * Response 400:
 * {
 *   "success": false,
 *   "error": string
 * }
 */
export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("q");
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  // Validate query
  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      {
        success: false,
        error: "Параметр 'q' обязателен и не может быть пустым",
      },
      { status: 400 }
    );
  }

  // Validate page
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  if (isNaN(page) || page < 1) {
    return NextResponse.json(
      {
        success: false,
        error: "Параметр 'page' должен быть положительным числом",
      },
      { status: 400 }
    );
  }

  // Validate limit
  const limit = limitParam ? parseInt(limitParam, 10) : 6;
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return NextResponse.json(
      {
        success: false,
        error: "Параметр 'limit' должен быть числом от 1 до 50",
      },
      { status: 400 }
    );
  }

  // Search
  const results = searchArticles(query);

  // Pagination
  const total = results.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedResults = results.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    data: paginatedResults,
    query: query.trim(),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
}
