/* ============================================================
 * Static Data
 * 分类和工具的静态数据
 * ============================================================ */

import type { Category, Tool, NavigationItem } from "@/types/market";

export const mainNav: NavigationItem[] = [
  { id: "markets", name: "Markets", icon: "home", href: "/" },
  { id: "dashboard", name: "Dashboard", icon: "bar-chart-3", href: "/dashboard" },
  { id: "portfolio", name: "Portfolio", icon: "wallet", href: "/portfolio" },
];

export const categories: Category[] = [
  { id: "trending", name: "Trending", icon: "flame" },
  { id: "politics", name: "Politics", icon: "landmark" },
  { id: "sports", name: "Sports", icon: "trophy" },
  { id: "finance", name: "Finance", icon: "trending-up" },
  { id: "crypto", name: "Crypto", icon: "bitcoin" },
  { id: "geopolitics", name: "Geopolitics", icon: "globe" },
  { id: "tech", name: "Tech", icon: "cpu" },
  { id: "culture", name: "Culture", icon: "tv" },
  { id: "world", name: "World", icon: "earth" },
  { id: "economy", name: "Economy", icon: "bar-chart-3" },
];

export const tools: Tool[] = [
  { id: "leaderboard", name: "Leaderboard", icon: "medal", href: "/leaderboard" },
  { id: "fees", name: "Fees", icon: "percent", href: "/fees" },
  { id: "ai", name: "AI Predictions", icon: "brain", href: "/ai" },
  { id: "live", name: "Live feed", icon: "activity", href: "/live" },
  { id: "volume", name: "Trading Volume", icon: "bar-chart-2", href: "/volume" },
  { id: "docs", name: "Documentation", icon: "file-text", href: "/docs" },
];

export const headerNav = [
  { id: "ranks", label: "Ranks", href: "#" },
  { id: "activity", label: "Activity", href: "#" },
  { id: "sports", label: "Sports", href: "#" },
  { id: "dashboards", label: "Dashboards", href: "#" },
  { id: "markets", label: "Markets", href: "#" },
];

