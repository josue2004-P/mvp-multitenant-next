import type { Metadata } from "next";
import "@/styles/globals.css";
import ClientAppWrapper from "@/components/store/ClientAppWrapper";

export const metadata: Metadata = {
  title: "Multitenant MVP",
  description: "Sistema base de multitenant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body  cz-shortcut-listen="true">
        <ClientAppWrapper>
          {/* <Navbar /> */}
          <main>{children}</main>
        </ClientAppWrapper>
      </body>
    </html>
  );
}
