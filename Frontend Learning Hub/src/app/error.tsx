"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <AlertTriangle className="mb-6 h-16 w-16 text-destructive/60" />
      <h2 className="mb-3 text-2xl font-bold">Что-то пошло не так</h2>
      <p className="mb-8 text-muted-foreground max-w-md">
        Произошла непредвиденная ошибка. Попробуйте обновить страницу.
      </p>
      <Button onClick={reset}>Попробовать снова</Button>
    </div>
  );
}
