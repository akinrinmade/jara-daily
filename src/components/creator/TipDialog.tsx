import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Coins, Heart } from 'lucide-react';
import { useCoins } from '@/contexts/CoinContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const PRESET_AMOUNTS = [5, 10, 25, 50];

interface TipDialogProps {
  authorId: string;
  authorName: string;
  postId?: string;
  children: React.ReactNode;
}

export function TipDialog({ authorId, authorName, postId, children }: TipDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(10);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { userCoins, refreshCoins } = useCoins();
  const { user } = useAuth();

  const handleTip = async () => {
    if (!user || amount <= 0 || amount > userCoins) return;
    setLoading(true);
    const { data, error } = await supabase.rpc('tip_author', {
      p_tipper_id: user.id,
      p_author_id: authorId,
      p_amount: amount,
      p_post_id: postId || null,
      p_message: message.slice(0, 200),
    });
    setLoading(false);
    if (error || !data) {
      toast.error('Tip failed — check your balance');
      return;
    }
    toast.success(`Sent ${amount} coins to ${authorName}! 🎉`);
    await refreshCoins();
    setOpen(false);
    setAmount(10);
    setMessage('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" /> Tip {authorName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            {PRESET_AMOUNTS.map(a => (
              <Button
                key={a}
                size="sm"
                variant={amount === a ? 'default' : 'outline'}
                onClick={() => setAmount(a)}
                className="flex-1"
              >
                {a}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-accent" />
            <Input
              type="number"
              min={1}
              max={userCoins}
              value={amount}
              onChange={e => setAmount(Math.max(1, Math.min(userCoins, parseInt(e.target.value) || 0)))}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">/ {userCoins}</span>
          </div>
          <Input
            placeholder="Add a message (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            maxLength={200}
          />
          <Button
            className="w-full"
            onClick={handleTip}
            disabled={loading || amount <= 0 || amount > userCoins}
          >
            {loading ? 'Sending...' : `Send ${amount} Coins`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
