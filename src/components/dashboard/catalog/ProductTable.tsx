"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import ActionCell from "./ActionCell";
import { PriceTier, TieredPriceBadge } from "@/components/shared/PriceTag";

export type ProductRow = {
  id: number;
  name: string;
  slug: string;
  basePrice: string;
  unitOfMeasure: string;
  pricingTiers: PriceTier[];
};

const columns: ColumnDef<ProductRow>[] = [
  {
    accessorKey: "name",
    header: "Product",
    cell: ({ row }) => (
      <div>
        <div className="font-medium text-sm text-foreground">
          {row.getValue("name")}
        </div>
        <div className="text-xs text-muted-foreground font-mono mt-0.5">
          SKU: {row.original.slug}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "basePrice",
    header: "Price",
    cell: ({ row }) => (
      <TieredPriceBadge
        basePrice={row.getValue("basePrice")}
        tiers={row.original.pricingTiers}
      />
    ),
  },
  {
    accessorKey: "unitOfMeasure",
    header: "Unit",
    cell: ({ row }) => (
      <Badge variant="secondary" className="text-[10px] font-mono">
        {row.getValue("unitOfMeasure")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell slug={row.original.slug} />,
  },
];

interface ProductTableProps {
  data: ProductRow[];
}

export function ProductTable({ data }: ProductTableProps) {
  return <DataTable columns={columns} data={data} />;
}
