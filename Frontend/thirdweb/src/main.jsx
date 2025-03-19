// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { coreDAO } from "./chain.js"; // Import the CoreDAO chain configuration
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <ThirdwebProvider
      activeChain={coreDAO} // Use CoreDAO as the active chain
      clientId= "09b90d9da477681ddcad30ee8de156fd" // Replace with your Thirdweb client ID
    > */}
     <ThirdwebProvider>
      <App />
      </ThirdwebProvider>
          </React.StrictMode>
);