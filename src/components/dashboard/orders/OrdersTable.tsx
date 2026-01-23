"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderListResult } from "@/db/data-access/order";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import OrderStatusBadge from "./OrderStatusBadge";
import { PriceTag } from "@/components/shared/PriceTagBasic";

interface Props {
  data: OrderListResult[];
}

const OrdersTable = ({ data }: Props) => {
  const router = useRouter();

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((order) => (
            <TableRow
              key={order.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => router.push(`/dashboard/orders/${order.id}`)}
            >
              <TableCell className="font-medium font-mono">
                #{order.id.slice(0, 8)}
              </TableCell>
              <TableCell>
                {format(new Date(order.createdAt), "MMM d, yyyy")}
                <div className="text-xs text-muted-foreground">
                  {format(new Date(order.createdAt), "h:mm a")}
                </div>
              </TableCell>
              <TableCell>
                <OrderStatusBadge status={order.status} />
              </TableCell>
              <TableCell>
                {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
              </TableCell>
              <TableCell className="text-right font-bold">
                <PriceTag amount={Number(order.totalAmount)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
