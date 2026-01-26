import Link from "next/link";
import Image from "next/image";
import { Lock, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicProductDTO } from "@/db/data-access/public";

interface ProductCardProps {
  product: PublicProductDTO;
  isAuthenticated: boolean;
  index?: number;
}

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

export function ProductCard({
  product,
  isAuthenticated,
  index,
}: ProductCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <div className="group flex flex-col h-full bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* IMAGE LINK */}
      <Link
        href={`/catalog/${product.slug}`}
        className="relative w-full h-56 bg-muted flex items-center justify-center p-6"
      >
        <Image
          src={getProductImage(product.name)}
          alt={product.name}
          fill
          preload={index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3">
          {product.stockStatus === "out_of_stock" ? (
            <span className="px-2 py-1 rounded text-xs font-medium bg-destructive text-destructive-foreground">
              Backorder
            </span>
          ) : (
            <span className="flex items-center px-2 py-1 rounded text-xs font-medium bg-background/80 border backdrop-blur-sm">
              {product.stockStatus === "low_stock" && (
                <AlertTriangle className="w-3 h-3 mr-1 text-orange-500" />
              )}
              {product.totalStock > 0 ? "In Stock" : "Check Availability"}
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex flex-col grow">
        <div className="mb-4">
          <Link
            href={`/catalog/${product.slug}`}
            className="hover:underline decoration-primary underline-offset-4"
          >
            <h2 className="text-lg font-semibold leading-tight line-clamp-2 min-h-12">
              {product.name}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto space-y-4">
          {/* PRICING BLOCK */}
          <div className="rounded-md border bg-muted/30 p-3">
            <div className="flex justify-between items-end">
              {/* Left: MSRP */}
              <div>
                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  List Price
                </p>
                <p
                  className={`text-sm font-mono ${isAuthenticated ? "line-through text-muted-foreground" : "text-foreground"}`}
                >
                  {formatPrice(product.basePrice)}
                </p>
              </div>

              {/* Right: Member Price or Lock */}
              {isAuthenticated ? (
                <div className="text-right">
                  <p className="text-[10px] font-bold text-green-600 uppercase">
                    Your Price
                  </p>
                  <p className="text-lg font-bold">
                    {formatPrice(product.basePrice)}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-background border px-2 py-1 rounded">
                  <Lock className="w-3 h-3 text-orange-500" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    Locked
                  </span>
                </div>
              )}
            </div>
          </div>

          <Link href={`/catalog/${product.slug}`} className="block w-full">
            <Button variant="secondary" className="w-full gap-2">
              <Eye className="w-4 h-4" /> View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
