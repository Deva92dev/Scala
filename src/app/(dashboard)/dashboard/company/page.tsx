import { CompanyContent } from "@/components/dashboard/company/CompanyContent";
import DashboardGate from "@/components/dashboard/DashboardGate";
import { CompanySkeleton } from "@/components/Skeletons/CompanySkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Company",
};

export default function CompanyPage() {
  return (
    <Suspense fallback={<CompanySkeleton />}>
      <DashboardGate>
        {(ctx) => (
          <div className="max-w-5xl mx-auto py-8">
            <CompanyContent userId={ctx.userId} orgId={ctx.orgId} />
          </div>
        )}
      </DashboardGate>
    </Suspense>
  );
}
