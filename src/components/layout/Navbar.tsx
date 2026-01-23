import Link from "next/link";
import { getPublicCurrentUser } from "@/db/data-access/public";
import { NavbarLinks } from "./NavbarLinks";
import { NavbarActions } from "./NavbarActions";

export async function Navbar() {
  const user = await getPublicCurrentUser();

  const normalizedUser = user
    ? {
        name: user.name || "User",
        email: "user@example.com",
        image: null,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        {/* LEFT: Logo & Desktop Links */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">
              TechCorp<span className="text-primary">.</span>
            </span>
          </Link>
          <NavbarLinks />
        </div>

        {/* RIGHT: User Actions (Client Component handles the Switch) */}
        <NavbarActions user={normalizedUser} />
      </div>
    </header>
  );
}
