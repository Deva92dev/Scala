/* eslint-disable @typescript-eslint/no-explicit-any */
import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function OrderSummary({ order }: { order: any }) {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <PriceTag amount={order.subtotal} />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <PriceTag amount={order.shippingCost} />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <PriceTag amount={order.tax} />
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <PriceTag amount={order.totalAmount} />
        </div>
      </CardContent>
    </Card>
  );
}
