import { requireSuperAdmin } from "@/db/data-access/admin";
import { LayoutDashboard, Users, LogOut, Building2 } from "lucide-react";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSuperAdmin();

  return (
    <div className="min-h-screen grid grid-cols-[240px_1fr]">
      <aside className="bg-slate-900 text-white p-4 flex flex-col">
        <div className="font-bold text-xl mb-8 flex items-center gap-2">
          <LayoutDashboard className="text-blue-400" />
          SCALA ADMIN
        </div>

        <nav className="space-y-2 flex-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition"
          >
            <Building2 className="w-4 h-4" /> Organizations
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 p-3 rounded hover:bg-slate-800 transition"
          >
            <Users className="w-4 h-4" /> Global Users
          </Link>
        </nav>

        <Link
          href="/dashboard"
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-white mt-auto"
        >
          <LogOut className="w-4 h-4" /> Exit to App
        </Link>
      </aside>

      <main className="bg-slate-50 p-8">{children}</main>
    </div>
  );
}
