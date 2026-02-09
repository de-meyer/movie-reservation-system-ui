"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function HeaderRight() {
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
  function logout() {
    axios.post(
      "http://localhost:8080/logout",
      {},
      {
        withCredentials: true,
      },
    );
  }
  return (
    <nav className="flex items-center justify-center">
      <>
        {/* Profile Button */}

        <Link
          href="/program"
          className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer">
          Home
        </Link>
        <Link
          href="/browse"
          className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer">
          Browse
        </Link>
        <Link
          href="/createShow"
          className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer">
          Create Show
        </Link>
        <Link
          href="/"
          onClick={() => me()}
          className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer">
          Auth Test (me)
        </Link>
        <Link
          href="/"
          onClick={() => logout()}
          className="px-4 py-2 rounded-lg hover:bg-accent cursor-pointer">
          Logout
        </Link>
        <Image
          src={"/default-profile.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
      </>

      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer"
        onClick={() =>
          (window.location.href =
            "http://localhost:8080/oauth2/authorization/discord")
        }>
        Login with Discords
      </button>
    </nav>
  );
}
