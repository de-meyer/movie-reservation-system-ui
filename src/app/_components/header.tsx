import type { Session } from "next-auth";
import UserManagement from "./userManagement";
import { HydrateClient } from "~/trpc/server";
export default function Header({ session }: { session: Session | null }) {
  return (
    <HydrateClient>
      <div className="flex h-16 w-full items-center justify-end px-4">
        <UserManagement
          image={session?.user?.image ?? undefined}
          name={session?.user?.name ?? undefined}></UserManagement>
      </div>
    </HydrateClient>
  );
}
