import { rewards } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const tierStyles = {
  silver: { bg: 'bg-slate-400/10', border: 'border-slate-400/20', text: 'text-slate-300', label: 'Silver' },
  gold: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', label: 'Gold' },
  platinum: { bg: 'bg-violet-400/10', border: 'border-violet-400/20', text: 'text-violet-300', label: 'Platinum' },
};

export default function Rewards() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">Experiences & Rewards</h1>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Your coaching journey unlocks once-in-a-lifetime experiences. Complete curriculum milestones and earn your way to the top.
          </p>
        </ScrollReveal>

        {/* Tier filters */}
        <ScrollReveal>
          <div className="flex gap-6 mb-10 border-b border-border/30 pb-4">
            {(['silver', 'gold', 'platinum'] as const).map((tier) => {
              const style = tierStyles[tier];
              const count = rewards.filter((r) => r.tier === tier).length;
              return (
                <div key={tier} className="flex items-center gap-2 text-sm">
                  <div className={`w-3 h-3 rounded-full ${style.bg} ${style.border} border`} />
                  <span className={style.text}>{style.label}</span>
                  <span className="text-muted-foreground text-xs">({count})</span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rewards.map((reward, i) => {
            const style = tierStyles[reward.tier];
            return (
              <ScrollReveal key={reward.id} delay={i * 0.07}>
                <div className={`glass rounded-xl p-6 glass-hover border ${style.border}`}>
                  <div className="text-4xl mb-4">{reward.image}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-display font-semibold text-foreground">{reward.title}</h3>
                    <Badge variant="outline" className={`text-[10px] ${style.bg} ${style.text} ${style.border}`}>
                      {style.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{reward.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="text-xs text-muted-foreground">
                      <span className="text-foreground font-semibold">{reward.pointsRequired.toLocaleString()}</span> pts required
                    </div>
                    <div className="text-xs text-amber-400">{reward.spotsRemaining} spots left</div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-4 active:scale-95 transition-transform">
                    View Details
                  </Button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
