"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: loginUser } = api.user.loginUser.useMutation();
  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          loginUser({
            username: name,
            password: password,
          });
          console.log("Login", { name, password });
        }}
        className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          Sign in
        </button>
      </form>
    </div>
  );
}
