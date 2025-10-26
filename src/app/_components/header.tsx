import type { Session } from "next-auth";
import { HydrateClient } from "~/trpc/server";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";
export default function Header({ session }: { session: Session | null }) {
  return (
    <HydrateClient>
      {session ? (
        <div className="bg-[#2e026d] text-white flex w-full items-center justify-between px-4 border-b-1 border-[#15162c] ">
          <HeaderLeft />
          <HeaderRight session={session} />
        </div>
      ) : null}
    </HydrateClient>
  );
}
