"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { organizations } from "../schema";
import { requireSuperAdmin } from "../data-access/admin";

export async function updateOrgFinancials(
  orgId: string,
  newLimit: number,
  newTerms: string,
  newTier: "bronze" | "silver" | "gold",
) {
  await requireSuperAdmin();

  await db
    .update(organizations)
    .set({
      creditLimit: newLimit.toString(),
      // @ts-expect-error - Casting string to enum
      paymentTerms: newTerms,
      tier: newTier,
    })
    .where(eq(organizations.id, orgId));

  revalidatePath(`/admin/org/${orgId}`);
  revalidatePath("/admin");
  return { success: true };
}
