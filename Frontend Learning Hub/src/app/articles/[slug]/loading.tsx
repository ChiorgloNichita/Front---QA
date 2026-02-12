export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Back button skeleton */}
        <div className="mb-6 h-8 w-32 animate-pulse rounded bg-muted/40" />

        {/* Title */}
        <div className="mb-8 space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded bg-muted/40" />
          <div className="h-5 w-full animate-pulse rounded bg-muted/40" />

          {/* Tags */}
          <div className="flex gap-2">
            <div className="h-6 w-16 animate-pulse rounded-full bg-muted/40" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-muted/40" />
            <div className="h-6 w-14 animate-pulse rounded-full bg-muted/40" />
          </div>

          {/* Date & read time */}
          <div className="flex gap-4">
            <div className="h-4 w-28 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted/40" />
          </div>
        </div>

        {/* Separator */}
        <div className="mb-8 h-px w-full bg-muted/40" />

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted/40" />
          <div className="h-8 w-1/2 animate-pulse rounded bg-muted/40 mt-6" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
          <div className="h-32 w-full animate-pulse rounded-lg bg-muted/40 mt-4" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted/40" />
        </div>
      </div>
    </div>
  );
}
