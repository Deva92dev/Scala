import { Suspense } from "react";
import { DashboardContent } from "@/components/dashboard/home/DashboardContent";
import { DashboardSkeleton } from "@/components/Skeletons/DashboardSkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
};

async function DashboardPageContent() {
  const session = await requireAuthWithOrg();

  return (
    <div className="h-full w-full">
      <DashboardContent orgId={session.orgId} name={session.name} />
    </div>
  );
}

export default function DashBoardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  );
}
