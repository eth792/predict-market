"use client";

import Image from "next/image";
import { MessageSquare, Star, Check, X, ChevronDown, Pin, Gift } from "lucide-react";
import { useEffect, useState } from "react";

interface Market {
  id: string;
  question: string;
  iconUrl: string;
  volume: string;
  chance: number;
  isBinary: boolean;
  outcomes?: { name: string; percent: number }[];
  tags: string[];
  commentsCount: number;
}

function CircularProgress({ value }: { value: number }) {
  const [progress, setProgress] = useState(0);
  const radius = 32;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // 半圆是圆周长的一半
  const halfCircumference = circumference / 2;
  const strokeDashoffset =
    halfCircumference - (progress / 100) * halfCircumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const isHigh = value > 50;
  const strokeColor = isHigh ? "#19ea8b" : "#cd1e32";

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius + 10} width={radius * 2} className="overflow-visible">
        {/* Background semi-circle */}
        <path
          d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
          stroke="rgba(255, 255, 255, 0.1)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress semi-circle */}
        <path
          d={`M ${strokeWidth / 2} ${radius} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 - strokeWidth / 2} ${radius}`}
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={halfCircumference}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s ease-in-out",
          }}
          strokeLinecap="round"
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span className="text-sm tracking-tight text-white drop-shadow-sm transition-colors duration-300">
          {value}%
        </span>
      </div>
    </div>
  );
}

export function MarketCard({ market }: { market: Market }) {
  const isBinary = market.isBinary;

  return (
    <div className="group hover:border-primary/15 relative flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#19294f] bg-[#19294f] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* 上部分 - 带渐变背景 */}
      <div className="flex h-50 flex-col rounded-b-lg bg-linear-to-tr from-[#0e1f47] to-[#1c3563]">
        <div className="flex items-start gap-3 p-4 pb-2">
          <Image
            src={market.iconUrl}
            alt="icon"
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-md object-cover shadow-sm"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground group-hover:text-primary line-clamp-3 text-[15px] leading-snug font-medium transition-colors">
              {market.question}
            </h3>
          </div>

          {isBinary && (
            <div className="flex flex-col items-center pl-2">
              <CircularProgress value={market.chance} />
              <span className="text-muted-foreground -mt-1 text-[8px] font-semibold tracking-wider uppercase">
                chance
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-end px-4">
          {isBinary ? (
            <div className="grid grid-cols-2 gap-3 py-3">
              <button className="group/yes relative flex cursor-pointer flex-col items-center justify-center rounded-lg bg-green-500/10 py-1.5 transition-all duration-200 hover:bg-green-500/80">
                <span className="text-xs tracking-wider text-green-500 uppercase group-hover/yes:text-white">
                  Buy Yes
                </span>
              </button>
              <button className="group/no relative flex cursor-pointer flex-col items-center justify-center rounded-lg bg-red-500/10 py-1.5 transition-all duration-200 hover:bg-red-500/80">
                <span className="text-xs tracking-wider text-red-500 uppercase group-hover/no:text-white">
                  Buy No
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-1 pb-3">
              {market.outcomes?.slice(0, 3).map((outcome, idx) => (
                <div
                  key={idx}
                  className="group/item relative flex items-center justify-between rounded-md bg-black/5 p-1 transition-colors hover:bg-black/20"
                >
                  <div className="relative z-10 flex min-w-0 flex-1 items-center gap-2 pr-2 pl-1">
                    <span className="text-foreground/60 group-hover/item:text-foreground truncate text-xs font-medium transition-colors">
                      {outcome.name}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="text-primary pr-1 text-xs">
                      {outcome.percent}%
                    </span>
                    <button
                      className="flex items-center justify-center rounded-md bg-teal-600/30 p-1 text-green-400 transition-colors hover:bg-teal-600/50 hover:text-green-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 处理对勾按钮点击
                      }}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <div className="bg-foreground/10 h-4 w-px" />
                    <button
                      className="flex items-center justify-center rounded-md bg-red-900/40 p-1 text-red-400 transition-colors hover:bg-red-900/50 hover:text-red-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: 处理叉叉按钮点击
                      }}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {market.outcomes && market.outcomes.length > 3 && (
                <div className="flex items-center justify-center gap-1 pt-1">
                  <span className="text-muted-foreground hover:text-foreground text-xs font-medium transition-colors">
                    Show {market.outcomes.length - 3} more
                  </span>
                  <ChevronDown className="text-muted-foreground h-3.5 w-3.5" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 下部分 - 信息栏 */}
      <div className="mt-auto bg-[#19294f] px-4 py-3">
        <div className="text-muted-foreground flex items-center justify-between text-xs font-medium">
          <div className="flex items-center gap-1">
            <Pin className="h-3.5 w-3.5 text-white/80" />
            <span>{market.volume} Vol.</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hover:text-foreground flex items-center gap-1 transition-colors">
              <Gift className="h-3.5 w-3.5" />
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{market.commentsCount}</span>
            </div>
            <button className="transition-colors hover:text-yellow-400">
              <Star className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
