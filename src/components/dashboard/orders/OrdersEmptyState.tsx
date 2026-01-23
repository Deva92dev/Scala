import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import Link from "next/link";

export function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed rounded-xl bg-muted/20">
      <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-xl font-semibold">No orders found</h2>
      <p className="text-muted-foreground mb-6 max-w-sm text-center">
        You have not placed any orders yet. Once you complete a purchase, it
        will show up here.
      </p>
      <Link href="/dashboard/catalog">
        <Button>Browse Catalog</Button>
      </Link>
    </div>
  );
}
