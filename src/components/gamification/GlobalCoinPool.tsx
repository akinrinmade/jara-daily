import { useCoins } from '@/contexts/CoinContext';
import { Progress } from '@/components/ui/progress';
import { Coins } from 'lucide-react';

export function GlobalCoinPool() {
  const { globalRemaining, totalCoins } = useCoins();
  const pct = (globalRemaining / totalCoins) * 100;

  return (
    <div className="p-3 rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 mb-2">
        <Coins className="h-4 w-4 text-accent" />
        <span className="text-xs font-bold text-foreground">Global Coin Pool</span>
      </div>
      <Progress value={pct} className="h-2 mb-1" />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{globalRemaining.toLocaleString()} remaining</span>
        <span>{totalCoins.toLocaleString()} total</span>
      </div>
    </div>
  );
}
