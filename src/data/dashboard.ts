export const MARKETS_DATA = [
  {
    id: 'm-1',
    question: "Will Trump pardon Steve Bannon before Feb 2025?",
    iconUrl: "https://picsum.photos/40/40?random=201",
    volume: "$12.5m",
    chance: 78,
    isBinary: true,
    tags: ["Politics", "US"],
    commentsCount: 3420
  },
  {
    id: 'm-2',
    question: "Bitcoin to hit $100,000 before Q2 2025?",
    iconUrl: "https://picsum.photos/40/40?random=202",
    volume: "$45.2m",
    chance: 34,
    isBinary: true,
    tags: ["Crypto", "Bitcoin"],
    commentsCount: 8102
  },
  {
    id: 'm-3',
    question: "Who will be the next Fed Chair nominee?",
    iconUrl: "https://picsum.photos/40/40?random=203",
    volume: "$8.1m",
    chance: 45,
    isBinary: false,
    outcomes: [
      { name: "Kevin Warsh", percent: 45 },
      { name: "Scott Bessent", percent: 25 },
      { name: "Marc Rowan", percent: 15 },
      { name: "Other", percent: 15 },
    ],
    tags: ["Politics", "Economy"],
    commentsCount: 1250
  },
  {
    id: 'm-4',
    question: "Will TikTok be banned in the US by May 1st?",
    iconUrl: "https://picsum.photos/40/40?random=204",
    volume: "$18.9m",
    chance: 62,
    isBinary: true,
    tags: ["Tech", "Politics"],
    commentsCount: 5600
  },
  {
    id: 'm-5',
    question: "Next Big Tech company to face antitrust breakup?",
    iconUrl: "https://picsum.photos/40/40?random=205",
    volume: "$5.2m",
    chance: 40,
    isBinary: false,
    outcomes: [
      { name: "Google", percent: 40 },
      { name: "Meta", percent: 30 },
      { name: "Amazon", percent: 20 },
      { name: "Apple", percent: 10 },
    ],
    tags: ["Tech", "Business"],
    commentsCount: 980
  },
  {
    id: 'm-6',
    question: "Will GPT-5 be released publicly before July 2025?",
    iconUrl: "https://picsum.photos/40/40?random=206",
    volume: "$31.4m",
    chance: 12,
    isBinary: true,
    tags: ["AI", "Tech"],
    commentsCount: 2200
  },
  {
    id: 'm-7',
    question: "Who will win Best Picture at the 2025 Oscars?",
    iconUrl: "https://picsum.photos/40/40?random=207",
    volume: "$3.8m",
    chance: 35,
    isBinary: false,
    outcomes: [
      { name: "Dune: Part Two", percent: 35 },
      { name: "Poor Things", percent: 25 },
      { name: "Killers of the Flower Moon", percent: 35 },
      { name: "Other", percent: 5 },
    ],
    tags: ["Pop Culture", "Movies"],
    commentsCount: 1500
  },
  {
    id: 'm-8',
    question: "Will the US enter a recession in 2025?",
    iconUrl: "https://picsum.photos/40/40?random=208",
    volume: "$15.6m",
    chance: 28,
    isBinary: true,
    tags: ["Economy", "US"],
    commentsCount: 4100
  },
];

export const RECENT_ACTIVITY = [
  { user: 'CryptoWhale', action: 'bought', marketName: 'Bitcoin > $100k', amount: '$5,000', price: '34¢', timeAgo: '2s ago', avatarUrl: 'https://picsum.photos/24/24?random=301', team: 'Yes' },
  { user: 'PolitiPunt', action: 'sold', marketName: 'TikTok Ban', amount: '$1,250', price: '61¢', timeAgo: '5s ago', avatarUrl: 'https://picsum.photos/24/24?random=302', team: 'No' },
  { user: 'TechInsider', action: 'bought', marketName: 'GPT-5 Q3', amount: '$850', price: '12¢', timeAgo: '12s ago', avatarUrl: 'https://picsum.photos/24/24?random=303', team: 'Yes' },
  { user: 'YieldFarmer', action: 'bought', marketName: 'Fed Chair', amount: '$12,000', price: '45¢', timeAgo: '18s ago', avatarUrl: 'https://picsum.photos/24/24?random=304', team: 'Kevin Warsh' },
  { user: 'MoonShot', action: 'sold', marketName: 'SpaceX Launch', amount: '$3,400', price: '87¢', timeAgo: '24s ago', avatarUrl: 'https://picsum.photos/24/24?random=305', team: 'Yes' },
];

export const TOP_VOLUME = [
  { rank: 1, name: 'Satoshi_Naka', volume: '$42,097,125', avatarUrl: 'https://picsum.photos/32/32?random=401' },
  { rank: 2, name: 'Vitalik_Fan', volume: '$38,778,013', avatarUrl: 'https://picsum.photos/32/32?random=402' },
  { rank: 3, name: 'WallSt_Bets', volume: '$31,442,745', avatarUrl: 'https://picsum.photos/32/32?random=403' },
  { rank: 4, name: 'PredictionKing', volume: '$28,380,982', avatarUrl: 'https://picsum.photos/32/32?random=404' },
];
