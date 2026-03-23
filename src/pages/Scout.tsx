import { risingStars, coaches } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Target, Star } from 'lucide-react';

export default function Scout() {
  const celebrities = coaches.filter((c) => c.tier === 'celebrity');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">Scout & Draft</h1>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Pros discover and draft rising talent into their coaching networks. Build your empire — and give the next generation a path.
          </p>
        </ScrollReveal>

        {/* Rising Stars */}
        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          {risingStars.map((player, i) => (
            <ScrollReveal key={player.id} delay={i * 0.08}>
              <div className="glass rounded-xl p-6 glass-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-500/15 flex items-center justify-center font-display font-bold text-blue-400 text-lg">
                    {player.avatar}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{player.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={11} /> {player.location}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">DUPR {player.dupr}</Badge>
                  <Badge variant="outline" className="text-xs">Age {player.age}</Badge>
                </div>

                <div className="flex items-start gap-1.5 mb-3">
                  <Target size={13} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{player.seeking}</p>
                </div>

                <div className="space-y-1.5 mb-4">
                  {player.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                      <Star size={10} className="text-amber-400" /> {h}
                    </div>
                  ))}
                </div>

                <Button size="sm" className="w-full active:scale-95 transition-transform">Draft to Network</Button>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mentor Pros */}
        <ScrollReveal>
          <h2 className="font-display text-2xl font-bold mb-6">Active Pro Mentors</h2>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-4">
          {celebrities.map((pro, i) => (
            <ScrollReveal key={pro.id} delay={i * 0.08}>
              <div className="glass rounded-xl p-5 flex items-center gap-4 glass-hover">
                <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center font-display font-bold text-amber-400">
                  {pro.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{pro.name}</h3>
                  <p className="text-xs text-muted-foreground">{pro.studentsCoached} students · {coaches.filter(c => c.network === pro.name).length} certified coaches</p>
                </div>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 text-xs">Recruiting</Badge>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
