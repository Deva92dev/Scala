import { FinancialSnapshot } from "@/db/data-access/dashboard";
import { AlertTriangle, CheckCircle } from "lucide-react";

const CreditWidget = ({ data }: { data: FinancialSnapshot }) => {
  const usagePercent = (data.usedCredit / data.creditLimit) * 100;
  const barColor = usagePercent > 90 ? "bg-destructive" : "bg-primary";
  const format = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency,
    }).format(n);

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Credit Facility
        </h3>
        {data.isOverLimit ? (
          <div className="flex items-center gap-1 text-destructive text-xs font-bold bg-destructive/10 px-2 py-1 rounded">
            <AlertTriangle className="w-3 h-3" /> OVER LIMIT
          </div>
        ) : (
          <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-100">
            <CheckCircle className="w-3 h-3" /> ACTIVE
          </div>
        )}
      </div>

      <div className="mb-6">
        <div className="text-3xl font-bold tracking-tight text-foreground">
          {format(data.remainingCredit)}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Available to spend out of {format(data.creditLimit)}
        </p>
      </div>

      {/* Custom Progress Bar to handle color change */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium">
          <span>Used: {Math.round(usagePercent)}%</span>
          <span>{format(data.usedCredit)}</span>
        </div>
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-500 ease-in-out`}
            style={{ width: `${Math.min(usagePercent, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreditWidget;
