import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getCatalogChunk } from "@/db/actions/publicActions";

interface CatalogContentProps {
  searchParams: Promise<{ q?: string; category?: string }>;
  isAuthenticated: boolean;
}

export async function CatalogContent({
  searchParams,
  isAuthenticated,
}: CatalogContentProps) {
  const params = await searchParams;
  const search = params.q || "";
  const category = params.category || "";

  const initialProducts = await getCatalogChunk(1, 12, search, category);

  return (
    <>
      <ProductGrid
        initialProducts={initialProducts}
        isAuthenticated={isAuthenticated}
      />

      {initialProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            No products match your filters.
          </p>
        </div>
      )}
    </>
  );
}
