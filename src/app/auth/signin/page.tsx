"use client";

import { signIn } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div>
          <div className="text-2xl font-bold text-center">Sign In</div>
        </div>
        <div>
          <div className="mt-4">
            <button
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/editor" })}
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
