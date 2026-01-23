"use server";

import { and, eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "..";
import { members } from "../schema";
import { requireAuthWithOrg } from "../data-access/users";

// Helper to check admin count
async function validateLastAdminSafety(orgId: string, targetUserId: string) {
  // Check if the TARGET is actually an admin
  const targetMember = await db.query.members.findFirst({
    where: (m, { and, eq }) =>
      and(eq(m.userId, targetUserId), eq(m.organizationId, orgId)),
    columns: { role: true },
  });

  if (!targetMember || targetMember.role !== "admin") {
    return;
  }

  const [result] = await db
    .select({ value: count() })
    .from(members)
    .where(and(eq(members.organizationId, orgId), eq(members.role, "admin")));

  const adminCount = result?.value;

  // If only 1 admin exists, BLOCK IT
  if (adminCount && adminCount <= 1) {
    throw new Error(
      "SAFETY LOCK: You cannot remove or demote the last Admin. Promote someone else first."
    );
  }
}

export async function updateMemberRole(
  targetUserId: string,
  newRole: "admin" | "buyer" | "approver" | "finance"
) {
  const { orgId, role: actorRole } = await requireAuthWithOrg();

  // Only Admins can change roles
  if (actorRole !== "admin") {
    throw new Error("Unauthorized: Only Admins can manage roles.");
  }

  // If we are changing an Admin -> Non-Admin, check safety
  if (newRole !== "admin") {
    await validateLastAdminSafety(orgId, targetUserId);
  }

  await db
    .update(members)
    .set({ role: newRole })
    .where(
      and(eq(members.userId, targetUserId), eq(members.organizationId, orgId))
    );

  revalidatePath("/dashboard/company");
  return { success: true };
}

export async function removeMember(targetUserId: string) {
  const {
    userId: actorId,
    orgId,
    role: actorRole,
  } = await requireAuthWithOrg();

  if (actorRole !== "admin") {
    throw new Error("Unauthorized");
  }

  // Prevent Self-Kick
  if (targetUserId === actorId) {
    throw new Error("You cannot remove yourself.");
  }

  // Safety Check (Last Admin)
  await validateLastAdminSafety(orgId, targetUserId);

  await db
    .delete(members)
    .where(
      and(eq(members.userId, targetUserId), eq(members.organizationId, orgId))
    );

  revalidatePath("/dashboard/company");
  return { success: true };
}
