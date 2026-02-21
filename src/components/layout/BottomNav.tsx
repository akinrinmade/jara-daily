import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, PlusCircle, Bell, User, Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGamification } from '@/contexts/GamificationContext';
import { useAuth } from '@/contexts/AuthContext';

export function BottomNav() {
  const location = useLocation();
  const { recentXPEvents } = useGamification();
  const { profile } = useAuth(); // Get the user's profile to check their role
  const hasUnread = recentXPEvents.length > 0;

  // Dynamically build the tabs based on role
  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    // ONLY show Create if they are a creator or admin
    ...(profile?.role === 'creator' || profile?.role === 'admin' 
        ? [{ path: '/create', icon: PlusCircle, label: 'Create' }] 
        : []),
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isCreate = path === '/create';
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                isCreate && 'relative'
              )}
            >
              {isCreate ? (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center -mt-4 shadow-lg">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
              ) : (
                <Icon className="h-5 w-5" />
              )}
              <span className={cn('text-[10px] font-medium', isCreate && '-mt-0.5')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}