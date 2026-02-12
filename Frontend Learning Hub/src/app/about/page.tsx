import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Code2,
  GraduationCap,
  Layers,
  Target,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "О проекте",
  description: "Информация о проекте Frontend Learning Hub, его целях и учебном характере.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold md:text-4xl"><span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">О проекте</span></h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Frontend Learning Hub — учебный проект по frontend-разработке
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Что это за проект?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              <strong>Frontend Learning Hub</strong> — это учебный
              многостраничный веб-сайт, созданный для демонстрации навыков
              frontend-разработки. Сайт содержит материалы, темы и статьи по
              различным технологиям веб-разработки.
            </p>
            <p>
              Проект не связан с реальными данными или деятельностью какой-либо
              компании. Все материалы носят исключительно образовательный
              характер.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5 text-primary" />
                Цели проекта
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Демонстрация навыков frontend-разработки
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Практика работы с Next.js App Router
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Использование TypeScript и современных UI-библиотек
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Создание адаптивного и доступного интерфейса
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-primary" />
                Чему можно научиться
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-foreground/90">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  HTML, CSS и семантическая вёрстка
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  JavaScript и TypeScript
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  React и его экосистема
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  Next.js и серверный рендеринг
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold">Технологический стек</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Layers,
                name: "Next.js",
                desc: "App Router, SSR, SSG",
              },
              {
                icon: Code2,
                name: "TypeScript",
                desc: "Строгая типизация",
              },
              {
                icon: BookOpen,
                name: "TailwindCSS",
                desc: "Утилитарные стили",
              },
              {
                icon: Layers,
                name: "ShadCN / Radix UI",
                desc: "UI-компоненты",
              },
              {
                icon: Code2,
                name: "react-hook-form",
                desc: "Работа с формами",
              },
              {
                icon: BookOpen,
                name: "Zod",
                desc: "Валидация данных",
              },
            ].map((tech) => (
              <Card key={tech.name}>
                <CardContent className="flex items-center gap-3 pt-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <tech.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{tech.name}</p>
                    <p className="text-xs text-muted-foreground">{tech.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-8" />

        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Структура проекта</CardTitle>
            <CardDescription>
              Основные разделы и страницы сайта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="font-mono text-sm space-y-1 text-foreground/80">
              <p>/ — Главная страница</p>
              <p>/topics — Список тем</p>
              <p>/topics/[slug] — Страница темы</p>
              <p>/articles/[slug] — Страница статьи</p>
              <p>/search — Поиск по статьям</p>
              <p>/contact — Форма обратной связи</p>
              <p>/about — О проекте</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
