export function OrgDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
        </div>
        <div className="h-6 w-20 bg-muted rounded animate-pulse" />
      </div>
      {/* Controls Skeleton */}
      <div className="h-96 bg-muted/30 border border-border rounded-xl animate-pulse" />
    </div>
  );
}
