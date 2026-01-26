import { BillingContent } from "./BillingContent";

export async function BillingGate({ orgId }: { orgId: string }) {
  return <BillingContent orgId={orgId} />;
}
