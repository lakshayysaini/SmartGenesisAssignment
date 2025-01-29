"use client";

import React from "react";
import { LogIn, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export function ErrorPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 py-8">
        <div className="bg-[#1E1E1E] p-8 rounded-lg shadow-xl border border-[#2A2A2A] text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/10 rounded-full mb-6">
            <LogIn className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Authentication Required
          </h1>

          <p className="text-gray-400 mb-8">
            You need to be logged in to access this page. Please sign up or log
            in to continue.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => router.push("/")}
              className="w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 
                       hover:bg-blue-700 rounded-md transition-colors flex items-center 
                       justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
