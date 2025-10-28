"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function LandingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <div>
      {session ? (
        <>
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/" })}>
            Logout
          </button>
        </>
      ) : (
        <div className="flex items-center justify-start">
          <Image
            src="/movie-logo.png"
            alt="Movie Logo"
            width={400}
            height={400}
            className="rounded-full m-2 cursor-pointer"
          />
          <div className="flex flex-col text-center">
            <span className="text-6xl py-4 text-secondary font-bold">
              Step into the world of cinema magic.
            </span>
            <span className="text-lg text-secondary">
              Explore what's now showing, discover upcoming hits
            </span>
            <span className="text-lg text-secondary">
              and reserve your perfect seat — all in one place.
            </span>
            <span className="text-lg text-secondary">
              Your movie night starts here. 🍿
            </span>
            <div className="w-full h-0.5 my-6 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-90 rounded" />
            <button
              className="rounded-lg bg-secondary py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
              onClick={() => router.push("/login")}>
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
