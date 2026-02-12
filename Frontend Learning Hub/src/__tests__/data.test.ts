import { describe, it, expect } from "vitest";
import {
  getTopics,
  getTopicBySlug,
  getArticles,
  getArticleBySlug,
  getArticlesByTopic,
  searchArticles,
  getLatestArticles,
} from "@/lib/data";

describe("getTopics", () => {
  it("returns all 6 topics", () => {
    const topics = getTopics();
    expect(topics).toHaveLength(6);
  });

  it("each topic has required fields", () => {
    const topics = getTopics();
    for (const topic of topics) {
      expect(topic.slug).toBeTruthy();
      expect(topic.title).toBeTruthy();
      expect(topic.description).toBeTruthy();
      expect(topic.icon).toBeTruthy();
      expect(topic.articleCount).toBeGreaterThan(0);
    }
  });
});

describe("getTopicBySlug", () => {
  it("finds existing topic", () => {
    const topic = getTopicBySlug("html-css");
    expect(topic).toBeDefined();
    expect(topic?.title).toBe("HTML & CSS");
  });

  it("returns undefined for non-existent slug", () => {
    expect(getTopicBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getArticles", () => {
  it("returns all 18 articles", () => {
    const articles = getArticles();
    expect(articles).toHaveLength(18);
  });

  it("each article has required fields", () => {
    const articles = getArticles();
    for (const article of articles) {
      expect(article.slug).toBeTruthy();
      expect(article.title).toBeTruthy();
      expect(article.description).toBeTruthy();
      expect(article.topicSlug).toBeTruthy();
      expect(article.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(article.readTime).toBeTruthy();
      expect(article.content).toBeTruthy();
      expect(article.tags.length).toBeGreaterThan(0);
    }
  });
});

describe("getArticleBySlug", () => {
  it("finds existing article", () => {
    const article = getArticleBySlug("semantic-html");
    expect(article).toBeDefined();
    expect(article?.title).toBe("Семантический HTML: зачем и как");
  });

  it("returns undefined for non-existent slug", () => {
    expect(getArticleBySlug("nonexistent")).toBeUndefined();
  });
});

describe("getArticlesByTopic", () => {
  it("returns 3 articles for html-css topic", () => {
    const articles = getArticlesByTopic("html-css");
    expect(articles).toHaveLength(3);
    articles.forEach((a) => expect(a.topicSlug).toBe("html-css"));
  });

  it("returns empty array for non-existent topic", () => {
    expect(getArticlesByTopic("nonexistent")).toHaveLength(0);
  });
});

describe("searchArticles", () => {
  it("finds articles by title keyword", () => {
    const results = searchArticles("Flexbox");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].slug).toBe("flexbox-guide");
  });

  it("finds articles by tag", () => {
    const results = searchArticles("React");
    expect(results.length).toBeGreaterThan(0);
  });

  it("returns all articles for empty query", () => {
    const results = searchArticles("");
    expect(results).toHaveLength(18);
  });

  it("returns empty array for nonsense query", () => {
    const results = searchArticles("xyznonexistent12345");
    expect(results).toHaveLength(0);
  });

  it("ranks title matches higher than content matches", () => {
    const results = searchArticles("Grid");
    expect(results[0].slug).toBe("css-grid-basics");
  });
});

describe("getLatestArticles", () => {
  it("returns requested number of articles", () => {
    expect(getLatestArticles(3)).toHaveLength(3);
    expect(getLatestArticles(6)).toHaveLength(6);
  });

  it("returns articles sorted by date descending", () => {
    const latest = getLatestArticles(6);
    for (let i = 1; i < latest.length; i++) {
      expect(latest[i - 1].date >= latest[i].date).toBe(true);
    }
  });
});
