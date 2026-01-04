"use client";

import { SPORTS_TOP_HOLDERS } from "@/data/static-data";

export function MarketTopHolders() {
  return (
    <div className="mt-4 space-y-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* YES HOLDERS */}
        <div>
          <div className="mb-3 flex items-center justify-between border-b-2 border-transparent pb-2">
            <h3 className="text-base font-bold text-white">Yes holders</h3>
            <span className="text-xs font-bold tracking-wider text-gray-500">
              SHARES
            </span>
          </div>
          <div className="space-y-1">
            {SPORTS_TOP_HOLDERS.yesHolders.map((holder, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer items-center justify-between rounded px-2 py-2 transition hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00133c]">
                    <span className="text-lg">{holder.avatar}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {holder.user}
                  </span>
                </div>
                <span className="font-mono text-sm font-medium text-green-400">
                  {holder.shares.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* NO HOLDERS */}
        <div>
          <div className="mb-3 flex items-center justify-between border-b-2 border-transparent pb-2">
            <h3 className="text-base font-bold text-white">No holders</h3>
            <span className="text-xs font-bold tracking-wider text-gray-500">
              SHARES
            </span>
          </div>
          <div className="space-y-1">
            {SPORTS_TOP_HOLDERS.noHolders.map((holder, idx) => (
              <div
                key={idx}
                className="flex cursor-pointer items-center justify-between rounded px-2 py-2 transition hover:bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00133c]">
                    <span className="text-lg">{holder.avatar}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-200">
                    {holder.user}
                  </span>
                </div>
                <span className="font-mono text-sm font-medium text-red-400">
                  {holder.shares.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
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
