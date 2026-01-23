/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Button } from "@/components/ui/button";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import { createOrderFromCart } from "@/db/actions/OrderActions";
import { AlertTriangle, Lock } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NetTermsFormProps {
  cartTotal: number;
  creditLimit: number;
  usedCredit: number;
  terms: string;
}

export default function NetTermsForm({
  cartTotal,
  creditLimit,
  usedCredit,
  terms,
}: NetTermsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [poNumber, setPoNumber] = useState("");

  const availableCredit = Math.max(0, creditLimit - usedCredit);
  const isCreditExceeded = cartTotal > availableCredit;

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await createOrderFromCart(formData);
        toast.success("Purchase Order Created");
      } catch (error) {
        toast.error("Failed to place order");
      }
    });
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-lg mb-6">Payment Method</h3>

      <div className="border rounded-lg p-4 mb-6 bg-muted/20">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium">Account Terms</span>
          <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded uppercase">
            {terms?.replace(/_/g, " ")}
          </span>
        </div>

        {/* Credit Visualization */}
        <div className="space-y-2 mt-4">
          <div className="flex justify-between text-xs">
            <span>Credit Usage</span>
            <span>
              <PriceTag amount={usedCredit} /> /{" "}
              <PriceTag amount={creditLimit} />
            </span>
          </div>

          <div className="relative h-2 w-full bg-secondary rounded-full overflow-hidden">
            {/* Base Usage */}
            <div
              className="absolute top-0 left-0 h-full bg-primary"
              style={{
                width: `${Math.min(100, (usedCredit / creditLimit) * 100)}%`,
              }}
            />
            {/* Projected Usage (The current cart) */}
            <div
              className={`absolute top-0 h-full opacity-50 ${isCreditExceeded ? "bg-destructive" : "bg-primary"}`}
              style={{
                left: `${Math.min(100, (usedCredit / creditLimit) * 100)}%`,
                width: `${Math.min(100, (cartTotal / creditLimit) * 100)}%`,
              }}
            />
          </div>

          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>
              Available: <PriceTag amount={availableCredit} />
            </span>
            {isCreditExceeded && (
              <span className="text-destructive font-medium">Over Limit</span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 space-y-2">
        <Label htmlFor="po-net">Purchase Order (PO) Number</Label>
        <Input
          id="po-net"
          placeholder="e.g. PO-2024-001 (Optional)"
          name="poNumber"
          value={poNumber}
          onChange={(e) => setPoNumber(e.target.value)}
          disabled={isPending || isCreditExceeded}
        />
        <p className="text-xs text-muted-foreground">
          This will appear on your final invoice.
        </p>
      </div>

      {isCreditExceeded ? (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-destructive">
              Credit Limit Exceeded
            </h4>
            <p className="text-xs text-destructive/80">
              This order exceeds your available credit.
            </p>
            <Button disabled className="w-full mt-2" variant="destructive">
              <Lock className="w-4 h-4 mr-2" /> Checkout Blocked
            </Button>
          </div>
        </div>
      ) : (
        <form action={handleSubmit}>
          <Button
            className="w-full h-11 text-md"
            size="lg"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Processing..." : "Confirm Purchase Order"}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            By clicking confirm, you agree to the organization terms.
          </p>
        </form>
      )}
    </div>
  );
}
