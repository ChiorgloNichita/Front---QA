import { NextResponse } from "next/server";
import { getTopics } from "@/lib/data";

/**
 * GET /api/topics
 * Возвращает список всех тем.
 *
 * Response 200:
 * {
 *   "success": true,
 *   "data": Topic[],
 *   "count": number
 * }
 */
export function GET() {
  const topics = getTopics();

  return NextResponse.json({
    success: true,
    data: topics,
    count: topics.length,
  });
}
