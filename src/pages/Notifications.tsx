import { AppLayout } from '@/components/layout/AppLayout';
import { MOCK_NOTIFICATIONS } from '@/data/mockData';
import { Sparkles, Flame, Heart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
  xp: Sparkles,
  streak: Flame,
  social: Heart,
  system: Info,
};

const Notifications = () => {
  return (
    <AppLayout>
      <div className="py-4">
        <h1 className="text-xl font-black text-foreground mb-4">Notifications</h1>
        <div className="flex flex-col gap-2">
          {MOCK_NOTIFICATIONS.map(n => {
            const Icon = iconMap[n.type];
            return (
              <div
                key={n.id}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-lg border transition-colors',
                  n.read ? 'bg-card border-border' : 'bg-primary/5 border-primary/20'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                  n.type === 'xp' && 'bg-primary/10 text-primary',
                  n.type === 'streak' && 'bg-orange-100 text-orange-500',
                  n.type === 'social' && 'bg-pink-100 text-pink-500',
                  n.type === 'system' && 'bg-muted text-muted-foreground',
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{n.title}</p>
                  <p className="text-xs text-muted-foreground">{n.description}</p>
                </div>
                {n.xpAmount && (
                  <span className="text-xs font-bold text-primary whitespace-nowrap">+{n.xpAmount} XP</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Notifications;
