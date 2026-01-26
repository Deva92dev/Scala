import { CompanyContent } from "@/components/dashboard/company/CompanyContent";
import { CompanySkeleton } from "@/components/Skeletons/CompanySkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Company",
};

async function CompanyPageContent() {
  const session = await requireAuthWithOrg();

  return (
    <div className="max-w-5xl mx-auto py-8">
      <CompanyContent userId={session.userId} orgId={session.orgId} />
    </div>
  );
}

export default function CompanyPage() {
  return (
    <Suspense fallback={<CompanySkeleton />}>
      <CompanyPageContent />
    </Suspense>
  );
}
