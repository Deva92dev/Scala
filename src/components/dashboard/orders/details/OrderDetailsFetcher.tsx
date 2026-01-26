import { getOrderById } from "@/db/data-access/order";
import { notFound } from "next/navigation";
import { OrderDetailsView } from "./OrderDetailsView";

interface OrderFetcherProps {
  params: Promise<{ id: string }>;
  orgId: string;
  role: string;
}

export async function OrderDetailsFetcher({
  params,
  orgId,
  role,
}: OrderFetcherProps) {
  const { id } = await params;
  const order = await getOrderById(id, orgId);

  if (!order) {
    return notFound();
  }

  return <OrderDetailsView order={order} userRole={role} />;
}
