import { CatalogContentWrapper } from "@/components/catalog/CatalogContentWrapper";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogHeaderSkeleton } from "@/components/Skeletons/CatalogHeaderSkeleton";
import { GridSkeleton } from "@/components/Skeletons/GridSkeleton";
import { AVAILABLE_CATEGORIES } from "@/lib/catalog-constants";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  return (
    <section className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={<CatalogHeaderSkeleton />}>
        <CatalogHeader />
      </Suspense>

      <div className="container mx-auto px-4 py-8 grow">
        <Suspense>
          <CatalogFilters availableCategories={AVAILABLE_CATEGORIES} />
        </Suspense>

        <Suspense fallback={<GridSkeleton />}>
          <CatalogContentWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
