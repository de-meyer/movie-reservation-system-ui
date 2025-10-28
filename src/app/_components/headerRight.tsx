"use client";
import axios from "axios";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
// This component is for the user to manage their account, like changing their password, email, etc.
import Image from "next/image";
import Link from "next/link";
interface HeaderRightProps {
  session: Session | null;
}

export default function HeaderRight({ session }: HeaderRightProps) {
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
    <nav className="flex items-center justify-center">
      {session ? ( // Check if session is available
        <>
          {/* Profile Button */}

          <Link
            href="/program"
            className="px-4 py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Home
          </Link>
          <Link
            href="/show"
            className="px-4 py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Browse
          </Link>
          <Link
            href="/createShow"
            className="px-4 py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Create Show
          </Link>
          <Link
            href="/"
            onClick={() => me()}
            className="px-4 py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Auth Test (me)
          </Link>
          <Link
            href="/"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 rounded-lg hover:bg-orange-500 cursor-pointer">
            Logout
          </Link>
          <Image
            src={session.user?.image || "/default-profile.png"} // your profile image (in /public folder)
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full"
          />
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
    </nav>
  );
}
