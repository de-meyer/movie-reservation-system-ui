"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export function DiscordLogin() {
  const { data: session } = useSession();

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      )}
    </div>
  );
}
