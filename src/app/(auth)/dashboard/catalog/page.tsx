import BulkOrderPad from "@/components/dashboard/catalog/BulkOrderPad";
import CatalogTableShell from "@/components/dashboard/catalog/CatalogTableShell";
import SearchInput from "@/components/shared/SearchInput";
import { CatalogTableSkeleton } from "@/components/Skeletons/CatalogTableSkeleton";
import { SearchInputSkeleton } from "@/components/Skeletons/SearchInputSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Catalog",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CatalogPage = ({ searchParams }: PageProps) => {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col gap-6">
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Catalog</h1>
          <p className="text-muted-foreground">
            Browse inventory or use the Bulk Pad for large orders.
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Suspense fallback={<SearchInputSkeleton />}>
            <SearchInput placeholder="Search by name or SKU..." />
          </Suspense>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
        {/* LEFT: DATA GRID (Streaming) */}
        <div className="lg:col-span-2">
          <Suspense fallback={<CatalogTableSkeleton />}>
            <CatalogTableShell searchParams={searchParams} />
          </Suspense>
        </div>

        {/* RIGHT: bulk order pad*/}
        <div className="lg:col-span-1 min-h-125">
          <div className="sticky top-6 h-full max-h-[calc(100vh-140px)]">
            <BulkOrderPad />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;

// check bulk order component by pasting 200 skus
