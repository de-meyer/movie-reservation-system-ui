"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
      {session ? (
        <>
          <p>Welcome,</p>
          <Image
            src={session.user?.image || ""}
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full"></Image>
          <figcaption>{session.user?.name}</figcaption>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => me()}>
            me
          </button>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => router.push("/show")}>
            show
          </button>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => router.push("/createShow")}>
            Show Edit
          </button>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
          onClick={() =>
            signIn("discord", { callbackUrl: "/api/auth/post-login" })
          }>
          Login with Discord
        </button>
      )}
    </div>
  );
}
