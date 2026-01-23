export function CartItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-card mb-3 shadow-sm animate-pulse">
      <div className="flex-1 min-w-0 mr-4">
        <div className="h-5 w-1/3 bg-muted rounded mb-2" />
        <div className="h-3 w-20 bg-muted rounded mb-2" />
        <div className="h-3 w-32 bg-muted rounded" />
      </div>
      <div className="flex items-center gap-2 mr-6">
        <div className="h-8 w-8 bg-muted rounded" />
        <div className="h-4 w-8 bg-muted rounded" />
        <div className="h-8 w-8 bg-muted rounded" />
      </div>
      <div className="flex flex-col items-end gap-2 w-24">
        <div className="h-5 w-16 bg-muted rounded" />
        <div className="h-8 w-8 bg-muted rounded" />
      </div>
    </div>
  );
}
