import { cache } from "react";
import { requireAuthWithOrg } from "@/db/data-access/users";
import { getCartCount } from "@/db/data-access/cart";
import { DashboardContext } from "@/utils/types";

export const getDashboardContext = cache(
  async (): Promise<DashboardContext> => {
    const auth = await requireAuthWithOrg();

    const cartCount = await getCartCount(auth.userId, auth.orgId);

    return {
      userId: auth.userId,
      orgId: auth.orgId,
      name: auth.name,
      role: auth.role,
      cartCount,
    };
  },
);
