"use server";

import Stripe from "stripe";
import { getCartDetails } from "@/db/data-access/cart";
import { requireAuthWithOrg } from "@/db/data-access/users";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-12-15.clover",
});

export async function createStripePaymentIntent() {
  const { userId, orgId } = await requireAuthWithOrg();
  const cart = await getCartDetails(userId, orgId);

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Calculate Amount (Stripe expects integers in cents)
  const subtotal = cart.subtotal;
  const tax = subtotal * 0.1;
  const shipping = subtotal > 5000 ? 0 : 150;
  const totalAmount = Math.round((subtotal + tax + shipping) * 100); // Convert to Cents

  // Create Intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    metadata: {
      orgId,
      userId,
      cartId: cart.id, // Critical for Webhook to reconstruct the order
      poNumber: "",
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("Failed to create payment intent");
  }

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}

export async function updatePaymentIntentPoNumber(
  paymentIntentId: string,
  poNumber: string,
) {
  await requireAuthWithOrg();

  await stripe.paymentIntents.update(paymentIntentId, {
    metadata: { poNumber },
  });

  return { success: true };
}
