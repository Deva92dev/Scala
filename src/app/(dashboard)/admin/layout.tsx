import { AdminGuard } from "@/components/dashboard/AdminGate";
import AdminLoading from "@/components/Skeletons/BillingSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-slate-900 text-white p-4 flex flex-col">
        <div className="font-bold text-xl mb-8 flex items-center gap-2">
          SCALA ADMIN
        </div>

        <nav className="space-y-2 flex-1">
          <Link href="/admin" className="p-3 rounded hover:bg-slate-800">
            Organizations
          </Link>
        </nav>

        <Link
          href="/dashboard"
          className="p-3 text-slate-400 hover:text-white mt-auto"
        >
          Exit to App
        </Link>
      </aside>

      <main className="bg-slate-50 p-8">
        <Suspense fallback={<AdminLoading />}>
          <AdminGuard>{children}</AdminGuard>
        </Suspense>
      </main>
    </div>
  );
}
