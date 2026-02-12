export interface Topic {
  slug: string;
  title: string;
  description: string;
  icon: string;
  articleCount: number;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  topicSlug: string;
  date: string;
  readTime: string;
  content: string;
  tags: string[];
}
