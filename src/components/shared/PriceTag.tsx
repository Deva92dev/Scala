"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info, Tag } from "lucide-react";

// Decimal usually returns string in JS
export type PriceTier = {
  minQuantity: number;
  unitPrice: string | number;
};

interface TieredPriceBadgeProps {
  basePrice: string | number;
  tiers?: PriceTier[];
  currency?: string;
}

export const TieredPriceBadge = ({
  basePrice,
  tiers = [],
  currency = "USD",
}: TieredPriceBadgeProps) => {
  const basePriceNum = Number(basePrice);

  // Sort Tiers (Defensive coding, even if DB sorts it)
  const sortedTiers = [...tiers].sort((a, b) => a.minQuantity - b.minQuantity);
  const hasTiers = sortedTiers.length > 0;

  const formatPrice = (p: string | number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(Number(p));

  // If no tiers, return standard text
  if (!hasTiers) {
    return (
      <span className="font-medium text-foreground">
        {formatPrice(basePriceNum)}
      </span>
    );
  }

  // Find lowest price for "As low as" hook
  const bestPrice = Number(
    sortedTiers[sortedTiers.length - 1]?.unitPrice ?? basePriceNum,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 cursor-pointer group text-left outline-none">
          <div className="flex flex-col items-start">
            <span className="font-bold text-sm text-foreground">
              {formatPrice(basePriceNum)}
            </span>
            <span className="text-[10px] font-medium whitespace-nowrap text-green-700 dark:text-green-400">
              Low: {formatPrice(bestPrice)}
            </span>
          </div>
          <Tag className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-0 overflow-hidden" align="start">
        {/* Header */}
        <div className="bg-muted px-3 py-2 border-b border-border flex items-center justify-between">
          <span className="text-xs font-semibold text-foreground">
            Volume Discounts
          </span>
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </div>

        {/* Grid */}
        <div className="p-2 grid gap-1 bg-popover">
          {/* Base Price Row (Conditional) */}
          {sortedTiers[0] && sortedTiers[0].minQuantity > 1 && (
            <div className="flex justify-between text-xs px-2 py-1.5 rounded hover:bg-muted/50">
              <span className="text-muted-foreground">
                1 - {sortedTiers[0].minQuantity - 1} units
              </span>
              <span className="font-medium text-foreground">
                {formatPrice(basePriceNum)}
              </span>
            </div>
          )}

          {/* Tier Rows */}
          {sortedTiers.map((tier, i) => {
            const tierPrice = Number(tier.unitPrice);

            // If tier is somehow higher than base (bad data), cap savings at 0%
            const rawSavings =
              ((basePriceNum - tierPrice) / basePriceNum) * 100;
            const savings = Math.max(0, Math.round(rawSavings));

            // Range Label
            const nextTier = sortedTiers[i + 1];
            const isSingleUnitTier = tier.minQuantity === 1;

            let rangeLabel;
            if (isSingleUnitTier) {
              rangeLabel = nextTier
                ? `1 - ${nextTier.minQuantity - 1}`
                : "Any Qty";
            } else {
              rangeLabel = nextTier
                ? `${tier.minQuantity} - ${nextTier.minQuantity - 1}`
                : `${tier.minQuantity}+`;
            }

            return (
              <div
                key={tier.minQuantity}
                className="flex justify-between items-center text-xs px-2 py-1.5 rounded hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-muted-foreground min-w-14">
                    {isSingleUnitTier ? "Standard" : `${rangeLabel}`}
                  </span>
                  {savings > 0 && (
                    <Badge
                      variant="secondary"
                      className="h-4 px-1 text-[9px] border-0 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/40 dark:text-green-300"
                    >
                      {savings}% OFF
                    </Badge>
                  )}
                </div>
                <span className="font-bold text-foreground">
                  {formatPrice(tierPrice)}
                </span>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
