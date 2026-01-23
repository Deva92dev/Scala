import { and, count, desc, eq, ilike } from "drizzle-orm";
import { products } from "../schema";
import { db } from "..";

const PAGE_SIZE = 10;

export const getPaginatedProducts = async (page: number, search?: string) => {
  const offset = (page - 1) * PAGE_SIZE;

  const whereClause = and(
    eq(products.isArchived, false),
    // "ilike" is case-insensitive matching
    search ? ilike(products.name, `%${search}%`) : undefined,
  );

  const dataPromise = db.query.products.findMany({
    where: whereClause,
    orderBy: [desc(products.createdAt)],
    limit: PAGE_SIZE,
    offset,
    with: {
      pricingTiers: {
        orderBy: (pricingTiers, { asc }) => [asc(pricingTiers.minQuantity)],
      },
    },
  });

  const countPromise = db
    .select({ count: count() })
    .from(products)
    .where(whereClause);

  const [data, countResult] = await Promise.all([dataPromise, countPromise]);

  const totalCount = countResult[0]?.count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return {
    data,
    meta: {
      currentPage: page,
      totalPages,
      totalCount,
    },
  };
};
