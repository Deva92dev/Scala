import { requireAuthWithOrg } from "@/db/data-access/users";

export interface DashboardCtx {
  userId: string;
  orgId: string;
  name: string;
  role: string;
}

export default async function DashboardGate({
  children,
}: {
  children: (ctx: DashboardCtx) => React.ReactNode;
}) {
  const session = await requireAuthWithOrg();

  const ctx: DashboardCtx = {
    userId: session.userId,
    orgId: session.orgId,
    name: session.name,
    role: session.role,
  };

  return <>{children(ctx)}</>;
}
