import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, Monitor, Bell, Shield, User, Coins, Globe } from 'lucide-react';
import { useState } from 'react';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [xpNotif, setXpNotif] = useState(true);
  const [coinNotif, setCoinNotif] = useState(true);
  const [language, setLanguage] = useState('en');

  const themeIcon = theme === 'dark' ? Moon : theme === 'high-contrast' ? Monitor : Sun;
  const ThemeIcon = themeIcon;

  return (
    <AppLayout>
      <div className="py-4">
        <h1 className="text-xl font-black text-foreground mb-4">Settings</h1>

        {/* Theme */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <ThemeIcon className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm">Appearance</h2>
            </div>
            <Select value={theme} onValueChange={(v) => setTheme(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">☀️ Light</SelectItem>
                <SelectItem value="dark">🌙 Dark</SelectItem>
                <SelectItem value="high-contrast">⚡ High Contrast</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Globe className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm">Language</h2>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">🇳🇬 English</SelectItem>
                <SelectItem value="ha">🏛️ Hausa</SelectItem>
                <SelectItem value="yo">🌍 Yoruba</SelectItem>
                <SelectItem value="ig">🌿 Igbo</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="mb-4">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm">Notifications</h2>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push" className="text-sm">Push Notifications</Label>
              <Switch id="push" checked={pushEnabled} onCheckedChange={setPushEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="xp-notif" className="text-sm">XP Alerts</Label>
              <Switch id="xp-notif" checked={xpNotif} onCheckedChange={setXpNotif} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="coin-notif" className="text-sm">Coin Alerts</Label>
              <Switch id="coin-notif" checked={coinNotif} onCheckedChange={setCoinNotif} />
            </div>
          </CardContent>
        </Card>

        {/* Gamification */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="h-4 w-4 text-accent" />
              <h2 className="font-bold text-sm">Gamification</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Earn XP and Jara Coins by reading, sharing, and engaging with content. Coins are finite — compete with others to earn more before the global pool runs out!
            </p>
          </CardContent>
        </Card>

        {/* Account */}
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <h2 className="font-bold text-sm">Account</h2>
            </div>
            <Separator />
            <button className="text-sm text-primary font-medium">Edit Profile</button>
            <Separator />
            <button className="text-sm text-primary font-medium">Manage Subscription</button>
            <Separator />
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <button className="text-sm text-muted-foreground">Privacy Policy</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Settings;
