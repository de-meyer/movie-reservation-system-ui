"use client";
import { signOut } from "next-auth/react";
// This component is for the user to manage their account, like changing their password, email, etc.
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface UserManagementProps {
  image?: string;
  name?: string;
}

export default function UserManagement({ image, name }: UserManagementProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        onClick={() => router.back()}>
        Back
      </button>
      {name && ( // Check if session is available
        <div
          className="relative"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}>
          {/* Profile Button */}
          <button className="flex items-center space-x-2">
            <Image
              src={image || "/default-profile.png"} // your profile image (in /public folder)
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="relative right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
              <Link
                href="/account"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                Account
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                Settings
              </Link>
              <Link
                href="/"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700">
                Logout
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
