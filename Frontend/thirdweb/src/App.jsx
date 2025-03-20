import { ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

export default function ConnectWalletButton() {
  const client = createThirdwebClient({
    clientId: "09b90d9da477681ddcad30ee8de156fd"
  });

  return (
    <ConnectButton 
      client={client}
      className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
    />
  );
}