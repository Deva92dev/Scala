"use server";

import { db } from "..";
import { members } from "../schema";
import { eq } from "drizzle-orm";
import { safeGetSession } from "./session";

export const requireAuthWithOrg = async () => {
  const session = await safeGetSession();

  if (!session) throw new Error("UNAUTHENTICATED");

  const [membership] = await db
    .select({
      orgId: members.organizationId,
      role: members.role,
    })
    .from(members)
    .where(eq(members.userId, session.user.id));

  if (!membership) throw new Error("NO_ORG_ACCESS");

  return {
    userId: session.user.id,
    orgId: membership.orgId,
    role: membership.role,
    name: session.user.name,
    user: session.user,
  };
};
