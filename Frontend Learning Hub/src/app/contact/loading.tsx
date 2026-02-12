export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-10 text-center space-y-3">
          <div className="mx-auto h-10 w-40 animate-pulse rounded bg-muted/40" />
          <div className="mx-auto h-5 w-72 animate-pulse rounded bg-muted/40" />
        </div>

        {/* Form card */}
        <div className="rounded-xl border p-6 space-y-6">
          <div className="space-y-2">
            <div className="h-5 w-40 animate-pulse rounded bg-muted/40" />
            <div className="h-4 w-56 animate-pulse rounded bg-muted/40" />
          </div>

          {/* Name field */}
          <div className="space-y-2">
            <div className="h-4 w-12 animate-pulse rounded bg-muted/40" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
          </div>

          {/* Email field */}
          <div className="space-y-2">
            <div className="h-4 w-14 animate-pulse rounded bg-muted/40" />
            <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted/40" />
            <div className="h-32 w-full animate-pulse rounded-md bg-muted/40" />
          </div>

          {/* Submit button */}
          <div className="h-10 w-full animate-pulse rounded-md bg-muted/40" />
        </div>

        {/* Contact info cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border p-6 text-center space-y-3">
              <div className="mx-auto h-8 w-8 animate-pulse rounded bg-muted/40" />
              <div className="mx-auto h-4 w-16 animate-pulse rounded bg-muted/40" />
              <div className="mx-auto h-3 w-28 animate-pulse rounded bg-muted/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
