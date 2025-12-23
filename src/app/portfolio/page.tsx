"use client";

/* ============================================================
 * Portfolio Page
 * Displays wallet-specific stats, positions, orders, and history
 * ============================================================ */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PortfolioStats } from "@/components/portfolio/PortfolioStats";
import { PositionsTab } from "@/components/portfolio/PositionsTab";
import { OpenOrdersTab } from "@/components/portfolio/OpenOrdersTab";
import { FinishedOrdersTab } from "@/components/portfolio/FinishedOrdersTab";
import { HistoryTab } from "@/components/portfolio/HistoryTab";
import { useAccount } from "wagmi";
import Link from "next/link";

function shortAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function PortfolioPage() {
  const { isConnected, address } = useAccount();

  if (!isConnected || !address) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <div>
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Portfolio
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">
            Connect wallet to view your portfolio
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Use the wallet button in the sidebar to connect and unlock balances,
            positions, and order history.
          </p>
        </div>
        <Link href="/">
          <Button variant="secondary">Back to Markets</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Portfolio Overview
          </p>
          <div className="flex flex-col gap-1 text-left">
            <h1 className="text-3xl font-semibold text-foreground">
              Your markets activity
            </h1>
            <p className="text-sm text-muted-foreground">
              Wallet {shortAddress(address)} • Track balances, open orders, and fills.
            </p>
          </div>
        </header>

        <PortfolioStats address={address} />

        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="open-orders">Open Orders</TabsTrigger>
            <TabsTrigger value="finished-orders">Finished Orders</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="space-y-4">
            <PositionsTab address={address} />
          </TabsContent>

          <TabsContent value="open-orders" className="space-y-4">
            <OpenOrdersTab address={address} />
          </TabsContent>

          <TabsContent value="finished-orders" className="space-y-4">
            <FinishedOrdersTab address={address} />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <HistoryTab address={address} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
