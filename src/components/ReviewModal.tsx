import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
  review: { student: string; type: string; earned: string } | null;
}

const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C'];

export default function ReviewModal({ open, onClose, review }: Props) {
  const [grade, setGrade] = useState('B+');
  const [feedback, setFeedback] = useState('');
  const [step, setStep] = useState<'review' | 'done'>('review');

  if (!review) return null;

  const handleSubmit = () => {
    setStep('done');
    setTimeout(() => {
      toast({
        title: `${review.student} just received your feedback! 🎾`,
        description: `Grade: ${grade} · Earned: ${review.earned}`,
      });
      onClose();
      setStep('review');
      setFeedback('');
      setGrade('B+');
    }, 1500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-5 border-b border-border/30 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-foreground">Review Video</h3>
                <p className="text-xs text-muted-foreground">{review.student} · {review.type}</p>
              </div>
              <button onClick={() => { onClose(); setStep('review'); setFeedback(''); }} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              {step === 'done' ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}>
                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  </motion.div>
                  <h4 className="font-display font-bold text-foreground text-lg mb-1">Review Submitted!</h4>
                  <p className="text-sm text-muted-foreground">{review.student} has been notified.</p>
                  <p className="text-xs text-primary font-semibold mt-2">+{review.earned} earned</p>
                </motion.div>
              ) : (
                <>
                  {/* Video preview */}
                  <div className="rounded-xl bg-gradient-to-br from-secondary/60 via-primary/5 to-secondary/40 h-48 flex items-center justify-center mb-5 relative overflow-hidden cursor-pointer group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(145,100%,45%,0.06),transparent_50%)]" />
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                      <Play size={22} className="text-primary-foreground ml-1" />
                    </div>
                    <Badge variant="outline" className="absolute bottom-3 left-3 bg-card/80 text-foreground border-border/30 text-[10px] backdrop-blur-sm">
                      {review.type} · 2:18
                    </Badge>
                    <Badge variant="outline" className="absolute top-3 right-3 bg-card/80 text-muted-foreground border-border/30 text-[10px] backdrop-blur-sm">
                      {review.student}
                    </Badge>
                  </div>

                  {/* Grade selector */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-foreground mb-2">Overall Grade</p>
                    <div className="flex gap-2 flex-wrap">
                      {grades.map((g) => (
                        <button
                          key={g}
                          onClick={() => setGrade(g)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors border ${
                            grade === g
                              ? g.startsWith('A') ? 'bg-primary/15 border-primary/30 text-primary'
                                : g.startsWith('B') ? 'bg-blue-400/15 border-blue-400/30 text-blue-400'
                                : 'bg-[hsl(var(--gold))]/15 border-[hsl(var(--gold))]/30 text-[hsl(var(--gold))]'
                              : 'bg-secondary/30 border-border/20 text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="mb-5">
                    <p className="text-xs font-medium text-foreground mb-2">Your Feedback</p>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Great footwork on the approach shots! For your third shot drop, try keeping the paddle face open longer through contact..."
                      className="w-full bg-secondary/30 border border-border/20 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/25 min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-secondary/20 border border-border/20">
                    <span className="text-xs text-muted-foreground">Earnings for this review</span>
                    <span className="font-display font-bold text-primary text-lg">{review.earned}</span>
                  </div>

                  <Button className="w-full h-11 font-semibold active:scale-[0.97] transition-transform glow-sm gap-1.5" onClick={handleSubmit}>
                    <Star size={14} /> Submit Review
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
