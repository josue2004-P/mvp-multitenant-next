import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getSubdomainServer } from "@/utils/getSubdomain";
import { LoginDto } from '../../../../types/auth';
import { LoginUseCase } from "@/application/auth/LoginUseCase";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const subdomain = getSubdomainServer(req as any); // ✅ no usar NextApiRequest
        if (!subdomain) return null;

        try {
          const loginUseCase = new LoginUseCase();

          const loginData: LoginDto = {
            email: credentials.email,
            password: credentials.password,
            subdomain, // si tu LoginDto tiene subdomain
          };

          const data = await loginUseCase.execute(loginData);

          return {
            id: String(data.user.id), // ✅ convertir a string
            name: data.user.name ?? data.user.email,
            email: data.user.email ?? "",
            token: data.token ?? "",
            profiles: Array.isArray(data.profiles) ? data.profiles : [], // asegurar string[]
          };
        } catch (error) {
          console.error("Login fallido:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.name = user.name;
        token.profiles = user.profiles ?? []; // aseguramos string[]
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        token: token.accessToken,
        profiles: token.profiles ?? [], // aseguramos string[]
      };
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
} satisfies AuthOptions;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
