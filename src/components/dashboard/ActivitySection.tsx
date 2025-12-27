import Image from "next/image";
import { RECENT_ACTIVITY, TOP_VOLUME } from "@/data/dashboard";

export function ActivitySection() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div
        className="rounded-xl border border-white/10 p-4"
        style={{
          background:
            "radial-gradient(ellipse at top center, #223969, #0e1f47)",
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-foreground text-lg font-bold">Recent Activity</h3>
          <a
            href="#"
            className="flex items-center gap-1 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-xs font-medium text-transparent hover:from-blue-500 hover:via-blue-400 hover:to-blue-300"
          >
            Show all
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20">
              <svg
                className="h-2.5 w-2.5 -rotate-90 text-[#00a3ff]"
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
          </a>
        </div>
        <div className="space-y-0">
          {RECENT_ACTIVITY.map((item, idx) => (
            <div key={idx}>
              <div className="flex cursor-pointer items-start justify-between rounded-lg px-2 py-1.5 text-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15 hover:shadow-md">
                <div className="flex min-w-0 flex-1 items-start gap-3">
                  <span className="text-muted-foreground w-4 shrink-0 pt-1 font-mono text-xs">
                    {idx + 1}
                  </span>
                  <Image
                    src={item.avatarUrl}
                    alt=""
                    width={32}
                    height={32}
                    className="bg-accent h-8 w-8 shrink-0 rounded-full"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-foreground font-semibold whitespace-nowrap">
                        {item.user}
                      </span>
                      <span className="text-foreground whitespace-nowrap">
                        {item.action}
                      </span>
                      <span className="font-semibold whitespace-nowrap text-blue-400">
                        {item.marketName}
                      </span>
                      <span className="text-foreground whitespace-nowrap">
                        at
                      </span>
                      <span className="text-foreground whitespace-nowrap">
                        {item.price}
                      </span>
                      <span className="text-foreground/50 whitespace-nowrap">
                        ({item.totalValue})
                      </span>
                    </div>
                    <div className="text-muted-foreground text-xs">
                      {item.context}
                    </div>
                  </div>
                </div>
                <div className="text-foreground/50 ml-4 shrink-0 text-xs">
                  {item.timeAgo}
                </div>
              </div>
              {idx < RECENT_ACTIVITY.length - 1 && (
                <div className="border-t border-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl border border-white/10 p-4"
        style={{
          background:
            "radial-gradient(ellipse at top center, #223969, #0e1f47)",
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-foreground text-lg font-bold">
            Top Volume This Week
          </h3>
          <a
            href="#"
            className="flex items-center gap-1 bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-xs font-medium text-transparent hover:from-blue-500 hover:via-blue-400 hover:to-blue-300"
          >
            Show all
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-400/20">
              <svg
                className="h-2.5 w-2.5 -rotate-90 text-[#00a3ff]"
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
          </a>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          {TOP_VOLUME.map((item) => (
            <div
              key={item.rank}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 p-2 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/15 hover:shadow-md"
            >
              <span className="text-foreground w-4 font-mono text-xs">
                {item.rank}
              </span>
              <Image
                src={item.avatarUrl}
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 rounded-full"
              />
              <div className="flex flex-1 flex-col">
                <div className="text-foreground text-xs font-semibold">
                  {item.name}
                </div>
                <div className="text-foreground/70 font-mono text-xs tracking-wide">
                  {item.volume}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
