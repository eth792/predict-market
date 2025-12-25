import Image from "next/image";
import { RECENT_ACTIVITY, TOP_VOLUME } from "@/data/dashboard";

export function ActivitySection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-card backdrop-blur-sm rounded-xl border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-foreground">Recent Activity</h3>
          <a href="#" className="text-xs text-primary hover:text-foreground flex items-center gap-1 font-medium">
            Show all ›
          </a>
        </div>
        <div className="space-y-4">
          {RECENT_ACTIVITY.map((item, idx) => (
            <div key={idx} className="flex items-start md:items-center justify-between text-sm group cursor-default">
              <div className="flex items-center gap-3 w-full">
                <span className="text-muted-foreground w-4 font-mono text-xs hidden md:block">{idx + 1}</span>
                <Image src={item.avatarUrl} alt="" width={32} height={32} className="w-8 h-8 rounded-full bg-accent ring-2 ring-transparent group-hover:ring-primary/30 transition-all" />

                <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-1.5 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground">{item.user}</span>
                    <span className="text-muted-foreground text-xs">{item.action}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${item.team === 'No' ? 'text-red-500' : item.team === 'Yes' ? 'text-green-500' : 'text-primary'}`}>
                      {item.marketName}
                    </span>
                    <span className="md:hidden text-xs text-muted-foreground">• {item.timeAgo}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end min-w-[80px]">
                <div className="text-foreground font-mono text-xs">{item.price}</div>
                <span className="text-[10px] text-muted-foreground">{item.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card backdrop-blur-sm rounded-xl border border-border p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-foreground">Top Volume This Week</h3>
          <a href="#" className="text-xs text-primary hover:text-foreground flex items-center gap-1 font-medium">
            Show all ›
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOP_VOLUME.map((item) => (
            <div key={item.rank} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
              <span className="text-muted-foreground w-4 text-sm font-mono">{item.rank}</span>
              <Image src={item.avatarUrl} alt="" width={40} height={40} className="w-10 h-10 rounded-full bg-accent" />
              <div className="flex flex-col">
                <div className="font-semibold text-foreground text-sm hover:text-primary transition-colors">{item.name}</div>
                <div className="text-xs text-muted-foreground font-mono tracking-wide">{item.volume}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
