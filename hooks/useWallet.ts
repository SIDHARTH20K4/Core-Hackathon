"use client";

import { useAddress, useBalance, useConnectionStatus, useDisconnect } from "@thirdweb-dev/react";

export function useWallet() {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const { data: balance } = useBalance();
  const disconnect = useDisconnect();

  const isConnected = connectionStatus === "connected";
  const isConnecting = connectionStatus === "connecting";
  const isDisconnected = connectionStatus === "disconnected";

  return {
    address,
    balance,
    isConnected,
    isConnecting,
    isDisconnected,
    disconnect,
  };
}
