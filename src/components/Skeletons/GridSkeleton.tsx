export function GridSkeleton() {
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* PRODUCT GRID  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col h-full bg-card border rounded-lg overflow-hidden animate-pulse"
          >
            {/* Image */}
            <div className="relative h-56 bg-muted">
              <div className="absolute top-3 right-3 h-5 w-16 rounded bg-background/80" />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow space-y-4">
              {/* Title + Description */}
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
              </div>

              {/* Pricing */}
              <div className="mt-auto space-y-4">
                <div className="rounded-md border bg-muted/30 p-3 space-y-2">
                  <div className="flex justify-between">
                    <div className="space-y-1">
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-4 w-20 bg-muted rounded" />
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="h-3 w-16 bg-muted rounded" />
                      <div className="h-5 w-24 bg-muted rounded" />
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="h-10 w-full rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* INFINITE SCROLL LOADER */}
      <div className="flex justify-center py-12">
        <div className="flex flex-col items-center gap-3 animate-pulse">
          <div className="h-6 w-6 rounded-full bg-muted" />
          <div className="h-3 w-32 rounded bg-muted" />
        </div>
      </div>

      {/* EMPTY STATE PLACEHOLDER */}
      <div className="flex justify-center py-16">
        <div className="h-4 w-64 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
}
