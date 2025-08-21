import { axiosClient } from "@/infrastructure/api/AxiosClient";
import { LoginDto, LoginResponse } from "@/types/auth";
import Cookies from "js-cookie";

// Login request con subdominio dinámico
export async function loginRequest(data: LoginDto): Promise<LoginResponse> {
  try {
    const { data: response } = await axiosClient.post<LoginResponse>(
      "/authentication",
      data,
      {
        headers: { "X-Subdomain": data.subdomain || "" },
      }
    );
    return response;
  } catch (error: any) {
    throw error?.response?.data?.error || "Error al iniciar sesión";
  }
}

export async function renewTokenRequest(): Promise<LoginResponse> {
  const token = Cookies.get("token") || "";

  const { data } = await axiosClient.get<LoginResponse>(
    "/authentication/renew-token",
    {
      headers: {
        "x-token": token,
      },
    }
  );

  return data;
}
