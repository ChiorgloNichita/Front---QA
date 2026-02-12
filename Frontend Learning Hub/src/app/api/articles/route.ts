import { NextRequest, NextResponse } from "next/server";
import { getArticles, getArticlesByTopic, getLatestArticles } from "@/lib/data";

/**
 * GET /api/articles
 * Возвращает список статей с поддержкой фильтрации, сортировки и пагинации.
 *
 * Query-параметры:
 *   topic  — фильтр по slug темы (например: ?topic=react)
 *   sort   — сортировка: "latest" | "oldest" | "title" (по умолчанию: "latest")
 *   page   — номер страницы (по умолчанию: 1)
 *   limit  — количество статей на странице (по умолчанию: 10, макс: 50)
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": Article[],
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

  const topic = searchParams.get("topic");
  const sort = searchParams.get("sort") || "latest";
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

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
  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  if (isNaN(limit) || limit < 1 || limit > 50) {
    return NextResponse.json(
      {
        success: false,
        error: "Параметр 'limit' должен быть числом от 1 до 50",
      },
      { status: 400 }
    );
  }

  // Validate sort
  const validSorts = ["latest", "oldest", "title"];
  if (!validSorts.includes(sort)) {
    return NextResponse.json(
      {
        success: false,
        error: `Параметр 'sort' должен быть одним из: ${validSorts.join(", ")}`,
      },
      { status: 400 }
    );
  }

  // Get articles
  let articles = topic ? getArticlesByTopic(topic) : getArticles();

  // Sort
  switch (sort) {
    case "latest":
      articles = [...articles].sort((a, b) => b.date.localeCompare(a.date));
      break;
    case "oldest":
      articles = [...articles].sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "title":
      articles = [...articles].sort((a, b) => a.title.localeCompare(b.title, "ru"));
      break;
  }

  // Pagination
  const total = articles.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedArticles = articles.slice((page - 1) * limit, page * limit);

  return NextResponse.json({
    success: true,
    data: paginatedArticles,
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
