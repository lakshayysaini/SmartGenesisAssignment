"use client";
import { useSession } from "next-auth/react";

export default function Editor() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="mb-8">hii</div>
    </div>
  );
}
