// src/types/auth/LoginResponse.ts
export interface User {
  id: number;
  name?: string;
  email?: string;
  // agregar otros campos que devuelva tu backend
}

export interface LoginResponse {
  token: string;
  user: User;
  profiles?: string[]; // roles o perfiles del usuario
}
