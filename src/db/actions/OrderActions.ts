"use server";

import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { requireAuthWithOrg } from "../data-access/users";
import { cartItems, orderItems, orders, organizations } from "../schema";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createOrderFromCart = async (formData: FormData) => {
  const poNumber = formData.get("poNumber")?.toString() || null;

  const { userId, orgId } = await requireAuthWithOrg();

  const cart = await db.query.carts.findFirst({
    where: (carts, { and, eq }) =>
      and(eq(carts.userId, userId), eq(carts.organizationId, orgId)),
    with: {
      items: {
        with: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + Number(item.product.basePrice) * item.quantity,
    0,
  );

  const tax = subtotal * 0.1;
  const shippingCost = subtotal > 5000 ? 0 : 150;
  const totalAmount = subtotal + tax + shippingCost;

  // Address snapshot (correctly immutable)
  const addressSnapshot = {
    street: "123 Business Park",
    city: "Tech City",
    country: "USA",
    zip: "90210",
  };

  const newOrderId = randomUUID();

  await db.transaction(async (tx) => {
    // Order header
    await tx.insert(orders).values({
      id: newOrderId,
      organizationId: orgId,
      placedByUserId: userId,
      status: "pending_approval",
      poNumber,
      subtotal: subtotal.toString(),
      tax: tax.toString(),
      shippingCost: shippingCost.toString(),
      totalAmount: totalAmount.toString(),
      paymentStatus: "unpaid",
      shippingAddressSnapshot: addressSnapshot,
      billingAddressSnapshot: addressSnapshot,
    });

    // Snapshot items
    await tx.insert(orderItems).values(
      cart.items.map((item) => ({
        orderId: newOrderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPriceAtPurchase: item.product.basePrice.toString(),
        totalPrice: (Number(item.product.basePrice) * item.quantity).toString(),
        productNameSnapshot: item.product.name,
        skuSnapshot: item.product.slug,
      })),
    );

    // optimistic locking
    await tx
      .update(organizations)
      .set({
        usedCredit: sql`${organizations.usedCredit} + ${totalAmount.toString()}`,
        version: sql`${organizations.version} + 1`,
      })
      .where(eq(organizations.id, orgId));

    await tx.delete(cartItems).where(eq(cartItems.cartId, cart.id));
  });

  revalidatePath("/dashboard", "layout");
  redirect("/dashboard/orders");
};

export async function approveOrder(orderId: string) {
  const { userId, orgId, role } = await requireAuthWithOrg();

  // Only Admins/Owners can approve
  if (role !== "admin" && role !== "approver") {
    throw new Error("UNAUTHORIZED: You do not have approval permissions.");
  }

  const order = await db.query.orders.findFirst({
    where: (orders, { and, eq }) =>
      and(eq(orders.id, orderId), eq(orders.organizationId, orgId)),
  });

  if (!order) throw new Error("Order not found");
  if (order.status !== "pending_approval") {
    throw new Error("Order is not pending approval");
  }

  // Mutate State
  await db
    .update(orders)
    .set({
      paymentStatus: "paid",
      approvedByUserId: userId,
      approvedAt: new Date(),
    })
    .where(eq(orders.id, orderId));

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");

  return { success: true };
}

export async function rejectOrder(orderId: string, reason: string) {
  const { orgId, role } = await requireAuthWithOrg();

  if (role !== "admin" && role !== "approver") {
    throw new Error("UNAUTHORIZED");
  }

  await db.transaction(async (tx) => {
    const order = await tx.query.orders.findFirst({
      where: (orders, { and, eq }) =>
        and(eq(orders.id, orderId), eq(orders.organizationId, orgId)),
      columns: {
        totalAmount: true,
        status: true,
      },
    });

    if (!order) throw new Error("Order not found");
    if (order.status !== "pending_approval")
      throw new Error("Cannot reject non-pending order");

    // Cancel Order
    await tx
      .update(orders)
      .set({
        status: "rejected",
        rejectionReason: reason,
      })
      .where(eq(orders.id, orderId));

    // REFUND CREDIT Since added it in createOrder, so must subtract it here
    await tx
      .update(organizations)
      .set({
        usedCredit: sql`${organizations.usedCredit} - ${order.totalAmount}`,
        version: sql`${organizations.version} + 1`,
      })
      .where(eq(organizations.id, orgId));
  });

  revalidatePath(`/dashboard/orders/${orderId}`);
  revalidatePath("/dashboard/orders");
  return { success: true };
}
