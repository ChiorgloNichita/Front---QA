import { LoadingCards } from "@/components/loading";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 space-y-3">
        <div className="h-10 w-48 animate-pulse rounded bg-muted/40" />
        <div className="h-5 w-80 animate-pulse rounded bg-muted/40" />
      </div>
      <LoadingCards />
    </div>
  );
}
