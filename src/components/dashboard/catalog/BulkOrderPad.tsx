"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { bulkAddToCart, undoBulkAddToCart } from "@/db/actions/CartActions";
import { initialState, orderPadReducer } from "@/hooks/reducer/OrderPadReducer";
import { Clipboard } from "lucide-react";
import { useReducer, useTransition } from "react";
import { toast } from "sonner";
import BulkInputView from "./BulkInputView";
import BulkPreviewView from "./BulkPreviewView";
import BulkFeedbackView from "./BulkFeedbackView";
import { useRouter } from "next/navigation";

const BulkOrderPad = () => {
  const [state, dispatch] = useReducer(orderPadReducer, initialState);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handlePreview = () => {
    if (!state.input.trim()) return toast.error("Empty input");
    dispatch({ type: "PREVIEW_ORDER" });
  };

  const handleCommit = () => {
    const validItems = state.parsedItem.filter((i) => i.isValid);
    if (validItems.length === 0) return toast.error("No valid Items");

    startTransition(async () => {
      const result = await bulkAddToCart(validItems);
      if (result.success) {
        dispatch({
          type: "SUBMIT_SUCCESS",
          payload: {
            batchId: result.batchId,
            failedSkus: result.failedSkus || [],
            count: result.addedCount,
          },
        });
        toast.success("Order Processed");
        router.refresh();
      } else {
        toast.error("Server Error");
      }
    });
  };

  const handleUndo = () => {
    if (!state.lastBatchId) return;
    startTransition(async () => {
      await undoBulkAddToCart(state.lastBatchId!);
      toast.info("Import Reverted");
      dispatch({ type: "RESET_FORM" });
    });
  };

  return (
    <Card className="w-full h-full overflow-hidden flex flex-col border-dashed border-2 border-border shadow-none bg-muted/20 text-foreground">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clipboard className="w-4 h-4 text-primary" />
            Quick Order Pad
          </div>
          {state.stage === "preview" && (
            <Badge
              variant="secondary"
              className="font-mono text-xs border-border"
            >
              {state.parsedItem.length} Rows
            </Badge>
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-3 min-h-100">
        {state.stage === "input" && (
          <BulkInputView
            input={state.input}
            onInputChange={(v) => dispatch({ type: "SET_INPUT", payload: v })}
            onPreview={handlePreview}
          />
        )}

        {state.stage === "preview" && (
          <BulkPreviewView
            items={state.parsedItem}
            onEdit={() => dispatch({ type: "EDIT_ORDER" })}
            onCommit={handleCommit}
            isPending={isPending}
          />
        )}

        {state.stage === "result" && (
          <BulkFeedbackView
            addedCount={state.addedCount}
            failedSkus={state.failedSkus}
            onUndo={handleUndo}
            onReset={() => dispatch({ type: "RESET_FORM" })}
            isUndoPending={isPending}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default BulkOrderPad;
