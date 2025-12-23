"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Loader2, AlertCircle, ExternalLink } from "lucide-react";

interface PlaceOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderDetails: {
    outcome: 'yes' | 'no';
    side: 'buy' | 'sell';
    price: number;
    quantity: number;
  } | null;
  status: {
    isPending: boolean;
    isConfirming: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: Error | null;
    hash?: string;
  };
  onClose: () => void;
}

export function PlaceOrderDialog({
  open,
  onOpenChange,
  orderDetails,
  status,
  onClose,
}: PlaceOrderDialogProps) {
  if (!orderDetails) return null;

  const { outcome, side, price, quantity } = orderDetails;
  const { isPending, isConfirming, isSuccess, isError, error, hash } = status;

  const total = (price * quantity) / 100;
  const isBuying = side === 'buy';

  const getExplorerUrl = (txHash: string) => {
    return `https://etherscan.io/tx/${txHash}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {isBuying ? 'Buy' : 'Sell'} {outcome.toUpperCase()} Order
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Blockchain Transaction Progress
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Details */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Type</span>
              <Badge variant={isBuying ? 'default' : 'destructive'}>
                {side.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Outcome</span>
              <span className="font-semibold">{outcome.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Price</span>
              <span className="font-semibold">{price}¢</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Quantity</span>
              <span className="font-semibold">{quantity}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-700">
              <span className="text-slate-300 font-semibold">Total</span>
              <span className="text-lg font-bold text-green-400">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Transaction Status */}
          <div className="space-y-4">
            {/* Waiting for Signature */}
            <div className={`flex items-start space-x-3 ${
              isPending ? 'opacity-100' : isConfirming || isSuccess ? 'opacity-50' : 'opacity-100'
            }`}>
              <div className="mt-1">
                {isPending ? (
                  <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
                ) : isConfirming || isSuccess ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : isError ? (
                  <XCircle className="h-5 w-5 text-red-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">Waiting for Signature</div>
                <div className="text-sm text-slate-400">
                  {isPending ? 'Please confirm the transaction in your wallet...' : 'Waiting for user signature'}
                </div>
              </div>
            </div>

            {/* Waiting for Confirmation */}
            <div className={`flex items-start space-x-3 ${
              isConfirming ? 'opacity-100' : isSuccess ? 'opacity-50' : 'opacity-30'
            }`}>
              <div className="mt-1">
                {isConfirming ? (
                  <Loader2 className="h-5 w-5 text-yellow-400 animate-spin" />
                ) : isSuccess ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">Waiting for Block Confirmation</div>
                <div className="text-sm text-slate-400">
                  {isConfirming ? 'Transaction submitted, waiting for confirmation...' : 'Waiting for blockchain confirmation'}
                </div>
                {hash && (
                  <a
                    href={getExplorerUrl(hash)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1"
                  >
                    View Transaction <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Completed */}
            <div className={`flex items-start space-x-3 ${
              isSuccess ? 'opacity-100' : 'opacity-30'
            }`}>
              <div className="mt-1">
                {isSuccess ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-slate-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">Order Created</div>
                <div className="text-sm text-slate-400">
                  {isSuccess ? 'Your order has been successfully submitted on-chain!' : 'Waiting for completion'}
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {isError && error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-red-400">Transaction Failed</div>
                <div className="text-sm text-red-300 mt-1">
                  {error.message.includes('User rejected') || error.message.includes('user rejected')
                    ? 'You cancelled the transaction'
                    : error.message}
                </div>
              </div>
            </div>
          )}

          {/* Success Message */}
          {isSuccess && (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-semibold text-green-400">Order Submitted!</div>
                <div className="text-sm text-green-300 mt-1">
                  Your order has been successfully submitted on-chain and is awaiting matching.
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {(isSuccess || isError) && (
              <Button
                onClick={onClose}
                className="flex-1 bg-slate-700 hover:bg-slate-600"
              >
                Close
              </Button>
            )}
            {hash && (
              <Button
                onClick={() => window.open(getExplorerUrl(hash), '_blank')}
                variant="outline"
                className="flex-1 border-slate-600 hover:bg-slate-800"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Transaction
              </Button>
            )}
          </div>

          {/* Hint Message */}
          {isPending && (
            <div className="text-xs text-slate-400 text-center">
              If the wallet popup does not appear, please check your browser extensions
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
