import { and, count, desc, eq, or } from "drizzle-orm";
import { db } from "..";
import { orders, organizations } from "../schema";
import { cacheLife } from "next/cache";

export type FinancialSnapshot = {
  creditLimit: number;
  usedCredit: number;
  remainingCredit: number;
  currency: string;
  isOverLimit: boolean;
};

export type RecentOrderDTO = {
  id: string;
  poNumber: string | null;
  totalAmount: number;
  status: string;
  date: Date;
  itemCount: number;
};

export const getOrganizationFinancial = async (
  orgId: string,
): Promise<FinancialSnapshot> => {
  "use cache";
  cacheLife("minutes");

  const org = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
    columns: {
      creditLimit: true,
      usedCredit: true,
      currency: true,
    },
  });

  if (!org) throw new Error("Organization not found");

  const limit = Number(org.creditLimit);
  const used = Number(org.usedCredit);

  return {
    creditLimit: limit,
    usedCredit: used,
    remainingCredit: limit - used,
    currency: org.currency,
    isOverLimit: used > limit,
  };
};

export const getRecentOrder = async (
  orgId: string,
): Promise<RecentOrderDTO[]> => {
  "use cache";
  cacheLife("minutes");

  const data = await db.query.orders.findMany({
    where: eq(orders.organizationId, orgId),
    orderBy: [desc(orders.createdAt)],
    limit: 5,
    with: {
      items: {
        columns: { id: true },
      },
    },
  });

  return data.map((o) => ({
    id: o.id,
    poNumber: o.poNumber || "N/A",
    totalAmount: Number(o.totalAmount),
    status: o.status,
    date: o.createdAt,
    itemCount: o.items.length,
  }));
};

export async function getDashboardStats(orgId: string) {
  "use cache";
  cacheLife("minutes");

  const [org, recentOrders, pendingCount, activeCount] = await Promise.all([
    // Financials
    db.query.organizations.findFirst({
      where: eq(organizations.id, orgId),
      columns: {
        creditLimit: true,
        usedCredit: true,
        paymentTerms: true,
        currency: true,
      },
    }),

    // Recent 5 Orders
    db.query.orders.findMany({
      where: eq(orders.organizationId, orgId),
      orderBy: [desc(orders.createdAt)],
      limit: 5,
      columns: {
        id: true,
        totalAmount: true,
        status: true,
        createdAt: true,
        poNumber: true,
      },
    }),

    // Count Pending Approval (Action Item)
    db
      .select({ value: count() })
      .from(orders)
      .where(
        and(
          eq(orders.organizationId, orgId),
          eq(orders.status, "pending_approval"),
        ),
      ),

    // Count "In Transit" / Processing
    db
      .select({ value: count() })
      .from(orders)
      .where(
        and(
          eq(orders.organizationId, orgId),
          or(
            eq(orders.status, "processing"),
            eq(orders.status, "shipped"),
            eq(orders.status, "partially_shipped"),
          ),
        ),
      ),
  ]);

  if (!org) throw new Error("Org not found");

  return {
    financials: org,
    recentOrders,
    counts: {
      pending: pendingCount[0]?.value,
      active: activeCount[0]?.value,
    },
  };
}
