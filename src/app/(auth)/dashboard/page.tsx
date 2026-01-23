import { DashboardContent } from "@/components/dashboard/home/DashboardContent";
import { DashboardSkeleton } from "@/components/Skeletons/DashboardSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
};

export default function DashBoardPage() {
  return (
    <div className="max-w-6xl mx-auto py-8">
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
