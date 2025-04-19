"use client";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import axios from "axios";

export function DiscordLogin() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      console.log("User session:", session.user?.name);
      const response = axios
        .post(
          "http://localhost:8080/api/auth/oauth/discord",
          {
            name: session.user?.name,
            email: session.user?.email,
          },
          { withCredentials: true }
        )
        .then((response) => {
          console.log("Response from server:", response.data);
        })
        .catch((error) => {
          console.error("Error during registration:", error);
        });
    }
  }, [session]);

  function me() {
    axios
      .get("http://localhost:8080/api/me", {
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
            className="rounded-full"
          ></Image>
          <figcaption>{session.user?.name}</figcaption>
          <button onClick={() => me()}>me</button>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      )}
    </div>
  );
}
