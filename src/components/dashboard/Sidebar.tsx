"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { signOut } from "next-auth/react"; // 👈 importa NextAuth signOut

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {

    Cookies.remove("token");

    await signOut({ redirect: false });

    router.push("/auth/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-700">
        Dashboard
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button
          className="w-full text-left p-2 rounded hover:bg-gray-700"
          onClick={() => router.push("/dashboard")}
        >
          Inicio
        </button>
        <button
          className="w-full text-left p-2 rounded hover:bg-gray-700"
          onClick={() => router.push("/dashboard/perfil")}
        >
          Perfil
        </button>
        <button
          className="w-full text-left p-2 rounded hover:bg-gray-700"
          onClick={() => router.push("/dashboard/configuracion")}
        >
          Configuración
        </button>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          className="w-full p-2 bg-red-600 rounded hover:bg-red-700"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
