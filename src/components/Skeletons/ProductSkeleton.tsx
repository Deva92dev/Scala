export function ProductSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-12 lg:gap-24 animate-pulse">
      <div className="aspect-square bg-muted/30 rounded-2xl" />
      <div className="space-y-4">
        <div className="h-8 w-1/3 bg-muted rounded" />
        <div className="h-12 w-3/4 bg-muted rounded" />
        <div className="h-32 w-full bg-muted rounded" />
        <div className="h-40 w-full bg-muted rounded mt-8" />
      </div>
    </div>
  );
}
