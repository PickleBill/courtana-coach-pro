import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Trophy, Zap, ArrowRight, Users } from 'lucide-react';

const steps = [
  {
    title: 'Your Skill Level',
    options: ['Beginner (2.0-3.0)', 'Intermediate (3.0-4.0)', 'Advanced (4.0-5.0)', 'Tournament (5.0+)'],
  },
  {
    title: 'What Are You Looking For?',
    options: ['Competitive Match', 'Casual Rally', 'Drilling Partner', 'Doubles Partner'],
  },
  {
    title: 'When Do You Want to Play?',
    options: ['Today', 'This Week', 'This Weekend', 'Anytime'],
  },
];

const mockMatches = [
  { name: 'Tyler R.', dupr: 4.2, location: 'Dinkville Nashville', distance: '2.3 mi', compatibility: 94 },
  { name: 'Sarah K.', dupr: 4.0, location: 'Black Barn OH', distance: '5.1 mi', compatibility: 87 },
  { name: 'Jake M.', dupr: 4.5, location: 'Centerline Athletics', distance: '3.8 mi', compatibility: 82 },
];

export default function MatchmakingModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const done = step >= steps.length;

  const select = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    setStep(step + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass rounded-2xl overflow-hidden border border-border/40"
      >
        <div className="p-5 border-b border-border/20 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-foreground">
              {done ? '🎾 Your Matches' : `Step ${step + 1} of ${steps.length}`}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {done ? 'Players near you looking for the same thing' : steps[step].title}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
            <X size={16} />
          </button>
        </div>

        <div className="p-5">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-2">
                {steps[step].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => select(opt)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-secondary/30 border border-border/20 text-sm text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all active:scale-[0.98]"
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                {mockMatches.map((m, i) => (
                  <div key={m.name} className="p-4 rounded-xl bg-secondary/20 border border-border/15 hover:border-primary/15 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                          {m.name.charAt(0)}{m.name.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-foreground">{m.name}</span>
                          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <span>DUPR {m.dupr}</span>
                            <span className="flex items-center gap-0.5"><MapPin size={8} /> {m.distance}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {m.compatibility}% match
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Zap size={8} className="text-primary" /> {m.location}</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs border-primary/20 text-primary hover:bg-primary/10">
                        Connect <ArrowRight size={10} />
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
