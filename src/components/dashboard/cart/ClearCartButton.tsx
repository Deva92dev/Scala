"use client";

import { Button } from "@/components/ui/button";
import { clearCart } from "@/db/actions/CartActions";
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const ClearCartButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClear = () => {
    if (!window.confirm("Are you sure you want to remove all items")) return;

    startTransition(async () => {
      const result = await clearCart();
      if (result.success) {
        toast.success("Cart Cleared");
      } else {
        toast.error(result.message || "Failed to clear cart");
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClear}
      disabled={isPending}
      className="h-8 px-2 text-xs text-red-700 hover:text-red-900 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
      ) : (
        <Trash2 className="h-4 w-4 mr-2" />
      )}
      Clear All
    </Button>
  );
};

export default ClearCartButton;
