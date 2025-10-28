import { HydrateClient } from "~/trpc/server";
import LandingPage from "./_components/landingPage";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center bg-gradient-to-b from-primary to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center gap-2">
            <LandingPage />
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
