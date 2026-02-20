import { Coins } from 'lucide-react';
import { useCoins } from '@/contexts/CoinContext';
import { cn } from '@/lib/utils';

export function CoinDisplay({ className }: { className?: string }) {
  const { userCoins } = useCoins();

  return (
    <div className={cn('flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/20 text-accent-foreground text-sm font-bold', className)}>
      <Coins className="h-4 w-4 text-accent" />
      <span>{userCoins}</span>
    </div>
  );
}
