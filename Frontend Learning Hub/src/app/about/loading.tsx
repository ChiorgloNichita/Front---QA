export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <div className="mx-auto h-10 w-48 animate-pulse rounded bg-muted/40" />
          <div className="mx-auto h-5 w-80 animate-pulse rounded bg-muted/40" />
        </div>

        {/* Main card */}
        <div className="mb-8 rounded-xl border p-6 space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-muted/40" />
        </div>

        {/* Two cards grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border p-6 space-y-3">
            <div className="h-6 w-32 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
          </div>
          <div className="rounded-xl border p-6 space-y-3">
            <div className="h-6 w-40 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-full animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted/40" />
          </div>
        </div>

        {/* Separator */}
        <div className="my-8 h-px w-full bg-muted/40" />

        {/* Tech stack grid */}
        <div className="mb-8 space-y-6">
          <div className="h-8 w-52 animate-pulse rounded bg-muted/40" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border p-4">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-muted/40" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted/40" />
                  <div className="h-3 w-28 animate-pulse rounded bg-muted/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
