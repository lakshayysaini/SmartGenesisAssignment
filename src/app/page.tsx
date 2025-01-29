"use client";

import { signIn, useSession } from "next-auth/react";
import { LogIn } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-[#121212]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to RichText Editor
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Create, edit, and manage your content with our powerful rich text
            editor.
          </p>
          {!session && (
            <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-xl max-w-md mx-auto border border-[#2A2A2A]">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Get Started
              </h2>
              <p className="text-gray-400 mb-6">
                Sign in with your Google account to start creating and editing
                content.
              </p>
              <button
                onClick={() => signIn("google", { callbackUrl: "/editor" })}
                className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Sign In with Google
              </button>
            </div>
          )}
          {session && (
            <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-xl max-w-md mx-auto border border-[#2A2A2A]">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Ready to Edit
              </h2>
              <p className="text-gray-400 mb-6">
                You&apos;re signed in and ready to start editing your content.
              </p>
              <a
                href="/editor"
                className="block w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-center"
              >
                Go to Editor
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
