import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Call your backend with Discord user info
  const backendRes = await fetch('http://localhost:8080/auth/oauth/discord', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: session.user.email,
      name: session.user.name,
    }),
  });

  const backendCookie = backendRes.headers.get("set-cookie");
  console.log("Backend cookie:", backendCookie);

  if (!backendRes.ok || !backendCookie) {
    return NextResponse.json({ error: "Backend login failed" }, { status: 401 });
  }

  // Forward cookie
  const response = NextResponse.redirect(new URL("/", req.url));
  response.headers.set("Set-Cookie", backendCookie);

  return response;
}