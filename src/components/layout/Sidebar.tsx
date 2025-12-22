"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  Flame,
  Landmark,
  Trophy,
  TrendingUp,
  Bitcoin,
  Globe,
  DollarSign,
  Cpu,
  Tv,
  Earth,
  BarChart3,
  Medal,
  Percent,
  Brain,
  Activity,
  BarChart2,
  FileText,
  X as XIcon,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, tools } from "@/data/static";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

/* ============================================================
 * Icon Map
 * ============================================================ */

const iconMap: Record<string, React.ReactNode> = {
  flame: <Flame className="w-4 h-4" />,
  landmark: <Landmark className="w-4 h-4" />,
  trophy: <Trophy className="w-4 h-4" />,
  "trending-up": <TrendingUp className="w-4 h-4" />,
  bitcoin: <Bitcoin className="w-4 h-4" />,
  globe: <Globe className="w-4 h-4" />,
  "dollar-sign": <DollarSign className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  tv: <Tv className="w-4 h-4" />,
  earth: <Earth className="w-4 h-4" />,
  "bar-chart-3": <BarChart3 className="w-4 h-4" />,
  medal: <Medal className="w-4 h-4" />,
  percent: <Percent className="w-4 h-4" />,
  brain: <Brain className="w-4 h-4" />,
  activity: <Activity className="w-4 h-4" />,
  "bar-chart-2": <BarChart2 className="w-4 h-4" />,
  "file-text": <FileText className="w-4 h-4" />,
};

/* ============================================================
 * Sidebar Component
 * ============================================================ */

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  selectedCategory,
  onCategoryChange,
  isOpen,
  onClose,
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-sm">P</span>
              </div>
              <div>
                <h1 className="text-foreground font-semibold text-sm">
                  PredictMarket
                </h1>
                <p className="text-sidebar-foreground text-xs">
                  Trading terminal
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-sidebar-foreground"
              onClick={onClose}
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search markets"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-secondary border-0 text-sm h-9 placeholder:text-muted-foreground"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
              /
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="px-4 py-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Categories
            </span>
          </div>
          <nav className="space-y-0.5 px-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "sidebarActive" : "sidebar"
                }
                size="sm"
                className="w-full justify-between h-9 px-3"
                onClick={() => {
                  onCategoryChange(category.id);
                  onClose();
                }}
              >
                <span className="flex items-center gap-2">
                  {iconMap[category.icon]}
                  {category.name}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Button>
            ))}
          </nav>

          {/* Tools */}
          <div className="px-4 py-2 mt-4">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Tools
            </span>
          </div>
          <nav className="space-y-0.5 px-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant="sidebar"
                size="sm"
                className="w-full h-9 px-3"
              >
                {iconMap[tool.icon]}
                {tool.name}
              </Button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 h-9 border-border text-sidebar-foreground hover:text-foreground"
          >
            <DollarSign className="w-4 h-4" />
            Buy $PM
          </Button>
          <Button variant="secondary" size="sm" className="w-full h-9">
            Log in
          </Button>
          <div className="flex items-center justify-center gap-2 pt-2">
            <ThemeToggle />
            <a
              href="#"
              className="text-sidebar-foreground hover:text-foreground transition-colors"
            >
              <XIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ============================================================
 * Mobile Menu Button
 * ============================================================ */

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-muted-foreground hover:text-foreground"
      onClick={onClick}
    >
      <Menu className="w-5 h-5" />
    </Button>
  );
}
