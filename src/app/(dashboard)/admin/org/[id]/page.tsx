import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { OrgDetailSkeleton } from "@/components/dashboard/OrgDetailSkeleton";
import { OrgDetailContent } from "@/components/dashboard/OrgDetailContent";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrgDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Link href="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Organizations
          </Button>
        </Link>

        <Suspense fallback={<OrgDetailSkeleton />}>
          <OrgDetailContent orgId={id} />
        </Suspense>
      </div>
    </div>
  );
}
