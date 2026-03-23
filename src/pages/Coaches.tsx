import { useState } from 'react';
import { coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';

const tiers = ['all', 'celebrity', 'certified', 'rising'] as const;
const tierLabels = { all: 'All Coaches', celebrity: 'Celebrity Pros', certified: 'Certified Coaches', rising: 'Rising Stars' };

export default function Coaches() {
  const [filter, setFilter] = useState<typeof tiers[number]>('all');
  const filtered = filter === 'all' ? coaches : coaches.filter((c) => c.tier === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">Coach Marketplace</h1>
          <p className="text-muted-foreground mb-8 max-w-lg">
            Three tiers of coaching — from the world's #1 pros to vetted network coaches to affordable rising talent.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 mb-8 flex-wrap">
            {tiers.map((t) => (
              <Button
                key={t}
                variant={filter === t ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(t)}
                className="active:scale-95 transition-transform capitalize"
              >
                {tierLabels[t]}
              </Button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((coach, i) => (
            <ScrollReveal key={coach.id} delay={i * 0.06}>
              <CoachCard coach={coach} />
            </ScrollReveal>
          ))}
        </div>

        {/* Revenue model section */}
        <ScrollReveal>
          <section className="mt-20 glass rounded-2xl p-8 lg:p-12">
            <h2 className="font-display text-2xl font-bold mb-6">The Coaching Network Model</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { tier: 'Celebrity Pro', cut: '40%', desc: 'Approves network coaches, brief high-value reviews, brand & trust', color: 'text-amber-400' },
                { tier: 'Certified Coach', cut: '45%', desc: 'Does the heavy lifting — detailed async reviews, curriculum building', color: 'text-primary' },
                { tier: 'Platform', cut: '15%', desc: 'AI engine, smart court infra, payment processing, player matching', color: 'text-muted-foreground' },
              ].map((item) => (
                <div key={item.tier} className="text-center p-5 rounded-xl bg-secondary/30">
                  <div className={`font-display text-3xl font-bold ${item.color}`}>{item.cut}</div>
                  <div className="font-semibold text-foreground mt-2 text-sm">{item.tier}</div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
