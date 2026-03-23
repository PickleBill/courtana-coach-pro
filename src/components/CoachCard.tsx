import { Coach } from '@/data/mockData';
import { Star, Users, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tierColors = {
  celebrity: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  certified: 'bg-primary/15 text-primary border-primary/30',
  rising: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
};

const tierLabels = {
  celebrity: '⭐ Celebrity Pro',
  certified: '✓ Certified Coach',
  rising: '↗ Rising Star',
};

export default function CoachCard({ coach }: { coach: Coach }) {
  return (
    <div className="glass rounded-xl p-5 glass-hover group cursor-pointer active:scale-[0.98] transition-transform">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center font-display font-bold text-lg text-foreground shrink-0">
          {coach.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground">{coach.name}</h3>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${tierColors[coach.tier]}`}>
              {tierLabels[coach.tier]}
            </Badge>
          </div>
          {coach.network && (
            <p className="text-xs text-primary/80 mt-0.5">{coach.network} Network</p>
          )}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{coach.bio}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {coach.specialties.map((s) => (
          <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Star size={12} className="text-amber-400" /> {coach.rating}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {coach.studentsCoached}</span>
          {coach.slotsRemaining && (
            <span className="flex items-center gap-1 text-amber-400"><Clock size={12} /> {coach.slotsRemaining} slots</span>
          )}
        </div>
        <span className="font-display font-semibold text-foreground">
          ${coach.price}<span className="text-xs text-muted-foreground font-normal ml-1">{coach.priceLabel}</span>
        </span>
      </div>
    </div>
  );
}
