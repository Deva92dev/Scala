import { Pagination } from "@/components/shared/Pagination";
import { getPaginatedProducts } from "@/db/data-access/catalog";
import { ProductTable } from "./ProductTable";

interface CatalogTableShellProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const CatalogTableShell = async ({ searchParams }: CatalogTableShellProps) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const search = typeof params?.search === "string" ? params.search : undefined;

  const { data, meta } = await getPaginatedProducts(page, search);

  return (
    <div className="flex flex-col h-full bg-card rounded-xl border shadow-sm overflow-hidden">
      <div className="flex-1 overflow-auto p-4">
        <ProductTable data={data} />
      </div>

      <div className="border-t bg-muted/20">
        <Pagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          totalCount={meta.totalCount}
        />
      </div>
    </div>
  );
};

export default CatalogTableShell;
