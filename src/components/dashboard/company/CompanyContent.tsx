import { Separator } from "@/components/ui/separator";
import CreditUsageCard from "./CreditUsageCard";
import { TeamList } from "./TeamList";
import StatementPrintButton from "./StatementPrintButton";
import { getCompanyOverview } from "@/db/data-access/company";

interface Props {
  userId: string;
  orgId: string;
}

export async function CompanyContent({ orgId, userId }: Props) {
  const org = await getCompanyOverview(orgId);

  // Transform DB data for the UI
  const teamMembers = org.members.map((m) => ({
    userId: m.user!.id, // Non-null assertion safe due to inner join logic
    name: m.user!.name || "Unknown",
    email: m.user!.email,
    role: m.role as "admin" | "buyer", // Cast safe due to Enum
    isCurrentUser: m.user!.id === userId,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{org.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            Organization ID:{" "}
            <span className="font-mono text-xs bg-muted px-1 rounded">
              {org.id.slice(0, 8)}
            </span>
          </p>
        </div>
        <StatementPrintButton />
      </div>

      <Separator />

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Credit Logic */}
        <div className="lg:col-span-1">
          <CreditUsageCard
            limit={org.creditLimit}
            used={org.usedCredit}
            terms={org.currency} // Actually passed org.currency in previous code? Let's pass static Terms or fetch terms
            // Note: Schema didn't show 'paymentTerms' column in org table,
            // but checkout logic assumed 'Net 30'. Passing currency for now.
          />
        </div>

        {/* Org Details Card  */}
        <div className="lg:col-span-2 border rounded-xl p-6 bg-card flex flex-col justify-center">
          <h2 className="font-semibold mb-2">Billing Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">
                Tax Identifier
              </span>
              <span>{org.taxIdentifier || "Not set"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Currency</span>
              <span className="uppercase">{org.currency}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Member Since</span>
              <span>{new Date(org.createdAt).getFullYear()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Team Members</h2>
            <p className="text-sm text-muted-foreground">
              Manage access and permissions.
            </p>
          </div>
          {/* Invite Button could go here later */}
        </div>
        <TeamList members={teamMembers} />
      </div>
    </div>
  );
}
