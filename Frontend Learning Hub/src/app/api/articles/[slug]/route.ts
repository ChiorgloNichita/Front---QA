import { NextRequest, NextResponse } from "next/server";
import { getArticleBySlug, getTopicBySlug } from "@/lib/data";

/**
 * GET /api/articles/:slug
 * Возвращает статью по slug. Включает информацию о теме.
 *
 * Params:
 *   slug — идентификатор статьи (например: "react-hooks", "js-async-await")
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": {
 *     "article": Article,
 *     "topic": Topic | null
 *   }
 * }
 *
 * Response 404:
 * {
 *   "success": false,
 *   "error": "Статья не найдена",
 *   "slug": string
 * }
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return NextResponse.json(
      {
        success: false,
        error: "Статья не найдена",
        slug,
      },
      { status: 404 }
    );
  }

  const topic = getTopicBySlug(article.topicSlug) || null;

  return NextResponse.json({
    success: true,
    data: {
      article,
      topic,
    },
  });
}
