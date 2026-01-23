import { db } from "@/db";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AdminOrgControls from "./AdminOrgControls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { requireSuperAdmin } from "@/db/data-access/admin";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrgDetailPage({ params }: PageProps) {
  await requireSuperAdmin();

  const { id } = await params;

  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, id),
  });

  if (!org) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header with Back Button */}
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

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{org.name}</h1>
            <p className="text-muted-foreground font-mono text-sm mt-1">
              ID: {org.id}
            </p>
          </div>
          <Badge variant="outline" className="px-3 py-1 text-sm">
            {org.slug}
          </Badge>
        </div>
      </div>

      <AdminOrgControls
        orgId={org.id}
        currentLimit={Number(org.creditLimit)}
        currentTerms={org.paymentTerms}
        currentTier={org.tier || "bronze"}
      />
    </div>
  );
}
