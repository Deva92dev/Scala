/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getProductBySlug,
  getRelatedProducts,
  getPublicCurrentUser,
} from "@/db/data-access/public";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ShieldCheck, Truck, Lock, Package } from "lucide-react";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/catalog/ProductCard";

function getProductImage(productName: string) {
  const name = productName.toLowerCase();
  if (name.includes("laptop") || name.includes("macbook"))
    return "/images/products/laptop.png";
  if (name.includes("desktop") || name.includes("computer"))
    return "/images/products/desktop.png";
  if (name.includes("phone") || name.includes("mobile"))
    return "/images/products/phone.png";
  if (name.includes("tablet") || name.includes("ipad"))
    return "/images/products/tablet.png";
  if (name.includes("monitor") || name.includes("display"))
    return "/images/products/monitor.png";
  if (name.includes("headphone") || name.includes("audio"))
    return "/images/products/headphones.png";
  return "/images/products/laptop.png";
}

interface Props {
  slug: string;
}

export async function ProductDetailsContent({ slug }: Props) {
  const product = await getProductBySlug(slug);
  if (!product) return notFound();

  const [user, relatedProducts] = await Promise.all([
    getPublicCurrentUser(),
    getRelatedProducts(product.id.toString(), product.inferredCategory),
  ]);

  const isAuthenticated = !!user;

  return (
    <>
      {/* MAIN CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-24">
        {/* LEFT: HERO IMAGE */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-muted/30 rounded-2xl flex items-center justify-center p-8 border">
            <Image
              src={getProductImage(product.name)}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-contain mix-blend-multiply p-12"
              preload={true}
              loading="eager"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted/30 rounded-lg border flex items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Image
                  src={getProductImage(product.name)}
                  alt="thumbnail"
                  width={50}
                  height={50}
                  className="object-contain opacity-50"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: SPECS & BUY BOX */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Badge
                variant="secondary"
                className="text-muted-foreground hover:bg-secondary"
              >
                {product.inferredCategory}
              </Badge>
              <Badge
                variant={product.totalStock > 0 ? "outline" : "destructive"}
              >
                {product.totalStock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground font-mono mt-2">
              SKU: {product.slug.toUpperCase()}
            </p>
          </div>

          <div className="prose prose-stone dark:prose-invert">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* THE "GATE" BOX */}
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                List Price (MSRP)
              </span>
              <div className="flex items-baseline gap-3">
                <span
                  className={`text-3xl font-bold ${
                    isAuthenticated
                      ? "line-through text-muted-foreground decoration-2 opacity-50 text-2xl"
                      : "text-foreground"
                  }`}
                >
                  <PriceTag amount={product.basePrice} />
                </span>
                {isAuthenticated && (
                  <span className="text-3xl font-bold text-foreground">
                    <PriceTag amount={product.basePrice} />
                  </span>
                )}
              </div>
            </div>

            {isAuthenticated ? (
              <div className="space-y-4 pt-4 border-t border-dashed">
                <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 w-fit px-3 py-1 rounded-full dark:bg-green-900/20">
                  <CheckCircle2 className="w-4 h-4" />
                  Your tier pricing is active
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href="/dashboard/catalog" className="col-span-2">
                    <Button size="lg" className="w-full h-12 text-lg">
                      Add to Order
                    </Button>
                  </Link>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Order via the Dashboard for Net 30 terms.
                </p>
              </div>
            ) : (
              <div className="bg-muted/50 p-5 rounded-lg text-center space-y-3 border border-dashed">
                <div className="flex items-center justify-center gap-2 text-foreground font-medium">
                  <Lock className="w-4 h-4" />
                  <span>Wholesale Account Required</span>
                </div>
                <Link href="/login">
                  <Button variant="default" className="w-full">
                    Login to View Pricing
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  Strictly for verified businesses only.
                </p>
              </div>
            )}
          </div>

          {/* VALUE PROPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
            <div className="flex gap-3 items-start">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <span>3-Year Enterprise Warranty included with all POs.</span>
            </div>
            <div className="flex gap-3 items-start">
              <Truck className="w-5 h-5 text-primary shrink-0" />
              <span>Free pallet shipping on orders over $5,000.</span>
            </div>
            <div className="flex gap-3 items-start">
              <Package className="w-5 h-5 text-primary shrink-0" />
              <span>Original manufacturer packaging guaranteed.</span>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="border-t pt-16">
          <h2 className="text-2xl font-bold mb-8">
            Related Items in {product.inferredCategory}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <ProductCard
                key={related.id}
                product={related as any}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
