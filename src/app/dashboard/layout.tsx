"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // redirige al login si no hay sesión
    }
  }, [status]);

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return null; // espera redirección

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
