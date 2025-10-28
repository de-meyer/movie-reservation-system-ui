"use client";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
export function DiscordLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();
  /// TODO: Its working but not the best way to do it, should be done in the backend/server sideof nextjs
  function me() {
    axios
      .get("http://localhost:8080/user/me", {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response from server:", response.data);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }
  return (
    <div>
      {!session ? (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => signIn("discord", { callbackUrl: "/program" })}>
            Login with Discord
          </button>
        </>
      ) : (
        <>
          <p>Welcome, {session.user?.name}</p>
        </>
      )}
    </div>
  );
}
