import { DashboardSidebar } from "@/components/dashboard/home/DashboardSidebar";
import { getCartCount } from "@/db/data-access/cart";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | TechCorp B2B",
    default: "Dashboard | TechCorp B2B",
  },
  description:
    "Enterprise procurement portal. Manage orders, credit limits, and inventory.",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authSession;
  try {
    authSession = await requireAuthWithOrg();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return redirect("/login");
  }

  const cartCount = await getCartCount(authSession.userId, authSession.orgId);

  const userForSidebar = {
    name: authSession.name,
    role: authSession.role,
  };

  return (
    <div className="flex min-h-screen bg-muted dark:bg-muted/20">
      <DashboardSidebar user={userForSidebar} initialCartCount={cartCount} />
      <main className="flex-1 md:ml-64 p-8 fade-in animate-in duration-500">
        {children}
      </main>
    </div>
  );
}
