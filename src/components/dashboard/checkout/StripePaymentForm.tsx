"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutFormContent } from "./CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface StripePaymentFormProps {
  clientSecret: string;
  paymentIntentId: string;
}

export default function StripePaymentForm({
  clientSecret,
  paymentIntentId,
}: StripePaymentFormProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutFormContent paymentIntentId={paymentIntentId} />
    </Elements>
  );
}
