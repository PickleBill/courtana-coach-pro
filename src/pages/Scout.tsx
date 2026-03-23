import { useState } from 'react';
import { risingStars, coaches } from '@/data/mockData';
import WaitlistModal from '@/components/WaitlistModal';
import ScrollReveal from '@/components/ScrollReveal';
import usePageTitle from '@/hooks/usePageTitle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Target, Star, Crown, Users, Eye, ArrowRight, Sparkles, DollarSign, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scout() {
  usePageTitle('Scout & Draft — Courtana Coaching');
  const celebrities = coaches.filter((c) => c.tier === 'celebrity');
  const [showRevShare, setShowRevShare] = useState(true);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistCtx, setWaitlistCtx] = useState('');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">Scout & Draft</h1>
          <p className="text-muted-foreground mb-6 max-w-lg text-lg">
            Pros discover and draft rising talent into their coaching networks. Build your empire — and give the next generation a path.
          </p>
        </ScrollReveal>

        {/* Active Pro Mentors */}
        <ScrollReveal delay={0.05}>
          <div className="glass rounded-2xl p-6 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/3 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <Crown size={16} className="text-[hsl(var(--gold))]" />
                <h2 className="font-display text-lg font-bold">Pro Mentors Currently Scouting</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {celebrities.map((pro) => (
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
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1"><Users size={10} /> 12 in network</span>
                        <span className="flex items-center gap-1 text-[hsl(var(--gold))]"><DollarSign size={10} /> $24,750/mo shared</span>
                      </div>
                      <span className="text-primary text-[10px] hover:underline cursor-pointer mt-0.5 inline-block">View full network →</span>
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

        {/* Rising Stars */}
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-blue-400" />
            <h2 className="font-display text-2xl font-bold">Draft2Network</h2>
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
                <div className="h-36 bg-gradient-to-br from-blue-500/10 to-primary/5 relative flex items-center justify-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(210,100%,60%,0.08),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/20">
                      <Play size={18} className="text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  <div className="text-center relative z-10 group-hover:opacity-50 transition-opacity">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center font-display font-bold text-blue-400 text-2xl mx-auto">
                      {player.avatar}
                    </div>
                  </div>
                  <Badge variant="outline" className="absolute top-3 right-3 text-[10px] bg-blue-500/10 text-blue-400 border-blue-500/25">
                    DUPR {player.dupr}
                  </Badge>
                  <Badge variant="outline" className="absolute top-3 left-3 text-[10px] bg-secondary/50 text-muted-foreground border-border/30">
                    <Play size={8} className="mr-0.5" /> Highlight Reel
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
                  <div className="flex gap-2">
                     <Button className="flex-1 active:scale-95 transition-transform glow-sm font-semibold gap-1.5 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70" onClick={() => { setWaitlistCtx(`Offer Contract — ${player.name}`); setWaitlistOpen(true); }}>
                       Offer Contract <ArrowRight size={14} />
                     </Button>
                    <Button variant="outline" size="icon" className="shrink-0 border-blue-400/20 text-blue-400 hover:bg-blue-400/10">
                      <Eye size={14} />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Revenue Share — Always visible */}
        <ScrollReveal>
          <div className="glass rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/3 via-primary/3 to-transparent pointer-events-none" />
            <button
              onClick={() => setShowRevShare(!showRevShare)}
              className="relative z-10 w-full p-6 flex items-center justify-between text-left hover:bg-secondary/10 transition-colors"
            >
              <div>
                <h2 className="font-display text-xl font-bold mb-0.5">How the Network Economy Works</h2>
                <p className="text-muted-foreground text-sm">How earnings flow through the coaching network</p>
              </div>
              {showRevShare ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
            </button>

            {showRevShare && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="relative z-10 px-6 pb-6"
              >
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
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
                <div className="p-4 rounded-lg bg-secondary/20 border border-border/15 text-center">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Example:</span> A Gold student pays <span className="text-primary font-semibold">$200/month</span> →
                    Pro earns <span className="text-[hsl(var(--gold))] font-semibold">$80</span>,
                    Coach earns <span className="text-primary font-semibold">$90</span>,
                    Platform earns <span className="text-muted-foreground font-semibold">$30</span>
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-2">All payouts handled automatically via the Courtana platform</p>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
