import { db } from "@/db";
import { requireSuperAdmin } from "@/db/data-access/admin";
import { organizations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import AdminOrgControls from "./AdminOrgControls";

export async function OrgDetailContent({ orgId }: { orgId: string }) {
  await requireSuperAdmin();

  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
  });

  if (!org) {
    return notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {org.name}
          </h1>
          <p className="text-muted-foreground font-mono text-sm mt-1">
            ID: {org.id}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {org.slug}
        </Badge>
      </div>

      {/* Interactive Controls */}
      <AdminOrgControls
        orgId={org.id}
        currentLimit={Number(org.creditLimit)}
        currentTerms={org.paymentTerms}
        currentTier={org.tier || "bronze"}
      />
    </div>
  );
}
