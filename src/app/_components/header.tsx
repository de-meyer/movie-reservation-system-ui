import type { Session } from "next-auth";
import { HydrateClient } from "~/trpc/server";
import HeaderNavbarRight from "./headerNavbarRight";
import HeaderNavbarLeft from "./headerNavbarLeft";
export default function Header({ session }: { session: Session | null }) {
  return (
    <HydrateClient>
      <div className="bg-[#2e026d] text-white flex w-full items-center justify-between px-4 border-b-1 border-[#15162c] ">
        <HeaderNavbarLeft />
        <HeaderNavbarRight session={session} />
      </div>
    </HydrateClient>
  );
}
