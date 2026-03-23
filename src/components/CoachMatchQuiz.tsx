import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Check, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { coaches } from '@/data/mockData';

const steps = [
  {
    question: "What's your skill level?",
    options: ['Beginner', 'Intermediate', 'Advanced', 'Tournament'],
  },
  {
    question: 'What do you want to improve?',
    options: ['Serves', 'Kitchen Play', 'Strategy', 'Fitness & Footwork'],
  },
  {
    question: 'How do you like to learn?',
    options: ['Video Analysis', 'Live Drills', 'Written Plans', 'Mixed'],
  },
  {
    question: "What's your budget per session?",
    options: ['$35–75', '$75–150', '$150–500', '$500+'],
  },
];

const matchCoaches = (answers: string[]) => {
  const budget = answers[3];
  let filtered = [...coaches];

  if (budget === '$500+') filtered = filtered.filter(c => c.tier === 'celebrity');
  else if (budget === '$150–500') filtered = filtered.filter(c => c.tier === 'celebrity' || c.tier === 'certified');
  else if (budget === '$75–150') filtered = filtered.filter(c => c.tier === 'certified');
  else filtered = filtered.filter(c => c.tier === 'rising' || c.tier === 'certified');

  return filtered.slice(0, 3).map((coach, i) => ({
    coach,
    matchPct: 97 - i * 5 - Math.floor(Math.random() * 3),
    reason:
      i === 0
        ? `Perfect match for your ${answers[1].toLowerCase()} goals with ${answers[2].toLowerCase()} approach`
        : i === 1
        ? `Strong ${answers[0].toLowerCase()}-level coaching with focus on ${answers[1].toLowerCase()}`
        : `Great value option specializing in ${answers[1].toLowerCase()} fundamentals`,
  }));
};

export default function CoachMatchQuiz({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<ReturnType<typeof matchCoaches> | null>(null);

  const selectOption = (option: string) => {
    const next = [...answers, option];
    setAnswers(next);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      setResults(matchCoaches(next));
    }
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
        className="w-full max-w-lg bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="p-5 border-b border-border/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/12 border border-primary/15 flex items-center justify-center">
              <Target size={16} className="text-primary" />
            </div>
            <div>
              <h3 className="font-display font-bold text-foreground text-sm">Find Your Perfect Coach</h3>
              {!results && <p className="text-[10px] text-muted-foreground">Step {step + 1} of {steps.length}</p>}
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground"><X size={16} /></button>
        </div>

        <div className="p-5">
          {!results ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Progress */}
                <div className="flex gap-1.5 mb-6">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-secondary/40'}`} />
                  ))}
                </div>

                <h4 className="font-display text-lg font-bold text-foreground mb-5">{steps[step].question}</h4>
                <div className="space-y-2.5">
                  {steps[step].options.map(opt => (
                    <button
                      key={opt}
                      onClick={() => selectOption(opt)}
                      className="w-full text-left p-4 rounded-xl bg-secondary/30 border border-border/20 hover:border-primary/25 hover:bg-primary/5 transition-all text-sm text-foreground font-medium flex items-center justify-between group active:scale-[0.98]"
                    >
                      {opt}
                      <ArrowRight size={14} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
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
                    className="p-4 rounded-xl bg-secondary/20 border border-border/20 hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-sm text-primary">
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
                    <p className="text-xs text-muted-foreground leading-relaxed">{reason}</p>
                  </motion.div>
                ))}
              </div>
              <Button onClick={onClose} className="w-full mt-5 active:scale-95 transition-transform glow-sm font-semibold gap-1.5">
                <Check size={14} /> View All Coaches
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
