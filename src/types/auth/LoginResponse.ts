// src/types/auth/LoginResponse.ts
export interface User {
  id: number;
  name?: string;
  email?: string;
  // agregar otros campos que devuelva tu backend
}

export interface LoginResponse {
  token: string;
  user: {
    id: number | string;
    name?: string;
    email?: string;
  };
  profiles?: string[]; // aquí ya es string[]
}