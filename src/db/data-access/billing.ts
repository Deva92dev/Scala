import { db } from "@/db";
import { organizations, orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { cache } from "react";

export const getBillingData = cache(async (orgId: string) => {
  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
    columns: {
      id: true,
      name: true,
      creditLimit: true,
      usedCredit: true,
      paymentTerms: true,
    },
  });

  if (!org) throw new Error("Organization not found");

  const recentInvoices = await db.query.orders.findMany({
    where: eq(orders.organizationId, orgId),
    orderBy: [desc(orders.createdAt)],
    limit: 10,
    columns: {
      id: true,
      createdAt: true,
      totalAmount: true,
      status: true,
      paymentStatus: true,
      poNumber: true,
    },
  });

  return { org, recentInvoices };
});
