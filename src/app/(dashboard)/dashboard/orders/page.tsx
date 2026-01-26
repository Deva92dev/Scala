import { Suspense } from "react";
import { FileText } from "lucide-react";
import CsvExportButton from "@/components/dashboard/orders/CsvExportButton";
import { OrdersContent } from "@/components/dashboard/orders/OrdersContent";
import { OrdersTableSkeleton } from "@/components/Skeletons/OrdersTableSkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";

export const metadata = {
  title: "Order History | Scala B2B",
};

async function OrdersPageContent() {
  const session = await requireAuthWithOrg();

  return (
    <section className="max-w-6xl mx-auto space-y-6">
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
      <OrdersContent orgId={session.orgId} />
    </section>
  );
}

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersTableSkeleton />}>
      <OrdersPageContent />
    </Suspense>
  );
}
