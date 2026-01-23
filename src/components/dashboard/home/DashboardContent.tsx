import Link from "next/link";
import { getDashboardStats } from "@/db/data-access/dashboard";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import CreditUsageCard from "@/components/dashboard/company/CreditUsageCard";
import StatementPrintButton from "@/components/dashboard/company/StatementPrintButton";

import {
  ArrowRight,
  Building2,
  Clock,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { format } from "date-fns";

export async function DashboardContent() {
  const { name, orgId } = await requireAuthWithOrg();

  if (!orgId) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <div className="h-16 w-16 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center dark:bg-yellow-900/30 dark:text-yellow-500">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-semibold">No Organization Found</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Your account is created, but you are not linked to an organization
          yet.
        </p>
      </div>
    );
  }

  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back,{" "}
            <span className="font-medium text-foreground">{name}</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <StatementPrintButton />
          <Link href="/dashboard/catalog">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Order
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Credit Health  */}
        <CreditUsageCard
          limit={stats.financials.creditLimit}
          used={stats.financials.usedCredit}
          terms={stats.financials.paymentTerms}
        />

        {/* Pending Approvals */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Pending Approval
            </h2>
            <Clock className="w-4 h-4 text-orange-600 dark:text-orange-500" />
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.counts.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Orders awaiting authorization
            </p>
          </div>
        </div>

        {/* In Transit */}
        <div className="rounded-xl border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Active Shipments
            </h2>
            <Package className="w-4 h-4 text-blue-600 dark:text-blue-500" />
          </div>
          <div>
            <div className="text-3xl font-bold">{stats.counts.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Processing or In-Transit
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center bg-muted/20">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
            Recent Orders
          </h2>
          <Link
            href="/dashboard/orders"
            className="text-sm text-primary hover:underline flex items-center"
          >
            View All <ArrowRight className="ml-2 h-3 w-3" />
          </Link>
        </div>

        <div className="relative w-full overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
              <tr>
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">PO Number</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-muted-foreground"
                  >
                    No orders found. Create your first order from the catalog.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-muted/50 transition-colors group"
                  >
                    <td className="px-6 py-4 font-medium font-mono text-foreground">
                      <Link
                        href={`/dashboard/orders/${o.id}`}
                        className="group-hover:underline decoration-primary underline-offset-4"
                      >
                        #{o.id.slice(0, 8)}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {o.poNumber || "—"}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(o.createdAt), "MMM dd, yyyy")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant="secondary"
                        className={`capitalize font-normal border-0 
                        ${o.status === "approved" || o.status === "delivered" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : ""}
                        ${o.status === "pending_approval" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300" : ""}
                        ${o.status === "cancelled" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300" : ""}
                      `}
                      >
                        {o.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">
                      <PriceTag amount={Number(o.totalAmount)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
