import { CatalogContent } from "./CatalogContent";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface WrapperProps {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export async function CatalogContentWrapper({ searchParams }: WrapperProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenticated = !!session?.user;

  return (
    <CatalogContent
      searchParams={searchParams}
      isAuthenticated={isAuthenticated}
    />
  );
}
