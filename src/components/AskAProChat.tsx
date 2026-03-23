import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

type Persona = 'anna' | 'carlos' | 'bryant' | 'ai' | 'chuck' | 'all';

const personas: Record<Exclude<Persona, 'all'>, { name: string; sport: string; emoji: string; color: string; bg: string; tagline: string }> = {
  anna: { name: 'Anna Leigh Waters', sport: 'Pickleball', emoji: '🏓', color: 'text-primary', bg: 'bg-primary/12', tagline: 'Net play, speed-ups, and competitive doubles strategy.' },
  carlos: { name: 'Carlos Alcaraz', sport: 'Tennis', emoji: '🎾', color: 'text-blue-400', bg: 'bg-blue-400/12', tagline: 'Groundstrokes, footwork, and match-level intensity.' },
  bryant: { name: 'Bryant', sport: 'Padel', emoji: '🏸', color: 'text-[hsl(var(--gold))]', bg: 'bg-[hsl(var(--gold))]/12', tagline: 'Wall play, bandeja, and padel-specific positioning.' },
  ai: { name: 'AI Coach', sport: 'All Sports', emoji: '🤖', color: 'text-purple-400', bg: 'bg-purple-400/12', tagline: 'Data-driven analysis across every racquet sport.' },
  chuck: { name: 'Chuck Norris', sport: 'Everything', emoji: '🥋', color: 'text-red-400', bg: 'bg-red-400/12', tagline: 'Ask Chuck anything. You might get a roundhouse kick.' },
};

type Message = { role: 'user' | 'assistant'; content: string; persona?: Exclude<Persona, 'all'>; ctas?: CTA[] };
type CTA = { label: string; url?: string; route?: string; variant: 'primary' | 'outline' | 'rickroll' };

// Post-response CTAs based on persona
const personaCTAs: Record<Exclude<Persona, 'all'>, CTA[]> = {
  anna: [{ label: 'Upload Video', route: '/ai-hub', variant: 'primary' }, { label: 'See Highlights', url: 'https://courtana.com/highlight/td7vCCWTXosp', variant: 'outline' }],
  carlos: [{ label: 'View Curriculum', route: '/curriculum', variant: 'primary' }, { label: 'Book a Coach', route: '/coaches', variant: 'outline' }],
  bryant: [{ label: 'Follow @padelbryant', url: 'https://www.instagram.com/padelbryant/', variant: 'primary' }, { label: 'Explore Coaching', route: '/coaches', variant: 'outline' }],
  ai: [{ label: 'Run AI Analysis', route: '/ai-hub', variant: 'primary' }, { label: 'View Your Stats', route: '/dashboard', variant: 'outline' }],
  chuck: [{ label: '🎵 Chuck\'s Secret Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Try Free', url: 'https://courtana.com/signup/', variant: 'outline' }],
};

export default function AskAProChat() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>('anna');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const streamFromEdge = useCallback(async (
    userMessages: { role: string; content: string }[],
    targetPersona: Exclude<Persona, 'all'>,
    onToken: (token: string) => void,
    onDone: () => void,
  ) => {
    try {
      const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
      const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const url = `https://${projectId}.supabase.co/functions/v1/ask-a-pro`;

      const controller = new AbortController();
      abortRef.current = controller;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
        },
        body: JSON.stringify({
          messages: userMessages,
          persona: targetPersona,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Edge function error: ${errText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              const token = parsed.choices?.[0]?.delta?.content;
              if (token) onToken(token);
            } catch {}
          }
        }
      }

      onDone();
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.error('Stream error:', err);
      onToken('\n\n_[Connection issue — try again]_');
      onDone();
    }
  }, []);

  const sendMessage = useCallback(async (msg?: string) => {
    const userMsg = (msg || input).trim();
    if (!userMsg || streaming) return;
    setInput('');

    const newUserMessage: Message = { role: 'user', content: userMsg };
    setMessages(prev => [...prev, newUserMessage]);
    setStreaming(true);

    const conversationHistory = [...messages, newUserMessage]
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => ({ role: m.role, content: m.content }));

    if (persona === 'all') {
      // Stream from all personas sequentially
      const soloKeys: Exclude<Persona, 'all'>[] = ['anna', 'carlos', 'bryant', 'ai', 'chuck'];
      for (const key of soloKeys) {
        const msgIdx = { current: -1 };
        await new Promise<void>((resolve) => {
          streamFromEdge(
            conversationHistory,
            key,
            (token) => {
              setMessages(prev => {
                const updated = [...prev];
                if (msgIdx.current === -1) {
                  msgIdx.current = updated.length;
                  updated.push({ role: 'assistant', content: token, persona: key });
                } else {
                  updated[msgIdx.current] = { ...updated[msgIdx.current], content: updated[msgIdx.current].content + token };
                }
                return updated;
              });
            },
            () => {
              // Add CTAs after streaming completes
              setMessages(prev => {
                const updated = [...prev];
                if (msgIdx.current >= 0 && updated[msgIdx.current]) {
                  updated[msgIdx.current] = { ...updated[msgIdx.current], ctas: personaCTAs[key] };
                }
                return updated;
              });
              resolve();
            },
          );
        });
      }
      setStreaming(false);
    } else {
      // Single persona streaming
      let streamContent = '';
      const assistantIdx = messages.length + 1; // +1 for the user message we just added

      setMessages(prev => [...prev, { role: 'assistant', content: '', persona: persona }]);

      await streamFromEdge(
        conversationHistory,
        persona,
        (token) => {
          streamContent += token;
          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (updated[lastIdx]?.role === 'assistant') {
              updated[lastIdx] = { ...updated[lastIdx], content: streamContent };
            }
            return updated;
          });
        },
        () => {
          setMessages(prev => {
            const updated = [...prev];
            const lastIdx = updated.length - 1;
            if (updated[lastIdx]?.role === 'assistant') {
              updated[lastIdx] = { ...updated[lastIdx], ctas: personaCTAs[persona as Exclude<Persona, 'all'>] };
            }
            return updated;
          });
          setStreaming(false);
        },
      );
    }
  }, [input, messages, persona, streaming, streamFromEdge]);

  const switchPersona = (p: Persona) => {
    if (abortRef.current) abortRef.current.abort();
    setPersona(p);
    setMessages([]);
    setStreaming(false);
  };

  const soloKeys: Exclude<Persona, 'all'>[] = ['anna', 'carlos', 'bryant', 'ai', 'chuck'];

  return (
    <>
      {/* Single floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center glow-sm shadow-xl shadow-primary/20 cursor-pointer gap-0"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] h-[85vh] sm:h-[600px] rounded-2xl bg-card border border-border/50 shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/30 bg-card shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="text-xl">
                    {persona === 'all' ? '🌐' : personas[persona].emoji}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {persona === 'all' ? 'Ask Everyone' : personas[persona].name}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      {persona === 'all' ? '5 coaches · AI powered' : `${personas[persona].sport} · AI powered`}
                    </div>
                  </div>
                </div>
                <button onClick={() => { setOpen(false); if (abortRef.current) abortRef.current.abort(); }} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Persona selector — 2 rows */}
              <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                {soloKeys.slice(0, 3).map(key => {
                  const p = personas[key];
                  return (
                    <button
                      key={key}
                      onClick={() => switchPersona(key)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                        persona === key
                          ? `${p.bg} ${p.color} border border-current/20`
                          : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-transparent'
                      }`}
                    >
                      {p.emoji} {key === 'anna' ? 'ALW' : key === 'carlos' ? 'Carlos' : 'Bryant'}
                    </button>
                  );
                })}
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {soloKeys.slice(3).map(key => {
                  const p = personas[key];
                  return (
                    <button
                      key={key}
                      onClick={() => switchPersona(key)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                        persona === key
                          ? `${p.bg} ${p.color} border border-current/20`
                          : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-transparent'
                      }`}
                    >
                      {p.emoji} {key === 'ai' ? 'AI Coach' : 'Chuck'}
                    </button>
                  );
                })}
                <button
                  onClick={() => switchPersona('all')}
                  className={`py-1.5 px-1 rounded-lg text-[10px] font-medium transition-all flex items-center justify-center gap-1 ${
                    persona === 'all'
                      ? 'bg-gradient-to-r from-primary/15 to-blue-400/15 text-foreground border border-primary/20'
                      : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  🌐 Ask All
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-6">
                  <div className="text-3xl mb-3">
                    {persona === 'all' ? '🌐' : personas[persona as Exclude<Persona, 'all'>]?.emoji}
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {persona === 'all' ? 'Ask all coaches at once' : `Chat with ${personas[persona as Exclude<Persona, 'all'>].name}`}
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    {persona === 'all' ? 'Get AI-powered perspectives from every coach' : personas[persona as Exclude<Persona, 'all'>].tagline}
                  </p>
                  <div className="space-y-1.5">
                    {['How do I improve my third shot drop?', 'What paddle should I use?', 'Help with my footwork'].map(q => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full text-left px-3 py-2 rounded-lg bg-secondary/30 border border-border/20 text-xs text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[90%]">
                    {msg.role === 'assistant' && msg.persona && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{personas[msg.persona].emoji}</span>
                        <span className={`text-[10px] font-semibold ${personas[msg.persona].color}`}>
                          {personas[msg.persona].name}
                        </span>
                        <Badge variant="outline" className="text-[8px] px-1 py-0 h-3.5">{personas[msg.persona].sport}</Badge>
                      </div>
                    )}
                    <div className={`px-3.5 py-2.5 rounded-xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary/50 text-foreground border border-border/20 rounded-bl-md'
                    }`}>
                      {msg.content || (streaming ? '...' : '')}
                    </div>
                    {/* CTAs after response */}
                    {msg.role === 'assistant' && msg.ctas && msg.ctas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {msg.ctas.map((cta, ci) => {
                          if (cta.url) {
                            return (
                              <a
                                key={ci}
                                href={cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all active:scale-95 ${
                                  cta.variant === 'rickroll'
                                    ? 'bg-red-500/15 text-red-400 border border-red-400/20 hover:bg-red-500/25'
                                    : cta.variant === 'primary'
                                    ? 'bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25'
                                    : 'bg-secondary/40 text-muted-foreground border border-border/20 hover:text-foreground'
                                }`}
                              >
                                {cta.label} <ExternalLink size={9} />
                              </a>
                            );
                          }
                          if (cta.route) {
                            return (
                              <Link
                                key={ci}
                                to={cta.route}
                                onClick={() => setOpen(false)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all active:scale-95 ${
                                  cta.variant === 'primary'
                                    ? 'bg-primary/15 text-primary border border-primary/20 hover:bg-primary/25'
                                    : 'bg-secondary/40 text-muted-foreground border border-border/20 hover:text-foreground'
                                }`}
                              >
                                {cta.label} <ArrowRight size={9} />
                              </Link>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {streaming && messages[messages.length - 1]?.role !== 'assistant' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 px-3.5 py-2.5">
                  <span className="text-sm">{persona === 'all' ? '🌐' : personas[persona as Exclude<Persona, 'all'>]?.emoji}</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map(d => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-pulse" style={{ animationDelay: `${d * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/30 bg-card shrink-0">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={persona === 'all' ? 'Ask all coaches...' : `Ask ${persona === 'ai' ? 'AI Coach' : personas[persona as Exclude<Persona, 'all'>]?.name?.split(' ')[0]}...`}
                  className="flex-1 bg-secondary/40 border border-border/30 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors"
                />
                <Button type="submit" size="icon" className="shrink-0 w-9 h-9 active:scale-90 transition-transform" disabled={!input.trim() || streaming}>
                  <Send size={14} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
