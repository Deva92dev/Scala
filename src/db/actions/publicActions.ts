"use server";

import { CATEGORY_KEYWORDS } from "@/lib/catalog-constants";
import { PublicProductDTO } from "../data-access/public";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { products } from "../schema";
import { db } from "..";

export async function getCatalogChunk(
  page: number,
  limit: number = 12,
  search?: string,
  category?: string,
): Promise<PublicProductDTO[]> {
  const offset = (page - 1) * limit;

  let categoryFilter = undefined;

  if (category && category !== "All") {
    const keywords = CATEGORY_KEYWORDS[category];
    if (keywords) {
      // name ILIKE '%Mouse%' OR name ILIKE '%Keyboard%' ...
      categoryFilter = or(
        ...keywords.map((k) => ilike(products.name, `%${k}%`)),
      );
    }
  }

  const whereClause = and(
    eq(products.isArchived, false),
    search ? ilike(products.name, `%${search}%`) : undefined,
    categoryFilter,
  );

  const data = await db.query.products.findMany({
    where: whereClause,
    orderBy: [desc(products.createdAt)],
    limit: limit,
    offset: offset,
    with: {
      inventory: true,
    },
  });

  return data.map((p) => {
    const totalStock = p.inventory.reduce((acc, i) => acc + i.stockOnHand, 0);

    return {
      id: p.id.toString(),
      name: p.name,
      slug: p.slug,
      description: p.description,
      basePrice: Number(p.basePrice),
      totalStock,
      stockStatus:
        totalStock === 0
          ? "out_of_stock"
          : totalStock < 10
            ? "low_stock"
            : "in_stock",
    };
  });
}
