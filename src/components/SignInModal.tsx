import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SignInModal({ open, onClose }: Props) {
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
            className="w-full max-w-sm bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-border/30 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">Sign In</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <Button variant="outline" className="w-full gap-2 h-11 border-border/40 hover:border-primary/20 active:scale-[0.97] transition-transform">
                <Chrome size={16} /> Continue with Google
              </Button>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border/30" />
                <span>or</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="email"
                    placeholder="coach@courtana.com"
                    className="w-full bg-secondary/40 border border-border/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-secondary/40 border border-border/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
              <Button className="w-full h-11 font-semibold active:scale-[0.97] transition-transform glow-sm">
                Sign In
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Don't have an account? <button className="text-primary hover:underline">Join the Network</button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
