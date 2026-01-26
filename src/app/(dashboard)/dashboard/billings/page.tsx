import { Metadata } from "next";
import { Suspense } from "react";
import { BillingSkeleton } from "@/components/Skeletons/BillingSkeleton";
import { BillingContent } from "@/components/dashboard/BillingContent";
import DashboardGate from "@/components/dashboard/DashboardGate";

export const metadata: Metadata = {
  title: "Billings",
};

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingSkeleton />}>
      <DashboardGate>
        {(ctx) => (
          <div className="space-y-8 max-w-5xl">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Billing & Financials
              </h1>
              <p className="text-muted-foreground">
                Monitor your credit limit and download invoices.
              </p>
            </div>
            <BillingContent orgId={ctx.orgId} />
          </div>
        )}
      </DashboardGate>
    </Suspense>
  );
}
