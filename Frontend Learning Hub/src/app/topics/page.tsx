import { Metadata } from "next";
import { TopicCard } from "@/components/topic-card";
import { getTopics } from "@/lib/data";

export const metadata: Metadata = {
  title: "Темы",
  description: "Все темы и категории для изучения frontend-разработки.",
};

export default function TopicsPage() {
  const topics = getTopics();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold md:text-4xl"><span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">Темы</span></h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Выберите интересующую тему и начните изучение
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
