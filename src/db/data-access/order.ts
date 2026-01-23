import { cache } from "react";
import { db } from "..";
import { orderItems, orders } from "../schema";
import { count, desc, eq } from "drizzle-orm";
import { OrderDetailsDTO } from "@/utils/types";

export const getOrders = cache(async (orgId: string) => {
  const result = await db
    .select({
      id: orders.id,
      poNumber: orders.poNumber,
      status: orders.status,
      totalAmount: orders.totalAmount,
      createdAt: orders.createdAt,
      paymentStatus: orders.paymentStatus,
      itemCount: count(orderItems.id),
    })
    .from(orders)
    .leftJoin(orderItems, eq(orders.id, orderItems.orderId))
    .where(eq(orders.organizationId, orgId))
    .groupBy(orders.id)
    .orderBy(desc(orders.createdAt));

  return result;
});

export type OrderListResult = Awaited<ReturnType<typeof getOrders>>[number];

export const getOrderById = cache(async (orderId: string, orgId: string) => {
  const order = await db.query.orders.findFirst({
    where: (orders, { and, eq }) =>
      and(eq(orders.id, orderId), eq(orders.organizationId, orgId)),
    with: {
      items: {
        with: {
          product: true,
        },
      },
      placedByUser: true, // join user to see who ordered
    },
  });

  return order as unknown as OrderDetailsDTO;
});

export type getOrderByIdType = Awaited<ReturnType<typeof getOrderById>>;

// Fetch All Orders for CSV(need 1 row per item) (Flat List)
export const getAllOrdersForExport = async (orgId: string) => {
  return await db.query.orders.findMany({
    where: eq(orders.organizationId, orgId),
    with: {
      items: true,
      placedByUser: true,
    },
    orderBy: desc(orders.createdAt),
  });
};
