"use client";

import { FadeIn, FadeInUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/motion";
import { TopicCard } from "@/components/topic-card";
import { ArticleCard } from "@/components/article-card";
import { Topic } from "@/lib/types";
import { Article } from "@/lib/types";

export function AnimatedHero({ children }: { children: React.ReactNode }) {
  return <FadeIn duration={0.7}>{children}</FadeIn>;
}

export function AnimatedStats({ children }: { children: React.ReactNode }) {
  return <FadeInUp delay={0.1}>{children}</FadeInUp>;
}

export function AnimatedTopicsGrid({ topics }: { topics: Topic[] }) {
  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => (
        <StaggerItem key={topic.slug}>
          <TopicCard topic={topic} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export function AnimatedArticlesGrid({ articles }: { articles: Article[] }) {
  return (
    <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <StaggerItem key={article.slug}>
          <ArticleCard article={article} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <FadeInUp delay={delay}>{children}</FadeInUp>;
}

export function AnimatedScaleIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return <ScaleIn delay={delay}>{children}</ScaleIn>;
}
