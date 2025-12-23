// Contract configuration - deployment addresses from demo scripts
export const CONTRACTS = {
  // Contract addresses for local Hardhat network
  HARDHAT: {
    USDC: "0x0581f64c387374a3C45584adF7a6F21516e43c8A",
    SimpleOracle: "0xd195F95319CFD4Bf2D215C95780454Bd4BD25bCa",
    MultiSigOracle: "0xb5753C0a79AA25A086898eA16c01485869124B10",
    PredictionMarketHub: "0x1c8862bf218866d98Cf2632831EE6033721F4b82",
  },
  // Other networks can be added here
  ETHEREUM: {
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    SimpleOracle: "0xd195F95319CFD4Bf2D215C95780454Bd4BD25bCa",
    MultiSigOracle: "0xb5753C0a79AA25A086898eA16c01485869124B10",
    PredictionMarketHub: "0x1c8862bf218866d98Cf2632831EE6033721F4b82",
  },

  SEPOLIA: {
    USDC: "0x942F45E6e363D3d257E4947a8347B36c000B3248",
    SimpleOracle: "0x8d8ACb5686236d7bb49A7176dC43684EbB5B1f09",
    MultiSigOracle: "0x4c4E819F70be93164455Dd9f59Feb7b249B83eb5",
    PredictionMarketHub: "0x65EF755c9A1E4C219a54f04306959D13ADD70916",
  },
  POLYGON: {
    USDC: "0x0581f64c387374a3C45584adF7a6F21516e43c8A",
    SimpleOracle: "0xd195F95319CFD4Bf2D215C95780454Bd4BD25bCa",
    MultiSigOracle: "0xb5753C0a79AA25A086898eA16c01485869124B10",
    PredictionMarketHub: "0x1c8862bf218866d98Cf2632831EE6033721F4b82",
  }
};

// Network configuration
export const NETWORKS = {
  HARDHAT: {
    chainId: 31337,
    name: "Hardhat Local",
    rpcUrl: "http://127.0.0.1:8545",
    contracts: CONTRACTS.HARDHAT,
    exploreURL: "http://localhost:8545"
  },
  ETHEREUM: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_PROJECT_ID",
    contracts: CONTRACTS.ETHEREUM,
    exploreURL: "https://etherscan.io"
  },
  SEPOLIA: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    contracts: CONTRACTS.SEPOLIA,
    exploreURL: "https://sepolia.etherscan.io"
  },
  POLYGON: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-bor-rpc.publicnode.com",
    contracts: CONTRACTS.POLYGON,
    exploreURL: "https://polygonscan.com"
  }
};

export const HARDHAT_CHAIN_ID = 31337;
export const RPC_URL = "http://127.0.0.1:8545";

// Get contract addresses by chain ID
export function getContractAddresses(chainId: number) {
  switch (chainId) {
    case 137:
      return CONTRACTS.POLYGON;
    case 31337:
      return CONTRACTS.HARDHAT;
    case 1:
      return CONTRACTS.ETHEREUM;
    case 11155111:
      return CONTRACTS.SEPOLIA;
    default:
      return CONTRACTS.SEPOLIA; // Default to Sepolia configuration
  }
}

// Get current network configuration
export function getNetworkConfig(chainId: number) {
  switch (chainId) {
    case 31337:
      return NETWORKS.HARDHAT;
    case 1:
      return NETWORKS.ETHEREUM;
    case 11155111:
      return NETWORKS.SEPOLIA;
    case 137:
      return NETWORKS.POLYGON;
    default:
      return NETWORKS.HARDHAT;
  }
}

// Get block explorer URL for current network
export function getBlockExplorerUrl(chainId: number) {
  switch (chainId) {
    case 1:
      return "https://etherscan.io";
    case 11155111:
      return "https://sepolia.etherscan.io";
    case 137:
      return "https://polygonscan.com";
    case 31337:
      return "http://localhost:8545"; // Local network has no block explorer
    default:
      return "";
  }
}
