"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePaymentIntentPoNumber } from "@/db/actions/StripeActions";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

export function CheckoutFormContent({
  paymentIntentId,
}: {
  paymentIntentId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [poNumber, setPoNumber] = useState("");

  // Debounce the server call to avoid spamming Stripe
  const debouncedUpdatePO = useDebouncedCallback(async (val: string) => {
    await updatePaymentIntentPoNumber(paymentIntentId, val);
  }, 1000);

  const handlePoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoNumber(e.target.value);
    debouncedUpdatePO(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/orders/success`,
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
      {/* PO Input inside Stripe Form */}
      <div className="space-y-2">
        <Label htmlFor="po-card">Purchase Order (PO) Number</Label>
        <Input
          id="po-card"
          placeholder="e.g. PO-2024-CARD"
          value={poNumber}
          onChange={handlePoChange}
        />
      </div>

      <PaymentElement />

      <Button disabled={!stripe || loading} className="w-full h-11" size="lg">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
        {loading ? "Processing Payment..." : "Pay Now"}
      </Button>
    </form>
  );
}
