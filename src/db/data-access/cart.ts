import { and, count, desc, eq } from "drizzle-orm";
import { db } from "..";
import { cartItems, carts } from "../schema";
import { cacheLife } from "next/cache";

export const getCartDetails = async (userId: string, orgId: string) => {
  "use cache";
  cacheLife("seconds");

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
};

export const getCartCount = async (userId: string, orgId: string) => {
  "use cache";
  cacheLife("seconds");

  const result = await db
    .select({ value: count() })
    .from(carts)
    .innerJoin(cartItems, eq(carts.id, cartItems.cartId))
    .where(and(eq(carts.userId, userId), eq(carts.organizationId, orgId)));

  return result[0]?.value || 0;
};
