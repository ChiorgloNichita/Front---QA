import { FileQuestion } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <FileQuestion className="mb-4 h-16 w-16 text-muted-foreground/50" />
      <h3 className="text-lg font-semibold text-muted-foreground">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground/70">
          {description}
        </p>
      )}
    </div>
  );
}
