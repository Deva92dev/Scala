import { getBillingData } from "@/db/data-access/billing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export async function BillingContent({ orgId }: { orgId: string }) {
  const { org, recentInvoices } = await getBillingData(orgId);

  const limit = Number(org.creditLimit);
  const used = Number(org.usedCredit);
  const available = limit - used;
  const usagePercentage = Math.min((used / limit) * 100, 100);

  return (
    <>
      {/* CREDIT LIMIT VISUALIZER */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Net 30 Credit Status</CardTitle>
              <CardDescription>
                Payment Terms:{" "}
                <span className="font-semibold text-foreground capitalize">
                  {org.paymentTerms.replace("_", " ")}
                </span>
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Available Credit</p>
              <span className="text-2xl font-bold text-green-600">
                <PriceTag amount={available} />
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  usagePercentage > 90 ? "bg-red-500" : "bg-primary"
                }`}
                style={{ width: `${usagePercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-medium text-muted-foreground">
              <span>
                Used: <PriceTag amount={used} />
              </span>
              <span>
                Limit: <PriceTag amount={limit} />
              </span>
            </div>
          </div>

          {usagePercentage > 90 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
              <AlertCircle className="w-4 h-4" />
              Warning: You are approaching your credit limit. Please settle
              outstanding invoices.
            </div>
          )}
        </CardContent>
      </Card>

      {/* INVOICE HISTORY */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-muted-foreground" /> Recent
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice / Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>PO Number</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="font-mono text-xs">
                    {inv.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    {new Date(inv.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {inv.poNumber || "-"}
                  </TableCell>
                  <TableCell className="font-medium">
                    <PriceTag amount={Number(inv.totalAmount)} />
                  </TableCell>
                  <TableCell>
                    {inv.paymentStatus === "paid" ? (
                      <Badge
                        variant="outline"
                        className="border-green-200 text-green-700 bg-green-50 gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3" /> Paid
                      </Badge>
                    ) : inv.paymentStatus === "unpaid" ? (
                      <Badge
                        variant="outline"
                        className="border-orange-200 text-orange-700 bg-orange-50"
                      >
                        Unpaid
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{inv.paymentStatus}</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {recentInvoices.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No invoices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
