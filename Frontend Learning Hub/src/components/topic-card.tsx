import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Topic } from "@/lib/types";
import { pluralize } from "@/lib/pluralize";
import {
  Code2,
  FileCode,
  ShieldCheck,
  Atom,
  Globe,
  Wrench,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  FileCode,
  ShieldCheck,
  Atom,
  Globe,
  Wrench,
  FlaskConical,
};

const topicColors: Record<string, { bg: string; text: string; hover: string; border: string }> = {
  "html-css": {
    bg: "bg-orange-100 dark:bg-orange-950/50",
    text: "text-orange-600 dark:text-orange-400",
    hover: "group-hover:bg-orange-500 group-hover:text-white",
    border: "hover:border-orange-300 dark:hover:border-orange-800",
  },
  javascript: {
    bg: "bg-yellow-100 dark:bg-yellow-950/50",
    text: "text-yellow-600 dark:text-yellow-400",
    hover: "group-hover:bg-yellow-500 group-hover:text-white",
    border: "hover:border-yellow-300 dark:hover:border-yellow-800",
  },
  typescript: {
    bg: "bg-blue-100 dark:bg-blue-950/50",
    text: "text-blue-600 dark:text-blue-400",
    hover: "group-hover:bg-blue-500 group-hover:text-white",
    border: "hover:border-blue-300 dark:hover:border-blue-800",
  },
  react: {
    bg: "bg-cyan-100 dark:bg-cyan-950/50",
    text: "text-cyan-600 dark:text-cyan-400",
    hover: "group-hover:bg-cyan-500 group-hover:text-white",
    border: "hover:border-cyan-300 dark:hover:border-cyan-800",
  },
  nextjs: {
    bg: "bg-violet-100 dark:bg-violet-950/50",
    text: "text-violet-600 dark:text-violet-400",
    hover: "group-hover:bg-violet-500 group-hover:text-white",
    border: "hover:border-violet-300 dark:hover:border-violet-800",
  },
  tooling: {
    bg: "bg-emerald-100 dark:bg-emerald-950/50",
    text: "text-emerald-600 dark:text-emerald-400",
    hover: "group-hover:bg-emerald-500 group-hover:text-white",
    border: "hover:border-emerald-300 dark:hover:border-emerald-800",
  },
  qa: {
    bg: "bg-pink-100 dark:bg-pink-950/50",
    text: "text-pink-600 dark:text-pink-400",
    hover: "group-hover:bg-pink-500 group-hover:text-white",
    border: "hover:border-pink-300 dark:hover:border-pink-800",
  },
};

const defaultColors = {
  bg: "bg-primary/10",
  text: "text-primary",
  hover: "group-hover:bg-primary group-hover:text-primary-foreground",
  border: "hover:border-primary/30",
};

interface TopicCardProps {
  topic: Topic;
}

export function TopicCard({ topic }: TopicCardProps) {
  const Icon = iconMap[topic.icon] ?? Code2;
  const colors = topicColors[topic.slug] ?? defaultColors;

  return (
    <Link href={`/topics/${topic.slug}`}>
      <Card className={cn(
        "group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
        colors.border,
      )}>
        <CardHeader>
          <div className={cn(
            "mb-3 flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
            colors.bg,
            colors.text,
            colors.hover,
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-lg">{topic.title}</CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {topic.description}
          </CardDescription>
          <p className={cn("mt-2 text-xs font-medium", colors.text)}>
            {topic.articleCount}{" "}
            {pluralize(topic.articleCount, "статья", "статьи", "статей")}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
