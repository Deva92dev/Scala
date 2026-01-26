import { requireAuthWithOrg } from "@/db/data-access/users";
import { redirect } from "next/navigation";

const SUPER_ADMIN_EMAILS =
  process.env.SUPER_ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];

export async function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = await requireAuthWithOrg();

  if (!SUPER_ADMIN_EMAILS.includes(user.email)) {
    console.warn(`Unauthorized Admin Access Attempt: ${user.email}`);
    redirect("/dashboard");
  }

  return <>{children}</>;
}
