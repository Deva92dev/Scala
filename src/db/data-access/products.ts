import { cacheLife } from "next/cache";
import { db } from "..";
import { inventory, products } from "../schema";
import { desc, eq, sql } from "drizzle-orm";

// DTO data transfer object
export type ProductDTO = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number; // msrp
  unitOfMeasure: string;
  minOrderQuantity: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
  totalStock: number;
};

export const getPublicCatalog = async (
  page: number = 1,
  pageSize: number = 12,
) => {
  "use cache";
  cacheLife("minutes");

  const offset = (page - 1) * pageSize;

  // We need to know TOTAL stock across all warehouses to show availability
  const data = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      basePrice: products.basePrice,
      unitOfMeasure: products.unitOfMeasure,
      minOrderQuantity: products.minOrderQuantity,
      totalStock: sql<number>`COALESCE(SUM(${inventory.stockOnHand} - ${inventory.reservedStock}), 0)`,
    })
    .from(products)
    .leftJoin(inventory, eq(products.id, inventory.productId))
    .where(eq(products.isArchived, false))
    .groupBy(products.id)
    .orderBy(desc(products.createdAt))
    .limit(pageSize)
    .offset(offset);

  return data.map((item): ProductDTO => {
    const stock = Number(item.totalStock);
    let status: ProductDTO["stockStatus"] = "in_stock";

    if (stock <= 0) status = "out_of_stock";
    else if (stock < 50) status = "low_stock";

    return {
      ...item,
      basePrice: Number(item.basePrice),
      totalStock: stock,
      stockStatus: status,
    };
  });
};

export const getProductBySlug = async (slug: string) => {
  "use cache";
  cacheLife("minutes");

  const product = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: {
      pricingTiers: {
        orderBy: (tiers, { asc }) => [asc(tiers.minQuantity)],
      },
      inventory: {
        with: {
          warehouse: true,
        },
      },
    },
  });

  if (!product) return null;

  return product;
};
