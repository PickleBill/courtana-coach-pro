import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
  context?: string; // e.g. "Book Session — Ben Johns"
}

export default function WaitlistModal({ open, onClose, context }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'player' | 'coach' | 'pro'>('player');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const { error } = await supabase.from('waitlist').insert({
        email,
        name: name || null,
        role_interest: role,
      });
      if (error) throw error;
      toast({ title: "You're on the list! 🎾", description: context ? `We'll follow up on: ${context}` : "We'll notify you when early access opens." });
      onClose();
      setEmail('');
      setName('');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
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
            className="w-full max-w-sm bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-5 border-b border-border/30 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                <Sparkles size={16} className="text-primary" /> Get Early Access
              </h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {context && (
                <p className="text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3 border border-border/20">
                  {context}
                </p>
              )}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email *</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-secondary/40 border border-border/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Name (optional)</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-secondary/40 border border-border/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">I'm a...</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['player', 'coach', 'pro'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
                        role === r
                          ? 'bg-primary/15 border-primary/30 text-primary'
                          : 'bg-secondary/30 border-border/20 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <Button
                className="w-full h-11 font-semibold active:scale-[0.97] transition-transform glow-sm"
                onClick={handleSubmit}
                disabled={loading || !email}
              >
                {loading ? 'Joining...' : 'Join the Waitlist'}
              </Button>
              <p className="text-center text-[10px] text-muted-foreground">No spam. We'll only email you when there's something to show.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
