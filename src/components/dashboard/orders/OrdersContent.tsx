import { OrdersEmptyState } from "./OrdersEmptyState";
import OrdersTable from "./OrdersTable";
import { getOrders } from "@/db/data-access/order";

export async function OrdersContent({ orgId }: { orgId: string }) {
  const orders = await getOrders(orgId);
  const hasOrders = orders.length > 0;

  if (!hasOrders) {
    return <OrdersEmptyState />;
  }

  return <OrdersTable data={orders} />;
}
