"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface BulkInputViewProps {
  input: string;
  onInputChange: (val: string) => void;
  onPreview: () => void;
}

const BulkInputView = ({
  input,
  onInputChange,
  onPreview,
}: BulkInputViewProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      onPreview();
    }
  };

  return (
    <>
      <div className="bg-secondary text-secondary-foreground text-xs p-3 rounded-md border border-border mb-2 shrink-0">
        <strong className="font-semibold">Tip: </strong>
        Paste from Excel. Press{" "}
        <kbd className="font-mono bg-background text-foreground px-1.5 py-0.5 rounded border border-border shadow-[0px_1px_0px_0px_var(--color-border)] text-[10px] align-middle">
          Ctrl+Enter
        </kbd>{" "}
        to preview.
      </div>

      <Textarea
        placeholder={`SKU-123  50\nSKU-456  10`}
        className="flex-1 font-mono text-xs resize-none bg-background text-foreground shadow-sm h-full focus-visible:ring-primary"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />

      <Button
        onClick={onPreview}
        disabled={!input.trim()}
        className="w-full shrink-0 mt-3 font-medium"
      >
        Preview Order
      </Button>
    </>
  );
};

export default BulkInputView;
