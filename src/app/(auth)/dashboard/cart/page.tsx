import { Suspense } from "react";
import CartDashboard from "@/components/dashboard/cart/CartDashboard";
import { CartDashboardSkeleton } from "@/components/Skeletons/CartDashboardSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <Suspense fallback={<CartDashboardSkeleton />}>
      <CartDashboard />
    </Suspense>
  );
}
