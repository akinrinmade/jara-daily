import { Flame, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGamification } from '@/contexts/GamificationContext';
import { useAuth } from '@/contexts/AuthContext';
import { CoinDisplay } from '@/components/gamification/CoinDisplay';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function TopBar() {
  const { streakDays } = useGamification();
  const { isGuest } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <Link to="/" className="flex items-center gap-1">
          <span className="text-xl font-black text-primary">Jara</span>
          <span className="text-xl font-black text-foreground">Daily</span>
        </Link>

        <div className="flex items-center gap-2">
          {isGuest ? (
            <Link to="/auth">
              <Button size="sm" variant="outline" className="h-8 text-xs">Login</Button>
            </Link>
          ) : (
            <>
              <CoinDisplay />
              <div className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-bold',
                streakDays > 0 ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'
              )}>
                <Flame className={cn('h-4 w-4', streakDays > 0 && 'text-orange-500')} />
                <span>{streakDays}</span>
              </div>
            </>
          )}
          <Link to="/notifications" className="relative p-1.5">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </header>
  );
}
