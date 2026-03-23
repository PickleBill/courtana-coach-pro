import { motion } from 'framer-motion';
import { Zap, MapPin } from 'lucide-react';

const courts = [
  { name: 'Dinkville Nashville', courts: 12, available: 4, status: 'Open Now' },
  { name: 'Black Barn Ohio', courts: 8, available: 2, status: 'Open Now' },
  { name: 'Centerline Austin', courts: 16, available: 7, status: 'Open Now' },
  { name: 'Court Kings San Diego', courts: 10, available: 0, status: 'Full' },
  { name: 'Life Time Scottsdale', courts: 6, available: 3, status: 'Open Now' },
  { name: 'Chicken N Pickle KC', courts: 8, available: 5, status: 'Open Now' },
];

export default function CourtAvailabilityBar() {
  return (
    <section className="border-y border-border/15 bg-secondary/10 overflow-hidden py-3">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          className="flex gap-5 whitespace-nowrap"
        >
          {[...courts, ...courts].map((c, i) => (
            <div key={i} className="flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-secondary/20 border border-border/15 shrink-0">
              <Zap size={10} className="text-primary" />
              <span className="text-xs font-medium text-foreground">{c.name}</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin size={8} />
                {c.available > 0 ? (
                  <span className="text-primary font-medium">{c.available}/{c.courts} available</span>
                ) : (
                  <span className="text-muted-foreground/50">Full</span>
                )}
              </span>
              {c.available > 0 && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
