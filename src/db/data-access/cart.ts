import { and, count, desc, eq } from "drizzle-orm";
import { db } from "..";
import { cartItems, carts } from "../schema";
import { cache } from "react";

export const getCartDetails = cache(async (userId: string, orgId: string) => {
  const cart = await db.query.carts.findFirst({
    where: (carts, { and, eq }) =>
      and(eq(carts.userId, userId), eq(carts.organizationId, orgId)),
    with: {
      items: {
        orderBy: [desc(cartItems.addedAt)],
        with: {
          product: true, // Join Product details (Name, Price, Image)
        },
      },
    },
  });

  if (!cart) return null;
  // Calculate totals server-side to avoid JS floating point math on client
  const subtotal = cart.items.reduce((acc, item) => {
    return acc + Number(item.product.basePrice) * item.quantity;
  }, 0);

  return { ...cart, subtotal };
});

export const getCartCount = cache(async (userId: string, orgId: string) => {
  const result = await db
    .select({ value: count() })
    .from(carts)
    .innerJoin(cartItems, eq(carts.id, cartItems.cartId))
    .where(and(eq(carts.userId, userId), eq(carts.organizationId, orgId)));

  return result[0]?.value || 0;
});
