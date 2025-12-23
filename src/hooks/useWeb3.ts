"use client";

/**
 * Web3 Hooks - V2 Architecture
 * V2 Contract Features:
 * 1. Does not store user funds (no deposit/withdraw)
 * 2. Locks USDC or Shares directly from wallet when placing orders
 * 3. Buy orders: Requires USDC approval and transfer
 * 4. Sell orders: Deducts Shares from positions
 */

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import { useEffect, useState } from 'react';
import { getContractAddresses, getBlockExplorerUrl } from '@/lib/contracts';
import { api } from '@/lib/api/client';
import PredictionMarketHubV2ABI from '@/lib/PredictionMarketHubV2ABI.json';

// USDC ABI (ERC20)
const USDC_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'allowance',
    stateMutability: 'view',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
] as const;

/**
 * Hook: Get contract addresses
 */
export function useContractAddresses() {
  const { chain } = useAccount();
  const chainId = chain?.id || 31337;
  return getContractAddresses(chainId);
}

/**
 * Hook: Block explorer URL
 */
export function useBlockExplorerUrl() {
  const { chain } = useAccount();
  const chainId = chain?.id || 31337;
  return getBlockExplorerUrl(chainId);
}

/**
 * Hook: Get USDC balance (in wallet)
 */
export function useUSDCBalance() {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: balance, refetch } = useReadContract({
    address: contracts.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  return {
    balance: balance ? formatUnits(balance as bigint, 6) : '0',
    balanceRaw: balance as bigint | undefined,
    refetch,
  };
}

/**
 * Hook: Check USDC allowance
 */
export function useUSDCAllowance() {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data: allowance, refetch } = useReadContract({
    address: contracts.USDC as `0x${string}`,
    abi: USDC_ABI,
    functionName: 'allowance',
    args: address ? [address, contracts.PredictionMarketHub as `0x${string}`] : undefined,
  });

  return {
    allowance: allowance ? formatUnits(allowance as bigint, 6) : '0',
    allowanceRaw: allowance as bigint | undefined,
    refetch,
  };
}

/**
 * Hook: Approve USDC
 */
export function useApproveUSDC() {
  const contracts = useContractAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const approve = (amount: string) => {
    const amountInWei = parseUnits(amount, 6);
    writeContract({
      address: contracts.USDC as `0x${string}`,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [contracts.PredictionMarketHub as `0x${string}`, amountInWei],
      gas: BigInt(100000), // ERC20 approve typically requires 100k gas
    });
  };

  const approveMax = () => {
    writeContract({
      address: contracts.USDC as `0x${string}`,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [contracts.PredictionMarketHub as `0x${string}`, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')],
      gas: BigInt(100000),
    });
  };

  return {
    approve,
    approveMax,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Place Order - V2 Core Function
 *
 * @param marketId - Market ID
 * @param isYes - true=YES, false=NO
 * @param side - 0=Buy (using USDC), 1=Sell (selling Shares)
 * @param shares - Share quantity
 * @param price - Price (0-1)
 *
 * Buy orders automatically transfer USDC from wallet
 * Sell orders deduct Shares from positions
 */
export function usePlaceOrder() {
  const contracts = useContractAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  interface PlaceOrderParams {
    marketId: string;
    isYes: boolean;
    side: 0 | 1; // 0 = BUY, 1 = SELL
    shares: string;
    price: string;
  }

  const placeOrder = ({ marketId, isYes, side, shares, price }: PlaceOrderParams) => {
    // shares use USDC precision (6 decimals)
    const sharesInUsdc = parseUnits(shares, 6);
    // price uses 18 decimal precision (represents 0-1 ratio)
    const priceInWei = parseUnits(price, 18);

    writeContract({
      address: contracts.PredictionMarketHub as `0x${string}`,
      abi: PredictionMarketHubV2ABI,
      functionName: 'placeOrder',
      args: [marketId as `0x${string}`, isYes, side, sharesInUsdc, priceInWei],
      gas: BigInt(500000), // Set reasonable gas limit (500k)
    });
  };

  return {
    placeOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Withdraw order funds (for CANCELLING status orders)
 * 1. Get backend signature
 * 2. Call contract to release funds
 */
export function useCancelOrderFlow() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { cancelOrder: cancelOrderOnChain, hash, isPending, isConfirming, isSuccess } = useCancelOrder();

  const withdrawOrderFunds = async (orderId: string) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Step 1: Get signature
      console.log('Step 1: Getting withdrawal signature...');
      const { signature } = await api.orders.getWithdrawSignature(orderId);

      // Step 2: Call contract to release funds
      console.log('Step 2: Calling contract to release funds...');
      cancelOrderOnChain(orderId, signature);

    } catch (err) {
      console.error('Failed to withdraw order funds:', err);
      setError(err as Error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    withdrawOrderFunds,
    isProcessing,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Cancel order (on-chain part)
 * Requires backend signature
 */
export function useCancelOrder() {
  const contracts = useContractAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const cancelOrder = (orderId: string, signature: string) => {
    writeContract({
      address: contracts.PredictionMarketHub as `0x${string}`,
      abi: PredictionMarketHubV2ABI,
      functionName: 'cancelOrder',
      args: [orderId as `0x${string}`, signature as `0x${string}`],
      gas: BigInt(300000),
    });
  };

  return {
    cancelOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Force withdraw expired order (after market ends)
 * No backend signature required, user pays gas
 */
export function useWithdrawExpiredOrder() {
  const contracts = useContractAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const withdrawExpiredOrder = (orderId: string) => {
    writeContract({
      address: contracts.PredictionMarketHub as `0x${string}`,
      abi: PredictionMarketHubV2ABI,
      functionName: 'withdrawExpiredOrder',
      args: [orderId as `0x${string}`],
      gas: BigInt(300000),
    });
  };

  return {
    withdrawExpiredOrder,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Redeem - Claim rewards after market settlement
 */
export function useRedeem() {
  const contracts = useContractAddresses();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const redeem = (marketId: string) => {
    writeContract({
      address: contracts.PredictionMarketHub as `0x${string}`,
      abi: PredictionMarketHubV2ABI,
      functionName: 'redeem',
      args: [marketId as `0x${string}`],
      gas: BigInt(400000),
    });
  };

  return {
    redeem,
    hash,
    isPending,
    isConfirming,
    isSuccess,
    error,
  };
}

/**
 * Hook: Get user position
 */
export function usePosition(marketId: string) {
  const { address } = useAccount();
  const contracts = useContractAddresses();

  const { data, refetch } = useReadContract({
    address: contracts.PredictionMarketHub as `0x${string}`,
    abi: PredictionMarketHubV2ABI,
    functionName: 'getPosition',
    args: address && marketId ? [marketId as `0x${string}`, address] : undefined,
  });

  const position = data as [bigint, bigint] | undefined;

  return {
    yesShares: position ? formatUnits(position[0], 18) : '0',
    noShares: position ? formatUnits(position[1], 18) : '0',
    yesSharesRaw: position?.[0],
    noSharesRaw: position?.[1],
    refetch,
  };
}

/**
 * Hook: Get order information
 */
export function useOrder(orderId: string) {
  const contracts = useContractAddresses();

  const { data, refetch } = useReadContract({
    address: contracts.PredictionMarketHub as `0x${string}`,
    abi: PredictionMarketHubV2ABI,
    functionName: 'getOrder',
    args: orderId ? [orderId as `0x${string}`] : undefined,
  });

  return {
    order: data,
    refetch,
  };
}

/**
 * Hook: Get market information
 */
export function useMarket(marketId: string) {
  const contracts = useContractAddresses();

  const { data, refetch } = useReadContract({
    address: contracts.PredictionMarketHub as `0x${string}`,
    abi: PredictionMarketHubV2ABI,
    functionName: 'getMarket',
    args: marketId ? [marketId as `0x${string}`] : undefined,
  });

  return {
    market: data,
    refetch,
  };
}

/**
 * Hook: Comprehensive wallet state (V2 version)
 * Only includes USDC balance (in wallet)
 */
export function useWalletState() {
  const { address, isConnected, chain } = useAccount();
  const usdcBalance = useUSDCBalance();
  const allowance = useUSDCAllowance();

  // Auto-refresh balance
  useEffect(() => {
    if (isConnected) {
      const interval = setInterval(() => {
        usdcBalance.refetch();
        allowance.refetch();
      }, 10000); // Refresh every 10 seconds

      return () => clearInterval(interval);
    }
  }, [isConnected, usdcBalance, allowance]);

  return {
    address,
    isConnected,
    chain,
    usdcBalance: usdcBalance.balance,
    usdcBalanceRaw: usdcBalance.balanceRaw,
    allowance: allowance.allowance,
    allowanceRaw: allowance.allowanceRaw,
    refetchBalances: () => {
      usdcBalance.refetch();
      allowance.refetch();
    },
  };
}
