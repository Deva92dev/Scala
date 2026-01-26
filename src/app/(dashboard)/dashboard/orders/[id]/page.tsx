import { Suspense } from "react";
import { OrderDetailsFetcher } from "@/components/dashboard/orders/details/OrderDetailsFetcher";
import { OrderDetailsSkeleton } from "@/components/Skeletons/OrderDetailsSkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function OrderDetailsContent({ params }: PageProps) {
  const session = await requireAuthWithOrg();

  return (
    <OrderDetailsFetcher
      params={params}
      orgId={session.orgId}
      role={session.role}
    />
  );
}

export default function OrderDetailsPage(props: PageProps) {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <OrderDetailsContent params={props.params} />
    </Suspense>
  );
}
