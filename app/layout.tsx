import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { defineChain } from "thirdweb/chains";

const inter = Inter({ subsets: ["latin"] });

// Define the blockchain (example: Core DAO)
const coreDAO = defineChain({
  id: 1116,
  rpc: "https://rpc.ankr.com/core",
  nativeCurrency: {
    name: "Core",
    symbol: "CORE",
    decimals: 18,
  },
});

export const metadata = {
  title: "ColorFi - Web3 Color Trading Platform",
  description:
    "Trade unique digital colors with Bitcoin on our secure Web3 platform with AI-driven analytics.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThirdwebProvider
          activeChain={coreDAO}
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID} // Replace with your Thirdweb Client ID
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
