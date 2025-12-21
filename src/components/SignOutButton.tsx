"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:text-red-600 hover:bg-white rounded transition-colors w-full"
    >
      <LogOut className="w-4 h-4" />
      Sign Out
    </button>
  );
}
