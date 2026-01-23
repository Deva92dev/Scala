import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verifications,
    },
  }),

  baseURL: process.env.BETTER_AUTH_URL!,
  secret: process.env.BETTER_AUTH_SECRET!,

  callbacks: {
    async session({
      session,
      user,
    }: {
      session: {
        user: {
          id: string;
          name: string;
          email: string;
          image?: string | null;
        };
      };
      user: {
        activeOrganizationId: string | null;
      };
    }) {
      return {
        ...session,
        user: {
          ...session.user,
          activeOrganizationId: user.activeOrganizationId,
        },
      };
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        console.log(`Sending magic link to ${email}: ${url}`);
      },
    }),
  ],

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },
});
