"use client";

/**
 * Modern wallet button component - V2 Architecture
 * V2 doesn't need deposit/withdraw, only shows wallet balance and USDC allowance
 * Integrated authentication status display
 */

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";
import { useWalletState, useApproveUSDC } from "@/hooks/useWeb3";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useSwitchChain } from "wagmi";
import { sepolia } from "wagmi/chains";

export function WalletButton() {
  const { usdcBalance, allowance, refetchBalances } = useWalletState();
  const { approveMax, isPending, isConfirming } = useApproveUSDC();
  const { user, isAuthenticated, isAuthenticating, authenticateWallet, logout } = useAuth();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const hasAllowance = parseFloat(allowance) > 0;
  const isApproving = isPending || isConfirming;

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    size="sm"
                    variant="outline"
                    className="border-border"
                  >
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                const handleSwitch = () => {
                  try {
                    switchChain?.({ chainId: sepolia.id });
                  } catch (err) {
                    console.error('Failed to switch network:', err);
                    openChainModal();
                  }
                };

                return (
                  <Button
                    onClick={handleSwitch}
                    size="sm"
                    variant="destructive"
                  >
                    {isSwitching ? 'Switching…' : 'Switch to Sepolia'}
                  </Button>
                );
              }

              return (
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border"
                      >
                        {isAuthenticated ? (
                          <Badge variant="outline" className="text-success border-success mr-2">
                            <Wallet className="h-3 w-3 mr-1" />
                            Authenticated
                          </Badge>
                        ) : isAuthenticating ? (
                          <Badge variant="outline" className="text-yellow-500 border-yellow-500 mr-2">
                            <Wallet className="h-3 w-3 mr-1 animate-pulse" />
                            Authenticating...
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-muted-foreground border-border mr-2">
                            <Wallet className="h-3 w-3 mr-1" />
                            Not Authenticated
                          </Badge>
                        )}
                        <span className="text-sm text-slate-400">
                          {account.displayName}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-4 bg-card border-border text-foreground shadow-lg">
                      <div className="space-y-4">
                        {/* Balance Info */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Wallet Info</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={refetchBalances}
                              className="h-6 px-2 text-xs"
                            >
                              Refresh
                            </Button>
                          </div>

                          {/* Authentication Status */}
                          <div className="p-3 rounded-lg border border-border bg-muted/30">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-slate-400">Authentication</span>
                              {isAuthenticated ? (
                                <Badge variant="outline" className="text-success border-success text-xs">
                                  ✓ Authenticated
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-yellow-500 border-yellow-500 text-xs">
                                  ⚠ Not Authenticated
                                </Badge>
                              )}
                            </div>
                            {user && (
                              <div className="text-xs text-muted-foreground">
                                User ID: {user.id}
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">USDC Balance</span>
                              <span className="text-sm font-mono text-foreground">
                                {parseFloat(usdcBalance).toFixed(2)} USDC
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Allowance</span>
                              <div className="flex items-center gap-2">
                                {hasAllowance ? (
                                  <CheckCircle className="h-4 w-4 text-success" />
                                ) : (
                                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                                )}
                                <span className="text-sm font-mono text-foreground">
                                  {parseFloat(allowance).toFixed(2)} USDC
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Separator className="bg-slate-700" />

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          {!isAuthenticated && (
                            <div className="p-3 bg-muted/40 border border-border rounded-lg">
                              <p className="text-xs text-muted-foreground mb-2">
                                Need to authenticate to the backend to place orders
                              </p>
                              <Button
                                size="sm"
                                className="w-full"
                                onClick={() => authenticateWallet()}
                                disabled={isAuthenticating}
                              >
                                {isAuthenticating ? 'Signing...' : 'Sign to Authenticate'}
                              </Button>
                            </div>
                          )}

                          {!hasAllowance && isAuthenticated && (
                            <div className="p-3 bg-muted/40 border border-border rounded-lg">
                              <p className="text-xs text-muted-foreground">
                                Need to approve USDC to place orders
                              </p>
                            </div>
                          )}

                          {isAuthenticated && (
                            <Button
                              size="sm"
                              className="w-full"
                              onClick={() => approveMax()}
                              disabled={isApproving}
                            >
                              {isApproving ? 'Approving...' : 'Approve USDC'}
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-border"
                            onClick={openAccountModal}
                          >
                            Account Details
                          </Button>

                          {isAuthenticated && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full border-destructive text-destructive"
                              onClick={() => logout()}
                            >
                              Logout
                            </Button>
                          )}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
