"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { onLogout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import Cookies from "js-cookie";

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    // Limpiar estado y cookies
    dispatch(onLogout());
    Cookies.remove("token");

    // Redirigir al login
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
