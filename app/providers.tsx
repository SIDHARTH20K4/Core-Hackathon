"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThirdwebProvider 
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
      activeChain="ethereum"
    >
      {children}
    </ThirdwebProvider>
  );
}
