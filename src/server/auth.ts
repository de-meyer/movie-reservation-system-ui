import axios from "axios";
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
      async signIn({ user }) {
        console.log("User data:", user);
        try {
          // Call your backend to create the user
          await axios.post(
            "http://localhost:8080/auth/oauth/discord",
            {
              name: user.name,
              email: user.email,
            },
            { withCredentials: true }
          );
          return true; // Allow sign-in
        } catch (error) {
          console.error("Error creating user in backend:", error);
          return false; // Deny sign-in if user creation fails
        }
      },
      async redirect({ url, baseUrl }) {
        // Redirect to the base URL after login
        return `${baseUrl}`;
        
      },
    },
  };
