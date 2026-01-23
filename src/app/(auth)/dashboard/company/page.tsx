import { CompanyContent } from "@/components/dashboard/company/CompanyContent";
import { CompanySkeleton } from "@/components/Skeletons/CompanySkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Company",
};

export default function CompanyPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <Suspense fallback={<CompanySkeleton />}>
        <CompanyContent />
      </Suspense>
    </div>
  );
}
