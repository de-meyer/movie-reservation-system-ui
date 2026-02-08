"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export function DiscordLogin() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div>
      {!session ? (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() =>
              (window.location.href =
                "http://localhost:8080/oauth2/authorization/discord")
            }>
            Login with Discords
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
