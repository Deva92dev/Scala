import { db } from "..";
import { members, products } from "../schema";
import { desc, eq, and, ne, or, ilike } from "drizzle-orm";
import { safeGetSession } from "./session";
import { cacheLife } from "next/cache";
import { CATEGORY_KEYWORDS } from "@/lib/catalog-constants";

export const getPublicCatalog = async (
  page: number = 1,
  limit: number = 12,
) => {
  "use cache";
  cacheLife("hours");

  const offset = (page - 1) * limit;

  const data = await db.query.products.findMany({
    where: eq(products.isArchived, false),
    orderBy: [desc(products.createdAt)],
    limit: limit,
    offset: offset,
    with: {
      inventory: true, // Need this to calculate total stock
    },
  });

  // Transform for the UI
  return data.map((p) => {
    const totalStock = p.inventory.reduce((acc, i) => acc + i.stockOnHand, 0);
    return {
      id: p.id,
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
      unitOfMeasure: p.unitOfMeasure,
    };
  });
};

export const getPublicSession = async () => {
  const session = await safeGetSession();
  return session;
};

export const getPublicCurrentUser = async () => {
  try {
    const session = await safeGetSession();

    if (!session) return null;

    const [membership] = await db
      .select({
        orgId: members.organizationId,
        role: members.role,
      })
      .from(members)
      .where(eq(members.userId, session.user.id));

    return {
      userId: session.user.id,
      name: session.user.name,
      orgId: membership?.orgId || null,
    };
  } catch (error) {
    // This catch block is now just for DB errors,
    // since safeGetSession handles the auth errors silently.
    console.error("Public User Check Failed:", error);
    return null;
  }
};

export const getProductBySlug = async (slug: string) => {
  "use cache";
  cacheLife("hours");

  const product = await db.query.products.findFirst({
    where: and(eq(products.slug, slug), eq(products.isArchived, false)),
    with: {
      inventory: true,
    },
  });

  if (!product) return null;

  const totalStock = product.inventory.reduce(
    (acc, i) => acc + i.stockOnHand,
    0,
  );

  // Infer Category for the UI
  let category = "General";
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (
      keywords.some((k) => product.name.toLowerCase().includes(k.toLowerCase()))
    ) {
      category = cat;
      break;
    }
  }

  return {
    ...product,
    basePrice: Number(product.basePrice),
    totalStock,
    stockStatus:
      totalStock === 0
        ? "out_of_stock"
        : totalStock < 10
          ? "low_stock"
          : "in_stock",
    inferredCategory: category,
  };
};

export const getRelatedProducts = async (
  currentProductId: string,
  category: string,
) => {
  "use cache";
  cacheLife("days");

  const keywords = CATEGORY_KEYWORDS[category] || [];
  if (keywords.length === 0) return [];

  const related = await db.query.products.findMany({
    where: and(
      eq(products.isArchived, false),
      // Used Number() because schema ID is number mode, but logic passed string ID
      ne(products.id, Number(currentProductId)),
      or(...keywords.map((k) => ilike(products.name, `%${k}%`))),
    ),
    limit: 4,
    orderBy: [desc(products.createdAt)],
    with: { inventory: true },
  });

  return related.map((p) => {
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
    } as const;
  });
};

export type PublicProductDTO = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  basePrice: number;
  totalStock: number;
  stockStatus: "in_stock" | "low_stock" | "out_of_stock";
};
