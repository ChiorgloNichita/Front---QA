import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <FileQuestion className="mb-6 h-24 w-24 text-muted-foreground/40" />
      <h1 className="mb-3 text-4xl font-bold">404</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Страница не найдена. Возможно, она была перемещена или удалена.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/topics">Все темы</Link>
        </Button>
      </div>
    </div>
  );
}
