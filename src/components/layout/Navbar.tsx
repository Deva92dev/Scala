import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const NavbarAuth = dynamic(
  () => import("./NavbarAuth").then((mod) => mod.NavbarAuth),
  {
    loading: () => <AuthButtonsSkeleton />,
  },
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* LEFT: Logo & Desktop Links (Loads Instantly) */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">
              TechCorp<span className="text-primary">.</span>
            </span>
          </Link>
          <Suspense
            fallback={
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            }
          >
            <NavbarLinks />
          </Suspense>
        </div>
        <NavbarAuth />
      </div>
    </header>
  );
}

function AuthButtonsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-9 w-20 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  );
}
