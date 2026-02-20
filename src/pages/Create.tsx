import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useGamification } from '@/contexts/GamificationContext';
import { useCoins } from '@/contexts/CoinContext';
import { toast } from '@/hooks/use-toast';
import { ImagePlus, Send, Save } from 'lucide-react';
import type { Category } from '@/types';
import { RichTextEditor } from '@/components/ui/rich-text-editor';

const Create = () => {
  const { addXP } = useGamification();
  const { earnCoins } = useCoins();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePublish = () => {
    if (!title || !body || !category) {
      toast({ title: 'Missing fields', description: 'Please fill in title, body, and category.', variant: 'destructive' });
      return;
    }
    addXP(50, 'Published a post!');
    earnCoins(8, 'post', 'Published a post!');
    toast({ title: '🎉 Post Published!', description: '+50 XP & Coins earned!' });
    setTitle(''); setBody(''); setCategory(''); setImageUrl('');
  };

  const handleSaveDraft = () => {
    toast({ title: 'Draft saved', description: 'Your draft has been saved locally.' });
  };

  return (
    <AppLayout>
      <div className="py-4">
        <h1 className="text-xl font-black text-foreground mb-4">Create Post</h1>
        <div className="space-y-4">
          <Input placeholder="Post title..." value={title} onChange={e => setTitle(e.target.value)} className="text-lg font-semibold" />
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Cover Image URL</label>
            <div className="flex gap-2">
              <Input placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="flex-1" />
              <Button variant="outline" size="icon"><ImagePlus className="h-4 w-4" /></Button>
            </div>
            {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 rounded-lg w-full aspect-[16/9] object-cover" />}
          </div>
          <Select value={category} onValueChange={v => setCategory(v as Category)}>
            <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Money">💰 Money</SelectItem>
              <SelectItem value="Hausa">🏛️ Hausa</SelectItem>
              <SelectItem value="Gist">💬 Gist</SelectItem>
            </SelectContent>
          </Select>
          <RichTextEditor content={body} onChange={setBody} />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={handleSaveDraft}>
              <Save className="h-4 w-4 mr-1" /> Save Draft
            </Button>
            <Button className="flex-1" onClick={handlePublish}>
              <Send className="h-4 w-4 mr-1" /> Publish
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Create;
