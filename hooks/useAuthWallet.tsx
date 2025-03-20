"use client";

import { useSession } from "next-auth/react";
import { useAddress, useConnect, useDisconnect, useWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";

export function useAuthWallet() {
  const { data: session, status } = useSession();
  const address = useAddress();
  const { connect, connectors } = useConnect();
  const disconnect = useDisconnect();
  const wallet = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  // Connect wallet when user is authenticated
  useEffect(() => {
    if (status === "authenticated" && !address && !isConnecting && connectors.length > 0) {
      setIsConnecting(true);
      // Connect to the first available connector
      connect(connectors[0])
        .catch(console.error)
        .finally(() => setIsConnecting(false));
    }
  }, [status, address, connectors, connect, isConnecting]);

  // Disconnect wallet when user signs out
  useEffect(() => {
    if (status === "unauthenticated" && address) {
      disconnect();
    }
  }, [status, address, disconnect]);

  return {
    session,
    address,
    wallet,
    isConnecting: isConnecting || status === "loading",
    isConnected: !!address,
    isAuthenticated: status === "authenticated"
  };
}
