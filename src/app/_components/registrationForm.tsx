"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function Registration() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate: registerUser } = api.user.registerUser.useMutation();

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser({
            name: name,
            email: email,
          });
        }}
        className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
          Register
        </button>
      </form>
    </div>
  );
}
