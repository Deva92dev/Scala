import { Suspense } from "react";
import { CartDashboardSkeleton } from "@/components/Skeletons/CartDashboardSkeleton";
import { Metadata } from "next";
import CartDashboard from "@/components/dashboard/cart/CartDashboard";
import DashboardGate from "@/components/dashboard/DashboardGate";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  return (
    <Suspense fallback={<CartDashboardSkeleton />}>
      <DashboardGate>
        {(ctx) => <CartDashboard userId={ctx.userId} orgId={ctx.orgId} />}
      </DashboardGate>
    </Suspense>
  );
}
