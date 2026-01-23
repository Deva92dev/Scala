import { Suspense } from "react";
import { OrderDetailsFetcher } from "@/components/dashboard/orders/details/OrderDetailsFetcher";
import { OrderDetailsSkeleton } from "@/components/Skeletons/OrderDetailsSkeleton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: PageProps) {
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <OrderDetailsFetcher params={params} />
    </Suspense>
  );
}
