import DashboardGate from "@/components/dashboard/DashboardGate";
import { DashboardContent } from "@/components/dashboard/home/DashboardContent";
import { DashboardSkeleton } from "@/components/Skeletons/DashboardSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
};

export default function DashBoardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardGate>
        {({ orgId, name }) => (
          <div className="h-full w-full">
            <DashboardContent orgId={orgId} name={name} />
          </div>
        )}
      </DashboardGate>
    </Suspense>
  );
}
