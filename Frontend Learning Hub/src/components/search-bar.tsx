"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  defaultQuery?: string;
  className?: string;
}

export function SearchBar({ defaultQuery = "", className }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`flex gap-2 ${className ?? ""}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск статей..."
          className="pl-10"
        />
      </div>
      <Button type="submit">Найти</Button>
    </form>
  );
}
