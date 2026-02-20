import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCoins } from '@/contexts/CoinContext';
import { MOCK_POSTS, MOCK_LEADERBOARD, MOCK_ADS } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Users, Eye, TrendingUp, Coins, Activity, Target, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const engagementData = [
  { day: 'Mon', views: 4200, shares: 320, reads: 1800 },
  { day: 'Tue', views: 5100, shares: 410, reads: 2200 },
  { day: 'Wed', views: 3800, shares: 290, reads: 1500 },
  { day: 'Thu', views: 6200, shares: 560, reads: 2900 },
  { day: 'Fri', views: 7100, shares: 680, reads: 3400 },
  { day: 'Sat', views: 8900, shares: 890, reads: 4100 },
  { day: 'Sun', views: 7600, shares: 720, reads: 3600 },
];

const coinFlowData = [
  { day: 'Mon', earned: 1200, spent: 300 },
  { day: 'Tue', earned: 1800, spent: 420 },
  { day: 'Wed', earned: 900, spent: 200 },
  { day: 'Thu', earned: 2100, spent: 560 },
  { day: 'Fri', earned: 2800, spent: 700 },
  { day: 'Sat', earned: 3200, spent: 890 },
  { day: 'Sun', earned: 2600, spent: 650 },
];

const categoryData = [
  { name: 'Money', value: 42, fill: 'hsl(153, 100%, 27%)' },
  { name: 'Gist', value: 35, fill: 'hsl(340, 80%, 55%)' },
  { name: 'Hausa', value: 23, fill: 'hsl(270, 60%, 55%)' },
];

const retentionCohorts = [
  { cohort: 'Week 1', d1: 85, d3: 62, d7: 41, d14: 28, d30: 18 },
  { cohort: 'Week 2', d1: 88, d3: 65, d7: 44, d14: 31, d30: 20 },
  { cohort: 'Week 3', d1: 82, d3: 58, d7: 38, d14: 25, d30: 16 },
  { cohort: 'Week 4', d1: 90, d3: 68, d7: 48, d14: 34, d30: 22 },
];

const Admin = () => {
  const { globalRemaining, totalCoins } = useCoins();
  const poolPct = (globalRemaining / totalCoins) * 100;

  const totalViews = MOCK_POSTS.reduce((s, p) => s + p.views, 0);
  const totalShares = MOCK_POSTS.reduce((s, p) => s + p.shares, 0);

  return (
    <AppLayout>
      <div className="py-4">
        <h1 className="text-xl font-black text-foreground mb-4">Admin Dashboard</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">12.4K</p>
                <p className="text-[10px] text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">{(totalViews / 1000).toFixed(0)}K</p>
                <p className="text-[10px] text-muted-foreground">Total Views</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-lg font-bold text-foreground">{(totalShares / 1000).toFixed(1)}K</p>
                <p className="text-[10px] text-muted-foreground">Total Shares</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 flex items-center gap-2">
              <Coins className="h-5 w-5 text-accent" />
              <div>
                <p className="text-lg font-bold text-foreground">{(globalRemaining / 1000).toFixed(0)}K</p>
                <p className="text-[10px] text-muted-foreground">Coins Left</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coin Pool */}
        <Card className="mb-5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-foreground">Ecosystem Coin Pool</span>
              </div>
              <span className="text-xs text-muted-foreground">{poolPct.toFixed(1)}% remaining</span>
            </div>
            <Progress value={poolPct} className="h-3 mb-2" />
            <p className="text-[10px] text-muted-foreground">
              {globalRemaining.toLocaleString()} / {totalCoins.toLocaleString()} Jara Coins
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="engagement" className="mb-5">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="engagement" className="text-xs">Engage</TabsTrigger>
            <TabsTrigger value="coins" className="text-xs">Coins</TabsTrigger>
            <TabsTrigger value="retention" className="text-xs">Retain</TabsTrigger>
            <TabsTrigger value="ads" className="text-xs">Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold mb-3">Weekly Engagement</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={engagementData}>
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="views" fill="hsl(153, 100%, 27%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="reads" fill="hsl(153, 100%, 40%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="coins">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold mb-3">Coin Flow</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={coinFlowData}>
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="earned" stroke="hsl(45, 100%, 55%)" strokeWidth={2} />
                      <Line type="monotone" dataKey="spent" stroke="hsl(0, 84%, 60%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="retention">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold mb-3">Retention Cohorts</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-muted-foreground">
                        <th className="text-left py-1.5 font-medium">Cohort</th>
                        <th className="text-center py-1.5 font-medium">D1</th>
                        <th className="text-center py-1.5 font-medium">D3</th>
                        <th className="text-center py-1.5 font-medium">D7</th>
                        <th className="text-center py-1.5 font-medium">D14</th>
                        <th className="text-center py-1.5 font-medium">D30</th>
                      </tr>
                    </thead>
                    <tbody>
                      {retentionCohorts.map(c => (
                        <tr key={c.cohort} className="border-t border-border">
                          <td className="py-1.5 font-medium text-foreground">{c.cohort}</td>
                          {[c.d1, c.d3, c.d7, c.d14, c.d30].map((val, i) => (
                            <td key={i} className="text-center py-1.5">
                              <span className={cn(
                                'px-1.5 py-0.5 rounded text-[10px] font-bold',
                                val >= 60 ? 'bg-primary/20 text-primary' :
                                val >= 30 ? 'bg-accent/20 text-accent-foreground' :
                                'bg-destructive/20 text-destructive'
                              )}>
                                {val}%
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-bold mb-3">Ad Campaigns</h3>
                <div className="space-y-3">
                  {MOCK_ADS.map(ad => (
                    <div key={ad.id} className="flex items-center gap-3 p-2 rounded-lg border border-border">
                      <img src={ad.imageUrl} alt={ad.title} className="w-12 h-12 rounded object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-foreground truncate">{ad.title}</p>
                        <p className="text-[10px] text-muted-foreground">{ad.sponsor}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">Active</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="text-xs font-bold mb-2">Category Split</h4>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={categoryData} dataKey="value" cx="50%" cy="50%" outerRadius={50} label={({ name, value }) => `${name} ${value}%`}>
                          {categoryData.map((entry, i) => (
                            <Cell key={i} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Top Users */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Activity className="h-4 w-4 text-primary" />
            <h2 className="font-bold text-sm">Top Users by XP</h2>
          </div>
          <Card>
            <CardContent className="p-0">
              {MOCK_LEADERBOARD.slice(0, 5).map((entry, i) => (
                <div key={entry.user.id} className={cn(
                  'flex items-center gap-3 px-4 py-2.5',
                  i !== 4 && 'border-b border-border'
                )}>
                  <span className="w-5 text-center font-bold text-sm text-primary">{entry.rank}</span>
                  <Avatar className="h-7 w-7">
                    <AvatarImage src={entry.user.avatar} />
                    <AvatarFallback>{entry.user.username[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground truncate block">{entry.user.username}</span>
                  </div>
                  <span className="text-xs font-bold text-primary">{entry.xpPoints} XP</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
};

export default Admin;
