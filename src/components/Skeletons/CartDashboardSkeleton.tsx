import { CartItemSkeleton } from "./CartItemSkeleton";

export function CartDashboardSkeleton() {
  return (
    <section className="max-w-5xl mx-auto h-[calc(100vh-100px)] flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted rounded animate-pulse" />
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <CartItemSkeleton />
          <CartItemSkeleton />
          <CartItemSkeleton />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-xl shadow-sm p-6 h-100 animate-pulse">
            <div className="h-6 w-32 bg-muted rounded mb-6" />
            <div className="space-y-4">
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
            </div>
            <div className="h-12 w-full bg-muted rounded mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
