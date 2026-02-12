import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReadingProgress } from "@/components/reading-progress";
import { TableOfContents } from "@/components/table-of-contents";
import { getArticleBySlug, getArticles, getTopicBySlug } from "@/lib/data";
import { Calendar, Clock } from "lucide-react";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Статья не найдена" };
  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const topic = getTopicBySlug(article.topicSlug);

  const breadcrumbs = [
    { label: "Темы", href: "/topics" },
    ...(topic ? [{ label: topic.title, href: `/topics/${topic.slug}` }] : []),
    { label: article.title },
  ];

  return (
    <>
      <ReadingProgress />
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl xl:max-w-6xl">
          <Breadcrumbs items={breadcrumbs} />

          <div className="xl:grid xl:grid-cols-[1fr_220px] xl:gap-10">
          <div>
          <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold md:text-4xl leading-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              {article.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.date).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}
              </span>
            </div>
          </header>

          <Separator className="mb-8" />

          <div className="prose-custom">
            <MarkdownRenderer content={article.content} />
          </div>
        </article>

        <Separator className="my-10" />

        <div className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={topic ? `/topics/${topic.slug}` : "/topics"}>
              Назад к теме
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/topics">Все темы</Link>
          </Button>
        </div>
          </div>

          <TableOfContents content={article.content} />
          </div>
      </div>
    </div>
    </>
  );
}
