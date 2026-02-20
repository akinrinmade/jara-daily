import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PostCard } from '@/components/feed/PostCard';
import { AdCard } from '@/components/feed/AdCard';
import { TrendingRibbon } from '@/components/feed/TrendingRibbon';
import { MOCK_POSTS, MOCK_ADS } from '@/data/mockData';
import { useGamification } from '@/contexts/GamificationContext';
import { useCoins } from '@/contexts/CoinContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BATCH_SIZE = 5;

const Index = () => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const { shadowWalletXP } = useGamification();
  const { userCoins } = useCoins();
  const { isGuest } = useAuth();
  const navigate = useNavigate();

  const trendingPosts = useMemo(
    () => [...MOCK_POSTS].sort((a, b) => b.views - a.views).slice(0, 6),
    []
  );

  const feedItems = useMemo(() => {
    const items: Array<{ type: 'post' | 'ad'; data: any }> = [];
    const posts = MOCK_POSTS.slice(0, visibleCount);
    posts.forEach((post, i) => {
      items.push({ type: 'post', data: post });
      if ((i + 1) % 3 === 0 && MOCK_ADS[Math.floor(i / 3)]) {
        items.push({ type: 'ad', data: MOCK_ADS[Math.floor(i / 3)] });
      }
    });
    return items;
  }, [visibleCount]);

  return (
    <AppLayout>
      <div className="py-4">
        <TrendingRibbon posts={trendingPosts} />

        {isGuest && shadowWalletXP > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                You've earned {shadowWalletXP} XP & {userCoins} Coins as a guest!
              </p>
              <p className="text-xs text-muted-foreground">Sign up to claim your rewards and unlock premium content.</p>
            </div>
            <Button size="sm" onClick={() => navigate('/auth')}>Sign Up</Button>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {feedItems.map((item) =>
            item.type === 'post' ? (
              <PostCard key={item.data.id} post={item.data} />
            ) : (
              <AdCard key={item.data.id} ad={item.data} />
            )
          )}
        </div>

        {visibleCount < MOCK_POSTS.length && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCount(prev => Math.min(prev + BATCH_SIZE, MOCK_POSTS.length))}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
