/* eslint-disable @typescript-eslint/no-unused-vars */

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/db";
import { cartItems, carts, orders } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig)
    return NextResponse.json({ error: "No Signature" }, { status: 400 });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle Successful Payment
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const { orgId, userId, cartId, poNumber } = paymentIntent.metadata;

    if (!cartId || typeof cartId !== "string") {
      console.error("Missing cartId in metadata");
      return NextResponse.json({ received: true });
    }

    // Using db.select().from() is safer than db.query() for strict TS environments
    const cartResult = await db
      .select()
      .from(carts)
      .where(eq(carts.id, cartId))
      .limit(1);

    const cart = cartResult[0];

    if (!cart) return NextResponse.json({ received: true });

    // Fetch items
    const items = await db.query.cartItems.findMany({
      where: eq(cartItems.cartId, cart.id),
      with: { product: true },
    });

    if (items.length === 0) return NextResponse.json({ received: true });

    const subtotalNum = items.reduce(
      (acc, item) => acc + Number(item.product.basePrice) * item.quantity,
      0,
    );
    const taxNum = subtotalNum * 0.1;
    const shippingNum = subtotalNum > 5000 ? 0 : 150;
    const totalNum = subtotalNum + taxNum + shippingNum;

    const stripeAddress = paymentIntent.shipping?.address;
    const addressSnapshot = {
      street: stripeAddress?.line1 || "N/A",
      city: stripeAddress?.city || "N/A",
      state: stripeAddress?.state || "N/A",
      country: stripeAddress?.country || "N/A",
      zip: stripeAddress?.postal_code || "N/A",
    };

    await db.transaction(async (tx) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const orderValues: any = {
        //'id' here. The DB will auto-generate it via defaultRandom()
        organizationId: orgId,
        placedByUserId: userId,
        status: "processing",
        paymentStatus: "paid",
        stripePaymentIntentId: paymentIntent.id,
        poNumber: poNumber || null,

        // Financials
        subtotal: subtotalNum.toFixed(2),
        tax: taxNum.toFixed(2),
        shippingCost: shippingNum.toFixed(2),
        totalAmount: totalNum.toFixed(2),

        // Addresses
        shippingAddressSnapshot: addressSnapshot,
        billingAddressSnapshot: addressSnapshot,
      };

      await tx.insert(orders).values(orderValues);

      await tx.delete(cartItems).where(eq(cartItems.cartId, cartId));
    });
  }

  return NextResponse.json({ received: true });
}
