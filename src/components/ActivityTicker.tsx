import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const activities = [
  '🎯 Tyler R. just earned "Ace Machine" badge · Austin, TX',
  '📹 Coach Marcus reviewed Sarah\'s serve video · Nashville, TN',
  '⭐ Rising Star Maya O. was drafted to Ben Johns\' network',
  '🏆 New record: 147 sessions analyzed today',
  '🔥 Jordan P. completed Module 3 of Advanced Dinking · San Diego, CA',
  '👑 Ben Johns reviewed a match — 4.9★ rating from the player',
  '🎟️ VIP PPA Championship tickets just claimed · 11 spots left',
  '💰 Coach Sarah K. earned $340 this morning from 4 async reviews',
  '🏓 Jake M. hit a new DUPR high: 5.6 after coaching sessions',
  '📊 AI analyzed 23 sessions in the last hour across 8 facilities',
];

export default function ActivityTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % activities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden py-3 bg-secondary/20 border-y border-border/15">
      <div className="container mx-auto px-4 flex items-center gap-3">
        <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        <span className="text-[10px] uppercase tracking-wider text-primary font-semibold shrink-0">Live</span>
        <div className="relative h-5 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 text-xs text-muted-foreground whitespace-nowrap"
            >
              {activities[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
