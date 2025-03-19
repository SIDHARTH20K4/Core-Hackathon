// src/chain.js
import { defineChain } from "thirdweb/chains";

export const CoreTestnet = defineChain({
    id: 1114, // Chain ID for Core Testnet
    name: "Core Testnet", // Name of the chain
    nativeCurrency: {
        name: "Core testnet", // Name of the native currency
        symbol: "tCORE2", // Symbol of the native currency
        decimals: 18, // Decimals for the native currency
    },
    rpcUrls: {
        default: {
            http: ["https://rpc.test2.btcs.network"], // Default RPC endpoint
        },
        public: {
            http: ["https://rpc.test2.btcs.network"], // Public RPC endpoint
        },
    },
    blockExplorers: {
        default: {
            name: "Core Testnet Explorer", // Name of the block explorer
            url: "https://scan.test2.btcs.network", // URL of the block explorer
        },
    },
    testnet: true, // Indicates that this is a testnet
});