export function LoadingCards({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-48 animate-pulse rounded-xl border bg-muted/40"
        />
      ))}
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 w-2/3 animate-pulse rounded bg-muted/40" />
      <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
      <div className="h-4 w-4/6 animate-pulse rounded bg-muted/40" />
    </div>
  );
}
