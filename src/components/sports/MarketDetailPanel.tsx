"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SPORTS_OUTCOMES,
  SPORTS_CHART_DATA,
  SPORTS_COMMENTS,
} from "@/data/static-data";

const TIME_PERIODS = ["1H", "6H", "1D", "1W", "1M", "All"];

export function MarketDetailPanel() {
  const [selectedPeriod, setSelectedPeriod] = useState("All");
  const [activeTab, setActiveTab] = useState("Comments");

  // 生成X轴时间刻度
  const getTimeLabels = (period: string) => {
    const labels: string[] = [];
    switch (period) {
      case "1H":
        // 每10分钟一个刻度
        for (let i = 0; i <= 5; i++) {
          labels.push(`${i * 10}m`);
        }
        break;
      case "6H":
        // 每1小时一个刻度
        for (let i = 0; i <= 5; i++) {
          labels.push(`${i}h`);
        }
        break;
      case "1D":
        // 每4小时一个刻度
        for (let i = 0; i <= 5; i++) {
          labels.push(`${i * 4}h`);
        }
        break;
      case "1W":
        // 每天一个刻度（周一到周六）
        const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return days;
      case "1M":
        // 每5天一个刻度
        for (let i = 0; i <= 5; i++) {
          labels.push(`${i * 5 + 1}d`);
        }
        break;
      case "All":
        // 显示月份
        const months = ["Jan", "Mar", "May", "Jul", "Sep", "Nov"];
        return months;
      default:
        return labels;
    }
    return labels;
  };

  return (
    <div
      className="space-y-4 rounded-xl border border-[#184470] bg-[#0e1f46]/40"
      style={{
        background: "radial-gradient(ellipse at top center, #223969, #0e1f47)",
      }}
    >
      {/* 标题区域 */}
      <div className="flex items-end justify-between p-6 pb-0">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20">
              <Image
                src="/elon_musk.jpeg"
                alt="Elon Musk"
                width={64}
                height={64}
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <h1 className="text-2xl font-semibold text-white">
              Elon Musk # of tweets Feb 7-14? (Higher Options)
            </h1>
          </div>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-300">
            <span className="flex items-center gap-3">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  d="M554.666667 722.346667V896h-85.333334v-173.653333a299.008 299.008 0 0 1-227.456-168.106667A213.333333 213.333333 0 0 1 42.666667 341.333333V170.666667h170.666666V85.333333h597.333334v85.333334h170.666666v170.666666a213.333333 213.333333 0 0 1-199.210666 212.906667A299.008 299.008 0 0 1 554.666667 722.346667zM213.333333 256H128v85.333333c0 56.533333 36.693333 104.533333 87.466667 121.472A301.696 301.696 0 0 1 213.333333 426.666667V256z m597.333334 0v170.666667c0 12.245333-0.725333 24.32-2.133334 36.138666A128.042667 128.042667 0 0 0 896 341.333333V256h-85.333333zM298.666667 170.666667v256a213.333333 213.333333 0 0 0 426.666666 0V170.666667H298.666667z"
                  fill="#5897d6"
                ></path>
                <path
                  d="M298.666667 938.666667v-85.333334h426.666666v85.333334z"
                  fill="#5897d6"
                ></path>
              </svg>
              $167,959 Vol.
            </span>
            <span className="flex items-center gap-1">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
              >
                <path
                  d="M721.454545 162.909091H302.545455v58.042182a34.909091 34.909091 0 1 1-69.818182 0V162.909091H116.549818A23.272727 23.272727 0 0 0 93.090909 186.065455V372.363636h837.818182V186.065455A23.202909 23.202909 0 0 0 907.450182 162.909091H791.272727v58.042182a34.909091 34.909091 0 1 1-69.818182 0V162.909091z m69.818182-69.818182h116.177455A93.021091 93.021091 0 0 1 1000.727273 186.065455v698.414545A93.090909 93.090909 0 0 1 907.450182 977.454545H116.549818A93.021091 93.021091 0 0 1 23.272727 884.48V186.065455A93.090909 93.090909 0 0 1 116.549818 93.090909H232.727273v-11.496727a34.909091 34.909091 0 1 1 69.818182 0V93.090909h418.90909v-11.496727a34.909091 34.909091 0 1 1 69.818182 0V93.090909z m139.636364 349.090909H93.090909v442.298182c0 12.823273 10.379636 23.156364 23.458909 23.156364h790.900364A23.272727 23.272727 0 0 0 930.909091 884.48V442.181818z m-663.272727 116.363637h139.636363a34.909091 34.909091 0 0 1 0 69.818181h-139.636363a34.909091 34.909091 0 0 1 0-69.818181z m0 162.90909h139.636363a34.909091 34.909091 0 0 1 0 69.818182h-139.636363a34.909091 34.909091 0 0 1 0-69.818182z m349.090909-162.90909h139.636363a34.909091 34.909091 0 0 1 0 69.818181h-139.636363a34.909091 34.909091 0 0 1 0-69.818181z"
                  fill="#5897d6"
                ></path>
              </svg>
              Feb 14, 2025
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-end gap-6">
          <div className="flex gap-2">
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#184470] bg-[#1b3468]/90 text-white transition-colors hover:bg-[#00133c]/70">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#184470] bg-[#1b3468]/90 text-white transition-colors hover:bg-[#00133c]/70">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
            <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#184470] bg-[#1b3468]/90 text-white transition-colors hover:bg-[#00133c]/70">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-end gap-2">
            <button className="flex min-w-14 flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 px-2 py-0.5 text-xs text-white transition-colors hover:bg-[#00133c]/70">
              <svg
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
              >
                <path
                  d="M983.480349 307.199781A512.950491 512.950491 0 0 0 513.318399 0a512.365348 512.365348 0 0 0-410.843135 205.531282 42.422827 42.422827 0 0 0 67.80338 50.687964 427.66598 427.66598 0 0 1 343.039755-171.666164 428.251123 428.251123 0 0 1 392.557434 256.438674 42.422827 42.422827 0 0 0 77.604516-33.865118zM34.379313 332.799762A334.55519 334.55519 0 0 0 0.002194 469.869379a42.276541 42.276541 0 0 0 84.699368 0.877713 251.611249 251.611249 0 0 1 24.795411-99.035358A42.422827 42.422827 0 0 0 34.379313 332.799762z m10.166849 387.144867A512.950491 512.950491 0 0 0 513.318399 1023.999269a512.365348 512.365348 0 0 0 410.404278-204.872997 42.422827 42.422827 0 0 0-67.730237-50.761107 427.66598 427.66598 0 0 1-342.674041 171.081021 428.251123 428.251123 0 0 1-391.387149-253.805533 42.422827 42.422827 0 0 0-77.385088 34.377118z m948.954751-24.575983c21.284556-43.885683 30.866264-89.96565 30.50055-142.628469a42.276541 42.276541 0 0 0-84.699368 0.731428c0.292571 40.009114-6.582852 73.362233-21.942842 105.033067a42.422827 42.422827 0 0 0 76.214803 36.937117z"
                  fill="#ffffff"
                ></path>
                <path
                  d="M776.632497 276.333517A44.982825 44.982825 0 0 0 731.430243 321.096914c0 24.649125 20.260557 44.690254 45.202254 44.690253h177.005588A69.924521 69.924521 0 0 0 1024.001463 296.22836V117.759916a44.982825 44.982825 0 0 0-45.202254-44.617111 44.982825 44.982825 0 0 0-45.275396 44.617111v158.573601h-156.891316zM247.37116 747.665752A44.982825 44.982825 0 0 0 292.573414 702.902355 44.982825 44.982825 0 0 0 247.37116 658.285244H70.365573A69.924521 69.924521 0 0 0 0.002194 727.770909v178.468444c0 24.575982 20.260557 44.617111 45.202254 44.617111a44.982825 44.982825 0 0 0 45.275396-44.617111v-158.573601h156.891316z"
                  fill="#ffffff"
                ></path>
              </svg>
            </button>
            <button className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border-transparent bg-linear-to-r from-blue-600 via-blue-500 to-blue-400 px-2 py-0.5 text-xs">
              Feb 14
            </button>
            <button className="flex flex-1 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 px-2 py-0.5 text-xs text-white transition-colors hover:bg-[#00133c]/70">
              Feb 14
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#041947]/60 p-6 pt-0 shadow-[0_-15px_15px_-5px_rgba(4,25,71,0.5)]">
        {/* Tweet Count */}
        <div className="flex justify-between p-4">
          <div className="rounded-lg">
            <div className="text-xm text-gray-400">Tweet Count</div>
            <div className="mt-1 text-2xl font-bold text-white">654</div>
          </div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="text-sm text-gray-400">Time Left</div>
            <div className="flex items-center gap-3 text-center">
              <div>
                <div className="mb-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 text-xl font-bold text-white transition-colors hover:bg-[#00133c]/70">
                  2
                </div>
                <div className="text-xs text-gray-400">Days</div>
              </div>
              <div>
                <div className="mb-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 text-xl font-bold text-white transition-colors hover:bg-[#00133c]/70">
                  0
                </div>
                <div className="text-xs text-gray-400">Hrs</div>
              </div>
              <div>
                <div className="mb-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 text-xl font-bold text-white transition-colors hover:bg-[#00133c]/70">
                  55
                </div>
                <div className="text-xs text-gray-400">Min</div>
              </div>
              <div>
                <div className="mb-2 flex h-14 w-14 cursor-pointer items-center justify-center rounded-lg border border-[#184470] bg-[#1b3468]/90 text-xl font-bold text-white transition-colors hover:bg-[#00133c]/70">
                  5
                </div>
                <div className="text-xs text-gray-400">Sec</div>
              </div>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="rounded-lg border border-white/10 bg-black/12 p-4">
          {/* 图例 */}
          <div className="mb-4 flex flex-wrap gap-3">
            {SPORTS_CHART_DATA.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>

          {/* 简化图表 - 使用 SVG 折线 */}
          <div className="relative h-64 w-full rounded-lg bg-[#00133c]/30 pt-4 pr-15 pb-8">
            <svg
              className="h-full w-full"
              viewBox="0 0 600 200"
              preserveAspectRatio="none"
            >
              {/* 横向网格线（虚线） */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={i * 40}
                  x2="600"
                  y2={i * 40}
                  stroke="#184470"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              ))}

              {/* X轴线（实线） */}
              <line
                x1="0"
                y1="200"
                x2="600"
                y2="200"
                stroke="#184470"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* 折线1 - 蓝色 (>800) */}
              <polyline
                fill="none"
                stroke="#00a3ff"
                strokeWidth="2.5"
                points="0,145 30,148 60,142 90,138 120,135 150,130 180,125 210,120 240,115 270,112 300,108 330,105 360,100 390,98 420,95 450,92 480,88 510,85 540,82 570,80 600,78"
              />

              {/* 折线2 - 绿色 (600-800) */}
              <polyline
                fill="none"
                stroke="#25a869"
                strokeWidth="2.5"
                points="0,95 30,98 60,102 90,105 120,108 150,110 180,108 210,105 240,102 270,100 300,98 330,95 360,93 390,95 420,98 450,100 480,103 510,105 540,108 570,110 600,112"
              />

              {/* 折线3 - 粉色 (400-600) */}
              <polyline
                fill="none"
                stroke="#f56fb3"
                strokeWidth="2.5"
                points="0,78 30,80 60,83 90,85 120,88 150,92 180,95 210,98 240,102 270,105 300,108 330,110 360,112 390,115 420,118 450,120 480,122 510,125 540,127 570,130 600,132"
              />

              {/* 折线4 - 紫色 (<400) */}
              <polyline
                fill="none"
                stroke="#9c27b0"
                strokeWidth="2.5"
                points="0,118 30,120 60,122 90,125 120,128 150,132 180,135 210,138 240,142 270,145 300,148 330,152 360,155 390,158 420,162 450,165 480,168 510,172 540,175 570,178 600,180"
              />
            </svg>

            {/* Y轴标签 */}
            <div className="absolute top-0 right-6 flex h-full flex-col justify-between py-4 text-xs text-gray-500">
              <span>53%</span>
              <span>52%</span>
              <span>51%</span>
              <span>50%</span>
              <span>49%</span>
              <span>47%</span>
            </div>

            {/* X轴时间刻度 */}
            <div className="absolute right-0 bottom-1 left-0 flex justify-between px-1 pr-15 text-xs text-gray-500">
              {getTimeLabels(selectedPeriod).map((label, index) => (
                <span key={index}>{label}</span>
              ))}
            </div>
          </div>

          {/* 时间周期按钮 */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex gap-2">
              {TIME_PERIODS.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                    selectedPeriod === period
                      ? "bg-linear-to-r from-blue-600 to-blue-400 text-white"
                      : "bg-[#1b3468]/90 text-gray-400 hover:bg-[#00133c]/70 hover:text-white"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#184470] bg-[#1b3468]/90 text-white transition-colors hover:bg-[#00133c]/70">
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
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#184470] bg-[#1b3468]/90 text-white transition-colors hover:bg-[#00133c]/70">
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
        </div>

        {/* Outcome 部分 */}
        <div className="mt-12 rounded-lg">
          <div className="flex items-center justify-between border-b border-white/10">
            <div className="mb-4 flex flex-1 items-center justify-between pb-3">
              <button className="flex cursor-pointer items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
                <span>Outcome</span>
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
              <button className="flex cursor-pointer items-center gap-1.5 text-xs text-white/70 hover:text-white">
                <span>% Chance</span>
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
            </div>
            <div className="flex-1"></div>
          </div>

          <div className="mt-4 space-y-4">
            {SPORTS_OUTCOMES.map((outcome, index) => (
              <div key={index}>
                <div className="flex items-center justify-between rounded-lg bg-black/12 px-4 py-5">
                  {/* 左侧：范围和成交量 */}
                  <div className="flex flex-1 items-center justify-between">
                    <div className="shrink-0">
                      <div className="text-base font-semibold text-white">
                        {outcome.range}
                      </div>
                      <div className="text-xs text-gray-400">
                        {outcome.volume}
                      </div>
                    </div>

                    {/* 中间：概率 */}
                    <div className="flex-1 text-right">
                      <div className="text-xl font-bold text-white">
                        {outcome.probability}
                      </div>
                    </div>
                  </div>

                  {/* 右侧：按钮组 */}
                  <div className="flex flex-1 shrink-0 items-center justify-end gap-3">
                    <button className="cursor-pointer rounded-lg bg-[#114a4f] px-6 py-2 text-sm font-medium text-[#33e88a] transition-all hover:bg-[#114a4f]/80">
                      Buy Yes {outcome.buyPrice}
                    </button>
                    <div className="h-4 w-px bg-white/10"></div>
                    <button className="cursor-pointer rounded-lg bg-[#3d1e3f] px-6 py-2 text-sm font-medium text-[#c33d4b] transition-all hover:bg-[#3d1e3f]/80">
                      Buy No {outcome.sellPrice}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-lg border border-white/10 bg-black/12 p-4">
          {/* 标签页导航 */}
          <div className="border-b border-[#184470]">
            <div className="flex gap-8">
              {["Comments", "Top Holders", "Activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 cursor-pointer border-b-2 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-white bg-linear-to-b from-transparent via-white/5 to-white/10 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 评论输入 */}
          {["Comments", "Top Holders", "Activity"].includes(activeTab) && (
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
                  t="1767461908269"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="36572"
                  width="32"
                  height="32"
                >
                  <path
                    d="M503.466667 140.8c119.466667 64 217.6 119.466667 320 170.666667 0 226.133333-106.666667 456.533333-320 597.333333-213.333333-140.8-320-371.2-320-597.333333 93.866667-51.2 200.533333-106.666667 320-170.666667z m-68.266667 85.333333c-21.333333 12.8-21.333333 12.8-42.666667 21.333334-17.066667 8.533333-29.866667 12.8-38.4 21.333333-55.466667 25.6-93.866667 46.933333-128 68.266667 8.533333 204.8 106.666667 396.8 277.333334 520.533333 170.666667-123.733333 268.8-315.733333 277.333333-520.533333-25.6-12.8-55.466667-29.866667-89.6-46.933334-34.133333-17.066667-140.8-76.8-187.733333-102.4-21.333333 12.8-42.666667 21.333333-68.266667 38.4z"
                    fill="#ffffff"
                    p-id="36573"
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
                    <input
                      type="checkbox"
                      className="rounded border-[#184470]"
                    />
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
                        <span className="text-xs text-gray-500">
                          {comment.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">
                        {comment.text}
                      </p>
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
          )}
        </div>
      </div>
    </div>
  );
}
