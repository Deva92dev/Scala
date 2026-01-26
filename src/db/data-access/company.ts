import { cacheLife } from "next/cache";
import { db } from "..";

export const getCompanyOverview = async (orgId: string) => {
  "use cache";
  cacheLife("minutes");

  const org = await db.query.organizations.findFirst({
    where: (org, { eq }) => eq(org.id, orgId),
    columns: {
      id: true,
      name: true,
      creditLimit: true,
      usedCredit: true,
      currency: true,
      taxIdentifier: true,
      createdAt: true,
      paymentTerms: true,
    },
    with: {
      members: {
        columns: {
          role: true,
        },
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  if (!org) throw new Error("Organization not found");

  return org;
};
