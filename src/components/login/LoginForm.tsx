"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { onLogin } from "@/store/slices/userSlice";
import { LoginUseCase } from "@/application/auth/LoginUseCase";
import { LoginDto } from "../../types/auth";
import { showSuccess, showError } from "@/utils/alerts";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const loginUseCase = new LoginUseCase();
    const loginData: LoginDto = { email, password };

    try {
      const data = await loginUseCase.execute(loginData);

      Cookies.set("token", data.token, { expires: 1 });

      dispatch(
        onLogin({
          id: data.user.id,
          token: data.token,
          profiles: data.profiles || [],
        })
      );

      showSuccess("Login Correcto", "");

    } catch (error: any) {
      const message = error || "Error desconocido";

      showError(message, "Ocurrió un problema");

      dispatch(onLogin({ id: 0, token: "", profiles: [] }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 border rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />

      {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}
