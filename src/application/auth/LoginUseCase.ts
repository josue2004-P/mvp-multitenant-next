import { loginRequest } from "@/services/authService";
import { LoginDto, LoginResponse } from "@/types/auth";

export class LoginUseCase {
  async execute(data: LoginDto): Promise<LoginResponse> {
    return await loginRequest(data); // loginRequest debe enviar X-Subdomain
  }
}
