import { AppLayout } from '@/components/layout/AppLayout';
import { useGamification } from '@/contexts/GamificationContext';
import { useCoins } from '@/contexts/CoinContext';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_POSTS, MOCK_LEADERBOARD } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/feed/PostCard';
import { GlobalCoinPool } from '@/components/gamification/GlobalCoinPool';
import { Flame, BookOpen, Trophy, Star, Coins, Shield, LogOut, TrendingUp } from 'lucide-react';
import { getRankColor, getNextRankXP } from '@/types';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { xpPoints, currentRank, streakDays, postsRead, savedPosts } = useGamification();
  const { userCoins } = useCoins();
  const { user, profile, isGuest, signOut } = useAuth();
  const navigate = useNavigate();
  const nextRankXP = getNextRankXP(xpPoints);
  const progress = Math.min(100, (xpPoints / nextRankXP) * 100);
  const savedPostsData = MOCK_POSTS.filter(p => savedPosts.includes(p.id));

  if (isGuest) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <h1 className="text-xl font-black text-foreground mb-2">Join Jara Daily</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign up to track your XP, coins, and compete on the leaderboard!</p>
          <Button onClick={() => navigate('/auth')}>Sign Up / Login</Button>
        </div>
      </AppLayout>
    );
  }

  const displayName = profile?.username || 'User';
  const avatarUrl = profile?.avatar_url || '';

  return (
    <AppLayout>
      <div className="py-4">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-20 w-20 mb-3 ring-4 ring-primary/20">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <h1 className="text-lg font-black text-foreground">{displayName}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge className={cn('text-xs', getRankColor(currentRank))}>{currentRank}</Badge>
            {profile?.location_state && (
              <span className="text-xs text-muted-foreground">{profile.location_state}</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3">
            <Link to="/earnings" className="text-xs text-primary flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" /> Earnings
            </Link>
            
            {/* ONLY show the Admin link if the user has the 'admin' role */}
            {profile?.role === 'admin' && (
              <Link to="/admin" className="text-xs text-primary flex items-center gap-1 font-medium bg-primary/10 px-2 py-1 rounded-md">
                <Shield className="h-3 w-3" /> Admin
              </Link>
            )}

            <button onClick={() => { signOut(); navigate('/'); }} className="text-xs text-destructive flex items-center gap-1 font-medium">
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        </div> {/* <-- ADD THIS CLOSING DIV */}

        {/* XP Progress */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground">XP Progress</span>
              <span className="text-xs text-muted-foreground">{xpPoints} / {nextRankXP} XP</span>
            </div>
            <Progress value={progress} className="h-2.5" />
            <p className="text-xs text-muted-foreground mt-1.5">{nextRankXP - xpPoints} XP to next rank</p>
          </CardContent>
        </Card>

        <div className="mb-4"><GlobalCoinPool /></div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { icon: Flame, value: streakDays, label: 'Streak', color: 'text-orange-500' },
            { icon: BookOpen, value: postsRead, label: 'Read', color: 'text-primary' },
            { icon: Star, value: xpPoints, label: 'XP', color: 'text-primary' },
            { icon: Coins, value: userCoins, label: 'Coins', color: 'text-accent' },
          ].map(({ icon: Icon, value, label, color }) => (
            <Card key={label}>
              <CardContent className="p-2.5 flex flex-col items-center">
                <Icon className={cn('h-4 w-4 mb-1', color)} />
                <span className="text-base font-bold text-foreground">{value}</span>
                <span className="text-[9px] text-muted-foreground">{label}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-sm">Top 10 Leaderboard</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {MOCK_LEADERBOARD.map((entry, i) => (
                <div key={entry.user.id} className={cn(
                  'flex items-center gap-3 px-4 py-2.5',
                  i !== MOCK_LEADERBOARD.length - 1 && 'border-b border-border'
                )}>
                  <span className={cn('w-6 text-center font-bold text-sm', i < 3 ? 'text-primary' : 'text-muted-foreground')}>{entry.rank}</span>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={entry.user.avatar} />
                    <AvatarFallback>{entry.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate block">{entry.user.username}</span>
                    <span className="text-[10px] text-muted-foreground">{entry.user.locationState}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{entry.xpPoints} XP</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {savedPostsData.length > 0 && (
          <section>
            <h2 className="font-bold text-sm mb-3">Saved Posts</h2>
            <div className="flex flex-col gap-3">
              {savedPostsData.map(post => <PostCard key={post.id} post={post} />)}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
};

export default Profile;
