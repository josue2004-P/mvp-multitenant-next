"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="font-sans bg-gray-50 text-gray-800 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {session && <p>Bienvenido, {session.user.name}</p>}
    </div>
  );
}
