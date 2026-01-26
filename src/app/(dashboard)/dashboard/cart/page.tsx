import { Suspense } from "react";
import { CartDashboardSkeleton } from "@/components/Skeletons/CartDashboardSkeleton";
import { Metadata } from "next";
import CartDashboard from "@/components/dashboard/cart/CartDashboard";
import { requireAuthWithOrg } from "@/db/data-access/users";

export const metadata: Metadata = {
  title: "Cart",
};

async function CartPageContent() {
  const session = await requireAuthWithOrg();

  return <CartDashboard userId={session.userId} orgId={session.orgId} />;
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartDashboardSkeleton />}>
      <CartPageContent />
    </Suspense>
  );
}
