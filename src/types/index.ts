export type Category = 'Money' | 'Hausa' | 'Gist';

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  imageUrl: string;
  isPremium: boolean;
  createdAt: string;
  readTime: number;
  views: number;
  shares: number;
  reactionsCount: number;
  commentsCount: number;
  author: {
    id: string;
    name: string;
    avatar: string;
    rank: Rank;
    role?: 'admin' | 'creator' | 'user';
  };
}

export interface AdCampaign {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  targetLink: string;
  sponsor: string;
  category: Category;
}

export type Rank = 'JJC' | 'Learner' | 'Chairman' | 'Odogwu';

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  locationState: string;
  xpPoints: number;
  currentRank: Rank;
  streakDays: number;
  lastLoginDate: string;
  postsRead: number;
  savedPosts: string[];
  role?: 'admin' | 'creator' | 'user';
}

export interface Notification {
  id: string;
  type: 'xp' | 'streak' | 'social' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  xpAmount?: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: {
    id: string;
    username: string;
    avatar: string;
    locationState: string;
  };
  xpPoints: number;
  currentRank: Rank;
}

export function getRank(xp: number): Rank {
  if (xp >= 1000) return 'Odogwu';
  if (xp >= 500) return 'Chairman';
  if (xp >= 100) return 'Learner';
  return 'JJC';
}

export function getNextRankXP(xp: number): number {
  if (xp >= 1000) return 1000;
  if (xp >= 500) return 1000;
  if (xp >= 100) return 500;
  return 100;
}

export function getRankColor(rank: Rank): string {
  switch (rank) {
    case 'Odogwu': return 'text-amber-500';
    case 'Chairman': return 'text-primary';
    case 'Learner': return 'text-blue-500';
    case 'JJC': return 'text-muted-foreground';
  }
}
