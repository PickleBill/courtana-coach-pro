import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Crown, ShieldCheck, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Persona = 'ben' | 'marcus' | 'ai' | 'chuck';

const personas = {
  ben: { name: 'Ben Johns', icon: Crown, color: 'text-[hsl(var(--gold))]', bg: 'bg-[hsl(var(--gold))]/12', avatar: 'BJ', label: '👑' },
  marcus: { name: 'Marcus Chen', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/12', avatar: 'MC', label: '✓' },
  ai: { name: 'AI Coach', icon: Brain, color: 'text-blue-400', bg: 'bg-blue-400/12', avatar: '🤖', label: '🤖' },
  chuck: { name: 'Chuck Norris', icon: Sparkles, color: 'text-red-400', bg: 'bg-red-400/12', avatar: 'CN', label: '🥋' },
};

type Message = { role: 'user' | 'assistant'; content: string };

const responseMap: Record<string, Record<string, string>> = {
  ben: {
    'third shot drop': "The key is soft hands and getting low. Most players swing too hard — it's a touch shot, not a power shot. Try this: stand 2 feet behind the kitchen line, have a partner feed balls, and practice dropping them with zero backswing. Do 50 reps, then move back a foot. Upload a video of this drill and I'll review your technique.",
    'paddle': "Great question — it depends on your playstyle. For control players, I'd recommend the Freakshow Gen 3 with haptic feedback — it's what I train with. For power players, look at something with a longer handle and thicker core. Check out our Partner Store for exclusive deals on my recommended gear.",
    'serve': "Consistency beats power on serves. I see players try to crush it and they miss 20% of the time. In pro play, you can't give away free points. Focus on placement: deep to the backhand, low and to the body, or short angles. The serve sets up your third shot — that's where the real play begins.",
    'dinking': "Dinking is chess, not checkers. Most rec players dink cross-court because it's comfortable. Start adding inside-out dinks and change the pace. My secret? I watch my opponent's feet. If they're not set, I speed it up. If they're balanced, I keep it soft and wait.",
    'dupr': "DUPR is the gold standard for tracking your real skill level. I look at DUPR ratings when selecting students for my network — it tells me where you are and where you need to go. Connect your Courtana profile and your DUPR auto-updates after every analyzed session.",
    'default': "That's a great question. The biggest thing I see holding players back is trying to do too much at once. Pick ONE skill to focus on for two weeks, drill it relentlessly, then move on. Upload a video of your matches to Courtana and I can give you a personalized breakdown of what to prioritize.",
  },
  marcus: {
    'third shot drop': "I coach this differently than most. Start with the kitchen drill — stand AT the kitchen line, softly tap balls over. Once that's consistent, move back 2 feet at a time. The key insight: your paddle face angle matters more than your swing speed. Record yourself from the side and upload it — I'll annotate your paddle angle on each rep.",
    'paddle': "As a former tennis player, I had to adjust to pickleball paddles significantly. The biggest factor is weight distribution, not just weight. For defensive players, a head-light paddle gives you faster hands at the kitchen. I'd check our partner rewards — there are exclusive discounts for coaching network members.",
    'footwork': "Footwork is my bread and butter — it's why they call me 'The Wall.' Three things to focus on: split-step timing (before every shot), recovery step (back to neutral after each shot), and lateral movement efficiency. Most players take 3 steps when 2 would do. I have a whole module on this in the curriculum.",
    'default': "I'd love to help you with that. As part of Ben Johns' coaching network, I combine pro-level strategy with hands-on coaching methodology. The best next step? Upload a match video to the AI Analysis hub — the AI will give you instant feedback, and I can layer my expert notes on top. That human + AI combo is incredibly powerful.",
  },
  ai: {
    'third shot drop': "Based on analysis of 12,000+ third shot drops across all skill levels, here are the key metrics that separate 4.0 from 5.0 players:\n\n📊 **Contact Point**: Elite players hit 6-8 inches below net height\n📊 **Paddle Angle**: 35-42° open face (most rec players are at 50°+)\n📊 **Follow-through**: 8-12 inches (shorter = more control)\n\nRecommended drill: Wall drop drill, 3 sets of 50 reps. Would you like me to generate a custom practice plan?",
    'paddle': "Based on your playing data and style analysis:\n\n🎯 **Recommended**: Freakshow Gen 3 Haptic Pro\n- Weight: 7.9oz (ideal for your control-first style)\n- Grip: 4.25\" (matches your hand size data)\n- Core: 16mm polymer (optimal for your dink-heavy game)\n\nThis paddle has a 94% satisfaction rate among players with similar profiles. Check the Rewards Store for exclusive network member pricing.",
    'default': "I've analyzed patterns across thousands of coaching sessions. To give you the most targeted advice, I'd recommend:\n\n1. **Upload a match video** → I'll break down your shot selection, positioning, and timing\n2. **Run the AI Analysis** → Get instant grades across 6 skill categories\n3. **Request a Pro Review** → A certified coach adds personalized insights\n\nThis three-step process improves player ratings by an average of 0.4 DUPR points in 90 days.",
  },
  chuck: {
    'third shot drop': "Chuck Norris doesn't drop third shots. The third shot drops itself out of respect. But for YOU, try keeping your paddle face open at 35-40° and let gravity do the work. Even gravity listens to Chuck Norris.",
    'paddle': "Chuck Norris doesn't need a paddle. He once won a tournament with a cutting board. But since you're not Chuck Norris, I'd recommend something with a wide sweet spot — the Freakshow Gen 3 is solid. Check the Partner Store.",
    'serve': "Chuck Norris served once. The ball is still in orbit. For mortals: focus on placement over power. Deep serves to the backhand win more points than aces. Consistency is king — even Chuck respects consistency.",
    'dupr': "Chuck Norris's DUPR rating crashed the algorithm — they had to add a new tier. But DUPR is a great way to track your real progress. Connect your Courtana profile to auto-sync your rating after every session.",
    'default': "Chuck Norris once won a game of pickleball using only his stare. While I can't teach you THAT, here's what I can say: the key to any racquet sport is footwork, timing, and the confidence to go for your shots. Upload a video and the Courtana AI will tell you exactly where to improve. Even Chuck uses data... sometimes.",
  },
};

function getResponse(persona: Persona, input: string): string {
  const lower = input.toLowerCase();
  const map = responseMap[persona];
  for (const [key, val] of Object.entries(map)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return map.default;
}

export default function AskAProChat() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>('ben');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      if (!hasShownWelcome && messages.length === 0) {
        setHasShownWelcome(true);
        setTimeout(() => {
          setMessages([{ role: 'assistant', content: `Hey! I'm ${personas[persona].name}. Ask me anything about your game — technique, drills, strategy, or gear. Let's level up. 🏓` }]);
        }, 600);
      }
    }
  }, [open]);

  const send = () => {
    if (!input.trim() || typing) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: getResponse(persona, userMsg) }]);
      setTyping(false);
    }, delay);
  };

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setMessages([]);
  };

  const p = personas[persona];

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center glow-sm shadow-xl shadow-primary/20 cursor-pointer"
          >
            <MessageCircle size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Label */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-[5.5rem] right-6 z-50 px-3 py-1.5 rounded-lg bg-card border border-border/40 text-xs font-medium text-foreground shadow-lg"
          >
            Ask a Pro 💬
          </motion.div>
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
            className="fixed bottom-6 right-6 z-50 w-[400px] h-[560px] rounded-2xl bg-card border border-border/50 shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/30 bg-card">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${p.bg} flex items-center justify-center text-xs font-bold ${p.color}`}>
                    {p.avatar}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-foreground">{p.name}</span>
                    <div className="flex items-center gap-1 text-[10px] text-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Online now
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Persona selector */}
              <div className="flex gap-1.5">
                {(Object.entries(personas) as [Persona, typeof personas.ben][]).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => switchPersona(key)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all ${
                      persona === key
                        ? `${val.bg} ${val.color} border border-current/20`
                        : 'bg-secondary/30 text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {val.label} {val.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className={`w-14 h-14 rounded-2xl ${p.bg} flex items-center justify-center mx-auto mb-3 text-lg`}>
                    {p.avatar === '🤖' ? '🤖' : <span className={`font-display font-bold ${p.color}`}>{p.avatar}</span>}
                  </div>
                  <p className="text-sm text-foreground font-medium mb-1">Chat with {p.name}</p>
                  <p className="text-xs text-muted-foreground mb-4">Ask about technique, drills, or strategy</p>
                  <div className="space-y-1.5">
                    {['How do I improve my third shot drop?', 'What paddle should I use?', 'Help with my footwork'].map(q => (
                      <button
                        key={q}
                        onClick={() => { setInput(q); }}
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
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-secondary/50 text-foreground border border-border/20 rounded-bl-md'
                  }`}>
                    {msg.content.split('\n').map((line, li) => (
                      <span key={li}>
                        {line.startsWith('📊') || line.startsWith('🎯') ? (
                          <span className="block mt-1">{line}</span>
                        ) : line.startsWith('**') ? (
                          <span className="font-semibold">{line.replace(/\*\*/g, '')}</span>
                        ) : (
                          line
                        )}
                        {li < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1.5 px-3.5 py-2.5">
                  <div className={`w-6 h-6 rounded-md ${p.bg} flex items-center justify-center text-[10px] font-bold ${p.color}`}>{p.avatar === '🤖' ? '🤖' : p.avatar}</div>
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
            <div className="p-3 border-t border-border/30 bg-card">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask ${p.name.split(' ')[0]} anything...`}
                  className="flex-1 bg-secondary/40 border border-border/30 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors"
                />
                <Button type="submit" size="icon" className="shrink-0 w-9 h-9 active:scale-90 transition-transform" disabled={!input.trim() || typing}>
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
