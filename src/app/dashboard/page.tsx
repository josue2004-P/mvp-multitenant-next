"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {

  return (
    <div className="font-sans bg-gray-50 text-gray-800 p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {window.location.origin}
    </div>
  );
}
