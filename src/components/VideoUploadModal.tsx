import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Zap, CheckCircle, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function VideoUploadModal({ open, onClose }: Props) {
  const [step, setStep] = useState<'upload' | 'confirm' | 'done'>('upload');
  const [expedite, setExpedite] = useState(false);

  const handleSend = () => {
    setStep('done');
    setTimeout(() => {
      toast({
        title: '🎾 Video sent to Coach Marcus!',
        description: expedite
          ? "Expedited review — you'll get feedback within 2 hours."
          : "You'll get feedback within 48 hours. Average response time: 2.4 hours.",
      });
      onClose();
      setStep('upload');
      setExpedite(false);
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
            className="w-full max-w-md bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-5 border-b border-border/30 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <Upload size={16} className="text-primary" /> Send Practice Video
              </h3>
              <button onClick={() => { onClose(); setStep('upload'); setExpedite(false); }} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                <X size={16} />
              </button>
            </div>

            <div className="p-5">
              {step === 'done' ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                  >
                    <CheckCircle size={48} className="text-primary mx-auto mb-4" />
                  </motion.div>
                  <h4 className="font-display font-bold text-foreground text-lg mb-1">Video Sent!</h4>
                  <p className="text-sm text-muted-foreground">Coach Marcus will review shortly.</p>
                </motion.div>
              ) : (
                <>
                  {/* Video preview placeholder */}
                  <div className="rounded-xl bg-gradient-to-br from-secondary/60 via-primary/5 to-secondary/40 h-40 flex items-center justify-center mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_hsla(145,100%,45%,0.06),transparent_50%)]" />
                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
                        <Upload size={20} className="text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground">practice_serve_drill.mp4</p>
                      <p className="text-[10px] text-muted-foreground/50">2:34 · 45MB</p>
                    </div>
                  </div>

                  {/* Sending to Coach */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/15 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                      <User size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">Sending to Coach Marcus</p>
                      <p className="text-xs text-muted-foreground">Ben Johns Network · Avg response: 2.4 hrs</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-1" /> Online
                    </Badge>
                  </div>

                  {/* Response time options */}
                  <div className="space-y-2 mb-5">
                    <p className="text-xs font-medium text-foreground mb-2">Review Speed</p>
                    <button
                      onClick={() => setExpedite(false)}
                      className={`w-full p-3 rounded-lg text-left transition-colors border ${
                        !expedite ? 'bg-primary/8 border-primary/25 text-foreground' : 'bg-secondary/20 border-border/20 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span className="text-sm font-medium">Standard Review</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Free</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 ml-6">Response within 48 hours</p>
                    </button>
                    <button
                      onClick={() => setExpedite(true)}
                      className={`w-full p-3 rounded-lg text-left transition-colors border ${
                        expedite ? 'bg-[hsl(var(--gold))]/8 border-[hsl(var(--gold))]/25 text-foreground' : 'bg-secondary/20 border-border/20 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap size={14} className="text-[hsl(var(--gold))]" />
                          <span className="text-sm font-medium">⚡ Expedited Review</span>
                        </div>
                        <span className="text-xs font-semibold text-[hsl(var(--gold))]">$5</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1 ml-6">Guaranteed response within 2 hours</p>
                    </button>
                  </div>

                  <Button
                    className="w-full h-11 font-semibold active:scale-[0.97] transition-transform glow-sm"
                    onClick={handleSend}
                  >
                    {expedite ? 'Send & Pay $5' : 'Send for Review'}
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground mt-3">Your video is encrypted and only visible to your assigned coach.</p>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
