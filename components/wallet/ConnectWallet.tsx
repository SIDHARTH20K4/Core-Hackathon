"use client";

import { ConnectWallet as ThirdwebConnectWallet } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function ConnectWallet() {
  const [isConnecting, setIsConnecting] = useState(false);

  return (
    <div className="flex items-center gap-4">
      {isConnecting ? (
        <ThirdwebConnectWallet
          theme="dark"
          modalSize="wide"
          welcomeScreen={{
            title: "Welcome to ColorFi",
            subtitle: "Connect your wallet to start trading colors",
          }}
        />
      ) : (
        <Button 
          onClick={() => setIsConnecting(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
