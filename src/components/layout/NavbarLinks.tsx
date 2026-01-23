"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function NavbarLinks() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Hidden on mobile */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        {routes.map((route) => {
          // Check if link is active (exact match or sub-path)
          const isActive =
            pathname === route.href ||
            (route.href !== "/" && pathname.startsWith(route.href));

          return (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                isActive
                  ? "text-primary font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          );
        })}
      </nav>

      {/* MOBILE NAV (Hamburger) */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0">
          <div className="px-7">
            <Link
              href="/"
              className="font-bold text-xl"
              onClick={() => setIsOpen(false)}
            >
              TechCorp<span className="text-primary">.</span>
            </Link>
          </div>
          <div className="flex flex-col gap-4 mt-8 px-7">
            {routes.map((route) => {
              const isActive =
                pathname === route.href ||
                (route.href !== "/" && pathname.startsWith(route.href));

              return (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block text-lg font-medium transition-colors hover:text-foreground/80",
                    isActive ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {route.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
