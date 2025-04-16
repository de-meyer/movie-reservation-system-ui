"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export function DiscordLogin() {
  const { data: session } = useSession();

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
            className="rounded-full"
          ></Image>
          <figcaption>{session.user?.name}</figcaption>
          <p>id: {session.user?.id}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      )}
    </div>
  );
}
