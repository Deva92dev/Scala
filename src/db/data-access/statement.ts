import { cacheLife } from "next/cache";
import { db } from "..";
import { orders } from "../schema";
import { and, eq, gte, lte } from "drizzle-orm";

export async function getMonthlyStatement(
  orgId: string,
  month: number,
  year: number,
) {
  "use cache";
  cacheLife("days");

  // Month is 0-indexed (0 = Jan), but args should be passed clearly
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const [org, statementOrders] = await Promise.all([
    db.query.organizations.findFirst({
      where: (o, { eq }) => eq(o.id, orgId),
      columns: { name: true, taxIdentifier: true },
    }),
    db.query.orders.findMany({
      where: and(
        eq(orders.organizationId, orgId),
        gte(orders.createdAt, startOfMonth),
        lte(orders.createdAt, endOfMonth),
      ),
      orderBy: (orders, { desc }) => [desc(orders.createdAt)],
    }),
  ]);

  if (!org) throw new Error("Organization not found");

  const totalSpend = statementOrders.reduce(
    (sum, o) => sum + Number(o.totalAmount),
    0,
  );

  return {
    org,
    orders: statementOrders,
    period: { start: startOfMonth, end: endOfMonth },
    totalSpend,
  };
}
