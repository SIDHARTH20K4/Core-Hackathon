"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useConnect, useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";

export function LoginButton() {
  const { data: session } = useSession();
  const address = useAddress();
  const { connect, connectors } = useConnect();

  // Connect wallet when user is authenticated but has no wallet
  useEffect(() => {
    if (session && !address && connectors.length > 0) {
      // Auto-connect to the first available connector
      connect(connectors[0]);
    }
  }, [session, address, connectors, connect]);

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span>Signed in as {session.user?.email}</span>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={() => signIn("google")}
      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
    >
      Sign in with Google
    </Button>
  );
}
