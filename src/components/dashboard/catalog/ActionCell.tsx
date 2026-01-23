"use client";

import { Button } from "@/components/ui/button";
import { bulkAddToCart } from "@/db/actions/CartActions";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const ActionCell = ({ slug }: { slug: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleAdd = () => {
    startTransition(async () => {
      const result = await bulkAddToCart([{ slug, quantity: 1 }]);

      if (result.success) {
        toast.success("Added to cart");
        router.refresh();
      } else {
        toast.error("Failed to Add");
      }
    });
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className="h-8 text-xs"
      onClick={handleAdd}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <>
          <Plus className="mr-1 h-3 w-3" /> Add
        </>
      )}
    </Button>
  );
};

export default ActionCell;
