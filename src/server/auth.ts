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
    
    
  };
