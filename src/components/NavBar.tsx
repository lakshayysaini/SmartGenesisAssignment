"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-semibold text-white">
              RichText Editor
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">
                  Hello, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google", { callbackUrl: "/editor" })}
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-white rounded-md transition-colors"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
