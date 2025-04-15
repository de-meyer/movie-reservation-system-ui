import NextAuth, { type NextAuthOptions } from "next-auth";
import { authOption } from "./auth";

export default await NextAuth(authOption);
