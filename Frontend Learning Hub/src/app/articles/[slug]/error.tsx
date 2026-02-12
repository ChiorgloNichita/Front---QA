"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function ArticleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <AlertTriangle className="mb-6 h-16 w-16 text-destructive/60" />
      <h2 className="mb-3 text-2xl font-bold">Не удалось загрузить статью</h2>
      <p className="mb-8 text-muted-foreground max-w-md">
        Произошла ошибка при загрузке статьи. Попробуйте ещё раз.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset}>Попробовать снова</Button>
        <Button variant="outline" asChild>
          <Link href="/topics">К темам</Link>
        </Button>
      </div>
    </div>
  );
}
