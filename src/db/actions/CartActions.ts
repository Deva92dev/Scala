"use server";

import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "..";
import { requireAuthWithOrg } from "../data-access/users";
import { cartItems, carts, products } from "../schema";
import { revalidatePath } from "next/cache";

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size)
    result.push(array.slice(i, i + size));
  return result;
}

// frontend use router.refresh
export const bulkAddToCart = async (
  items: { slug: string; quantity: number }[],
  batchId?: string
) => {
  const { orgId, userId } = await requireAuthWithOrg();

  // Get or create cart (scoped to org + user)
  return db.transaction(async (tx) => {
    let cart = await tx.query.carts.findFirst({
      where: and(eq(carts.organizationId, orgId), eq(carts.userId, userId)),
    });

    if (!cart) {
      try {
        const [created] = await tx
          .insert(carts)
          .values({ organizationId: orgId, userId })
          .returning();
        cart = created;
      } catch {
        cart = await tx.query.carts.findFirst({
          where: and(eq(carts.organizationId, orgId), eq(carts.userId, userId)),
        });
        if (!cart) throw new Error("CART_CREATE_FAILED");
      }
    }

    if (!cart) throw new Error("UNREACHABLE");

    const cartId = cart.id;

    // Resolve products
    const slugs = items.map((i) => i.slug);
    const found = await tx.query.products.findMany({
      where: inArray(products.slug, slugs),
      columns: { id: true, slug: true },
    });

    const productMap = new Map(found.map((p) => [p.slug, p.id]));

    const effectiveBatchId = batchId ?? crypto.randomUUID();
    const valid: (typeof cartItems.$inferInsert)[] = [];
    const failedSkus: string[] = [];

    for (const it of items) {
      const pid = productMap.get(it.slug);
      if (!pid) {
        failedSkus.push(it.slug);
        continue;
      }

      valid.push({
        cartId,
        productId: pid,
        quantity: it.quantity,
        batchId: effectiveBatchId,
      });
    }

    // Insert in chunks (safe upsert)
    if (valid.length) {
      for (const chunk of chunkArray(valid, 200)) {
        await tx
          .insert(cartItems)
          .values(chunk)
          .onConflictDoUpdate({
            target: [cartItems.cartId, cartItems.productId],
            set: {
              quantity: sql`${cartItems.quantity} + EXCLUDED.quantity`,
            },
          });
      }
    }

    return {
      success: true,
      addedCount: valid.length,
      failedSkus,
      batchId: valid.length ? effectiveBatchId : null,
    };
  });
};

export const undoBulkAddToCart = async (batchId: string) => {
  try {
    await requireAuthWithOrg();

    await db.delete(cartItems).where(eq(cartItems.batchId, batchId));
    revalidatePath("/dashboard/cart");
    return { success: true };
  } catch (error) {
    console.error("Undo action failed:", error);
    return { success: false, message: "Unauthorized" };
  }
};

export const updateCartItemQuantity = async (
  itemId: string,
  newQuantity: number
) => {
  try {
    await requireAuthWithOrg();

    if (newQuantity <= 0) {
      await db.delete(cartItems).where(eq(cartItems.id, itemId));
    } else {
      await db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, itemId));
    }

    revalidatePath("/dashboard/cart");
    return { success: true };
  } catch (error) {
    console.error("Cart update failed:", error);
    return { success: false, message: "Unauthorized or invalid request" };
  }
};

export const removeCartItem = async (itemId: string) => {
  try {
    await requireAuthWithOrg();

    await db.delete(cartItems).where(eq(cartItems.id, itemId));

    revalidatePath("/dashboard/cart");
    return { success: true };
  } catch (error) {
    console.error("Cart remove failed:", error);
    return { success: false, message: "Unauthorized" };
  }
};

export const clearCart = async () => {
  try {
    const { userId, orgId } = await requireAuthWithOrg();

    const cart = await db.query.carts.findFirst({
      where: and(eq(carts.userId, userId), eq(carts.organizationId, orgId)),
      columns: { id: true },
    });

    if (!cart) return { success: false, message: "No Cart Found" };

    // delete all items in this cart
    await db.delete(cartItems).where(eq(cartItems.cartId, cart.id));
    revalidatePath("/dashboard", "layout");

    return { success: true };
  } catch (error) {
    console.error("Failed to clear cart:", error);
    return { success: false, message: "Database error" };
  }
};
