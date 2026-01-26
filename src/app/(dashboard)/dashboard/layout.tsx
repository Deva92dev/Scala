import { Suspense } from "react";
import { DashboardSidebar } from "@/components/dashboard/home/DashboardSidebar";
import { SidebarUser } from "@/components/dashboard/home/SidebarUser";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <Suspense
        fallback={
          <div className="hidden md:flex w-64 border-r bg-card fixed inset-y-0" />
        }
      >
        <DashboardSidebar
          cartCount={0}
          userSlot={
            <Suspense fallback={<div className="h-16 border-t" />}>
              <SidebarUser />
            </Suspense>
          }
        />
      </Suspense>

      <div className="md:pl-64 flex flex-col w-full min-h-screen">
        <main className="flex-1 p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
