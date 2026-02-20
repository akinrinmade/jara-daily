import { Link } from 'react-router-dom';
import { Heart, Share2, MessageCircle, Clock, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post } from '@/types';
import { cn } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  Money: 'bg-primary text-primary-foreground',
  Hausa: 'bg-purple-600 text-white',
  Gist: 'bg-pink-500 text-white',
};

export function PostCard({ post }: { post: Post }) {
  return (
    <Link to={`/post/${post.slug}`} className="block group">
      <article className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <Badge className={cn('absolute top-3 left-3 text-[10px]', categoryColors[post.category])}>
            {post.category}
          </Badge>
          {post.isPremium && (
            <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground text-[10px]">
              Premium
            </Badge>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}m</span>
              <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{(post.views / 1000).toFixed(1)}k</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" />{post.reactionsCount}</span>
            <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" />{post.commentsCount}</span>
            <span className="flex items-center gap-1 ml-auto"><Share2 className="h-3.5 w-3.5" />{post.shares}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
