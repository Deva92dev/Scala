"use client";

import { useEffect, useReducer } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "./ProductCard";
import { getCatalogChunk, PublicProductDTO } from "@/db/actions/public-catalog";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { gridReducer } from "@/hooks/reducer/CatalogReducer";

interface ProductGridProps {
  initialProducts: PublicProductDTO[];
  isAuthenticated: boolean;
}

export function ProductGrid({
  initialProducts,
  isAuthenticated,
}: ProductGridProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
  const categoryQuery = searchParams.get("category") || "";

  // Initial State
  const [state, dispatch] = useReducer(gridReducer, {
    products: initialProducts,
    page: 2,
    hasMore: initialProducts.length > 0,
    isLoading: false,
  });

  const { ref, inView } = useInView();

  // When the parent passes new initial data (due to URL change), we strictly reset.
  useEffect(() => {
    dispatch({ type: "RESET", payload: initialProducts });
  }, [initialProducts]);

  // Handle "Internal" changes (Scrolling)
  useEffect(() => {
    if (inView && state.hasMore && !state.isLoading) {
      loadMore();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, state.hasMore, state.isLoading]);

  const loadMore = async () => {
    dispatch({ type: "START_LOADING" });
    try {
      const nextChunk = await getCatalogChunk(
        state.page,
        12,
        searchQuery,
        categoryQuery,
      );
      dispatch({ type: "APPEND_DATA", payload: nextChunk });
    } catch (error) {
      console.error("Failed to load products", error);
      dispatch({ type: "STOP_LOADING" });
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.products.map((product) => (
          <ProductCard
            key={`${product.id}-${product.slug}-${product.description}`}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>

      {state.hasMore && (
        <div
          ref={ref}
          className="flex justify-center items-center py-12 w-full"
        >
          {state.isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-sm">Loading inventory...</span>
            </div>
          ) : (
            <div className="h-8" />
          )}
        </div>
      )}

      {!state.hasMore && state.products.length > 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          You have reached the end of the catalog.
        </div>
      )}
    </div>
  );
}
