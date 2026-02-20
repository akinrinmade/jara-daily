import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useGamification } from '@/contexts/GamificationContext';

export function XPToast() {
  const { recentXPEvents, dismissXPEvent } = useGamification();

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-xs">
      <AnimatePresence>
        {recentXPEvents.map(event => (
          <XPToastItem key={event.id} event={event} onDismiss={dismissXPEvent} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function XPToastItem({ event, onDismiss }: { event: { id: string; amount: number; reason: string }; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(event.id), 3000);
    return () => clearTimeout(t);
  }, [event.id, onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.8 }}
      className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 shadow-lg flex items-center gap-2"
    >
      <Sparkles className="h-4 w-4 text-accent" />
      <div className="flex-1 min-w-0">
        <span className="font-bold text-sm">+{event.amount} XP</span>
        <p className="text-[11px] opacity-80 truncate">{event.reason}</p>
      </div>
      <button onClick={() => onDismiss(event.id)} className="p-0.5 hover:opacity-70">
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}
