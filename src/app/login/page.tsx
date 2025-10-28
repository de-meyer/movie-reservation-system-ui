import { HydrateClient } from "~/trpc/server";
import { DiscordLogin } from "../_components/discordLogin";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              Sign in / Sign up to Gosch's movie reservation service
            </p>
          </div>
          <DiscordLogin />
        </div>
      </main>
    </HydrateClient>
  );
}
