"use client";
import { OrderItemsTable } from "@/components/dashboard/orders/details/OrderItemsTable";
import { OrderSummary } from "@/components/dashboard/orders/details/OrderSummary";
import { OrderAddresses } from "@/components/dashboard/orders/details/OrderAddresses";
import OrderHeader from "./OrderHeader";
import OrderApprovalPanel from "./OrderApprovalPanel";
import { OrderDetailsDTO } from "@/utils/types";

interface OrderDetailsViewProps {
  order: OrderDetailsDTO;
  userRole: string;
}

export function OrderDetailsView({ order, userRole }: OrderDetailsViewProps) {
  return (
    <div className="max-w-5xl mx-auto pb-20 fade-in animate-in duration-500">
      <OrderApprovalPanel
        orderId={order.id}
        orderStatus={order.status}
        userRole={userRole}
      />

      <OrderHeader order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
          <OrderItemsTable items={order.items} />

          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <OrderAddresses address={order.shippingAddressSnapshot} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <OrderSummary order={order} />

          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-800">
            <strong>Note:</strong> <br />
            This is a snapshot of the order at the time of purchase. Live
            product prices may have changed.
          </div>
        </div>
      </div>
    </div>
  );
}
