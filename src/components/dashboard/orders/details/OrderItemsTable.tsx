import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Badge } from "@/components/ui/badge";
import { OrderDetailsDTO } from "@/utils/types";
import Link from "next/link";

interface Props {
  items: OrderDetailsDTO["items"];
}

export function OrderItemsTable({ items }: Props) {
  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted/50 text-muted-foreground border-b">
          <tr>
            <th className="py-3 px-4">Product</th>
            <th className="py-3 px-4">SKU</th>
            <th className="py-3 px-4 text-center">Qty</th>
            <th className="py-3 px-4 text-right">Price</th>
            <th className="py-3 px-4 text-right">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((item) => {
            // Fallback: Live Data ?? Snapshot Data
            const displayName = item.product?.name ?? item.productNameSnapshot;
            const displaySku = item.product?.slug ?? item.skuSnapshot;

            // Check if product is deleted to disable links
            const isDeleted = !item.product;

            return (
              <tr key={item.id} className="hover:bg-muted/50">
                <td className="py-3 px-4">
                  <div className="flex flex-col">
                    {isDeleted ? (
                      <span
                        className="font-medium text-muted-foreground"
                        title="Product discontinued"
                      >
                        {displayName}
                      </span>
                    ) : (
                      <Link
                        href={`/dashboard/catalog?search=${displaySku}`}
                        className="font-medium hover:underline text-primary"
                      >
                        {displayName}
                      </Link>
                    )}

                    {isDeleted && (
                      <Badge
                        variant="outline"
                        className="w-fit text-[10px] mt-1 px-1 py-0 h-4 border-destructive/30 text-destructive/80"
                      >
                        Discontinued
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-xs text-muted-foreground">
                  {displaySku}
                </td>
                <td className="py-3 px-4 text-center">{item.quantity}</td>
                <td className="py-3 px-4 text-right">
                  {/* Historical Price (What they paid) */}
                  <PriceTag amount={Number(item.unitPriceAtPurchase)} />
                </td>
                <td className="py-3 px-4 text-right font-bold">
                  <PriceTag amount={Number(item.totalPrice)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
