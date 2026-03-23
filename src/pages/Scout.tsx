import { risingStars, coaches } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Target, Star, Crown, Users, Eye, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scout() {
  const celebrities = coaches.filter((c) => c.tier === 'celebrity');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">Scout & Draft</h1>
          <p className="text-muted-foreground mb-6 max-w-lg text-lg">
            Pros discover and draft rising talent into their coaching networks. Build your empire — and give the next generation a path.
          </p>
        </ScrollReveal>

        {/* Active Pro Mentors — TOP */}
        <ScrollReveal delay={0.05}>
          <div className="glass rounded-2xl p-6 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/3 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <Crown size={16} className="text-[hsl(var(--gold))]" />
                <h2 className="font-display text-lg font-bold">Pro Mentors Currently Scouting</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {celebrities.map((pro, i) => (
                  <motion.div
                    key={pro.id}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30 hover:border-[hsl(var(--gold))]/20 transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-[hsl(var(--gold))]/12 border border-[hsl(var(--gold))]/20 flex items-center justify-center font-display font-bold text-[hsl(var(--gold))] text-lg shrink-0">
                      {pro.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-foreground">{pro.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                        <span className="flex items-center gap-1"><Users size={10} /> {pro.studentsCoached} students</span>
                        <span className="flex items-center gap-1"><Eye size={10} /> {coaches.filter(c => c.network === pro.name).length} coaches</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/25 text-[10px] badge-glow shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mr-1 animate-pulse" />
                      Scouting
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Rising Stars — DRAFT BOARD */}
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-blue-400" />
            <h2 className="font-display text-2xl font-bold">Rising Stars Draft Board</h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          {risingStars.map((player, i) => (
            <ScrollReveal key={player.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="glass rounded-2xl overflow-hidden glass-hover border-blue-400/15"
              >
                {/* Highlight reel placeholder */}
                <div className="h-32 bg-gradient-to-br from-blue-500/10 to-primary/5 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(210,100%,60%,0.08),transparent_70%)]" />
                  <div className="text-center relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center font-display font-bold text-blue-400 text-2xl mx-auto">
                      {player.avatar}
                    </div>
                  </div>
                  <Badge variant="outline" className="absolute top-3 right-3 text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/25">
                    DUPR {player.dupr}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-bold text-foreground text-lg">{player.name}</h3>
                    <span className="text-xs text-muted-foreground">Age {player.age}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <MapPin size={11} /> {player.location}
                  </div>

                  <div className="flex items-start gap-1.5 mb-4 p-2.5 rounded-lg bg-secondary/30 border border-border/20">
                    <Target size={13} className="text-primary mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">{player.seeking}</p>
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {player.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                        <Star size={10} className="text-[hsl(var(--gold))]" /> {h}
                      </div>
                    ))}
                  </div>

                  <Button className="w-full active:scale-95 transition-transform glow-sm font-semibold gap-1.5">
                    Draft to Network <ArrowRight size={14} />
                  </Button>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Revenue Share Breakdown */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/3 via-primary/3 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl font-bold mb-2">Revenue Share Model</h2>
              <p className="text-muted-foreground text-sm mb-8">How earnings flow through the coaching network.</p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {[
                  { label: 'Celebrity Pro', pct: '40%', color: 'text-[hsl(var(--gold))]', bg: 'bg-[hsl(var(--gold))]/10', border: 'border-[hsl(var(--gold))]/20' },
                  { label: 'Certified Coach', pct: '45%', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
                  { label: 'Platform', pct: '15%', color: 'text-muted-foreground', bg: 'bg-secondary/40', border: 'border-border/30' },
                ].map((item, i) => (
                  <div key={item.label} className="flex items-center gap-3 flex-1 w-full sm:w-auto">
                    <div className={`flex-1 p-5 rounded-xl ${item.bg} border ${item.border} text-center`}>
                      <div className={`stat-number text-3xl ${item.color}`}>{item.pct}</div>
                      <div className="text-xs text-muted-foreground mt-1 font-medium">{item.label}</div>
                    </div>
                    {i < 2 && <ArrowRight size={16} className="text-muted-foreground/30 hidden sm:block shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
