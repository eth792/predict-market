"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  HelpCircle,
  ChevronDown,
  Bookmark,
  Link,
  Bell,
  MoreHorizontal,
  Shield,
  Heart,
  MessageCircle,
  Upload,
  BarChart2,
  Settings2,
  Info,
  ArrowUpRight,
  ExternalLink,
  Check,
  RotateCw
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Drawer } from "vaul";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// --- MOCK DATA ---
const mockData = {
  market: {
    title: "Elon Musk # of tweets Feb 7-14? (Higher Options)",
    volume: "167,939",
    endDate: "Feb 14, 2025",
    tweetCount: "654",
    timeLef: {
      days: 2,
      hours: 0,
      minutes: 55,
      seconds: 5,
    },
  },
  chartData: [
    { name: "9:50am", "<800": 13, "800-824": 17, "825-849": 18, "850-874": 17 },
    { name: "10:00am", "<800": 14, "800-824": 19, "825-849": 22, "850-874": 15 },
    { name: "10:10am", "<800": 15, "800-824": 20, "825-849": 20, "850-874": 18 },
    { name: "10:20am", "<800": 12, "800-824": 16, "825-849": 19, "850-874": 19 },
    { name: "10:30am", "<800": 11, "800-824": 15, "825-849": 21, "850-874": 20 },
    { name: "10:40am", "<800": 13, "800-824": 17, "825-849": 18, "850-874": 17 },
  ],
  outcomes: [
    { name: "<800", chance: 13, volume: "34,319", yesPrice: 14, noPrice: 89 },
    { name: "800-824", chance: 17, volume: "11,524", yesPrice: 18, noPrice: 84 },
    { name: "825-849", chance: 18, volume: "10,289", yesPrice: 18, noPrice: 83 },
    { name: "850-874", chance: 17, volume: "9,501", yesPrice: 17, noPrice: 82 },
    { name: ">874", chance: 35, volume: "50,123", yesPrice: 35, noPrice: 65 },
  ],
  comments: [
    {
      id: 1,
      author: "Leo Torff",
      ago: "2h ago",
      text: "Some of you would really wish you would have bought 1000 tomorrow",
      avatar: "/logo.jpg",
      likes: 17,
    },
    {
      id: 2,
      author: "Maria Septimus",
      ago: "2h ago",
      text: "you guys see him post 10 times in 5 minutes and market doesn't bulge xd",
      avatar: "/logo.jpg",
      likes: 24,
    },
    {
      id: 3,
      author: "Paityn Korsgaard",
      ago: "2h ago",
      text: "Next 12 hours he will reach 820, next 36 he will make a new record and go to 10001",
      avatar: "/logo.jpg",
      likes: 32,
    },
  ],
  yesHolders: [
    { user: "Alex Chen", avatar: "/logo.jpg", shares: 12543 },
    { user: "Sarah Johnson", avatar: "/logo.jpg", shares: 8921 },
    { user: "Mike Brown", avatar: "/logo.jpg", shares: 7654 },
    { user: "Emma Wilson", avatar: "/logo.jpg", shares: 6432 },
    { user: "James Lee", avatar: "/logo.jpg", shares: 5123 },
  ],
  noHolders: [
    { user: "David Kim", avatar: "/logo.jpg", shares: 15234 },
    { user: "Lisa Wang", avatar: "/logo.jpg", shares: 11456 },
    { user: "Tom Harris", avatar: "/logo.jpg", shares: 9876 },
    { user: "Anna Davis", avatar: "/logo.jpg", shares: 7654 },
    { user: "Chris Martin", avatar: "/logo.jpg", shares: 6543 },
  ],
  activity: [
    { id: 1, user: "Alex Chen", avatar: "/logo.jpg", action: "bought", amount: 1000, outcome: "Yes", price: 14, value: "140.00", time: "2m ago" },
    { id: 2, user: "Sarah Johnson", avatar: "/logo.jpg", action: "sold", amount: 500, outcome: "No", price: 86, value: "430.00", time: "5m ago" },
    { id: 3, user: "Mike Brown", avatar: "/logo.jpg", action: "bought", amount: 750, outcome: "Yes", price: 15, value: "112.50", time: "8m ago" },
    { id: 4, user: "Emma Wilson", avatar: "/logo.jpg", action: "bought", amount: 2000, outcome: "No", price: 85, value: "1700.00", time: "12m ago" },
  ],
};

const chartColors = {
  "<800": "#34d399",
  "800-824": "#60a5fa",
  "825-849": "#c084fc",
  "850-874": "#f87171",
};

// --- SUB-COMPONENTS ---

const MarketHeader = () => (
  <div>
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
      <div className="flex items-start gap-4">
        <Image
          src="/logo.jpg"
          alt="Market Icon"
          width={64}
          height={64}
          className="w-16 h-16 rounded-lg border border-[#19294f] hidden sm:block"
        />
        <div>
          <h1 className="text-xl md:text-2xl font-bold mb-2 leading-tight text-white tracking-tight">
            {mockData.market.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 font-medium">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              ${mockData.market.volume} Vol.
            </span>
            <span>{mockData.market.endDate}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="p-2 rounded-full border border-[#19294f] text-gray-400 hover:text-white hover:bg-white/5">
          <Bookmark className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full border border-[#19294f] text-gray-400 hover:text-white hover:bg-white/5">
          <Link className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full border border-[#19294f] text-gray-400 hover:text-white hover:bg-white/5">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Countdown Area */}
    <div className="bg-linear-to-r from-[#0e1f47] to-[#1c3563] rounded-xl p-4 md:p-6 border border-[#19294f] flex flex-wrap justify-between items-center gap-4 relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider">Tweet Count</div>
        <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">{mockData.market.tweetCount}</div>
      </div>

      <div className="flex gap-2 relative z-10">
        <div className="text-right mr-2 hidden md:block">
          <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-medium">Time Left</div>
        </div>
        <div className="bg-[#0a1628]/50 border border-[#19294f] rounded px-3 py-1.5 flex flex-col items-center min-w-[50px]">
          <span className="text-xl font-bold text-white leading-none">{mockData.market.timeLef.days}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Days</span>
        </div>
        <div className="bg-[#0a1628]/50 border border-[#19294f] rounded px-3 py-1.5 flex flex-col items-center min-w-[50px]">
          <span className="text-xl font-bold text-white leading-none">{mockData.market.timeLef.hours}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Hrs</span>
        </div>
        <div className="bg-[#0a1628]/50 border border-[#19294f] rounded px-3 py-1.5 flex flex-col items-center min-w-[50px]">
          <span className="text-xl font-bold text-white leading-none">{mockData.market.timeLef.minutes}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Min</span>
        </div>
        <div className="bg-[#0a1628]/50 border border-[#19294f] rounded px-3 py-1.5 flex flex-col items-center min-w-[50px]">
          <span className="text-xl font-bold text-white leading-none">{mockData.market.timeLef.seconds}</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Sec</span>
        </div>
      </div>
    </div>
  </div>
);

const MarketChart = () => (
  <Card className="bg-linear-to-tr from-[#0e1f47] to-[#1c3563] border-[#19294f]">
    <CardContent className="p-4 md:p-6">
        {/* Header Legend */}
        <div className="flex flex-wrap gap-4 text-xs mb-4">
            {Object.entries(chartColors).map(([key, color]) => (
                <div key={key} className="flex items-center gap-1.5 text-gray-400">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                    <span>{key}</span>
                </div>
            ))}
        </div>

        {/* Chart */}
        <div className="h-[300px] md:h-[400px] -ml-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockData.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1F2A",
              borderColor: "#2c3a4f",
              color: "#fff",
            }}
          />
          {Object.entries(chartColors).map(([key, color]) => (
             <Area key={key} type="monotone" dataKey={key} stroke={color} fillOpacity={0.2} fill={`url(#color${key.replace(/[^a-zA-Z0-9]/g, "")})`} />
          ))}
           <defs>
             {Object.entries(chartColors).map(([key, color]) => (
                <linearGradient key={key} id={`color${key.replace(/[^a-zA-Z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                </linearGradient>
            ))}
          </defs>
        </AreaChart>
      </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
            <div className="flex gap-1">
                {["1H", "6H", "1D", "1W", "1M", "All"].map((label, idx) => (
                    <button
                        key={label}
                        className={cn(
                            "px-3 py-1 rounded text-xs font-medium transition",
                            idx === 0 ? 'bg-linear-to-r from-blue-600 to-blue-400 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'
                        )}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="flex gap-2">
                <button className="p-1.5 rounded hover:bg-white/10 text-gray-400">
                    <Settings2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-white/10 text-gray-400">
                    <RotateCw className="w-4 h-4" />
                </button>
            </div>
        </div>
    </CardContent>
  </Card>
);

const OutcomeList = () => (
    <Card className="bg-linear-to-tr from-[#0e1f47] to-[#1c3563] border-[#19294f]">
        <CardHeader>
             <div className="flex justify-between items-center px-2">
                <span className="text-sm font-semibold text-gray-400 tracking-wide">Outcome <ChevronDown className="inline w-3 h-3" /></span>
                <span className="text-sm font-semibold text-gray-400 tracking-wide">% Chance</span>
            </div>
        </CardHeader>
        <CardContent className="space-y-1">
            {mockData.outcomes.map((outcome, idx) => (
                <div key={outcome.name} className="group flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-white/5 hover:bg-white/5 transition px-2 rounded -mx-2">
                    {/* Left: Info */}
                    <div className="flex-1 mb-2 sm:mb-0 mr-4">
                        <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-white text-base">{outcome.name}</span>
                            <span className="text-blue-400 font-bold sm:hidden text-lg">{outcome.chance}%</span>
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">${outcome.volume} VOL.</div>
                    </div>

                    {/* Center: Percent Bar (Desktop) */}
                    <div className="hidden sm:flex flex-1 items-center gap-4 mr-6">
                        <span className="text-2xl font-bold text-blue-400 w-12 text-right tracking-tight">{outcome.chance}%</span>
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${outcome.chance}%`,
                                    backgroundColor: chartColors[Object.keys(chartColors)[idx] as keyof typeof chartColors] || '#60a5fa'
                                }}
                            />
                        </div>
                    </div>

                    {/* Right: Buttons */}
                    <div className="flex items-center gap-2">
                        <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 transition min-w-[100px]">
                            <span className="text-xs font-semibold tracking-wide uppercase">Buy Yes</span>
                            <span className="text-sm font-bold">{outcome.yesPrice}¢</span>
                        </button>
                        <button className="flex-1 sm:flex-none flex items-center justify-between px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition min-w-[100px]">
                            <span className="text-xs font-semibold tracking-wide uppercase">Buy No</span>
                            <span className="text-sm font-bold">{outcome.noPrice}¢</span>
                        </button>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);


const ActivityTabs = () => {
    const [activeTab, setActiveTab] = useState<'comments' | 'holders' | 'activity'>('comments');

    return (
        <div className="mt-8">
            {/* Tab Headers */}
            <div className="flex gap-6 sm:gap-8 border-b border-white/10 mb-6 overflow-x-auto no-scrollbar">
                <button
                    onClick={() => setActiveTab('comments')}
                    className={cn(
                        "pb-3 border-b-2 font-medium text-sm whitespace-nowrap transition",
                        activeTab === 'comments' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-300'
                    )}
                >
                    Comments ({mockData.comments.length})
                </button>
                <button
                    onClick={() => setActiveTab('holders')}
                    className={cn(
                        "pb-3 border-b-2 font-medium text-sm whitespace-nowrap transition",
                        activeTab === 'holders' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-300'
                    )}
                >
                    Top Holders
                </button>
                <button
                    onClick={() => setActiveTab('activity')}
                    className={cn(
                        "pb-3 border-b-2 font-medium text-sm whitespace-nowrap transition",
                        activeTab === 'activity' ? 'border-blue-500 text-white' : 'border-transparent text-gray-400 hover:text-gray-300'
                    )}
                >
                    Activity
                </button>
            </div>

            {/* CONTENT: COMMENTS */}
            {activeTab === 'comments' && (
                <>
                    {/* Input */}
                    <div className="flex gap-2 mb-6">
                        <input
                            type="text"
                            placeholder="Add a comment"
                            className="flex-1 bg-transparent border border-[#19294f] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 hover:border-gray-600 transition"
                        />
                        <button className="text-blue-500 hover:text-blue-400 px-4 text-sm font-medium transition">
                            Post
                        </button>
                    </div>

                    {/* Filter Row */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1 bg-[#0a1628]/50 hover:bg-white/10 transition rounded-full px-3 py-1.5 text-sm text-white font-medium">
                                Newest
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="flex items-center gap-2 ml-2 cursor-pointer group">
                                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                                    <Check className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-white group-hover:text-gray-300">Holders</span>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 bg-[#0a1628]/50 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300">
                            <Shield className="w-4 h-4" />
                            <span>Beware of external links.</span>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {mockData.comments.map(comment => (
                            <div key={comment.id} className="flex gap-3 group">
                                <Image src={comment.avatar} alt={comment.author} width={40} height={40} className="w-10 h-10 rounded-full" />
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <span className="font-bold text-sm text-white">{comment.author}</span>
                                            <span className="text-xs text-gray-500">{comment.ago}</span>
                                        </div>
                                        <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-200 mb-2 leading-relaxed">{comment.text}</p>
                                    <div className="flex items-center gap-4 text-gray-500">
                                        <button className="flex items-center gap-1.5 text-xs hover:text-gray-300 transition">
                                            <Heart className="w-4 h-4" />
                                            <span>{comment.likes}</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs hover:text-gray-300 transition">
                                            <span className="font-medium">Reply</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#19294f] text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                            Back to top <ArrowUpRight className="w-4 h-4 rotate-45" />
                        </button>
                    </div>
                </>
            )}

            {/* CONTENT: TOP HOLDERS */}
            {activeTab === 'holders' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* YES HOLDERS */}
                        <div>
                            <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-transparent">
                                <h3 className="font-bold text-base text-white">Yes holders</h3>
                                <span className="text-xs font-bold text-gray-500 tracking-wider">SHARES</span>
                            </div>
                            <div className="space-y-1">
                                {mockData.yesHolders.map((holder, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 px-2 hover:bg-white/5 rounded transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Image src={holder.avatar} alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
                                            <span className="text-sm font-medium text-gray-200">{holder.user}</span>
                                        </div>
                                        <span className="text-sm font-mono font-medium text-green-400">
                                            {holder.shares.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* NO HOLDERS */}
                        <div>
                            <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-transparent">
                                <h3 className="font-bold text-base text-white">No holders</h3>
                                <span className="text-xs font-bold text-gray-500 tracking-wider">SHARES</span>
                            </div>
                            <div className="space-y-1">
                                {mockData.noHolders.map((holder, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-2 px-2 hover:bg-white/5 rounded transition cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <Image src={holder.avatar} alt="User" width={32} height={32} className="w-8 h-8 rounded-full" />
                                            <span className="text-sm font-medium text-gray-200">{holder.user}</span>
                                        </div>
                                        <span className="text-sm font-mono font-medium text-red-400">
                                            {holder.shares.toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#19294f] text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                            Back to top <ArrowUpRight className="w-4 h-4 rotate-45" />
                        </button>
                    </div>
                </>
            )}

            {/* CONTENT: ACTIVITY */}
            {activeTab === 'activity' && (
                <>
                    <div className="flex gap-4 mb-4">
                        <button className="px-4 py-1.5 bg-[#0a1628]/50 rounded-full text-sm font-medium text-white flex items-center gap-2">
                            All <ChevronDown className="w-4 h-4" />
                        </button>
                        <button className="px-4 py-1.5 bg-[#0a1628]/50 rounded-full text-sm font-medium text-white flex items-center gap-2">
                            Min amount <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-0">
                        {mockData.activity.map((item) => (
                            <div key={item.id} className="flex items-center justify-between py-3 px-2 border-b border-white/5 hover:bg-white/5 transition group">
                                {/* Left: Text Description */}
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <Image src={item.avatar} alt="User" width={32} height={32} className="w-8 h-8 rounded-full flex-shrink-0" />
                                    <div className="text-sm text-gray-300 truncate">
                                        <span className="font-bold text-white hover:underline cursor-pointer">{item.user}</span>
                                        <span className="mx-1">{item.action}</span>
                                        <span className={cn("font-bold", item.outcome === 'Yes' ? 'text-green-400' : 'text-red-400')}>
                                            {item.amount.toLocaleString()} {item.outcome}
                                        </span>
                                        <span className="mx-1">for</span>
                                        <span className="text-white font-medium">{Math.floor(item.price * item.amount / 100).toLocaleString()}</span>
                                        <span className="mx-1">at</span>
                                        <span className="text-gray-400">{item.price}¢</span>
                                        <span className="mx-1 text-gray-500">(${item.value})</span>
                                    </div>
                                </div>

                                {/* Right: Time & Link */}
                                <div className="flex items-center gap-2 pl-4">
                                    <span className="text-sm text-gray-500 whitespace-nowrap">{item.time}</span>
                                    <ExternalLink className="w-3.5 h-3.5 text-gray-500 hover:text-white cursor-pointer" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#19294f] text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition">
                            Back to top <ArrowUpRight className="w-4 h-4 rotate-45" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const TradePanel = ({className}: {className?: string}) => {
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
    const [outcome, setOutcome] = useState(mockData.outcomes[0].name);

    return (
        <Card className={cn("bg-linear-to-tr from-[#0e1f47] to-[#1c3563] border-[#19294f] text-white", className)}>
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-xl tracking-tight">{outcome}</h2>
                     <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">Market <ChevronDown className="h-4 w-4 ml-1"/></Button>
                </div>

                {/* Buy/Sell Tabs with underline style */}
                <div className="flex items-center justify-between border-b border-white/10">
                    <div className="flex gap-6">
                        <button
                            onClick={() => setTradeType('buy')}
                            className={cn(
                                "pb-3 text-lg font-bold transition relative",
                                tradeType === 'buy' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            )}
                        >
                            Buy
                            {tradeType === 'buy' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full" />}
                        </button>
                        <button
                            onClick={() => setTradeType('sell')}
                            className={cn(
                                "pb-3 text-lg font-bold transition relative",
                                tradeType === 'sell' ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                            )}
                        >
                            Sell
                            {tradeType === 'sell' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-t-full" />}
                        </button>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            className={cn(
                                "py-3 px-4 rounded-lg flex justify-between items-center transition border",
                                "bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30"
                            )}
                        >
                            <span className="font-bold text-lg">Yes</span>
                            <span className="font-medium text-sm opacity-90">{mockData.outcomes[0].yesPrice}¢</span>
                        </button>
                        <button
                            className={cn(
                                "py-3 px-4 rounded-lg flex justify-between items-center transition border",
                                "bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
                            )}
                        >
                            <span className="font-bold text-lg">No</span>
                            <span className="font-medium text-sm opacity-90">{mockData.outcomes[0].noPrice}¢</span>
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-xl font-bold text-white tracking-tight">Amount</span>
                        <span className="text-6xl font-medium text-gray-400 flex items-center tracking-tight">
                            <span className="mr-1 text-5xl text-gray-500">$</span>
                            <input
                                type="text"
                                defaultValue="25"
                                placeholder="0"
                                className="bg-transparent w-full max-w-[150px] focus:outline-none text-white placeholder-gray-600 text-right"
                            />
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-xs font-medium text-gray-500 tracking-wide">
                            Balance <span className="text-white">$95.38</span>
                        </div>
                        <div className="flex gap-2">
                            {['+$1', '+$20', '+$100', 'Max'].map(val =>
                                <button key={val} className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded text-xs font-bold text-white transition tracking-wide">
                                    {val}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                    <div className="flex justify-between items-end mb-1">
                        <div className="flex items-center gap-1.5 text-white font-bold text-lg tracking-tight">
                            <span>To win</span>
                            <span className="text-green-400 text-xl tracking-tight">$176.86</span>
                        </div>
                        <div className="text-green-400 text-5xl font-medium tracking-tight">
                            $151
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400 tracking-wide">
                        Avg. Price <span className="font-semibold text-white">{mockData.outcomes[0].yesPrice}¢</span>
                        <Info className="w-3 h-3" />
                    </div>
                </div>

                <Button className="w-full mt-6 py-6 bg-linear-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-lg font-bold tracking-wide" disabled>Unavailable</Button>
                 <p className="text-xs text-gray-500 mt-2 text-center">By trading, you agree to the Terms of Use.</p>
                 <button className="text-xs text-blue-400 mt-1 flex items-center gap-1 mx-auto">
                    Give feedback on recent updates <MessageCircle className="h-3 w-3"/>
                </button>
            </CardContent>
        </Card>
    )
}

// --- MAIN PAGE COMPONENT ---

export default function DetailPage() {
  return (
    <div className="min-h-screen bg-[#00133c] text-white">
      <Header />
      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            <MarketHeader />
            <MarketChart />
            <OutcomeList />
            <ActivityTabs />
          </div>

          {/* Right Column (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
                 <TradePanel />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Trade Drawer Trigger */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#00133c] to-transparent z-50">
          <Drawer.Root>
            <Drawer.Trigger asChild>
                <Button className="w-full py-6 text-lg font-bold bg-linear-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300">Trade</Button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
                <Drawer.Content className="bg-[#1A1F2A] border-t border-gray-700 text-white flex flex-col rounded-t-[10px] h-[90%] fixed bottom-0 left-0 right-0 z-50">
                    <div className="p-4 bg-[#1A1F2A] rounded-t-[10px] flex-1 overflow-y-auto">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-600 mb-4" />
                        <TradePanel />
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
      </div>

      <Footer />
    </div>
  );
}