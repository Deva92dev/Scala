export function CatalogHeaderSkeleton() {
  return (
    <div className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted/50 rounded animate-pulse" />
        </div>
        <div className="h-10 w-32 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
