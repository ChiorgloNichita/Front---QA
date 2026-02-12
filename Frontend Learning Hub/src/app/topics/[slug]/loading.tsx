import { LoadingCards } from "@/components/loading";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back button */}
      <div className="mb-6 h-8 w-28 animate-pulse rounded bg-muted/40" />

      {/* Topic header */}
      <div className="mb-10 space-y-3">
        <div className="h-10 w-56 animate-pulse rounded bg-muted/40" />
        <div className="h-5 w-96 animate-pulse rounded bg-muted/40" />
      </div>

      <LoadingCards />
    </div>
  );
}
