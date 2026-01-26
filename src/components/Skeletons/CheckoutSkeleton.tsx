export function CheckoutSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
      <div className="md:col-span-2 space-y-6">
        <div className="h-8 w-32 bg-muted rounded" />
        <div className="h-40 bg-muted border rounded-xl" />
      </div>
      <div className="md:col-span-1">
        <div className="h-10 bg-muted rounded mb-4" />
        <div className="h-64 bg-muted border rounded-xl" />
      </div>
    </div>
  );
}
