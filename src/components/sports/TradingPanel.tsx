"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TradingPanel() {
  const [tradeType, setTradeType] = useState<"Buy" | "Sell" | "Market">("Buy");
  const [outcome, setOutcome] = useState<"yes" | "no">("yes");
  const [amount, setAmount] = useState("25");
  const [sliderValue, setSliderValue] = useState(25);
  const [selectedMarket, setSelectedMarket] = useState("Market");
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  const marketOptions = ["Market", "Limit", "Stop Loss", "Take Profit"];

  const yesPrice = 14;
  const noPrice = 89;
  const currentPrice = outcome === "yes" ? yesPrice : noPrice;

  const calculateToWin = () => {
    const amountValue = parseFloat(amount) || 0;
    if (amountValue === 0) return "0.00";
    const toWin = (amountValue / currentPrice) * 100;
    return toWin.toFixed(2);
  };

  const handleQuickAmount = (value: number) => {
    const newAmount = value;
    setAmount(newAmount.toString());
    setSliderValue(newAmount);
  };

  const handleMax = () => {
    setAmount("1000");
    setSliderValue(1000);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    const numValue = parseFloat(value) || 0;
    setSliderValue(Math.min(Math.max(numValue, 0), 1000));
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    setAmount(value.toString());
  };

  const handleNumberInputWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const handleNumberInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  return (
    <div
      className="sticky top-30 space-y-4 rounded-xl border border-[#184470] bg-[#0e1f46]/40 p-6"
      style={{
        background: "radial-gradient(ellipse at top center, #223969, #0e1f47)",
      }}
    >
      {/* 用户信息 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
            <Image
              src="/elon_musk.jpeg"
              alt="Elon Musk"
              width={40}
              height={40}
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <span className="text-lg font-bold text-[#e74c3c]">&lt;800</span>
        </div>
      </div>

      {/* Buy/Sell/Market 标签页 */}
      <div className="flex items-center justify-between gap-0 border-b border-[#184470] pl-8">
        <div className="flex w-30 items-center justify-start gap-0">
          <button
            onClick={() => setTradeType("Buy")}
            className={`relative w-15 cursor-pointer border-b-2 border-transparent py-2 text-sm font-medium transition-colors ${
              tradeType === "Buy"
                ? "border-b-[#00a3ff] bg-linear-to-b from-transparent via-[#00a3ff]/5 to-[#00a3ff]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setTradeType("Sell")}
            className={`relative w-15 cursor-pointer border-b-2 border-transparent py-2 text-sm font-medium transition-colors ${
              tradeType === "Sell"
                ? "border-b-[#e74c3c] bg-linear-to-b from-transparent via-[#e74c3c]/5 to-[#e74c3c]/20"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sell
          </button>
        </div>
        <Popover open={isMarketOpen} onOpenChange={setIsMarketOpen}>
          <PopoverTrigger asChild>
            <button
              className={`relative flex flex-1 cursor-pointer items-center justify-end gap-1 py-2 text-sm font-medium transition-colors ${
                tradeType === "Market"
                  ? "text-[#00a3ff]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <span className="relative inline-flex items-center gap-1">
                <span>{selectedMarket}</span>
                <svg
                  className={`h-3 w-3 transition-transform ${
                    isMarketOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-48 rounded-lg border border-[#184470] bg-[#00133c] p-1"
            align="end"
            sideOffset={4}
          >
            <div className="flex flex-col">
              {marketOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedMarket(option);
                    setIsMarketOpen(false);
                    setTradeType("Market");
                  }}
                  className={`cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    selectedMarket === option
                      ? "bg-[#00a3ff]/20 text-[#00a3ff]"
                      : "text-gray-400 hover:bg-[#00133c]/50 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Outcome 选择 */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <label className="text-xs text-gray-400">Outcome</label>
            <button className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-600/50 text-[10px] text-gray-400 hover:bg-gray-600/70 hover:text-white">
              i
            </button>
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#00133c]/50 text-gray-400 hover:bg-[#00133c]/70 hover:text-white">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
            <button className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-[#00133c]/50 text-gray-400 hover:bg-[#00133c]/70 hover:text-white">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOutcome("yes")}
            className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors ${
              outcome === "yes"
                ? "border-transparent bg-linear-to-r from-blue-600 to-blue-400 text-white"
                : "border-[#184470] bg-[#00133c]/30 text-gray-400 hover:bg-[#00133c]/50"
            }`}
          >
            Yes {yesPrice}¢
          </button>
          <button
            onClick={() => setOutcome("no")}
            className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition-colors ${
              outcome === "no"
                ? "border-transparent bg-linear-to-r from-[#ff2d17] via-[#ff3b25] to-[#ff6654] text-white"
                : "border-[#00a3ff] bg-[#00133c]/30 text-white hover:bg-[#00133c]/50"
            }`}
          >
            No {noPrice}¢
          </button>
        </div>
      </div>

      {/* Amount 金额输入 */}
      <div>
        <label className="mb-2 block text-xs text-gray-400">Amount</label>
        <div className="relative">
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-white">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            onWheel={handleNumberInputWheel}
            onKeyDown={handleNumberInputKeyDown}
            placeholder="0"
            className="w-full [appearance:textfield] rounded-lg border border-[#184470] bg-[#00133c]/50 py-2.5 pr-45 pl-7 text-left text-white placeholder-gray-500 focus:border-[#00a3ff] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <div className="absolute top-1/2 right-2 flex -translate-y-1/2 gap-1">
            <button
              onClick={() => handleQuickAmount(5)}
              className="cursor-pointer rounded bg-[#00a3ff]/20 px-2 py-1 text-xs font-medium text-[#00a3ff] hover:bg-[#00a3ff]/30"
            >
              +$5
            </button>
            <button
              onClick={() => handleQuickAmount(20)}
              className="cursor-pointer rounded bg-[#00a3ff]/20 px-2 py-1 text-xs font-medium text-[#00a3ff] hover:bg-[#00a3ff]/30"
            >
              +$20
            </button>
            <button
              onClick={handleMax}
              className="cursor-pointer rounded bg-[#00a3ff]/20 px-2 py-1 text-xs font-medium text-[#00a3ff] hover:bg-[#00a3ff]/30"
            >
              Max
            </button>
          </div>
        </div>

        {/* 滑块 */}
        <div className="mt-3">
          <input
            type="range"
            min="0"
            max="1000"
            value={sliderValue}
            onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#00133c]/50 accent-[#00a3ff]"
            style={{
              background: `linear-gradient(to right, #00a3ff 0%, #00a3ff ${(sliderValue / 1000) * 100}%, #00133c 0%, #00133c 100%)`,
            }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 rounded-lg bg-[#00133c]/30 p-3">
        {/* Avg price */}
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-400">Avg price</span>
          <span className="text-sm font-medium text-white">
            {currentPrice}¢
          </span>
        </div>
        {/* To win */}
        <div className="h-px w-full bg-white/10" />
        <div className="flex w-full items-center justify-between">
          <span className="text-sm text-gray-400">To win</span>
          <span className="text-sm font-bold text-[#32dd8a]">
            ${calculateToWin()}
          </span>
        </div>
      </div>

      {/* Unavailable 按钮 */}
      <button
        disabled
        className="w-full cursor-not-allowed rounded-lg border-transparent bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 py-3 text-sm font-medium text-white opacity-80"
      >
        Unavailable
      </button>

      {/* 协议提示 */}
      <p className="text-center text-xs text-gray-500">
        By trading, you agree to the{" "}
        <button className="cursor-pointer hover:underline">Terms of Use</button>
      </p>

      {/* 反馈链接 */}
      <button className="flex w-full cursor-pointer items-center justify-center gap-1.5 text-xs text-gray-500 hover:underline">
        <span>Give feedback on recent updates</span>
        <div className="relative">
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
          </svg>
          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full" />
        </div>
      </button>
    </div>
  );
}
