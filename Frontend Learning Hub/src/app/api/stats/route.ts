import { NextResponse } from "next/server";
import { getTopics, getArticles } from "@/lib/data";

/**
 * GET /api/stats
 * Возвращает общую статистику сайта.
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": {
 *     "totalTopics": number,
 *     "totalArticles": number,
 *     "articlesByTopic": { [topicSlug]: number },
 *     "tags": string[],
 *     "totalTags": number
 *   }
 * }
 */
export function GET() {
  const topics = getTopics();
  const articles = getArticles();

  // Count articles per topic
  const articlesByTopic: Record<string, number> = {};
  for (const topic of topics) {
    articlesByTopic[topic.slug] = articles.filter(
      (a) => a.topicSlug === topic.slug
    ).length;
  }

  // Collect all unique tags
  const allTags = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      allTags.add(tag);
    }
  }

  return NextResponse.json({
    success: true,
    data: {
      totalTopics: topics.length,
      totalArticles: articles.length,
      articlesByTopic,
      tags: Array.from(allTags).sort(),
      totalTags: allTags.size,
    },
  });
}
