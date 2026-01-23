import { requireAuthWithOrg } from "@/db/data-access/users";
import { redirect } from "next/navigation";
import { db } from "..";

const SUPER_ADMIN_EMAILS = process.env.SUPER_ADMIN_EMAILS?.split(",") || [];

export async function requireSuperAdmin() {
  const { user } = await requireAuthWithOrg();

  if (!SUPER_ADMIN_EMAILS.includes(user.email)) {
    console.warn(`Unauthorized Admin Access Attempt: ${user.email}`);
    return redirect("/dashboard");
  }

  return user;
}

export const getOrgs = async () => {
  const orgs = await db.query.organizations.findMany({
    orderBy: (orgs, { desc }) => [desc(orgs.createdAt)],
  });

  return orgs;
};
