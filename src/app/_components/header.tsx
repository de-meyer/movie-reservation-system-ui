import type { Session } from "next-auth";
import { HydrateClient } from "~/trpc/server";
import HeaderLeft from "./headerLeft";
import HeaderRight from "./headerRight";
export default function Header({ session }: { session: Session | null }) {
  return (
    <HydrateClient>
      {session ? (
        <div className="bg-primary text-white flex w-full header-height items-center justify-between px-4 border-b-1 border-[#15162c] ">
          <HeaderLeft />
          <HeaderRight session={session} />
        </div>
      ) : null}
    </HydrateClient>
  );
}
