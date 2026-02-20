import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Post } from '@/types';

export function TrendingRibbon({ posts }: { posts: Post[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h2 className="font-bold text-sm text-foreground">Top for You</h2>
        </div>
        <Link to="/discover" className="text-xs text-primary flex items-center gap-0.5 font-medium">
          See all <ChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <div ref={scrollRef} className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
        {posts.map(post => (
          <Link key={post.id} to={`/post/${post.slug}`} className="flex-shrink-0 w-36">
            <div className="rounded-lg overflow-hidden border border-border bg-card">
              <img src={post.imageUrl} alt={post.title} className="w-full h-20 object-cover" loading="lazy" />
              <div className="p-2">
                <p className="text-[11px] font-semibold text-foreground line-clamp-2 leading-tight">{post.title}</p>
                <span className="text-[10px] text-muted-foreground mt-1 block">{post.author.name}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
