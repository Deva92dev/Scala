export function CatalogSkeleton() {
  return (
    <div className="py-24 container mx-auto px-4">
      <div className="h-10 w-48 bg-muted rounded mb-4 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-muted rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  );
}
