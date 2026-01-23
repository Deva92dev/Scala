"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  LogOut,
  ShieldCheck,
  Building,
  Settings,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Catalog", href: "/dashboard/catalog", icon: Package },
  { label: "Draft Order", href: "/dashboard/cart", icon: ShoppingCart },
  { label: "Order History", href: "/dashboard/orders", icon: FileText },
  { label: "Company", href: "/dashboard/company", icon: Building },
  { label: "Billing", href: "/dashboard/billings", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  user: {
    name: string;
    role: string;
  };
  initialCartCount: number;
}

export function DashboardSidebar({ user, initialCartCount }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <aside className="hidden flex-col md:flex w-64 border-r border-border bg-card fixed inset-0 z-50 shadow-sm">
      {/* LOGO */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <div className="flex items-center gap-2 font-bold text-lg tracking-tight text-primary">
          <Link
            href="/"
            className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center text-white text-xs"
          >
            S
          </Link>
          <span>Scala B2B</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.href}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  className={cn("h-4 w-4", isActive && "text-primary")}
                />
                {item.label}
              </div>

              {/* CART BADGE */}
              {item.href === "/dashboard/cart" && initialCartCount > 0 && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 min-w-5 text-[10px] flex justify-center"
                >
                  {initialCartCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {/* USER FOOTER */}
      <div className="border-t border-border p-4 bg-muted/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          {/* Avatar / Role Icon */}
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-2 ring-background">
            <ShieldCheck className="h-4 w-4" />
          </div>

          <div className="flex-1 min-w-0">
            <p
              className="font-medium text-sm leading-none truncate"
              title={user.name}
            >
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {user.role}
            </p>
          </div>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          size="sm"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
