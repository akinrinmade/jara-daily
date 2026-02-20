import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { getRank, type Rank } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const TOTAL_COINS = 1_000_000;

interface CoinEvent {
  id: string;
  amount: number;
  reason: string;
  timestamp: number;
}

interface CoinState {
  userCoins: number;
  globalRemaining: number;
  totalCoins: number;
  recentCoinEvents: CoinEvent[];
}

interface CoinContextType extends CoinState {
  earnCoins: (baseReward: number, sourceType: string, reason: string, postId?: string) => Promise<number>;
  dismissCoinEvent: (id: string) => void;
  spendCoins: (amount: number, reason: string) => boolean;
  refreshCoins: () => Promise<void>;
}

const CoinContext = createContext<CoinContextType | null>(null);

export function CoinProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth();

  const [state, setState] = useState<CoinState>({
    userCoins: 0,
    globalRemaining: TOTAL_COINS,
    totalCoins: TOTAL_COINS,
    recentCoinEvents: [],
  });

  const refreshCoins = useCallback(async () => {
    const [poolRes, profileRes] = await Promise.all([
      supabase.from('coin_pool').select('remaining, total_supply').eq('id', 1).maybeSingle(),
      user ? supabase.from('profiles').select('coins').eq('id', user.id).maybeSingle() : null,
    ]);
    setState(prev => ({
      ...prev,
      globalRemaining: poolRes.data?.remaining ?? prev.globalRemaining,
      totalCoins: poolRes.data?.total_supply ?? prev.totalCoins,
      userCoins: profileRes?.data?.coins ?? prev.userCoins,
    }));
  }, [user]);

  // Fetch global pool + sync user coins from profile
  useEffect(() => {
    refreshCoins();
  }, [refreshCoins]);

  useEffect(() => {
    if (profile) {
      setState(prev => ({ ...prev, userCoins: profile.coins }));
    }
  }, [profile]);

  const earnCoins = useCallback(async (baseReward: number, sourceType: string, reason: string, postId?: string): Promise<number> => {
    if (!user) {
      // Guest: local-only coin simulation
      const earned = Math.max(1, Math.min(5, baseReward));
      const event: CoinEvent = { id: crypto.randomUUID(), amount: earned, reason, timestamp: Date.now() };
      setState(prev => ({
        ...prev,
        userCoins: prev.userCoins + earned,
        recentCoinEvents: [event, ...prev.recentCoinEvents].slice(0, 5),
      }));
      return earned;
    }

    // Use server-side atomic function with idempotency key
    const idempotencyKey = `${user.id}_${sourceType}_${postId || 'none'}_${Date.now()}`;
    const { data: earned, error } = await supabase.rpc('earn_coins', {
      p_user_id: user.id,
      p_source_type: sourceType as any,
      p_base_reward: baseReward,
      p_post_id: postId || null,
      p_idempotency_key: idempotencyKey,
    });

    if (error || !earned) return 0;

    const event: CoinEvent = { id: crypto.randomUUID(), amount: earned, reason, timestamp: Date.now() };
    setState(prev => ({
      ...prev,
      userCoins: prev.userCoins + earned,
      globalRemaining: prev.globalRemaining - earned,
      recentCoinEvents: [event, ...prev.recentCoinEvents].slice(0, 5),
    }));

    return earned;
  }, [user]);

  const spendCoins = useCallback((amount: number, reason: string) => {
    let success = false;
    setState(prev => {
      if (prev.userCoins < amount) return prev;
      success = true;
      return { ...prev, userCoins: prev.userCoins - amount };
    });
    return success;
  }, []);

  const dismissCoinEvent = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      recentCoinEvents: prev.recentCoinEvents.filter(e => e.id !== id),
    }));
  }, []);

  return (
    <CoinContext.Provider value={{ ...state, earnCoins, dismissCoinEvent, spendCoins, refreshCoins }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoins() {
  const ctx = useContext(CoinContext);
  if (!ctx) throw new Error('useCoins must be used within CoinProvider');
  return ctx;
}
