import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { env } from "~/env"; // or use process.env directly if no env.ts

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
     providers: [
      DiscordProvider({
        clientId: env.DISCORD_CLIENT_ID,
        clientSecret: env.DISCORD_CLIENT_SECRET
      }),
    ],
    secret: env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token }) {
        // Add Discord user ID (providerAccountId) from JWT token
        if (session.user) {
          session.user.id = token.sub; // this is the user.id from the DB (or the OAuth provider)
        }
        return session;
      },
    },
  };
