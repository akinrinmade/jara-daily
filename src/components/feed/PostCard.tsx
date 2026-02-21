import { Link } from 'react-router-dom';
import { Heart, Share2, MessageCircle, Clock, Eye, PlayCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post } from '@/types';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const categoryColors: Record<string, string> = {
  Money: 'bg-primary text-primary-foreground',
  Hausa: 'bg-purple-600 text-white',
  Gist: 'bg-pink-500 text-white',
};

export function PostCard({ post }: { post: Post }) {
  // TikTok-style: prepare for video/AR content
  // @ts-ignore - media_type will be added to your types in Phase 2
  const isVideo = post.media_type === 'video' || post.imageUrl?.includes('.mp4');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Link to={`/post/${post.slug}`} className="block group">
        <article className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
          
          {/* Immersive TikTok-style Aspect Ratio (Taller on mobile, widescreen on desktop) */}
          <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden bg-muted">
            {isVideo && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors z-10">
                 <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
               </div>
            )}
            
            <img
              src={post.imageUrl}
              alt={post.title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                post.isPremium ? "filter contrast-125" : ""
              )}
              loading="lazy"
            />
            
            <div className="absolute top-3 left-3 flex gap-2 z-20">
              <Badge className={cn('text-[10px] font-bold shadow-sm', categoryColors[post.category] || 'bg-secondary')}>
                {post.category}
              </Badge>
              {isVideo && (
                <Badge variant="secondary" className="bg-black/60 text-white border-none backdrop-blur-md text-[10px]">
                  Video
                </Badge>
              )}
            </div>
            
            {post.isPremium && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white border-none shadow-md text-[10px] z-20 font-bold">
                Premium
              </Badge>
            )}
            
            {/* Dark gradient at the bottom for text readability on mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10" />
            
            {/* Embedded Title inside the image (Mobile Only) */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1.5 sm:hidden">
              <h3 className="font-bold text-white text-lg leading-tight line-clamp-2 drop-shadow-md">
                {post.title}
              </h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5 border border-white/50">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="text-[10px] text-foreground">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-white drop-shadow-md flex items-center gap-1">
                  {post.author.name}
                  {(post.author.role === 'creator' || post.author.role === 'admin') && (
                    <Badge variant="secondary" className="bg-blue-500/80 text-white border-none px-1 py-0 text-[8px] h-3">Creator</Badge>
                  )}
                </span>
              </div>
            </div>
          </div>
          
          {/* Desktop Title & Excerpt (Hidden on Mobile for immersive feel) */}
          <div className="p-4 hidden sm:block">
            <h3 className="font-bold text-foreground text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs font-medium text-muted-foreground">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readTime}m</span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{(post.views / 1000).toFixed(1)}k</span>
              </div>
            </div>
          </div>

          {/* Universal Action Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-t border-border sm:bg-transparent sm:border-t-0 sm:pt-0">
             <div className="flex items-center gap-5 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5 hover:text-pink-500 transition-colors"><Heart className="h-4 w-4" />{post.reactionsCount}</span>
              <span className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"><MessageCircle className="h-4 w-4" />{post.commentsCount}</span>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors"><Share2 className="h-4 w-4" />{post.shares}</span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}