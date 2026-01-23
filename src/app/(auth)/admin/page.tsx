import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { getOrgs } from "@/db/data-access/admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Super Admin",
};

export default async function AdminDashboard() {
  const orgs = await getOrgs();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Organization Master List
      </h1>

      <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="py-3 px-4 font-semibold text-foreground">Terms</th>
              <th className="py-3 px-4 font-semibold text-right text-foreground">
                Credit Limit
              </th>
              <th className="py-3 px-4 font-semibold text-right text-foreground">
                Used Credit
              </th>
              <th className="py-3 px-4 font-semibold text-center text-foreground">
                Status
              </th>
              <th className="py-3 px-4 font-semibold text-right text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orgs.map((org) => (
              <tr key={org.id} className="hover:bg-muted/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-medium text-foreground">{org.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {org.slug}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <Badge variant="outline" className="uppercase text-[10px]">
                    {org.paymentTerms.replace("_", " ")}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right font-mono text-foreground">
                  <PriceTag amount={Number(org.creditLimit)} />
                </td>
                <td className="py-3 px-4 text-right font-mono text-orange-700 dark:text-orange-400">
                  <PriceTag amount={Number(org.usedCredit)} />
                </td>
                <td className="py-3 px-4 text-center">
                  {Number(org.usedCredit) > Number(org.creditLimit) ? (
                    <Badge variant="destructive">Over Limit</Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                    >
                      Good
                    </Badge>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link href={`/admin/org/${org.id}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="cursor-pointer h-8 w-8 p-0"
                    >
                      <Settings2
                        className="w-4 h-4 text-muted-foreground"
                        aria-label={`Settings for ${org.name}`}
                      />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
