"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeaderLeft() {
  const router = useRouter();
  return (
    <Image
      src="/movie-logo.png"
      alt="Movie Logo"
      onClick={() => router.push("/")}
      width={70}
      height={70}
      className="rounded-full m-2 cursor-pointer"
    />
  );
}
