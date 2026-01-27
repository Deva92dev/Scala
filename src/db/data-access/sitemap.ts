import { cacheLife } from "next/cache";
import { db } from "..";
import { products } from "../schema";
import { desc, isNotNull } from "drizzle-orm";

export async function getProductsForSitemap() {
  "use cache";
  cacheLife("days");

  const allProducts = await db
    .select({
      slug: products.slug,
      updatedAt: products.createdAt,
    })
    .from(products)
    .where(isNotNull(products.slug))
    .orderBy(desc(products.createdAt));

  return allProducts;
}
