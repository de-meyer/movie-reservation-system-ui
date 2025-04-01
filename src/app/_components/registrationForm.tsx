"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function Registration() {
  const utils = api.useUtils();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: registerUser } = api.user.registerUser.useMutation();

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          registerUser({
            username: username,
            email: email,
            password: password,
          });
        }}
        className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20 hover:cursor-pointer">
          Register
        </button>
      </form>
    </div>
  );
}
