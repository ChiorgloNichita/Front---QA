import { Topic, Article } from "./types";
import topicsData from "@/content/topics.json";

// --- Article imports (individual JSON files) ---
import semanticHtml from "@/content/articles/semantic-html.json";
import flexboxGuide from "@/content/articles/flexbox-guide.json";
import cssGridBasics from "@/content/articles/css-grid-basics.json";
import jsVariablesTypes from "@/content/articles/js-variables-types.json";
import jsAsyncAwait from "@/content/articles/js-async-await.json";
import jsArrayMethods from "@/content/articles/js-array-methods.json";
import tsBasics from "@/content/articles/ts-basics.json";
import tsGenerics from "@/content/articles/ts-generics.json";
import tsUtilityTypes from "@/content/articles/ts-utility-types.json";
import reactComponents from "@/content/articles/react-components.json";
import reactHooks from "@/content/articles/react-hooks.json";
import reactStateManagement from "@/content/articles/react-state-management.json";
import nextjsAppRouter from "@/content/articles/nextjs-app-router.json";
import nextjsServerComponents from "@/content/articles/nextjs-server-components.json";
import nextjsDataFetching from "@/content/articles/nextjs-data-fetching.json";
import gitBasics from "@/content/articles/git-basics.json";
import eslintPrettier from "@/content/articles/eslint-prettier.json";
import viteWebpack from "@/content/articles/vite-webpack.json";

// --- Topics (loaded from JSON) ---
export const topics: Topic[] = topicsData as Topic[];

// --- Articles (loaded from individual JSON files) ---
export const articles: Article[] = [
  semanticHtml,
  flexboxGuide,
  cssGridBasics,
  jsVariablesTypes,
  jsAsyncAwait,
  jsArrayMethods,
  tsBasics,
  tsGenerics,
  tsUtilityTypes,
  reactComponents,
  reactHooks,
  reactStateManagement,
  nextjsAppRouter,
  nextjsServerComponents,
  nextjsDataFetching,
  gitBasics,
  eslintPrettier,
  viteWebpack,
] as Article[];

// --- Search index ---
interface SearchEntry {
  article: Article;
  tokens: string; // pre-computed lowercase searchable text
}

let searchIndex: SearchEntry[] | null = null;

function getSearchIndex(): SearchEntry[] {
  if (!searchIndex) {
    searchIndex = articles.map((a) => ({
      article: a,
      tokens: [
        a.title,
        a.description,
        a.tags.join(" "),
        a.content,
      ]
        .join(" ")
        .toLowerCase(),
    }));
  }
  return searchIndex;
}

// --- Public API ---

export function getTopics(): Topic[] {
  return topics;
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByTopic(topicSlug: string): Article[] {
  return articles.filter((a) => a.topicSlug === topicSlug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase().trim();
  if (!q) return articles;

  const words = q.split(/\s+/);
  const index = getSearchIndex();

  // Score-based search: title/tags matches rank higher
  const scored = index
    .map(({ article, tokens }) => {
      let score = 0;
      const titleLc = article.title.toLowerCase();
      const tagsLc = article.tags.map((t) => t.toLowerCase());

      for (const word of words) {
        if (titleLc.includes(word)) score += 10;
        if (tagsLc.some((t) => t.includes(word))) score += 5;
        if (article.description.toLowerCase().includes(word)) score += 3;
        if (tokens.includes(word)) score += 1;
      }

      return { article, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ article }) => article);
}

export function getLatestArticles(count: number = 6): Article[] {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}
