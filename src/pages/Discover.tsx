import { useState, useMemo } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PostCard } from '@/components/feed/PostCard';
import { MOCK_POSTS } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types';

const CATEGORIES: Array<Category | 'All' | 'Trending'> = ['All', 'Money', 'Hausa', 'Gist', 'Trending'];

const Discover = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    let posts = [...MOCK_POSTS];
    if (activeCategory === 'Trending') {
      posts.sort((a, b) => b.views - a.views);
    } else if (activeCategory !== 'All') {
      posts = posts.filter(p => p.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    return posts;
  }, [search, activeCategory]);

  const aiPicks = useMemo(
    () => [...MOCK_POSTS].sort((a, b) => b.reactionsCount - a.reactionsCount).slice(0, 3),
    []
  );

  return (
    <AppLayout>
      <div className="py-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-5 -mx-4 px-4">
          {CATEGORIES.map(cat => (
            <Badge
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              className={cn('cursor-pointer whitespace-nowrap', activeCategory === cat && 'bg-primary text-primary-foreground')}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        {!search && activeCategory === 'All' && (
          <section className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm">AI Picks for You</h2>
            </div>
            <div className="flex flex-col gap-3">
              {aiPicks.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-col gap-4">
          {filtered.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No posts found.</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Discover;
