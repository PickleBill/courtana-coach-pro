import { rewards } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, Trophy, Star, ArrowRight, ExternalLink, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

const tierStyles = {
  silver: { bg: 'bg-slate-400/8', border: 'border-slate-400/20', text: 'text-slate-300', label: 'Silver', glow: '', shimmer: 'from-slate-300/5 via-slate-200/10 to-slate-300/5' },
  gold: { bg: 'bg-[hsl(var(--gold))]/8', border: 'border-[hsl(var(--gold))]/20', text: 'text-[hsl(var(--gold))]', label: 'Gold', glow: 'glow-gold', shimmer: 'from-[hsl(var(--gold))]/5 via-[hsl(var(--gold))]/15 to-[hsl(var(--gold))]/5' },
  platinum: { bg: 'bg-[hsl(var(--platinum))]/8', border: 'border-[hsl(var(--platinum))]/20', text: 'text-[hsl(var(--platinum))]', label: 'Platinum', glow: 'glow-platinum', shimmer: 'from-[hsl(var(--platinum))]/5 via-pink-400/10 to-blue-400/10' },
};

const playerProgress = { points: 1450, nextTier: 'Gold', pointsToNext: 550, currentTier: 'Silver' };

const partnerReward = {
  title: 'Freakshow Gen 3 Haptic Pro Paddle',
  description: 'Exclusive 30% off for Gold members. The same paddle used by pro coaches in the Courtana network.',
  tier: 'gold' as const,
  partner: 'Pickleball Freakshow × Courtana',
  link: 'https://freak-flow-hub.lovable.app/',
};

export default function Rewards() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">Experiences & Rewards</h1>
          <p className="text-muted-foreground mb-8 max-w-lg text-lg">
            Your coaching journey unlocks once-in-a-lifetime experiences. Complete milestones and earn your way to the top.
          </p>
        </ScrollReveal>

        {/* Player progress summary */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-6 mb-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--gold))]/3 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy size={16} className="text-[hsl(var(--gold))]" />
                    <span className="font-display font-bold text-foreground">Your Reward Progress</span>
                  </div>
                  <p className="text-sm text-muted-foreground">You're at <span className="text-slate-300 font-semibold">Silver</span> tier — <span className="text-[hsl(var(--gold))] font-semibold">3 more coaching sessions</span> to unlock Gold rewards</p>
                </div>
                <div className="stat-number text-3xl text-[hsl(var(--gold))]">
                  {playerProgress.points.toLocaleString()} <span className="text-sm text-muted-foreground font-normal">pts</span>
                </div>
              </div>
              <Progress value={(playerProgress.points / 2000) * 100} className="h-3" />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                <span>Silver</span>
                <span className="text-[hsl(var(--gold))]">Gold (2,000 pts)</span>
                <span className="text-[hsl(var(--platinum))]">Platinum (5,000 pts)</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Tier indicators */}
        <ScrollReveal>
          <div className="flex gap-6 mb-10">
            {(['silver', 'gold', 'platinum'] as const).map((tier) => {
              const style = tierStyles[tier];
              const count = rewards.filter((r) => r.tier === tier).length + (tier === 'gold' ? 1 : 0);
              return (
                <div key={tier} className="flex items-center gap-2 text-sm">
                  <div className={`w-4 h-4 rounded-full ${style.bg} ${style.border} border`} />
                  <span className={`font-medium ${style.text}`}>{style.label}</span>
                  <span className="text-muted-foreground text-xs">({count})</span>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Partner reward card */}
          <ScrollReveal delay={0}>
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="glass rounded-2xl overflow-hidden glass-hover border border-[hsl(var(--gold))]/25 glow-gold relative"
            >
              {/* Shimmer border effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${tierStyles.gold.shimmer} opacity-30`} />
              </div>

              <div className="h-28 bg-[hsl(var(--gold))]/8 relative flex items-center justify-center">
                <span className="text-5xl">🏓</span>
                <Badge variant="outline" className="absolute top-3 right-3 text-[10px] bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/25">
                  Partner Exclusive
                </Badge>
                <Badge variant="outline" className="absolute top-3 left-3 text-[10px] bg-primary/10 text-primary border-primary/20">
                  <ShoppingBag size={8} className="mr-0.5" /> 30% Off
                </Badge>
              </div>

              <div className="p-5 relative z-10">
                <h3 className="font-display font-bold text-foreground mb-1">{partnerReward.title}</h3>
                <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{partnerReward.description}</p>
                <p className="text-[10px] text-[hsl(var(--gold))] font-medium mb-4">{partnerReward.partner}</p>
                <a href={partnerReward.link} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full active:scale-95 transition-transform text-xs border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10 gap-1">
                    Shop Now <ExternalLink size={11} />
                  </Button>
                </a>
              </div>
            </motion.div>
          </ScrollReveal>

          {rewards.map((reward, i) => {
            const style = tierStyles[reward.tier];
            const isLocked = playerProgress.points < reward.pointsRequired;
            return (
              <ScrollReveal key={reward.id} delay={(i + 1) * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`glass rounded-2xl overflow-hidden glass-hover border ${style.border} ${style.glow} relative`}
                >
                  {/* Shimmer border */}
                  <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${style.shimmer} opacity-20`} />
                  </div>

                  <div className={`h-28 ${style.bg} relative flex items-center justify-center`}>
                    <span className="text-5xl">{reward.image}</span>
                    <Badge variant="outline" className={`absolute top-3 right-3 text-[10px] ${style.bg} ${style.text} ${style.border}`}>
                      {style.label}
                    </Badge>
                    {isLocked && (
                      <div className="absolute top-3 left-3">
                        <Lock size={14} className="text-muted-foreground/40" />
                      </div>
                    )}
                  </div>

                  <div className="p-5 relative z-10">
                    <h3 className="font-display font-bold text-foreground mb-1">{reward.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{reward.description}</p>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">
                          {Math.min(playerProgress.points, reward.pointsRequired).toLocaleString()} / {reward.pointsRequired.toLocaleString()} pts
                        </span>
                        <span className={`font-semibold ${isLocked ? 'text-muted-foreground' : style.text}`}>
                          {isLocked ? 'Locked' : 'Unlocked'}
                        </span>
                      </div>
                      <Progress value={Math.min((playerProgress.points / reward.pointsRequired) * 100, 100)} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border/20">
                      <div className="flex items-center gap-1 text-xs text-[hsl(var(--gold))]">
                        <Star size={11} />
                        {reward.spotsRemaining} {reward.spotsRemaining === 1 ? 'spot' : 'spots'} left
                      </div>
                      <Button variant="outline" size="sm" className={`active:scale-95 transition-transform text-xs ${!isLocked ? 'border-primary/30 text-primary hover:bg-primary/10' : ''}`}>
                        {isLocked ? 'View Details' : 'Claim'} <ArrowRight size={12} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
