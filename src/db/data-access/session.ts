import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * A build-safe wrapper for getting the session.
 * during 'npm run build', headers() throws/rejects.
 * catch that and return null (logged out) to allow the build to finish.
 */
export const safeGetSession = async () => {
  try {
    const headersList = await headers();
    return await auth.api.getSession({
      headers: headersList,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // This catches the "headers() rejects" error during static build
    return null;
  }
};
