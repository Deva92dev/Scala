"use client";

import { useSession } from "@/lib/auth-client";
import { NavbarActions } from "./NavbarActions";
import { Skeleton } from "@/components/ui/skeleton";

export function NavbarAuth() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <AuthButtonsSkeleton />;
  }

  const normalizedUser = data?.user
    ? {
        name: data.user.name || "User",
        email: data.user.email || "",
        image: data.user.image || null,
      }
    : null;

  return <NavbarActions user={normalizedUser} />;
}

// Keep the skeleton local or import it
function AuthButtonsSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-9 w-20 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  );
}
