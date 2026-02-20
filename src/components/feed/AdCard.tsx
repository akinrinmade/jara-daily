import { AdCampaign } from '@/types';
import { Badge } from '@/components/ui/badge';

export function AdCard({ ad }: { ad: AdCampaign }) {
  return (
    <a href={ad.targetLink} target="_blank" rel="noopener noreferrer" className="block">
      <article className="bg-card rounded-xl overflow-hidden border border-border shadow-sm">
        <div className="relative aspect-[2/1] overflow-hidden">
          <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" loading="lazy" />
          <Badge variant="outline" className="absolute top-2 right-2 bg-card/80 backdrop-blur text-[10px]">
            Sponsored
          </Badge>
        </div>
        <div className="p-3">
          <h4 className="font-semibold text-sm text-foreground">{ad.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">{ad.description}</p>
          <span className="text-[10px] text-muted-foreground mt-1 block">by {ad.sponsor}</span>
        </div>
      </article>
    </a>
  );
}
