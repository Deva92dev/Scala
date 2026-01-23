export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted/70 rounded animate-pulse" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-36 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Credit Usage */}
        <div className="rounded-xl border bg-card p-6 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-6 w-40 bg-muted rounded" />
          <div className="h-2 w-full bg-muted rounded" />
        </div>

        {/* Pending Approval */}
        <div className="rounded-xl border bg-card p-6 flex flex-col justify-between animate-pulse">
          <div className="flex justify-between">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-3 w-44 bg-muted rounded" />
          </div>
        </div>

        {/* Active Shipments */}
        <div className="rounded-xl border bg-card p-6 flex flex-col justify-between animate-pulse">
          <div className="flex justify-between">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-4 bg-muted rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="h-8 w-16 bg-muted rounded" />
            <div className="h-3 w-44 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border bg-card overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-muted/20">
          <div className="h-5 w-40 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
        </div>

        {/* Table Skeleton */}
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 px-6 py-4 animate-pulse"
            >
              <div className="h-4 bg-muted rounded col-span-1" />
              <div className="h-4 bg-muted rounded col-span-1" />
              <div className="h-4 bg-muted rounded col-span-1" />
              <div className="h-4 bg-muted rounded col-span-1" />
              <div className="h-4 bg-muted rounded col-span-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
