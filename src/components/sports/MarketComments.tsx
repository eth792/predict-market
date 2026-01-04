"use client";

import { SPORTS_COMMENTS } from "@/data/static-data";

export function MarketComments() {
  return (
    <div className="mt-4 space-y-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 rounded-lg border border-[#184470] bg-[#00133c]/30 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#00a3ff] focus:outline-none"
        />
        <button className="text-xm cursor-pointer rounded-lg bg-linear-to-r from-blue-600 to-blue-400 px-8 py-1.5 font-medium text-white transition-colors hover:bg-[#0090e0]">
          Post
        </button>
      </div>

      {/* 警告提示 */}
      <div
        className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-r from-[#1e3a8a] to-[#0e1f42] p-3"
        style={{
          backgroundColor: "#1e3a8a",
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(96, 165, 250, 0.15) 0px,
              rgba(96, 165, 250, 0.15) 1px,
              transparent 1px,
              transparent 12px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(96, 165, 250, 0.15) 0px,
              rgba(96, 165, 250, 0.15) 1px,
              transparent 1px,
              transparent 12px
            )
          `,
        }}
      >
        <svg
          className="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
        >
          <path
            d="M503.466667 140.8c119.466667 64 217.6 119.466667 320 170.666667 0 226.133333-106.666667 456.533333-320 597.333333-213.333333-140.8-320-371.2-320-597.333333 93.866667-51.2 200.533333-106.666667 320-170.666667z m-68.266667 85.333333c-21.333333 12.8-21.333333 12.8-42.666667 21.333334-17.066667 8.533333-29.866667 12.8-38.4 21.333333-55.466667 25.6-93.866667 46.933333-128 68.266667 8.533333 204.8 106.666667 396.8 277.333334 520.533333 170.666667-123.733333 268.8-315.733333 277.333333-520.533333-25.6-12.8-55.466667-29.866667-89.6-46.933334-34.133333-17.066667-140.8-76.8-187.733333-102.4-21.333333 12.8-42.666667 21.333333-68.266667 38.4z"
            fill="#ffffff"
          ></path>
        </svg>
        <p className="text-xm font-medium text-gray-200">
          Beware of external links, they may be phishing attacks.
        </p>
      </div>

      {/* 评论列表 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <input type="checkbox" className="rounded border-[#184470]" />
            <span>Holders</span>
          </label>
          <button className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#184470] bg-[#00133c]/30 px-3 py-1.5 text-xs text-gray-400 hover:text-white">
            <span>Newest</span>
            <svg
              className="h-3.5 w-3.5"
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

        {SPORTS_COMMENTS.map((comment) => (
          <div
            key={comment.id}
            className="flex gap-3 border-b border-white/10 pb-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00133c]">
              <span className="text-xl">{comment.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {comment.author}
                </span>
                <span className="text-xs text-gray-500">{comment.time}</span>
              </div>
              <p className="mt-1 text-sm text-gray-300">{comment.text}</p>
            </div>
            <div className="flex flex-col items-end justify-end gap-1">
              <button className="ml-auto cursor-pointer">
                <svg
                  className="h-4 w-4 text-gray-400 hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              <button className="mt-2 flex cursor-pointer items-center gap-1 text-xs text-gray-400 hover:text-white">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{comment.likes}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Show more 按钮 */}
        <div className="flex justify-center">
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
    </div>
  );
}
