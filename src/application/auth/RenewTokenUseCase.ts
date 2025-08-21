// src/application/auth/RenewTokenUseCase.ts
import { renewTokenRequest } from "@/services/authService";
import { LoginResponse } from "@/types/auth/LoginResponse";

export class RenewTokenUseCase {
  async execute(): Promise<LoginResponse> {
    try {
      return await renewTokenRequest();
    } catch (error: any) {
      throw error?.response?.data?.msg || "Token inválido o expirado";
    }
  }
}