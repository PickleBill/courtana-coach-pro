import { useState, useMemo } from 'react';
import { toast } from '@/hooks/use-toast';
import { coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import CoachMatchQuiz from '@/components/CoachMatchQuiz';
import ScrollReveal from '@/components/ScrollReveal';
import usePageTitle from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Crown, ShieldCheck, Sparkles, Filter, Activity, Target, Quote, Search, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const tiers = ['all', 'celebrity', 'certified', 'rising'] as const;
const tierConfig = {
  all: { label: 'All Coaches', icon: Filter, count: coaches.length },
  celebrity: { label: 'Celebrity Pros', icon: Crown, count: coaches.filter(c => c.tier === 'celebrity').length },
  certified: { label: 'Certified Coaches', icon: ShieldCheck, count: coaches.filter(c => c.tier === 'certified').length },
  rising: { label: 'Rising Stars', icon: Sparkles, count: coaches.filter(c => c.tier === 'rising').length },
};

export default function Coaches() {
  usePageTitle('Coach Marketplace — Courtana Coaching');
  const [filter, setFilter] = useState<typeof tiers[number]>('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    let list = filter === 'all' ? coaches : coaches.filter((c) => c.tier === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.specialties.some(s => s.toLowerCase().includes(q)) || c.sport.toLowerCase().includes(q));
    }
    return list;
  }, [filter, search]);

  const spotlightCoach = coaches.find(c => c.name === 'Annalee Waters')!;

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
            <div className="flex items-center gap-4">
              <Button onClick={() => setShowQuiz(true)} variant="outline" className="gap-1.5 border-primary/25 text-primary hover:bg-primary/10 active:scale-95 transition-transform">
                <Target size={14} /> Match Me
              </Button>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Activity size={12} className="text-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>23 coaches online now</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Featured Coach Spotlight */}
        <ScrollReveal delay={0.05}>
          <div className="glass rounded-2xl p-6 lg:p-8 mb-10 mt-6 relative overflow-hidden glow-gold border-[hsl(var(--gold))]/20">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/4 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-[hsl(var(--gold))]/15 border border-[hsl(var(--gold))]/25 flex items-center justify-center font-display font-bold text-2xl text-[hsl(var(--gold))] shrink-0">
                {spotlightCoach.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/25 text-xs">
                    <Crown size={10} className="mr-1" /> Featured Coach
                  </Badge>
                  <Badge variant="outline" className="text-[10px] text-muted-foreground">
                    {spotlightCoach.slotsRemaining} slots remaining
                  </Badge>
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">{spotlightCoach.name}</h3>
                <div className="flex items-start gap-2 mt-2">
                  <Quote size={14} className="text-[hsl(var(--gold))]/50 shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "I review every video myself. When I see a player improving through our analysis, that's why I do this. The AI catches patterns I might miss, and together we accelerate improvement 10x."
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="stat-number text-3xl text-[hsl(var(--gold))]">${benJohns.price}</div>
                <div className="text-xs text-muted-foreground">{benJohns.priceLabel}</div>
                <Button size="sm" className="mt-3 active:scale-95 transition-transform glow-sm font-semibold" onClick={() => toast({ title: '🎾 Session request sent to Ben Johns!', description: "You'll hear back within 2 hours." })}>
                  Book Session
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Find My Coach banner */}
        <ScrollReveal delay={0.08}>
          <div className="glass rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                <Target size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">🎯 Not sure where to start?</h3>
                <p className="text-sm text-muted-foreground">Take a 30-second quiz and we'll match you with your ideal coach.</p>
              </div>
            </div>
            <Button className="active:scale-95 transition-transform glow-sm font-semibold gap-1.5 shrink-0" onClick={() => setShowQuiz(true)}>
              Find My Coach <ArrowRight size={14} />
            </Button>
          </div>
        </ScrollReveal>

        {/* Search + Tier filter tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <div className="flex-1 max-w-xs">
              <div className="text-sm font-medium text-foreground mb-2">Find your coach</div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search coaches, specialties..."
                  className="pl-9 bg-secondary/30 border-border/30 h-9 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap items-end">
              {tiers.map((t) => {
                const cfg = tierConfig[t];
                const TierIcon = cfg.icon;
                const isActive = filter === t;
                return (
                  <Button
                    key={t}
                    variant={isActive ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter(t)}
                    className={`active:scale-95 transition-all gap-1.5 rounded-full ${isActive ? 'shadow-sm' : 'border-border/50 hover:border-primary/20'}`}
                  >
                    <TierIcon size={13} />
                    {cfg.label}
                    <span className="text-[10px] opacity-60 ml-0.5">({cfg.count})</span>
                  </Button>
                );
              })}
            </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <AnimatePresence>
        {showQuiz && <CoachMatchQuiz onClose={() => setShowQuiz(false)} />}
      </AnimatePresence>
    </div>
  );
}