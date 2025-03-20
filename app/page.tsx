import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"
import { ConnectButton } from "thirdweb/react";
import { client }  from "thirdweb/client";
import { useActiveAccount } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
const chain = defineChain(1114);
const account = useActiveAccount();
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-700"></div>
              <span className="font-bold">ColorFi</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="/"
                className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                Features
              </Link>
              <Link
                href="#faq"
                className="flex items-center text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
              >
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <ConnectButton 
        chain={chain}
        key="connect-button"
        client={client}
        onConnect={() => {
          console.log("Wallet connected...");
        }}
        
      />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}

