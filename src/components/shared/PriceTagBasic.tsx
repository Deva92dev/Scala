"use client";

import { cn } from "@/lib/utils";

interface PriceTagProps {
  amount: number;
  currency?: string;
  className?: string;
}

export const PriceTag = ({
  amount,
  currency = "USD",
  className,
}: PriceTagProps) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  });

  return (
    <span className={cn("font-mono tracking-tight", className)}>
      {formatter.format(amount)}
    </span>
  );
};
