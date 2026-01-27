import { CatalogContentWrapper } from "@/components/catalog/CatalogContentWrapper";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { CatalogHeaderSkeleton } from "@/components/Skeletons/CatalogHeaderSkeleton";
import { GridSkeleton } from "@/components/Skeletons/GridSkeleton";
import { AVAILABLE_CATEGORIES } from "@/lib/catalog-constants";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wholesale Product Catalog",
  description:
    "Browse our extensive inventory of commercial-grade electronics. Filter by stock availability, bulk pricing tiers, and technical specifications.",
  keywords: [
    "Commercial Monitors",
    "Enterprise Laptops",
    "Server Components",
    "Bulk Keyboards",
    "Office IT Equipment",
  ],
  openGraph: {
    title: "Wholesale Product Catalog | Scala B2B",
    description:
      "Real-time inventory for bulk buyers. View tiered pricing and stock levels for over 10,000 SKUs.",
    url: "/catalog",
  },
};

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
