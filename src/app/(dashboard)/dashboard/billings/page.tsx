import { Metadata } from "next";
import { Suspense } from "react";
import { BillingSkeleton } from "@/components/Skeletons/BillingSkeleton";
import { BillingContent } from "@/components/dashboard/BillingContent";
import { requireAuthWithOrg } from "@/db/data-access/users";

export const metadata: Metadata = {
  title: "Billings",
};

async function BillingPageContent() {
  const session = await requireAuthWithOrg();

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Billing & Financials
        </h1>
        <p className="text-muted-foreground">
          Monitor your credit limit and download invoices.
        </p>
      </div>
      <BillingContent orgId={session.orgId} />
    </div>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingSkeleton />}>
      <BillingPageContent />
    </Suspense>
  );
}
