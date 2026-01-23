import { Suspense } from "react";
import { getProductBySlug } from "@/db/data-access/public";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductSkeleton } from "@/components/Skeletons/ProductSkeleton";
import { ProductDetailsContent } from "@/components/catalog/ProductDetailsContent";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product ? `${product.name} | TechCorp` : "Product Not Found",
    description: product?.description || "Wholesale Electronics",
  };
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

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
          <ProductDetailsContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
}
