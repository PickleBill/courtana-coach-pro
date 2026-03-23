import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Check, Target, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { coaches } from '@/data/mockData';

const personalities = [
  { id: 'compete', label: 'I want to dominate 🏆', desc: 'Tournament-ready, win-at-all-costs energy' },
  { id: 'fun', label: 'Here for the vibes 🎉', desc: 'Social play, good times, zero stress' },
  { id: 'technique', label: 'Obsessed with form 🔬', desc: 'Every angle, every grip, every frame' },
  { id: 'accountability', label: 'Make me show up 💪', desc: 'Structure, deadlines, no excuses' },
  { id: 'gopro', label: 'Going pro or bust 🌟', desc: 'Tour dreams, DUPR grind, full send' },
  { id: 'beginner', label: 'What\'s a dink? 🌱', desc: 'Brand new, eager, ready to learn' },
];

const matchCoaches = (personality: string) => {
  let pool = [...coaches];
  
  if (personality === 'compete' || personality === 'gopro') {
    pool = pool.filter(c => c.tier === 'celebrity' || (c.tier === 'certified' && c.rating >= 4.8));
  } else if (personality === 'beginner' || personality === 'fun') {
    pool = pool.filter(c => c.tier === 'rising' || c.tier === 'certified');
  } else if (personality === 'technique') {
    pool = pool.filter(c => c.specialties.some(s => s.toLowerCase().includes('analysis') || s.toLowerCase().includes('strategy') || s.toLowerCase().includes('footwork')));
    if (pool.length < 3) pool = [...coaches].filter(c => c.tier === 'certified');
  } else {
    pool = pool.filter(c => c.tier === 'certified');
  }

  const selected = pool.sort(() => Math.random() - 0.5).slice(0, 3);
  const reasons: Record<string, string[]> = {
    compete: ['Trains tournament champions', 'Builds competitive mental edge', 'Sharpens clutch-moment play'],
    fun: ['Makes every session enjoyable', 'Focus on confidence, not pressure', 'Great energy and patience'],
    technique: ['Obsessive attention to mechanics', 'Frame-by-frame video analysis', 'Drills down to the millimeter'],
    accountability: ['Structured curriculum with deadlines', 'Weekly check-ins and progress tracking', 'No-excuses coaching style'],
    gopro: ['Direct path to pro tour', 'Network connections to top players', 'Trains at elite intensity'],
    beginner: ['Patient and encouraging approach', 'Builds fundamentals from scratch', 'Makes learning feel natural'],
  };
  
  return selected.map((coach, i) => ({
    coach,
    matchPct: 97 - i * 4 - Math.floor(Math.random() * 3),
    reason: reasons[personality]?.[i] || 'Great match for your coaching goals',
  }));
};

export default function CoachMatchQuiz({ onClose }: { onClose: () => void }) {
  const [personality, setPersonality] = useState<string | null>(null);
  const [matching, setMatching] = useState(false);
  const [results, setResults] = useState<ReturnType<typeof matchCoaches> | null>(null);

  const handleSelect = (id: string) => {
    setPersonality(id);
    setMatching(true);
    setTimeout(() => {
      setResults(matchCoaches(id));
      setMatching(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="w-full max-w-lg bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-5 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/12 border border-primary/15 flex items-center justify-center">
              <Target size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-sm">Find Your Perfect Coach</h3>
              <p className="text-[10px] text-muted-foreground">
                {results ? 'Here are your matches!' : 'Pick what sounds like you'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X size={16} /></button>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {matching ? (
              <motion.div
                key="matching"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary mx-auto mb-4 flex items-center justify-center"
                >
                  <Loader2 size={24} className="text-primary" />
                </motion.div>
                <h4 className="font-display font-bold text-foreground text-lg mb-1">Matching you with coaches...</h4>
                <p className="text-xs text-muted-foreground">Analyzing personality fit across {coaches.length} coaches</p>
              </motion.div>
            ) : !results ? (
              <motion.div
                key="select"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-display text-lg font-bold text-foreground mb-4">What brings you to the court?</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  {personalities.map((p, i) => (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => handleSelect(p.id)}
                      className="p-4 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/25 hover:bg-primary/5 transition-all text-left group active:scale-[0.97]"
                    >
                      <p className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">{p.label}</p>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{p.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles size={16} className="text-primary" />
                  <h4 className="font-display text-lg font-bold text-foreground">Your Matches</h4>
                </div>
                <div className="space-y-3">
                  {results.map(({ coach, matchPct, reason }, i) => (
                    <motion.div
                      key={coach.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12 }}
                      className="p-4 rounded-xl bg-secondary/20 border border-border/20 hover:border-primary/20 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-bold text-sm ${
                          coach.tier === 'celebrity' ? 'bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]' :
                          coach.tier === 'certified' ? 'bg-primary/10 text-primary' : 'bg-blue-400/10 text-blue-400'
                        }`}>
                          {coach.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground text-sm">{coach.name}</span>
                            <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                              {matchPct}% match
                            </Badge>
                          </div>
                          <p className="text-[11px] text-muted-foreground">${coach.price} {coach.priceLabel}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{reason}</p>
                      <Button size="sm" variant="outline" className="w-full text-xs active:scale-95 transition-transform border-primary/20 text-primary hover:bg-primary/10 gap-1 opacity-80 group-hover:opacity-100">
                        Book Intro Session <ArrowRight size={10} />
                      </Button>
                    </motion.div>
                  ))}
                </div>
                <Button onClick={onClose} className="w-full mt-5 active:scale-95 transition-transform glow-sm font-semibold gap-1.5">
                  <Check size={14} /> Browse All Coaches
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
