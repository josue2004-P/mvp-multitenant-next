"use client";

import ReduxProviderWrapper from "./ReduxProviderWrapper";
import { SessionProvider } from "next-auth/react";

export default function ClientAppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProviderWrapper>
        <SessionProvider>{children}</SessionProvider>
    </ReduxProviderWrapper>
  );
}
