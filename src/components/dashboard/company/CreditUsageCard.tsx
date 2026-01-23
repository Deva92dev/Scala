import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  limit: string;
  used: string;
  terms?: string | null;
}

export default function CreditUsageCard({ limit, used, terms }: Props) {
  const limitNum = Number(limit);
  const usedNum = Number(used);

  const percentage = limitNum > 0 ? (usedNum / limitNum) * 100 : 0;
  const available = Math.max(0, limitNum - usedNum);
  const isCritical = percentage > 90;
  const formattedTerms = terms?.replace(/_/g, " ") || "No Terms";

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex justify-between items-center">
          <span>Credit Status</span>
          <span className="uppercase text-[10px] font-bold bg-secondary px-2 py-1 rounded text-secondary-foreground tracking-wide">
            {formattedTerms}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold">
            <PriceTag amount={available} />
          </span>
          <span className="text-sm text-muted-foreground">available</span>
        </div>

        <Progress
          value={percentage}
          aria-label="Credit usage percentage"
          className="h-2 mb-2 bg-secondary/50"
          indicatorClassName={isCritical ? "bg-destructive" : "bg-primary"}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          <div className="flex flex-col">
            <span>Used</span>
            <span className="font-medium text-foreground">
              <PriceTag amount={usedNum} />
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span>Total Limit</span>
            <span className="font-medium text-foreground">
              <PriceTag amount={limitNum} />
            </span>
          </div>
        </div>

        {isCritical ? (
          <div className="mt-4 flex items-start gap-2 text-red-800 text-xs bg-red-100 p-2.5 rounded border border-red-200 animate-in fade-in slide-in-from-top-1 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Limit reached. Payments required to unblock checkout.</span>
          </div>
        ) : (
          <div className="mt-4 flex items-start gap-2 text-green-800 text-xs bg-green-100 p-2.5 rounded border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Account in good standing.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
