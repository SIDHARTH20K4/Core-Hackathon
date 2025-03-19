// src/ConnectWalletButton.js
import React from "react";
import { useConnect } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { CoreTestnet } from "./chain";
import { client } from "./thirdwebClient";

const ConnectWalletButton = () => {
  const { connect } = useConnect({
    client,
    accountAbstraction: {
      chain: CoreTestnet, // Use CoreTestnet here
      sponsorGas: true,
    },
  });

  const connectToSmartAccount = async () => {
    connect(async () => {
      const wallet = inAppWallet();
      await wallet.connect({
        client,
        chain: CoreTestnet, // Use CoreTestnet here
        strategy: "google",
      });
      return wallet;
    });
  };

  return (
    <button onClick={connectToSmartAccount} style={styles.button}>
      Connect Wallet
    </button>
  );
};

// Define styles outside the component
const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default ConnectWalletButton;