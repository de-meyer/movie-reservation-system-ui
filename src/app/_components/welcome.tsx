"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function Welcome() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div>
      {session ? (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => signOut()}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => router.push("/login")}>
            Sign in
          </button>
        </>
      )}
    </div>
  );
}
