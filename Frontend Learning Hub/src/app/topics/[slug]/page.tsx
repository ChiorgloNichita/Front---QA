import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getTopicBySlug, getArticlesByTopic, getTopics } from "@/lib/data";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const topics = getTopics();
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return { title: "Тема не найдена" };
  return {
    title: topic.title,
    description: topic.description,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const articles = getArticlesByTopic(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Темы", href: "/topics" },
          { label: topic.title },
        ]}
      />

      <div className="mb-10">
        <h1 className="text-3xl font-bold md:text-4xl">{topic.title}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{topic.description}</p>
      </div>

      {articles.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Статей пока нет"
          description="В этой категории скоро появятся новые материалы."
        />
      )}
    </div>
  );
}
