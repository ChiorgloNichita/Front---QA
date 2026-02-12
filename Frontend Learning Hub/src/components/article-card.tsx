import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 hover:-translate-y-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {article.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(article.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
