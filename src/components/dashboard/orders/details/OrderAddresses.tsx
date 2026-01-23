/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export function OrderAddresses({ address }: { address: any }) {
  if (!address) return null;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1">
        <p className="font-medium">{address.street}</p>
        <p>
          {address.city}, {address.zip}
        </p>
        <p className="uppercase text-muted-foreground text-xs font-bold mt-2">
          {address.country}
        </p>
      </CardContent>
    </Card>
  );
}
