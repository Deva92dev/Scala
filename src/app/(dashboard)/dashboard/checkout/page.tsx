import { CheckoutContent } from "@/components/dashboard/checkout/CheckoutContent";
import DashboardGate from "@/components/dashboard/DashboardGate";
import { CheckoutSkeleton } from "@/components/Skeletons/CheckoutSkeleton";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <DashboardGate>
        {(ctx) => (
          <div className="max-w-4xl mx-auto py-8">
            <CheckoutContent userId={ctx.userId} orgId={ctx.orgId} />
          </div>
        )}
      </DashboardGate>
    </Suspense>
  );
}
