import { getOrderById } from "@/db/data-access/order";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { notFound } from "next/navigation";
import { OrderDetailsView } from "./OrderDetailsView";

interface OrderFetcherProps {
  params: Promise<{ id: string }>;
}

export async function OrderDetailsFetcher({ params }: OrderFetcherProps) {
  const { id } = await params;
  const { orgId, role } = await requireAuthWithOrg();
  const order = await getOrderById(id, orgId);

  if (!order) {
    return notFound();
  }

  return <OrderDetailsView order={order} userRole={role} />;
}
