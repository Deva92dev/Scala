"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  FileText,
  Building,
  CreditCard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
  userSlot: React.ReactNode;
  cartCount: number;
}

export function DashboardSidebar({ userSlot, cartCount }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden flex-col md:flex w-64 border-r border-border bg-card fixed inset-y-0 left-0 z-50 shadow-sm h-screen">
      <div className="flex h-16 items-center border-b border-border px-6 shrink-0">
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
              {item.href === "/dashboard/cart" && cartCount > 0 && (
                <Badge
                  variant="secondary"
                  className="h-5 px-1.5 min-w-5 text-[10px] flex justify-center"
                >
                  {cartCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>

      {userSlot}
    </aside>
  );
}
