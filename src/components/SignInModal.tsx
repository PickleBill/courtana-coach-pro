import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable/index';
import { toast } from '@/hooks/use-toast';

interface Props {
  open: boolean;
  onClose: () => void;
  mode?: 'signin' | 'signup';
}

export default function SignInModal({ open, onClose, mode: initialMode = 'signin' }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async () => {
    if (!email || !password) return;
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name || email.split('@')[0] },
          },
        });
        if (error) throw error;
        toast({ title: 'Check your email', description: 'We sent you a verification link.' });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back!', description: "You're signed in." });
      }
      onClose();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth('google', {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
    }
  };

  const handleAppleSignIn = async () => {
    const { error } = await lovable.auth.signInWithOAuth('apple', {
      redirect_uri: window.location.origin,
    });
    if (error) {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
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
            className="w-full max-w-sm bg-card border border-border/40 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="p-5 border-b border-border/30 flex items-center justify-between">
              <h3 className="font-display font-bold text-foreground">
                {mode === 'signin' ? 'Sign In' : 'Join the Network'}
              </h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="gap-2 h-11 border-border/40 hover:border-primary/20 active:scale-[0.97] transition-transform" onClick={handleGoogleSignIn}>
                  <Chrome size={16} /> Google
                </Button>
                <Button variant="outline" className="gap-2 h-11 border-border/40 hover:border-primary/20 active:scale-[0.97] transition-transform" onClick={handleAppleSignIn}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  Apple
                </Button>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex-1 h-px bg-border/30" />
                <span>or</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              {mode === 'signup' && (
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">Name</label>
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
              )}
              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-secondary/40 border border-border/30 rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30"
                  />
                </div>
              </div>
              <Button
                className="w-full h-11 font-semibold active:scale-[0.97] transition-transform glow-sm"
                onClick={handleEmailAuth}
                disabled={loading}
              >
                {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                {mode === 'signin' ? (
                  <>Don't have an account? <button className="text-primary hover:underline" onClick={() => setMode('signup')}>Join the Network</button></>
                ) : (
                  <>Already have an account? <button className="text-primary hover:underline" onClick={() => setMode('signin')}>Sign In</button></>
                )}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
