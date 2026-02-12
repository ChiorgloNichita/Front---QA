import { NextRequest, NextResponse } from "next/server";
import { getTopicBySlug, getArticlesByTopic } from "@/lib/data";

/**
 * GET /api/topics/:slug
 * Возвращает тему по slug вместе со списком статей этой темы.
 *
 * Params:
 *   slug — идентификатор темы (например: "javascript", "react")
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": {
 *     "topic": Topic,
 *     "articles": Article[]
 *   }
 * }
 *
 * Response 404:
 * {
 *   "success": false,
 *   "error": "Тема не найдена",
 *   "slug": string
 * }
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return NextResponse.json(
      {
        success: false,
        error: "Тема не найдена",
        slug,
      },
      { status: 404 }
    );
  }

  const articles = getArticlesByTopic(slug);

  return NextResponse.json({
    success: true,
    data: {
      topic,
      articles,
    },
  });
}
