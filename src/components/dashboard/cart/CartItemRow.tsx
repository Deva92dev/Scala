"use client";

import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Button } from "@/components/ui/button";
import {
  removeCartItem,
  updateCartItemQuantity,
} from "@/db/actions/CartActions";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

interface CartItemRowProps {
  item: {
    id: string;
    quantity: number;
    product: {
      name: string;
      slug: string;
      basePrice: string;
      unitOfMeasure: string;
    };
  };
}

const CartItemRow = ({ item }: CartItemRowProps) => {
  // local state for instant feedback
  const [quantity, setQuantity] = useState(item.quantity);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  // debounce server call so don't spam db
  const debouncedUpdate = useDebouncedCallback((newQty: number) => {
    startTransition(async () => {
      await updateCartItemQuantity(item.id, newQty);
    });
  }, 500);

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 0) return;
    setQuantity(newQty);
    debouncedUpdate(newQty);
  };

  const handleRemove = () => {
    toast.promise(removeCartItem(item.id), {
      loading: "Removing...",
      success: "Item removed",
      error: "Failed to remove",
    });
  };

  const unitPrice = parseFloat(item.product.basePrice);
  const total = unitPrice * quantity;

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card mb-3 shadow-sm">
      {/* product info */}
      <div className="flex-1 min-w-0 mr-4">
        <h2 className="font-medium text-sm truncate text-foreground">
          {item.product.name}
        </h2>
        <div className="text-xs text-muted-foreground font-mono">
          {item.product.slug}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Unit: <PriceTag amount={unitPrice} /> / {item.product.unitOfMeasure}
        </div>
      </div>

      {/* quantity controls */}
      <div className="flex items-center gap-2 mr-6">
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-3 w-3" aria-label="decrease quantity" />
        </Button>
        <div className="w-12 text-center text-sm font-medium tabular-nums text-foreground">
          {quantity}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="w-8 h-8"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-3 w-3" aria-label="increase quantity" />
        </Button>
      </div>

      {/* TOTAL & ACTIONS */}
      <div className="text-right flex flex-col items-end gap-2 w-24">
        <PriceTag
          amount={total}
          className="font-bold text-sm text-foreground"
        />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-700 hover:text-red-800 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" aria-label="remove item" />
        </Button>
      </div>
    </div>
  );
};

export default CartItemRow;
