import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Rocket, Coins } from 'lucide-react';
import { useCoins } from '@/contexts/CoinContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const BOOST_TIERS = [
  { amount: 10, label: 'Small Boost', reach: '~500 views' },
  { amount: 25, label: 'Medium Boost', reach: '~2K views' },
  { amount: 50, label: 'Big Boost', reach: '~5K views' },
  { amount: 100, label: 'Mega Boost', reach: '~15K views' },
];

interface BoostDialogProps {
  postId: string;
  postTitle: string;
  children: React.ReactNode;
}

export function BoostDialog({ postId, postTitle, children }: BoostDialogProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(1);
  const [loading, setLoading] = useState(false);
  const { userCoins, refreshCoins } = useCoins();
  const { user } = useAuth();

  const tier = BOOST_TIERS[selected];

  const handleBoost = async () => {
    if (!user || tier.amount > userCoins) return;
    setLoading(true);
    const { data, error } = await supabase.rpc('boost_post', {
      p_booster_id: user.id,
      p_post_id: postId,
      p_amount: tier.amount,
    });
    setLoading(false);
    if (error || !data) {
      toast.error('Boost failed — check your balance');
      return;
    }
    toast.success(`Post boosted with ${tier.amount} coins! 🚀`);
    await refreshCoins();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" /> Boost Post
          </DialogTitle>
        </DialogHeader>
        <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{postTitle}</p>
        <div className="space-y-2">
          {BOOST_TIERS.map((t, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                selected === i ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
              } ${t.amount > userCoins ? 'opacity-40 cursor-not-allowed' : ''}`}
              disabled={t.amount > userCoins}
            >
              <div>
                <span className="text-sm font-semibold text-foreground">{t.label}</span>
                <span className="text-xs text-muted-foreground block">{t.reach}</span>
              </div>
              <span className="flex items-center gap-1 text-sm font-bold text-foreground">
                <Coins className="h-3.5 w-3.5 text-accent" /> {t.amount}
              </span>
            </button>
          ))}
        </div>
        <Button
          className="w-full mt-2"
          onClick={handleBoost}
          disabled={loading || tier.amount > userCoins}
        >
          {loading ? 'Boosting...' : `Boost for ${tier.amount} Coins`}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
