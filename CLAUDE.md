# Prediction Market Platform

Fork of polym.trade, migrated from React+Vite to Next.js 16 App Router.

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Tailwind v4 主题配置 + CSS 变量
│   ├── layout.tsx          # Root layout with Providers
│   └── page.tsx            # 首页 - 市场列表和详情
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx     # 侧边栏导航组件
│   ├── market/
│   │   ├── MarketCard.tsx  # 市场列表卡片
│   │   ├── MarketList.tsx  # 市场列表组件
│   │   ├── MarketDetail.tsx        # 桌面端市场详情
│   │   └── MobileMarketDetail.tsx  # 移动端市场详情
│   ├── ui/                 # shadcn/ui 组件
│   └── Providers.tsx       # React Query + Tooltip Provider
├── data/
│   └── static.ts           # 静态数据 (分类, 工具)
├── hooks/
│   └── use-mobile.tsx      # 移动端检测 hook
├── lib/
│   ├── utils.ts            # cn() 工具函数
│   └── api/
│       ├── schema.ts       # Zod schemas + 类型导出
│       ├── client.ts       # API 客户端 (Zod 验证)
│       ├── queries.ts      # queryOptions 定义
│       ├── hooks.ts        # React Query hooks
│       └── transform.ts    # API → UI 数据转换
├── types/
│   └── market.ts           # UI 类型定义 + schema 类型 re-export
└── docs/
    └── API_DOCUMENTATION.md
```

## API Layer Design

### Schema-First Approach
```typescript
// lib/api/schema.ts - Zod schemas 定义所有 API 响应结构
export const ApiMarketSchema = z.object({ ... });
export type ApiMarket = z.infer<typeof ApiMarketSchema>;
```

### Query Options for Type Safety
```typescript
// lib/api/queries.ts - queryOptions 提供类型安全的查询配置
export const marketsQueryOptions = (params) =>
  queryOptions({
    queryKey: queryKeys.markets.list(params),
    queryFn: () => api.markets.list(params),
  });

// 其他地方使用
const { data } = useQuery(marketsQueryOptions());
// 或者直接在组件外使用
queryClient.prefetchQuery(marketsQueryOptions());
```

### Hooks for Components
```typescript
// lib/api/hooks.ts - 封装的 React hooks
export function useMarkets(params) {
  return useQuery(marketsQueryOptions(params));
}
```

## Key Decisions

1. **Zod 验证**: 所有 API 响应经过 Zod schema 验证
2. **queryOptions**: 使用 TanStack Query v5 的 queryOptions 获得类型推导
3. **Category**: 左侧分类使用静态数据,不从 API 推断
4. **Tailwind v4**: 使用 `@theme inline` 语法配置主题

## API Configuration

`.env.local`:
```
NEXT_PUBLIC_API_URL=https://prediction-api.fastxparking.com
```

## Development

```bash
pnpm dev    # 开发服务器
pnpm build  # 生产构建
```
