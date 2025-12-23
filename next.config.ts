import type { NextConfig } from "next";

/* ============================================================
 * Next.js Configuration
 * ============================================================ */

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // 环境变量控制图片优化: 默认 true (不优化)
    // Vercel 部署时设置 NEXT_PUBLIC_IMAGE_UNOPTIMIZED=false 启用优化
    unoptimized: process.env.NEXT_PUBLIC_IMAGE_UNOPTIMIZED !== "false",
  },
};

export default nextConfig;
