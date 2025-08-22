import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      token: string;
      profiles: string[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    token: string;
    profiles: string[];
  }

  interface JWT {
    id: string;
    accessToken: string;
    name?: string | null;
    email?: string | null;
    profiles?: string[];
  }
}
