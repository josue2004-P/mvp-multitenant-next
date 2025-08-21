"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { RenewTokenUseCase } from "@/application/auth/RenewTokenUseCase";

export const useAuth = (type: "guest" | "private" = "private") => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);
  const [checking, setChecking] = useState(true);

  // Renovar token al montar el hook
  useEffect(() => {
    const checkAuthToken = async () => {
      const renewTokenUseCase = new RenewTokenUseCase();

      try {
        const data = await renewTokenUseCase.execute();

        console.log(data)
        dispatch(
          onLogin({
            id: data.id,
            token: data.token,
            profiles: data.profiles || [],
          })
        );
      } catch (error) {
        console.log(error)

        dispatch(onLogout());
      } finally {
        setChecking(false);
      }
    };

    checkAuthToken();
  }, [dispatch]);

  // Redirección según tipo de página
  useEffect(() => {
    if (!checking) {
      if (type === "private" && !user.isLoggedIn) {
        router.push("/login");
      } else if (type === "guest" && user.isLoggedIn) {
        router.push("/");
      }
    }
  }, [checking, type, user, router]);

  return { user, checking, isAuthenticated: user.isLoggedIn };
};
