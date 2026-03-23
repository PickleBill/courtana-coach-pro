import { Coach } from '@/data/mockData';
import { Star, Users, Clock, Crown, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const tierConfig = {
  celebrity: {
    border: 'border-[hsl(var(--gold))]/30',
    badge: 'bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30',
    label: 'Celebrity Pro',
    icon: Crown,
    glow: 'glow-gold',
    avatarBg: 'bg-[hsl(var(--gold))]/15',
    avatarText: 'text-[hsl(var(--gold))]',
  },
  certified: {
    border: 'border-primary/20',
    badge: 'bg-primary/12 text-primary border-primary/25',
    label: 'Pro Verified',
    icon: ShieldCheck,
    glow: '',
    avatarBg: 'bg-primary/10',
    avatarText: 'text-primary',
  },
  rising: {
    border: 'border-blue-400/20',
    badge: 'bg-blue-500/12 text-blue-400 border-blue-500/25',
    label: 'Draft Pick',
    icon: Sparkles,
    glow: '',
    avatarBg: 'bg-blue-500/10',
    avatarText: 'text-blue-400',
  },
};

export default function CoachCard({ coach }: { coach: Coach }) {
  const config = tierConfig[coach.tier];
  const TierIcon = config.icon;

  return (
    <div className={`glass rounded-xl p-5 glass-hover card-shine group cursor-pointer active:scale-[0.97] transition-all duration-300 ${config.border} ${config.glow} hover:scale-[1.02]`}>
      <div className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-xl ${config.avatarBg} flex items-center justify-center font-display font-bold text-lg ${config.avatarText} shrink-0 ring-1 ring-white/5`}>
          {coach.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-foreground">{coach.name}</h3>
            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 gap-0.5 ${config.badge}`}>
              <TierIcon size={9} /> {config.label}
            </Badge>
          </div>
          {coach.network && (
            <p className="text-xs text-primary/80 mt-0.5 flex items-center gap-1">
              <ShieldCheck size={10} /> {coach.network} Network
            </p>
          )}
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{coach.bio}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {coach.specialties.map((s) => (
          <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/60 text-secondary-foreground border border-border/30">
            {s}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/30">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Star size={12} className="text-[hsl(var(--gold))]" /> {coach.rating}</span>
          <span className="flex items-center gap-1"><Users size={12} /> {coach.studentsCoached}</span>
          {coach.slotsRemaining && (
            <span className="flex items-center gap-1 text-[hsl(var(--gold))] badge-glow rounded-full px-2 py-0.5 bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20">
              <Clock size={10} /> {coach.slotsRemaining} slots left
            </span>
          )}
        </div>
        <span className="font-display font-bold text-foreground text-lg">
          ${coach.price}<span className="text-xs text-muted-foreground font-normal ml-1">{coach.priceLabel}</span>
        </span>
      </div>
    </div>
  );
}
