"use server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const safeGetSession = async () => {
  try {
    const headersList = await headers();
    return await auth.api.getSession({
      headers: headersList,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
