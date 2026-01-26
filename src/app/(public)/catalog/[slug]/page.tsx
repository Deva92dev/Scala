import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductSkeleton } from "@/components/Skeletons/ProductSkeleton";
import { ProductDetailsContent } from "@/components/catalog/ProductDetailsContent";
import { db } from "@/db";
import { desc } from "drizzle-orm";
import { products } from "@/db/schema";

export async function generateStaticParams() {
  const topProducts = await db.query.products.findMany({
    limit: 12,
    columns: {
      slug: true,
    },
    orderBy: [desc(products.createdAt)],
  });

  return topProducts.map((product) => ({
    slug: product.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage(props: PageProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="border-b sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/catalog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetailsContent paramsPromise={props.params} />
        </Suspense>
      </div>
    </div>
  );
}
