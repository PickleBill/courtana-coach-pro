import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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

const responseMap: Record<Exclude<Persona, 'all'>, Record<string, { text: string; ctas: CTA[] }>> = {
  anna: {
    'third shot drop': { text: "Soft hands are everything. I practice drops with ZERO backswing — just a push from the shoulder. Stand at the kitchen, drop 50 balls, then move back a foot at a time. Upload a video and I'll show you exactly where your paddle face opens too much.", ctas: [{ label: 'Upload Video →', route: '/ai-hub', variant: 'primary' }, { label: 'See My Sessions', url: 'https://courtana.com/player/bGLx1SV3k1lT/', variant: 'outline' }] },
    'paddle': { text: "I use a control-first setup — lighter paddle, longer handle for two-handed backhand reach. For most players I'd say get something in the 7.8-8.1oz range with a 16mm core. Check out what's available in the Coach Pro shop!", ctas: [{ label: 'Browse Gear', route: '/rewards', variant: 'primary' }] },
    'dupr': { text: "DUPR is how I track everyone in my network. Connect your Courtana profile and your DUPR auto-updates after every analyzed session — no manual input. It's a game changer for seeing real progress.", ctas: [{ label: 'Connect Courtana', url: 'https://courtana.com/signup/', variant: 'primary' }] },
    'default': { text: "Great question! The thing I tell all my students — pick ONE thing to work on for two weeks. Don't try to fix everything at once. Upload a match video and I'll tell you exactly what that one thing should be. Let's go! 🏓", ctas: [{ label: 'Upload Video', route: '/ai-hub', variant: 'primary' }, { label: 'Find a Coach', route: '/coaches', variant: 'outline' }] },
  },
  carlos: {
    'third shot drop': { text: "In tennis we call this a drop volley — same principle. Absorb the pace, don't add any. The key is relaxing your grip pressure at contact. Think of catching an egg. Record yourself from the side — paddle angle tells the whole story.", ctas: [{ label: 'AI Analysis →', route: '/ai-hub', variant: 'primary' }] },
    'footwork': { text: "Footwork is everything. Split step before EVERY shot. Recovery step after. Most players take 3 steps when 2 would do. I have a whole footwork module — it crosses over perfectly between tennis and pickleball.", ctas: [{ label: 'View Curriculum', route: '/curriculum', variant: 'primary' }] },
    'serve': { text: "Consistency beats power. In my matches, I win 75% of first-serve points with placement alone. Focus on deep to the backhand, low to the body, or short angles. The serve sets up the next shot — that's where you win.", ctas: [{ label: 'Practice Drills', route: '/curriculum', variant: 'primary' }] },
    'default': { text: "¡Vamos! Whatever racquet sport you play, the fundamentals are the same — footwork, timing, shot selection. Upload a match video and the AI will break down where you're losing points. Then we layer in pro coaching on top. That's the magic combo. 🎾", ctas: [{ label: 'Try AI Analysis', route: '/ai-hub', variant: 'primary' }, { label: 'Book a Coach', route: '/coaches', variant: 'outline' }] },
  },
  bryant: {
    'wall play': { text: "The wall is your best friend in padel. Learn to read the bounce angle — it's geometry, not guesswork. Start with simple back-wall returns: let the ball pass you, turn, and play off the bounce. 80% of padel points are won or lost on wall play.", ctas: [{ label: 'Follow Bryant', url: 'https://www.instagram.com/padelbryant/', variant: 'outline' }] },
    'bandeja': { text: "The bandeja is THE padel shot. It's a controlled overhead that keeps you at the net. Key: continental grip, contact in front, follow through across your body. Don't try to smash it — the bandeja is about placement and pressure.", ctas: [{ label: 'Watch Padel Sessions', url: 'https://courtana.com/', variant: 'primary' }] },
    'default': { text: "Padel is the fastest-growing racquet sport in the world and it's about to explode in the US. The wall play, the teamwork, the strategy — it's addicting. Whether you're crossing over from tennis or pickleball, I can help you adapt. 🏸", ctas: [{ label: 'Follow @padelbryant', url: 'https://www.instagram.com/padelbryant/', variant: 'primary' }, { label: 'Explore Coaching', route: '/coaches', variant: 'outline' }] },
  },
  ai: {
    'third shot drop': { text: "Based on analysis of 12,000+ third shot drops across all skill levels:\n\n📊 Contact Point: Elite players hit 6-8\" below net height\n📊 Paddle Angle: 35-42° open face (most rec players are at 50°+)\n📊 Follow-through: 8-12 inches (shorter = more control)\n\nWant a custom drill plan based on your data?", ctas: [{ label: 'Run AI Analysis', route: '/ai-hub', variant: 'primary' }, { label: 'View Your Stats', route: '/dashboard', variant: 'outline' }] },
    'dupr': { text: "DUPR integration is built into Courtana. After every analyzed session, your rating auto-recalculates based on shot quality, rally win rate, and opponent strength. Players using Courtana improve their DUPR by 0.4 points in 90 days on average.", ctas: [{ label: 'Connect Courtana', url: 'https://courtana.com/signup/', variant: 'primary' }] },
    'default': { text: "I've analyzed patterns across thousands of coaching sessions. To give you the most targeted advice:\n\n1. Upload a match video → instant shot grades\n2. Run AI Analysis → 6 skill categories scored\n3. Request a Pro Review → personalized insights\n\nThis 3-step process improves ratings by 0.4 DUPR points in 90 days.", ctas: [{ label: 'Start Analysis', route: '/ai-hub', variant: 'primary' }, { label: 'Browse Coaches', route: '/coaches', variant: 'outline' }] },
  },
  chuck: {
    'third shot drop': { text: "Chuck Norris doesn't drop third shots. The third shot drops itself out of respect. But for YOU, try keeping your paddle face open at 35-40° and let gravity do the work. Even gravity listens to Chuck Norris.", ctas: [{ label: '🎵 Chuck\'s Secret Training Video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Actually Learn This →', route: '/curriculum', variant: 'outline' }] },
    'paddle': { text: "Chuck Norris doesn't need a paddle. He once won a tournament with a cutting board. But since you're not Chuck Norris, I'd recommend something with a wide sweet spot. Check the Partner Store.", ctas: [{ label: '🎵 Chuck\'s Paddle Review', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Browse Real Gear', route: '/rewards', variant: 'outline' }] },
    'serve': { text: "Chuck Norris served once. The ball is still in orbit. For mortals: focus on placement over power. Deep serves to the backhand win more points than aces. Consistency is king — even Chuck respects consistency.", ctas: [{ label: '🎵 Watch Chuck\'s Serve', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Sign Up Free', url: 'https://courtana.com/signup/', variant: 'outline' }] },
    'dupr': { text: "Chuck Norris's DUPR rating crashed the algorithm — they had to add a new tier called 'Chuck.' But DUPR is great for tracking YOUR progress. Connect your Courtana profile and it auto-syncs.", ctas: [{ label: '🎵 Chuck\'s DUPR Reveal', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Connect Courtana', url: 'https://courtana.com/signup/', variant: 'outline' }] },
    'default': { text: "Chuck Norris once won a game of pickleball using only his stare. While I can't teach you THAT, here's my advice: footwork, timing, and the confidence to go for your shots. Upload a video and the AI will tell you where to improve. Even Chuck uses data... sometimes.", ctas: [{ label: '🎵 Chuck\'s Masterclass', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', variant: 'rickroll' }, { label: 'Try Free', url: 'https://courtana.com/signup/', variant: 'outline' }] },
  },
};

function getResponse(persona: Exclude<Persona, 'all'>, input: string): { text: string; ctas: CTA[] } {
  const lower = input.toLowerCase();
  const map = responseMap[persona];
  for (const [key, val] of Object.entries(map)) {
    if (key !== 'default' && lower.includes(key)) return val;
  }
  return map.default;
}

function getAllResponses(input: string): Message[] {
  const soloPersonas: Exclude<Persona, 'all'>[] = ['anna', 'carlos', 'bryant', 'ai', 'chuck'];
  return soloPersonas.map(p => {
    const resp = getResponse(p, input);
    return { role: 'assistant' as const, content: resp.text, persona: p, ctas: resp.ctas };
  });
}

export default function AskAProChat() {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>('anna');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (msg?: string) => {
    const userMsg = (msg || input).trim();
    if (!userMsg || typing) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setTyping(true);

    if (persona === 'all') {
      // Stagger responses from all personas
      const allResps = getAllResponses(userMsg);
      let delay = 600;
      allResps.forEach((resp, i) => {
        setTimeout(() => {
          setMessages(prev => [...prev, resp]);
          if (i === allResps.length - 1) setTyping(false);
        }, delay);
        delay += 800 + Math.random() * 600;
      });
    } else {
      const delay = 800 + Math.random() * 1200;
      setTimeout(() => {
        const resp = getResponse(persona, userMsg);
        setMessages(prev => [...prev, { role: 'assistant', content: resp.text, persona, ctas: resp.ctas }]);
        setTyping(false);
      }, delay);
    }
  };

  const switchPersona = (p: Persona) => {
    setPersona(p);
    setMessages([]);
  };

  const activeSoloPersona = persona !== 'all' ? personas[persona] : null;

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
                      {persona === 'all' ? '5 coaches ready' : `${personas[persona].sport} · Online`}
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/50 text-muted-foreground transition-colors">
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
                    {persona === 'all' ? 'Get perspectives from every coach in one thread' : personas[persona as Exclude<Persona, 'all'>].tagline}
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
                    {/* Show persona badge for multi-response */}
                    {msg.role === 'assistant' && msg.persona && (persona === 'all' || msg.persona) && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-sm">{personas[msg.persona].emoji}</span>
                        <span className={`text-[10px] font-semibold ${personas[msg.persona].color}`}>
                          {personas[msg.persona].name}
                        </span>
                        <Badge variant="outline" className="text-[8px] px-1 py-0 h-3.5">{personas[msg.persona].sport}</Badge>
                      </div>
                    )}
                    <div className={`px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary/50 text-foreground border border-border/20 rounded-bl-md'
                    }`}>
                      {msg.content.split('\n').map((line, li) => (
                        <span key={li}>
                          {line.startsWith('📊') || line.startsWith('🎯') ? (
                            <span className="block mt-1">{line}</span>
                          ) : (
                            line
                          )}
                          {li < msg.content.split('\n').length - 1 && <br />}
                        </span>
                      ))}
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

              {typing && (
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
