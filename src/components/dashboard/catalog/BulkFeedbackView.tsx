"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

interface BulkFeedbackViewProps {
  addedCount: number;
  failedSkus: string[];
  onUndo: () => void;
  onReset: () => void;
  isUndoPending: boolean;
}

const BulkFeedbackView = ({
  addedCount,
  failedSkus,
  isUndoPending,
  onReset,
  onUndo,
}: BulkFeedbackViewProps) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
        <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center] justify-center">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">Processed Successfully</h3>
        <p className="text-muted-foreground">
          {addedCount} items added to cart.
        </p>
      </div>

      {failedSkus.length > 0 && (
        <Alert variant="destructive" className="shrink-0">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Attention: {failedSkus.length} items skipped</AlertTitle>
          <AlertDescription className="mt-2 text-xs font-mono bg-destructive/10 p-2 rounded max-h-25 overflow-auto">
            {failedSkus.join(", ")}
          </AlertDescription>
        </Alert>
      )}

      <div className="flex-1" />

      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          variant="outline"
          onClick={onUndo}
          disabled={isUndoPending}
          className="border-red-200 hover:bg-red-50 text-red-700"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Undo
        </Button>
        <Button onClick={onReset}>New Order</Button>
      </div>
    </div>
  );
};

export default BulkFeedbackView;
