import Link from "next/link";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import {
  AnimatedHero,
  AnimatedStats,
  AnimatedTopicsGrid,
  AnimatedArticlesGrid,
  AnimatedSection,
} from "@/components/animated-sections";
import { getTopics, getLatestArticles, getArticles } from "@/lib/data";
import { ArrowRight, BookOpen, Code2, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Frontend Learning Hub — Учебный сайт по frontend-разработке",
  description:
    "Изучайте HTML, CSS, JavaScript, TypeScript, React и Next.js с помощью подробных статей и практических руководств.",
};

export default function HomePage() {
  const topics = getTopics();
  const allArticles = getArticles();
  const latestArticles = getLatestArticles(6);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <AnimatedHero>
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary font-medium">
              <BookOpen className="h-4 w-4" />
              Учебный проект по frontend-разработке
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Frontend{" "}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Learning Hub</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl leading-relaxed">
              Изучайте HTML, CSS, JavaScript, TypeScript, React и Next.js с
              помощью подробных статей и практических руководств.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/topics">
                  Начать обучение
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link href="/search">Искать статьи</Link>
              </Button>
            </div>
          </div>
        </div>
        </AnimatedHero>
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-b">
        <AnimatedStats>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { icon: Layers, label: "Тем", value: topics.length },
              { icon: BookOpen, label: "Статей", value: allArticles.length },
              { icon: Code2, label: "Примеров кода", value: "50+" },
              { icon: ArrowRight, label: "Минут чтения", value: "120+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        </AnimatedStats>
      </section>

      {/* Search */}
      <AnimatedSection delay={0.2}>
      <section className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-xl">
          <SearchBar />
        </div>
      </section>
      </AnimatedSection>

      {/* Topics */}
      <section className="container mx-auto px-4 pb-16">
        <AnimatedSection delay={0.1}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Темы</h2>
            <p className="mt-1 text-muted-foreground">Выберите тему для изучения</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/topics">
              Все темы <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        </AnimatedSection>
        <AnimatedTopicsGrid topics={topics} />
      </section>

      {/* Latest Articles */}
      <section className="border-t bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 py-16">
          <AnimatedSection delay={0.1}>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Последние статьи</h2>
              <p className="mt-1 text-muted-foreground">Новые материалы для изучения</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/search">
                Все статьи <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          </AnimatedSection>
          <AnimatedArticlesGrid articles={latestArticles} />
        </div>
      </section>
    </div>
  );
}
