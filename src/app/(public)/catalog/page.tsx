import { Suspense } from "react";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import {
  AVAILABLE_CATEGORIES,
  getPublicCurrentUser,
} from "@/db/data-access/public";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CatalogContent } from "@/components/catalog/CatalogContent";
import { GridSkeleton } from "@/components/Skeletons/GridSkeleton";

export const metadata = {
  title: "Wholesale Catalog | TechCorp",
  description: "Browse our live inventory of enterprise-grade electronics.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const user = await getPublicCurrentUser();
  const isAuthenticated = !!user;

  return (
    <section className="min-h-screen bg-background flex flex-col">
      <div className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Wholesale Catalog
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Live inventory.{" "}
              {isAuthenticated ? "Welcome back." : "Login to unlock pricing."}
            </p>
          </div>

          <div className="flex gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard/catalog">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline">Member Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 grow">
        <CatalogFilters availableCategories={AVAILABLE_CATEGORIES} />

        <Suspense fallback={<GridSkeleton />}>
          <CatalogContent
            searchParams={searchParams}
            isAuthenticated={isAuthenticated}
          />
        </Suspense>
      </div>
    </section>
  );
}
