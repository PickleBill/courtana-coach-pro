import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Users, Crown, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const tournaments = [
  { name: 'Court Kings Nashville Open', location: 'Dinkville, Nashville TN', date: 'Apr 12–14, 2026', players: 128, courtKings: true, courtana: true, prize: '$10,000' },
  { name: 'Black Barn Invitational', location: 'Black Barn Pickleball, OH', date: 'Apr 26–27, 2026', players: 64, courtKings: true, courtana: true, prize: '$5,000' },
  { name: 'Austin Pro Exhibition', location: 'Centerline Athletics, TX', date: 'May 3, 2026', players: 16, courtKings: false, courtana: true, prize: '$15,000' },
  { name: 'SoCal Summer Slam', location: 'Life Time, San Diego CA', date: 'May 17–18, 2026', players: 96, courtKings: false, courtana: false, prize: '$7,500' },
];

export default function TournamentFeed() {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-display font-bold text-foreground text-sm flex items-center gap-1.5">
          <Calendar size={14} className="text-primary" /> Upcoming Events
        </h4>
        <Badge variant="outline" className="text-[10px] text-muted-foreground">4 events</Badge>
      </div>
      <div className="space-y-2.5">
        {tournaments.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="p-3 rounded-lg bg-secondary/20 border border-border/15 hover:border-primary/15 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{t.name}</span>
              <span className="stat-number text-xs text-primary shrink-0">{t.prize}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-2">
              <span className="flex items-center gap-1"><MapPin size={9} /> {t.location}</span>
              <span>{t.date}</span>
              <span className="flex items-center gap-1"><Users size={9} /> {t.players}</span>
            </div>
            <div className="flex gap-1.5">
              {t.courtKings && (
                <Badge variant="outline" className="text-[9px] bg-[hsl(var(--gold))]/8 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/20 px-1.5 py-0">
                  <Crown size={7} className="mr-0.5" /> Court Kings
                </Badge>
              )}
              {t.courtana && (
                <Badge variant="outline" className="text-[9px] bg-primary/8 text-primary border-primary/20 px-1.5 py-0">
                  <Zap size={7} className="mr-0.5" /> Courtana-Powered
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <Button variant="ghost" size="sm" className="w-full mt-3 text-xs text-primary">
        View All Events →
      </Button>
    </div>
  );
}
