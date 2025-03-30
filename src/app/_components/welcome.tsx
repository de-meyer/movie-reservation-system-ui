"use client";

import { useRouter } from "next/navigation";

export function Welcome() {
  const router = useRouter();
  return (
    <div>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        onClick={() => router.push("/registration")}>
        Register
      </button>
      <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
        Sign in
      </button>
    </div>
  );
}
