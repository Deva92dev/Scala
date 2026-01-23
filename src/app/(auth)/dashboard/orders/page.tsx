import CsvExportButton from "@/components/dashboard/orders/CsvExportButton";
import { OrdersEmptyState } from "@/components/dashboard/orders/OrdersEmptyState";
import OrdersTable from "@/components/dashboard/orders/OrdersTable";
import { OrdersTableSkeleton } from "@/components/Skeletons/OrdersTableSkeleton";
import { getOrders } from "@/db/data-access/order";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { FileText } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Order History | Scala B2B",
};

const OrdersPage = async () => {
  const { orgId } = await requireAuthWithOrg();

  const orders = await getOrders(orgId);
  const hasOrders = orders.length > 0;

  return (
    <section className="max-w-6xl mx-auto space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Order History
          </h1>
          <p className="text-sm text-muted-foreground">
            View and manage your past procurement orders.
          </p>
        </div>
        <CsvExportButton />
      </div>

      <Suspense fallback={<OrdersTableSkeleton />}>
        {hasOrders ? <OrdersTable data={orders} /> : <OrdersEmptyState />}
      </Suspense>
    </section>
  );
};

export default OrdersPage;
