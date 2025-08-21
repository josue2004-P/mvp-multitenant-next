import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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

        const host = req.headers["host"]; // <-- usar corchetes
        const subdomain = host?.split(".")[0];

        if (subdomain !== "admin") return null;

        try {
          const { data } = await axios.post(
            "http://localhost:3000/api/v1/authentication",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "X-Subdomain": subdomain,
                "Content-Type": "application/json",
              },
            }
          );

          // Retornar usuario a NextAuth
          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            token: data.token,
            profiles: data.profiles || [],
          };
        } catch (err: any) {
          console.error("Login fallido:", err.response?.data || err);
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
        token.profiles = user.profiles;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        token: token.accessToken,
        profiles: token.profiles,
      };
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
