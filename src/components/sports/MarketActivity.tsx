"use client";

import { SPORTS_ACTIVITY } from "@/data/static-data";

export function MarketActivity() {
  return (
    <div className="mt-4 space-y-4">
      {/* 筛选器 */}
      <div className="flex gap-4">
        <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0a1628]/50 px-4 py-1.5 text-sm font-medium text-white">
          All
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#0a1628]/50 px-4 py-1.5 text-sm font-medium text-white">
          Min amount
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
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* 交易记录列表 */}
      <div className="space-y-0">
        {SPORTS_ACTIVITY.map((item) => (
          <div
            key={item.id}
            className="group flex items-center justify-between border-b border-white/5 px-2 py-3 transition hover:bg-white/5"
          >
            {/* 左侧：文字描述 */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#00133c]">
                <span className="text-lg">{item.avatar}</span>
              </div>
              <div className="truncate text-sm text-gray-300">
                <span className="cursor-pointer font-bold text-white hover:underline">
                  {item.user}
                </span>
                <span className="mx-1">{item.action}</span>
                <span
                  className={
                    item.outcome === "Yes"
                      ? "font-bold text-green-400"
                      : "font-bold text-red-400"
                  }
                >
                  {item.amount.toLocaleString()} {item.outcome}
                </span>
                <span className="mx-1">for</span>
                <span className="font-medium text-white">
                  {Math.floor((item.price * item.amount) / 100).toLocaleString()}
                </span>
                <span className="mx-1">at</span>
                <span className="text-gray-400">{item.price}¢</span>
                <span className="mx-1 text-gray-500">(${item.value})</span>
              </div>
            </div>

            {/* 右侧：时间和链接 */}
            <div className="flex items-center gap-2 pl-4">
              <span className="whitespace-nowrap text-sm text-gray-500">
                {item.time}
              </span>
              <svg
                className="h-3.5 w-3.5 cursor-pointer text-gray-500 hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Show more 按钮 */}
      <div className="mt-8 flex justify-center">
        <div className="relative inline-flex rounded-full bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 p-px">
          <button className="flex cursor-pointer items-center space-x-1.5 rounded-full bg-[#00133c] px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-[#00133c]/90">
            <span>Show more</span>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20">
              <svg
                className="h-2.5 w-2.5 text-[#00a3ff]"
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
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
