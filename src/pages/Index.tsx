import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PostCard } from '@/components/feed/PostCard';
import { AdCard } from '@/components/feed/AdCard';
import { TrendingRibbon } from '@/components/feed/TrendingRibbon';
import { MOCK_POSTS, MOCK_ADS } from '@/data/mockData';
import { useGamification } from '@/contexts/GamificationContext';
import { useCoins } from '@/contexts/CoinContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BATCH_SIZE = 5;

const Index = () => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const { shadowWalletXP } = useGamification();
  const { userCoins } = useCoins();
  const { isGuest } = useAuth();
  const navigate = useNavigate();
  const observerTarget = useRef<HTMLDivElement>(null);

  // Top Trending Ribbon Logic
  const trendingPosts = useMemo(
    () => [...MOCK_POSTS].sort((a, b) => b.views - a.views).slice(0, 6),
    []
  );

  // Feed Batching & Ad Insertion Logic
  const feedItems = useMemo(() => {
    const items: Array<{ type: 'post' | 'ad'; data: any; key: string }> = [];
    const posts = MOCK_POSTS.slice(0, visibleCount);
    
    posts.forEach((post, i) => {
      items.push({ type: 'post', data: post, key: `post-${post.id}-${i}` });
      // Inject an ad every 3 posts
      if ((i + 1) % 3 === 0 && MOCK_ADS[Math.floor(i / 3)]) {
        const ad = MOCK_ADS[Math.floor(i / 3)];
        items.push({ type: 'ad', data: ad, key: `ad-${ad.id}-${i}` });
      }
    });
    return items;
  }, [visibleCount]);

  // Infinite Scroll Trigger Function
  const loadMore = useCallback(() => {
    if (visibleCount >= MOCK_POSTS.length || isLoadingMore) return;
    
    setIsLoadingMore(true);
    // Simulate a slight network delay (800ms) for a premium, realistic feel
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + BATCH_SIZE, MOCK_POSTS.length));
      setIsLoadingMore(false);
    }, 800);
  }, [visibleCount, isLoadingMore]);

  // The Tripwire (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the invisible target comes into the viewport, load more!
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '400px' } // Pre-load 400px before they hit the absolute bottom
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <AppLayout>
      <div className="py-4">
        <TrendingRibbon posts={trendingPosts} />

        {/* Shadow Wallet Hook for Guests */}
        {isGuest && shadowWalletXP > 0 && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/30 flex items-center gap-3 shadow-sm">
            <Sparkles className="h-6 w-6 text-primary flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="text-sm font-black text-foreground tracking-tight">
                You've earned {shadowWalletXP} XP & {userCoins} Coins!
              </p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Sign up to claim your shadow wallet.</p>
            </div>
            <Button size="sm" className="shadow-md" onClick={() => navigate('/auth')}>Claim Now</Button>
          </div>
        )}

        {/* The Main Feed */}
        <div className="flex flex-col gap-5">
          {feedItems.map((item) =>
            item.type === 'post' ? (
              <PostCard key={item.key} post={item.data} />
            ) : (
              <AdCard key={item.key} ad={item.data} />
            )
          )}
        </div>

        {/* The Tripwire Target & Loading State */}
        {visibleCount < MOCK_POSTS.length ? (
          <div ref={observerTarget} className="mt-10 flex justify-center pb-12">
            {isLoadingMore && <Loader2 className="h-8 w-8 animate-spin text-primary opacity-80" />}
          </div>
        ) : (
          <div className="mt-10 mb-12 text-center flex flex-col items-center justify-center gap-2">
             <div className="h-1 w-12 bg-border rounded-full mb-2" />
             <p className="text-muted-foreground text-sm font-bold">You've caught up for today!</p>
             <p className="text-xs text-muted-foreground/60">Check back later for new stories.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;