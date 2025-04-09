import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";


export default async function auth(req: NextApiRequest, res: NextApiResponse) {
const providers = [
  DiscordProvider({
    clientId: process.env.DISCORD_CLIENT_ID || "",
    clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
  })
]

  return await NextAuth(req, res, {
    providers,
    
})
}
