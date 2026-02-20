import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { getRank, type Rank } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface XPEvent {
  id: string;
  amount: number;
  reason: string;
  timestamp: number;
}

interface GamificationState {
  xpPoints: number;
  currentRank: Rank;
  streakDays: number;
  postsRead: number;
  savedPosts: string[];
  isGuest: boolean;
  shadowWalletXP: number;
  recentXPEvents: XPEvent[];
}

interface GamificationContextType extends GamificationState {
  addXP: (amount: number, reason: string) => void;
  toggleSavePost: (postId: string) => void;
  markPostRead: (postId: string) => void;
  dismissXPEvent: (id: string) => void;
}

const GamificationContext = createContext<GamificationContextType | null>(null);

export function GamificationProvider({ children }: { children: ReactNode }) {
  const { user, profile, isGuest, refreshProfile } = useAuth();

  const [state, setState] = useState<GamificationState>({
    xpPoints: 0,
    currentRank: 'JJC',
    streakDays: 0,
    postsRead: 0,
    savedPosts: [],
    isGuest: true,
    shadowWalletXP: 0,
    recentXPEvents: [],
  });

  // Sync from profile
  useEffect(() => {
    if (profile) {
      setState(prev => ({
        ...prev,
        xpPoints: profile.xp_points,
        currentRank: profile.current_rank as Rank,
        streakDays: profile.streak_days,
        postsRead: profile.posts_read,
        savedPosts: profile.saved_posts || [],
        isGuest: false,
      }));
    } else {
      setState(prev => ({ ...prev, isGuest: true }));
    }
  }, [profile]);

  const addXP = useCallback(async (amount: number, reason: string) => {
    const event: XPEvent = { id: crypto.randomUUID(), amount, reason, timestamp: Date.now() };
    
    setState(prev => {
      const newXP = prev.xpPoints + amount;
      const shadowXP = prev.isGuest ? prev.shadowWalletXP + amount : prev.shadowWalletXP;
      return {
        ...prev,
        xpPoints: newXP,
        currentRank: getRank(newXP),
        shadowWalletXP: shadowXP,
        recentXPEvents: [event, ...prev.recentXPEvents].slice(0, 5),
      };
    });

    // Persist to DB if logged in
    if (user) {
      await supabase.rpc('add_xp', { p_user_id: user.id, p_amount: amount });
    }
  }, [user]);

  const toggleSavePost = useCallback(async (postId: string) => {
    setState(prev => {
      const newSaved = prev.savedPosts.includes(postId)
        ? prev.savedPosts.filter(id => id !== postId)
        : [...prev.savedPosts, postId];
      
      // Persist to DB if logged in
      if (user) {
        supabase.from('profiles').update({ saved_posts: newSaved }).eq('id', user.id).then();
      }
      
      return { ...prev, savedPosts: newSaved };
    });
  }, [user]);

  const markPostRead = useCallback((postId: string) => {
    setState(prev => {
      const newCount = prev.postsRead + 1;
      if (user) {
        supabase.from('profiles').update({ posts_read: newCount }).eq('id', user.id).then();
      }
      return { ...prev, postsRead: newCount };
    });
    addXP(10, 'Read a post');
  }, [addXP, user]);

  const dismissXPEvent = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      recentXPEvents: prev.recentXPEvents.filter(e => e.id !== id),
    }));
  }, []);

  return (
    <GamificationContext.Provider value={{ ...state, addXP, toggleSavePost, markPostRead, dismissXPEvent }}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}
