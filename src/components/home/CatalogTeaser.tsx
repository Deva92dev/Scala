import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, CheckCircle2, Unlock } from "lucide-react";
import { getPublicCurrentUser } from "@/db/data-access/public";
import { PriceTag } from "@/components/shared/PriceTagBasic";
import { connection } from "next/server";
import { getCatalogChunk } from "@/db/actions/publicActions";

const AVAILABLE_ASSETS = [
  "/images/products/laptop.png",
  "/images/products/desktop.png",
  "/images/products/monitor.png",
  "/images/products/headphones.png",
  "/images/products/smartphone.png",
  "/images/products/tablet.png",
];

function getProductImage(productName: string, index: number) {
  const name = productName.toLowerCase();

  // 1. Try to match the name specifically
  if (name.includes("laptop") || name.includes("macbook"))
    return AVAILABLE_ASSETS[0];
  if (name.includes("desktop")) return AVAILABLE_ASSETS[1];
  if (
    name.includes("monitor") ||
    name.includes("display") ||
    name.includes("screen")
  )
    return AVAILABLE_ASSETS[2];
  if (
    name.includes("headphone") ||
    name.includes("audio") ||
    name.includes("earbud")
  )
    return AVAILABLE_ASSETS[3];
  if (
    name.includes("phone") ||
    name.includes("smartphone") ||
    name.includes("iphone")
  )
    return AVAILABLE_ASSETS[4];
  if (name.includes("tablet") || name.includes("ipad"))
    return AVAILABLE_ASSETS[5];

  return AVAILABLE_ASSETS[index % AVAILABLE_ASSETS.length];
}

export async function CatalogTeaser() {
  await connection();

  const [laptops, smartphones, monitors, headphones, user] = await Promise.all([
    getCatalogChunk(1, 1, "laptop"),
    getCatalogChunk(1, 1, "smartphone"),
    getCatalogChunk(1, 1, "monitor"),
    getCatalogChunk(1, 1, "headphone"),
    getPublicCurrentUser(),
  ]);

  const isAuthenticated = !!user;
  const products = [...laptops, ...smartphones, ...monitors, ...headphones];

  // FALLBACK: Fill the gaps with whatever is in the DB
  if (products.length < 4) {
    const fillAmount = 4 - products.length;
    const fillers = await getCatalogChunk(1, fillAmount, "", "Electronics");

    const existingIds = new Set(products.map((p) => p.id));

    for (const p of fillers) {
      if (!existingIds.has(p.id) && products.length < 4) {
        products.push(p);
      }
    }
  }

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
              Unlock <span className="text-primary">Tier-1 Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Wholesale pricing is strictly protected. Log in to view our
              negotiated rates and real-time inventory.
            </p>
          </div>
          <Link href="/catalog" aria-label="View Full Catalog">
            <Button variant="ghost" className="group text-foreground">
              View Full Catalog
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 bg-secondary/50 p-6 flex items-center justify-center">
                <Image
                  src={getProductImage(product.name, index) || ""}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />

                <div
                  className={`absolute top-3 right-3 backdrop-blur-sm border px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    isAuthenticated
                      ? "bg-primary/10 text-primary border-primary/20"
                      : "bg-secondary text-secondary-foreground border-border"
                  }`}
                >
                  {isAuthenticated ? (
                    <span className="flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    "MSRP Only"
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-12 mb-4 text-card-foreground">
                  {product.name}
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Retail Price</span>
                    <span className="font-mono decoration-destructive decoration-2 line-through text-muted-foreground">
                      <PriceTag amount={product.basePrice * 1.2} />
                    </span>
                  </div>

                  <div
                    className={`relative p-3 rounded-lg border border-dashed transition-colors duration-300 ${
                      isAuthenticated
                        ? "bg-primary/5 border-primary/20"
                        : "bg-muted border-border"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs font-bold uppercase ${isAuthenticated ? "text-primary" : "text-muted-foreground"}`}
                      >
                        Gold Tier
                      </span>

                      {isAuthenticated ? (
                        <span className="font-bold text-lg text-foreground">
                          <PriceTag amount={product.basePrice} />
                        </span>
                      ) : (
                        <div className="h-6 w-20 bg-muted-foreground/30 rounded blur-sm select-none" />
                      )}
                    </div>

                    {!isAuthenticated && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px]">
                        <Link
                          href="/login"
                          className="bg-card shadow-sm border border-border px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:scale-105 transition-transform cursor-pointer"
                        >
                          <Lock className="w-3 h-3 text-primary" />
                          <span className="text-[10px] font-bold text-foreground">
                            Login to Unlock
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                  <span>Min Order: 5 Units</span>
                  {isAuthenticated ? (
                    <span className="text-primary font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready to ship
                    </span>
                  ) : (
                    <span>In Stock</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
