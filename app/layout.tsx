// Remove the "use client" directive from the top of the file
import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "./providers";
import './globals.css'
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ColorFi - Web3 Color Trading Platform",
  description: "Trade unique digital colors with Bitcoin on our secure Web3 platform with AI-driven analytics.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
