"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo, useCallback } from "react";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchArticles, getArticles } from "@/lib/data";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

const ARTICLES_PER_PAGE = 6;

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const initialPage = Number(searchParams.get("page")) || 1;

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleQueryChange = useCallback(
    (value: string) => {
      setQuery(value);
      if (debounceTimer) clearTimeout(debounceTimer);
      const timer = setTimeout(() => {
        setDebouncedQuery(value);
        setPage(1);
        const params = new URLSearchParams();
        if (value) params.set("q", value);
        router.replace(`/search${params.toString() ? `?${params}` : ""}`, {
          scroll: false,
        });
      }, 300);
      setDebounceTimer(timer);
    },
    [debounceTimer, router]
  );

  const results = useMemo(
    () => (debouncedQuery ? searchArticles(debouncedQuery) : getArticles()),
    [debouncedQuery]
  );

  const totalPages = Math.ceil(results.length / ARTICLES_PER_PAGE);
  const paginatedResults = results.slice(
    (page - 1) * ARTICLES_PER_PAGE,
    page * ARTICLES_PER_PAGE
  );

  const goToPage = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams();
    if (debouncedQuery) params.set("q", debouncedQuery);
    if (newPage > 1) params.set("page", String(newPage));
    router.replace(`/search${params.toString() ? `?${params}` : ""}`, {
      scroll: false,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold md:text-4xl">Поиск</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Найдите нужную статью по ключевым словам
        </p>
      </div>

      <div className="mb-8 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Поиск статей..."
            className="pl-10"
          />
        </div>
      </div>

      <div>
        {debouncedQuery && (
          <p className="mb-6 text-muted-foreground">
            {results.length > 0
              ? `Найдено ${results.length} ${results.length === 1 ? "статья" : "статей"} по запросу «${debouncedQuery}»`
              : `Ничего не найдено по запросу «${debouncedQuery}»`}
          </p>
        )}

        {!debouncedQuery && (
          <p className="mb-6 text-muted-foreground">
            Все статьи ({results.length})
          </p>
        )}

        {paginatedResults.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedResults.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  aria-label="Предыдущая страница"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(pageNum)}
                      aria-label={`Страница ${pageNum}`}
                      aria-current={page === pageNum ? "page" : undefined}
                    >
                      {pageNum}
                    </Button>
                  )
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= totalPages}
                  aria-label="Следующая страница"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="Ничего не найдено"
            description="Попробуйте изменить поисковый запрос или просмотрите все темы."
          />
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-12">
          <div className="mb-10 space-y-3">
            <div className="h-10 w-32 animate-pulse rounded bg-muted/40" />
            <div className="h-5 w-72 animate-pulse rounded bg-muted/40" />
          </div>
          <div className="mb-8 max-w-xl">
            <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl border bg-muted/40" />
            ))}
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
