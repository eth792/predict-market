/**
 * Wagmi and RainbowKit Configuration
 * Uses modern Web3 connection methods
 */

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { hardhat, sepolia, mainnet } from 'wagmi/chains';

// Define custom Hardhat chain configuration
export const hardhatLocal = {
  ...hardhat,
  id: 31337,
  name: 'Hardhat Local',
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
    public: {
      http: ['http://127.0.0.1:8545'],
    },
  },
} as const;

// Get environment variables
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

// Wagmi configuration
export const config = getDefaultConfig({
  appName: 'Prediction Market',
  projectId: projectId,
  chains: [
    // hardhatLocal,
    sepolia,
    ...(process.env.NODE_ENV === 'production' ? [mainnet] : []),
  ],
  ssr: true, // Must be enabled for Next.js
});
