import { getProductsForSitemap } from "@/db/data-access/sitemap";
import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: {
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "daily", priority: 1.0 },
    { path: "/login", changeFrequency: "yearly", priority: 0.8 },
    { path: "/catalog", changeFrequency: "daily", priority: 0.9 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    }),
  );

  const allProducts = await getProductsForSitemap();

  const productEntries: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${BASE_URL}/catalog/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
