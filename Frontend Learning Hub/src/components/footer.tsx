import { Separator } from "@/components/ui/separator";
import { BookOpen, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-gradient-to-b from-muted/20 to-muted/50">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-primary to-blue-400 text-white">
                <BookOpen className="h-4 w-4" />
              </div>
              Frontend Learning Hub
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Учебный проект для изучения frontend-разработки. Статьи, темы и
              практические руководства.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Навигация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/topics" className="hover:text-foreground transition-colors">
                  Темы
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-foreground transition-colors">
                  Поиск
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Популярные темы</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/topics/javascript"
                  className="hover:text-foreground transition-colors"
                >
                  JavaScript
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/react"
                  className="hover:text-foreground transition-colors"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  href="/topics/nextjs"
                  className="hover:text-foreground transition-colors"
                >
                  Next.js
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Frontend Learning Hub. Учебный проект.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
