import { useMemo, useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { MOCK_POSTS } from '@/data/mockData';
import { useGamification } from '@/contexts/GamificationContext';
import { useCoins } from '@/contexts/CoinContext';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/feed/PostCard';
import { ArrowLeft, Heart, Share2, MessageCircle, Bookmark, Clock, Send, Rocket } from 'lucide-react';
import { TipDialog } from '@/components/creator/TipDialog';
import { BoostDialog } from '@/components/creator/BoostDialog';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const REACTIONS = ['🔥', '❤️', '😂', '👏'];

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
}

const MOCK_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Chidi O.', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Chidi', text: 'This is so helpful! Thanks for sharing 🙏', time: '2h ago' },
  { id: 'c2', author: 'Amina B.', avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Amina', text: 'Great content as always!', time: '5h ago' },
];

const PostDetail = () => {
  const { slug } = useParams();
  const post = MOCK_POSTS.find(p => p.slug === slug);
  const { addXP, markPostRead, toggleSavePost, savedPosts } = useGamification();
  const isSaved = post ? savedPosts.includes(post.id) : false;
  const { earnCoins } = useCoins();
  const { user } = useAuth();
  const [activeReaction, setActiveReaction] = useState<string | null>(null);
  const hasTrackedRead = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [blurred, setBlurred] = useState(false);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
  const [newComment, setNewComment] = useState('');

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return MOCK_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  }, [post]);

  useEffect(() => {
    if (!post || hasTrackedRead.current) return;
    const handleScroll = () => {
      if (!contentRef.current) return;
      const rect = contentRef.current.getBoundingClientRect();
      const totalHeight = contentRef.current.scrollHeight;
      const scrollDepth = Math.min(1, (window.innerHeight - rect.top) / totalHeight);
      if (post.isPremium && scrollDepth > 0.5) setBlurred(true);
      if (scrollDepth > 0.8 && !hasTrackedRead.current) {
        hasTrackedRead.current = true;
        markPostRead(post.id);
        earnCoins(3, 'read', 'Read a post', post.id);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post, markPostRead, earnCoins]);

  if (!post) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <p className="text-muted-foreground">Post not found</p>
          <Link to="/" className="text-primary text-sm mt-2 inline-block">Go home</Link>
        </div>
      </AppLayout>
    );
  }

  const handleReaction = (emoji: string) => {
    if (activeReaction === emoji) {
      // User clicked the same emoji again -> remove the reaction
      setActiveReaction(null);
    } else {
      // User clicked a new emoji
      const isFirstReaction = activeReaction === null;
      setActiveReaction(emoji);
      
      // Only award XP/Coins if this is their first reaction on the post
      if (isFirstReaction) {
        addXP(5, `Liked with ${emoji}`);
        earnCoins(2, 'like', `Reacted ${emoji}`, post.id);
      }
    }
  };
  const handleShare = () => {
    addXP(10, 'Shared a post');
    earnCoins(5, 'share', 'Shared a post', post.id);
    if (navigator.share) navigator.share({ title: post.title, url: window.location.href });
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: crypto.randomUUID(),
      author: 'You',
      avatar: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Guest',
      text: newComment,
      time: 'Just now',
    };
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    addXP(10, 'Commented on a post');
    earnCoins(4, 'comment', 'Commented on a post', post.id);
  };

  return (
    <AppLayout>
      <div className="py-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <img src={post.imageUrl} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-xl mb-4" />
        <Badge className="mb-3">{post.category}</Badge>
        <h1 className="text-2xl font-black text-foreground leading-tight mb-3">{post.title}</h1>

        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-sm font-medium text-foreground">{post.author.name}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />{post.readTime} min read
            </div>
          </div>
        </div>

        <div ref={contentRef} className="relative">
          <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-line">
            {post.content}
          </div>
          {blurred && post.isPremium && (
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/90 to-transparent flex flex-col items-center justify-end pb-6">
              <p className="text-sm font-bold text-foreground mb-1">Sign up to unlock + earn XP & Coins</p>
              <p className="text-xs text-muted-foreground mb-3">Premium content for Jara Daily members</p>
              <Button size="sm">Sign Up Free</Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-6 mb-4">
          {REACTIONS.map(emoji => (
            <button
              key={emoji}
              onClick={() => handleReaction(emoji)}
              className={cn(
                'px-3 py-1.5 rounded-full border text-sm transition-all',
                activeReaction === emoji ? 'border-primary bg-primary/10 scale-110' : 'border-border hover:border-primary/50'
              )}
            >
              {emoji}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 pb-4 border-b border-border flex-wrap">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toggleSavePost(post.id)}>
            <Bookmark className={cn('h-4 w-4 mr-1', isSaved && 'fill-current text-primary')} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          {user && (
            <>
              <TipDialog authorId={post.author.id} authorName={post.author.name} postId={post.id}>
                <Button variant="ghost" size="sm">
                  <Heart className="h-4 w-4 mr-1 text-pink-500" /> Tip
                </Button>
              </TipDialog>
              <BoostDialog postId={post.id} postTitle={post.title}>
                <Button variant="ghost" size="sm">
                  <Rocket className="h-4 w-4 mr-1 text-primary" /> Boost
                </Button>
              </BoostDialog>
            </>
          )}
        </div>

        {/* Comments */}
        <section className="mt-5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> Comments ({comments.length})
          </h3>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleComment()}
              className="flex-1"
            />
            <Button size="icon" onClick={handleComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            {comments.map(c => (
              <div key={c.id} className="flex gap-2">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarImage src={c.avatar} />
                  <AvatarFallback>{c.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted rounded-lg p-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground">{c.author}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-foreground mt-0.5">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section className="mt-6">
            <h3 className="font-bold text-sm mb-3">Related Posts</h3>
            <div className="flex flex-col gap-3">
              {relatedPosts.map(p => <PostCard key={p.id} post={p} />)}
            </div>
          </section>
        )}
      </div>
    </AppLayout>
  );
};

export default PostDetail;
