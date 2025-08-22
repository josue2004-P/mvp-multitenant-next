// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  // Extender la sesión para incluir token y perfiles
  interface Session {
    user: {
      id: string;
      token: string;       // token del backend
      profiles: string[];  // perfiles del usuario
    } & DefaultSession["user"];
  }

  // Extender User (opcional, para authorize)
  interface User {
    id: string;
    token: string;
    profiles: string[];
  }

  // Extender JWT para guardar token y perfiles
  interface JWT extends DefaultJWT {
    id?: string;
    token?: string;       // coincide con session.user.token
    name?: string | null;
    email?: string | null;
    profiles?: string[];
  }
}
