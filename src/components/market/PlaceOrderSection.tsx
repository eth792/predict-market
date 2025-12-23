"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import { usePlaceOrder, useWalletState } from "@/hooks/useWeb3";
import { useAccount } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/api/hooks";
import { cn } from "@/lib/utils";

interface PlaceOrderSectionProps {
  marketId: string;
  selectedOutcome: 'yes' | 'no';
  onOrderPlaced?: () => void;
  className?: string;
}

export function PlaceOrderSection({ marketId, selectedOutcome, onOrderPlaced, className }: PlaceOrderSectionProps) {
  const { isConnected } = useAccount();
  const { usdcBalance, allowance } = useWalletState();
  const placeOrder = usePlaceOrder();
  const queryClient = useQueryClient();
  const hasHandledSuccessRef = useRef(false);

  const [buyPrice, setBuyPrice] = useState("");
  const [buyQuantity, setBuyQuantity] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellQuantity, setSellQuantity] = useState("");
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    if (placeOrder.isSuccess && !hasHandledSuccessRef.current) {
      if (activeTab === 'buy') {
        setBuyPrice("");
        setBuyQuantity("");
      } else {
        setSellPrice("");
        setSellQuantity("");
      }

      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.marketOrderBook(marketId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.orders.marketOrderBookDepth(marketId),
      });

      onOrderPlaced?.();
      hasHandledSuccessRef.current = true;
    } else if (!placeOrder.isSuccess && hasHandledSuccessRef.current) {
      hasHandledSuccessRef.current = false;
    }
  }, [placeOrder.isSuccess, activeTab, marketId, onOrderPlaced, queryClient]);

  const handlePlaceOrder = () => {
    const isBuy = activeTab === 'buy';
    const price = isBuy ? buyPrice : sellPrice;
    const quantity = isBuy ? buyQuantity : sellQuantity;

    if (!price || !quantity || parseFloat(price) <= 0 || parseFloat(quantity) <= 0) {
      alert("Please enter valid price and quantity");
      return;
    }

    placeOrder.placeOrder({
      marketId,
      isYes: selectedOutcome === 'yes',
      side: isBuy ? 0 : 1,
      shares: quantity,
      price: price,
    });
  };

  const calculateTotal = (price: string, quantity: string) => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(quantity) || 0;
    return (p * q).toFixed(2);
  };

  const isProcessing = placeOrder.isPending || placeOrder.isConfirming;

  if (!isConnected) {
    return (
      <div className={cn("rounded-xl border border-border bg-card p-6 text-center text-muted-foreground", className)}>
        Connect your wallet to place an order.
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border border-border bg-card p-6 space-y-6", className)}>
      <div>
        <div className="text-base font-semibold text-foreground">
          Place Order · {selectedOutcome.toUpperCase()}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          USDC Balance: {parseFloat(usdcBalance).toFixed(2)} · Allowance {parseFloat(allowance).toFixed(2)} USDC
        </div>
      </div>

      <div>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'buy' | 'sell')}>
          <TabsList className="grid w-full grid-cols-2 bg-muted">
            <TabsTrigger value="buy" className="data-[state=active]:bg-success text-success-foreground">
              Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-destructive text-destructive-foreground">
              Sell
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Price (USDC)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={buyPrice}
                onChange={(e) => setBuyPrice(e.target.value)}
                placeholder="0.00"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity (Shares)</Label>
              <Input
                type="number"
                step="1"
                min="0"
                value={buyQuantity}
                onChange={(e) => setBuyQuantity(e.target.value)}
                placeholder="0"
                disabled={isProcessing}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Cost:</span>
              <span className="font-mono">{calculateTotal(buyPrice, buyQuantity)} USDC</span>
            </div>

            {isProcessing && (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <p className="text-sm text-primary">
                    ⏳ {placeOrder.isPending ? "Sending transaction..." : "Confirming on-chain..."}
                </p>
              </div>
            )}

            {placeOrder.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  {placeOrder.error.message}
                </p>
              </div>
            )}

            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !buyPrice || !buyQuantity}
              className="w-full"
              variant="success"
            >
              {isProcessing ? "Processing..." : `Buy ${selectedOutcome.toUpperCase()}`}
            </Button>
          </TabsContent>

          <TabsContent value="sell" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Price (USDC)</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                placeholder="0.00"
                disabled={isProcessing}
              />
            </div>
            <div className="space-y-2">
              <Label>Quantity (Shares)</Label>
              <Input
                type="number"
                step="1"
                min="0"
                value={sellQuantity}
                onChange={(e) => setSellQuantity(e.target.value)}
                placeholder="0"
                disabled={isProcessing}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Total Revenue:</span>
              <span className="font-mono">{calculateTotal(sellPrice, sellQuantity)} USDC</span>
            </div>

            {isProcessing && (
              <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                  <p className="text-sm text-primary">
                    ⏳ {placeOrder.isPending ? "Sending transaction..." : "Confirming on-chain..."}
                </p>
              </div>
            )}

            {placeOrder.error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  {placeOrder.error.message}
                </p>
              </div>
            )}

            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing || !sellPrice || !sellQuantity}
              className="w-full"
              variant="destructive"
            >
              {isProcessing ? "Processing..." : `Sell ${selectedOutcome.toUpperCase()}`}
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
