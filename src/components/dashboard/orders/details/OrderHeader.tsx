/* eslint-disable @typescript-eslint/no-explicit-any */

import { ChevronLeft, Printer } from "lucide-react";
import Link from "next/link";
import OrderStatusBadge from "../OrderStatusBadge";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const OrderHeader = ({ order }: { order: any }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
      <div>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <Link
            href="/dashboard/orders"
            className="hover:text-primary transition-colors flex items-center gap-1 text-sm"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <span>/</span>
          <span className="text-sm font-mono text-foreground">
            #{order.id.slice(0, 8)}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
          Order #{order.id.slice(0, 8)}
          <OrderStatusBadge status={order.status} />
        </h1>
        <p className="text-sm text-muted-foreground">
          Placed on{" "}
          <span className="font-medium text-foreground">
            {format(order.createdAt, "MMMM d, yyyy 'at' h:mm a")}
          </span>
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* Simple Print Trigger */}
        <Button
          variant="outline"
          onClick={() => window.print()}
          className="print:hidden"
        >
          <Printer className="mr-2 h-4 w-4" />
          Print Invoice
        </Button>
      </div>
    </div>
  );
};

export default OrderHeader;
