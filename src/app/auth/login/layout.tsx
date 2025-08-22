import type { Metadata } from "next";
import "@/styles/globals.css";
import ClientAppWrapper from "@/components/store/ClientAppWrapper";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // importa tu config

export const metadata: Metadata = {
  title: "Login Multitenant MVP",
  description: "Sistema base de multitenant",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard"); // o donde quieras mandarlo
  }

  return (
    <html lang="es">
      <body  cz-shortcut-listen="true">
        <ClientAppWrapper>
          <main>{children}</main>
        </ClientAppWrapper>
      </body>
    </html>
  );
}
