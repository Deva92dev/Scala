import { db } from "@/db";
import { organizations, users, members } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const getSettingsData = cache(async (userId: string, orgId: string) => {
  const userProfile = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  const orgProfile = await db.query.organizations.findFirst({
    where: eq(organizations.id, orgId),
  });

  const teamMembers = await db.query.members.findMany({
    where: eq(members.organizationId, orgId),
    with: {
      user: true,
    },
    limit: 5,
  });

  return { userProfile, orgProfile, teamMembers };
});
