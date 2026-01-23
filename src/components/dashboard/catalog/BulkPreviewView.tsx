/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { ParsedItem } from "@/lib/parsers";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { List } from "react-window";

interface BulkPreviewViewProps {
  items: ParsedItem[];
  onEdit: () => void;
  onCommit: () => void;
  isPending: boolean;
}

// virtual row
type RowProps = {
  index: number;
  style: React.CSSProperties;
  data: ParsedItem[];
};

const Row = ({ index, style, data }: RowProps) => {
  const item = data[index];
  if (!item) return null;

  return (
    <div
      style={style}
      className={`flex items-center text-xs border-b px-2 ${
        item.isValid ? "bg-background" : "bg-red-50"
      }`}
    >
      <div className="flex-1 font-mono truncate pr-2">{item.slug}</div>
      <div className="w-16 text-right font-mono pr-2">{item.quantity}</div>
      <div className="w-8 flex justify-center">
        {item.isValid ? <CheckCircle2 /> : <AlertTriangle />}
      </div>
    </div>
  );
};

const BulkPreviewView = ({
  isPending,
  items,
  onCommit,
  onEdit,
}: BulkPreviewViewProps) => {
  const [listHeight, setListHeight] = useState(300);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) setListHeight(containerRef.current.offsetHeight);
  }, []);

  const validCount = items.filter((i) => i.isValid).length;

  return (
    <>
      {/* header */}
      <div className="bg-muted px-2 py-2 flex items-center text-xs font-medium border rounded-t-md shrink-0">
        <div className="flex-1">SKU</div>
        <div className="w-16 text-right pr-4">Qty</div>
        <div className="w-8"></div>
      </div>

      {/* list */}
      <div
        className="flex-1 border-x border-b bg-background rounded-b-md min-h-50"
        ref={containerRef}
      >
        <List
          rowComponent={Row}
          rowCount={items.length}
          rowHeight={40}
          rowProps={{ data: items } as any}
          style={{ height: listHeight }}
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 shrink-0 pt-2">
        <Button variant="outline" onClick={onEdit}>
          <RotateCcw className="w-4 h-4 mr-2" /> Edit
        </Button>
        <Button onClick={onCommit} disabled={isPending || validCount === 0}>
          {isPending ? "Syncing..." : `Add ${validCount} Items`}
          {!isPending && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </>
  );
};

export default BulkPreviewView;
