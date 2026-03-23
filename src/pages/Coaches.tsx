import { useState } from 'react';
import { coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, ShieldCheck, Sparkles, Filter, Activity } from 'lucide-react';

const tiers = ['all', 'celebrity', 'certified', 'rising'] as const;
const tierConfig = {
  all: { label: 'All Coaches', icon: Filter, count: coaches.length },
  celebrity: { label: 'Celebrity Pros', icon: Crown, count: coaches.filter(c => c.tier === 'celebrity').length },
  certified: { label: 'Certified Coaches', icon: ShieldCheck, count: coaches.filter(c => c.tier === 'certified').length },
  rising: { label: 'Rising Stars', icon: Sparkles, count: coaches.filter(c => c.tier === 'rising').length },
};

export default function Coaches() {
  const [filter, setFilter] = useState<typeof tiers[number]>('all');
  const filtered = filter === 'all' ? coaches : coaches.filter((c) => c.tier === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold">Coach Marketplace</h1>
              <p className="text-muted-foreground mt-2 max-w-lg text-lg">
                Three tiers of coaching — from the world's #1 pros to vetted network coaches to affordable rising talent.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
              <Activity size={12} className="text-primary" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>23 coaches online now</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Tier filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-10 flex-wrap mt-6">
            {tiers.map((t) => {
              const cfg = tierConfig[t];
              const TierIcon = cfg.icon;
              return (
                <Button
                  key={t}
                  variant={filter === t ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(t)}
                  className={`active:scale-95 transition-all gap-1.5 ${filter === t ? 'glow-sm' : 'border-border/50 hover:border-primary/20'}`}
                >
                  <TierIcon size={13} />
                  {cfg.label}
                  <span className="text-[10px] opacity-60 ml-0.5">({cfg.count})</span>
                </Button>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((coach, i) => (
            <ScrollReveal key={coach.id} delay={i * 0.07}>
              <CoachCard coach={coach} />
            </ScrollReveal>
          ))}
        </div>

        {/* Revenue model section */}
        <ScrollReveal>
          <section className="mt-24 glass rounded-2xl p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/3 to-transparent" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/25 text-xs">Revenue Model</Badge>
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold mb-2">The Coaching Network Model</h2>
              <p className="text-muted-foreground mb-8 max-w-lg">How revenue flows through the tiered coaching ecosystem.</p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { tier: 'Celebrity Pro', cut: '40%', desc: 'Approves network coaches, brief high-value reviews, brand & trust', color: 'text-[hsl(var(--gold))]', bg: 'bg-[hsl(var(--gold))]/8', border: 'border-[hsl(var(--gold))]/15', icon: Crown },
                  { tier: 'Certified Coach', cut: '45%', desc: 'Does the heavy lifting — detailed async reviews, curriculum building', color: 'text-primary', bg: 'bg-primary/8', border: 'border-primary/15', icon: ShieldCheck },
                  { tier: 'Platform', cut: '15%', desc: 'AI engine, smart court infra, payment processing, player matching', color: 'text-muted-foreground', bg: 'bg-secondary/30', border: 'border-border/30', icon: Sparkles },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.tier} className={`text-center p-6 rounded-xl ${item.bg} border ${item.border}`}>
                      <Icon size={20} className={`mx-auto mb-3 ${item.color}`} />
                      <div className={`stat-number text-4xl ${item.color}`}>{item.cut}</div>
                      <div className="font-semibold text-foreground mt-2 text-sm">{item.tier}</div>
                      <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
