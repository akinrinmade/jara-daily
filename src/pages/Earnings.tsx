import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useCoins } from '@/contexts/CoinContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Coins, TrendingUp, Heart, Rocket, ArrowLeft } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';

interface TipRecord {
  id: string;
  amount: number;
  message: string;
  created_at: string;
  tipper_id: string;
  post_id: string | null;
}

const PIE_COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(142 72% 29%)', 'hsl(var(--muted-foreground))'];

const Earnings = () => {
  const { user, isGuest } = useAuth();
  const { userCoins } = useCoins();
  const navigate = useNavigate();
  const [tipsReceived, setTipsReceived] = useState<TipRecord[]>([]);
  const [tipsSent, setTipsSent] = useState<TipRecord[]>([]);
  const [boostSpent, setBoostSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [received, sent, boosts] = await Promise.all([
        supabase.from('tips').select('*').eq('author_id', user.id).order('created_at', { ascending: false }).limit(50),
        supabase.from('tips').select('*').eq('tipper_id', user.id).order('created_at', { ascending: false }).limit(50),
        supabase.from('post_boosts').select('amount').eq('booster_id', user.id),
      ]);
      setTipsReceived((received.data || []) as TipRecord[]);
      setTipsSent((sent.data || []) as TipRecord[]);
      setBoostSpent((boosts.data || []).reduce((s, b) => s + b.amount, 0));
      setLoading(false);
    };
    load();
  }, [user]);

  if (isGuest) {
    return (
      <AppLayout>
        <div className="py-20 text-center">
          <h1 className="text-xl font-black text-foreground mb-2">Creator Earnings</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to see your earnings dashboard.</p>
          <Button onClick={() => navigate('/auth')}>Sign In</Button>
        </div>
      </AppLayout>
    );
  }

  const totalReceived = tipsReceived.reduce((s, t) => s + t.amount, 0);
  const totalSent = tipsSent.reduce((s, t) => s + t.amount, 0);

  // Build daily chart data from tips received (last 7 days)
  const chartData = (() => {
    const days: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toLocaleDateString('en', { weekday: 'short' });
      days[key] = 0;
    }
    tipsReceived.forEach(t => {
      const key = new Date(t.created_at).toLocaleDateString('en', { weekday: 'short' });
      if (key in days) days[key] += t.amount;
    });
    return Object.entries(days).map(([day, coins]) => ({ day, coins }));
  })();

  const pieData = [
    { name: 'Tips Received', value: totalReceived || 1 },
    { name: 'Tips Sent', value: totalSent || 0 },
    { name: 'Boosts', value: boostSpent || 0 },
    { name: 'Balance', value: userCoins },
  ].filter(d => d.value > 0);

  return (
    <AppLayout>
      <div className="py-4">
        <Link to="/profile" className="inline-flex items-center gap-1 text-sm text-muted-foreground mb-4 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Profile
        </Link>
        <h1 className="text-xl font-black text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> Creator Earnings
        </h1>

        {/* KPI cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: Coins, label: 'Balance', value: userCoins, color: 'text-accent' },
            { icon: Heart, label: 'Tips Received', value: totalReceived, color: 'text-pink-500' },
            { icon: Heart, label: 'Tips Sent', value: totalSent, color: 'text-muted-foreground' },
            { icon: Rocket, label: 'Boost Spent', value: boostSpent, color: 'text-primary' },
          ].map(({ icon: Icon, label, value, color }) => (
            <Card key={label}>
              <CardContent className="p-3 flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <div>
                  <p className="text-lg font-bold text-foreground">{value}</p>
                  <p className="text-[10px] text-muted-foreground">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Earnings chart */}
        <Card className="mb-5">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Tips This Week</CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCoins" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="coins" stroke="hsl(var(--primary))" fill="url(#colorCoins)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie breakdown */}
        <Card className="mb-5">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm">Coin Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
          <div className="flex flex-wrap gap-3 px-4 pb-3 text-[10px] text-muted-foreground">
            {pieData.map((d, i) => (
              <span key={d.name} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                {d.name}
              </span>
            ))}
          </div>
        </Card>

        {/* Recent tips */}
        <section>
          <h2 className="font-bold text-sm mb-3">Recent Tips Received</h2>
          {tipsReceived.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No tips yet — share great content to start earning!</p>
          ) : (
            <div className="space-y-2">
              {tipsReceived.slice(0, 10).map(t => (
                <Card key={t.id}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <Coins className="h-4 w-4 text-accent" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">+{t.amount} coins</p>
                      {t.message && <p className="text-xs text-muted-foreground truncate">{t.message}</p>}
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(t.created_at).toLocaleDateString()}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
};

export default Earnings;
