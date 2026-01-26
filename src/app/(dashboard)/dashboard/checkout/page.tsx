import { CheckoutContent } from "@/components/dashboard/checkout/CheckoutContent";
import { CheckoutSkeleton } from "@/components/Skeletons/CheckoutSkeleton";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Suspense } from "react";

async function CheckoutPageContent() {
  const session = await requireAuthWithOrg();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <CheckoutContent userId={session.userId} orgId={session.orgId} />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutPageContent />
    </Suspense>
  );
}
