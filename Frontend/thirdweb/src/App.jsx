// src/App.js
// import { ThirdwebProvider } from "thirdweb/react";
// import { CoreTestnet } from "./chain";
// import ConnectWalletButton from "./ConnectWalletButton.jsx";
import { createThirdwebClient } from "thirdweb";
import {  ConnectButton } from "thirdweb/react";

function App() {
  const client = createThirdwebClient({ clientId:"09b90d9da477681ddcad30ee8de156fd" });

  return (
   
  <>
    <ConnectButton client={client} />

    
<h1>Welcome to My DApp</h1></>


      
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
};

export default App;