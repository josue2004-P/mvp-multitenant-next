"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const currentOrigin = typeof window !== "undefined" ? window.location.origin : "";

    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: `${currentOrigin}/auth/login` });
    }

    if (session && !session.user.token) {
      signOut({ callbackUrl: `${currentOrigin}/auth/login` });
    }
  }, [status, session, pathname]); 

  if (status === "loading") return <p>Cargando...</p>;
  if (!session) return null;

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-100 min-h-screen">{children}</main>
    </div>
  );
}
