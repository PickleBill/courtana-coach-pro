import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import WaitlistModal from '@/components/WaitlistModal';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import ActivityTicker from '@/components/ActivityTicker';
import CourtAvailabilityBar from '@/components/CourtAvailabilityBar';
import CountUp from '@/components/CountUp';
import LiveCounter from '@/components/LiveCounter';
import { coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import usePageTitle from '@/hooks/usePageTitle';
import { ArrowRight, Zap, Users, Trophy, Brain, TrendingUp, Shield, Crown, Gamepad2, Activity, ExternalLink, Play, Globe, Camera, Sparkles, Quote, DollarSign, Clock, BarChart3, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const flywheelSteps = [
  { icon: Zap, label: 'Smart Court', desc: 'Courtana-powered facilities capture every shot in real time', color: 'text-primary' },
  { icon: Brain, label: 'AI Analysis', desc: 'Instant video breakdown, skill grading, and drill recommendations', color: 'text-blue-400' },
  { icon: Users, label: 'Coach Network', desc: 'Tiered async reviews from celebrity pros to certified coaches', color: 'text-[hsl(var(--gold))]' },
  { icon: TrendingUp, label: 'Player Growth', desc: 'Personalized curriculum, progress tracking, and skill metrics', color: 'text-primary' },
  { icon: Trophy, label: 'Experiences', desc: 'VIP events, signed merch, play with pros, and exclusive rewards', color: 'text-[hsl(var(--platinum))]' },
];

const audienceCards = [
  { title: "I'm a Player", desc: 'Get coached by the best — from AI analysis to personalized pro feedback. Level up on any court, on your time.', cta: 'Find Your Coach', link: '/coaches', icon: Gamepad2, gradient: 'from-primary/20 to-primary/5' },
  { title: "I'm a Coach", desc: 'Review sessions in minutes, not hours. Grow your student base globally. Earn 4x more with less time.', cta: 'Explore Coaching', link: '/coaches', icon: Shield, gradient: 'from-blue-500/20 to-blue-500/5' },
  { title: "I'm a Pro / Celebrity", desc: 'Build your coaching empire. Approve vetted networks, earn revenue share, create once-in-a-lifetime fan experiences.', cta: 'Scout Talent', link: '/scout', icon: Crown, gradient: 'from-[hsl(var(--gold))]/20 to-[hsl(var(--gold))]/5' },
];

const seeItLiveCards = [
  { title: 'Smart Court in Action', desc: 'See how Courtana-powered courts capture and analyze every rally in real time.', url: 'https://courtana.com/highlight/LKXstelDDjZb', icon: Zap },
  { title: 'Live Player Profile', desc: 'Real player profile with badges, XP progression, and competitive rank.', url: 'https://courtana.com/highlight-group/wFaqzjLm0Ghg', icon: Users },
  { title: 'Session Highlights', desc: 'Actual highlight clips automatically generated from a live session.', url: 'https://courtana.com/highlight/td7vCCWTXosp', icon: Play },
];

const howItWorks = [
  { icon: Camera, title: 'Play', desc: 'AI cameras capture your session automatically' },
  { icon: Brain, title: 'Analyze', desc: 'Get instant shot grades, pattern recognition, and improvement areas' },
  { icon: TrendingUp, title: 'Improve', desc: 'Connect with coaches who review your AI analysis and build your curriculum' },
];

const partnerNames = [
  'Court Kings', 'PPA Tour', 'USA Pickleball', 'Pickleball Freakshow', 'DUPR', 'Black Barn Pickleball',
  'Major League Pickleball', 'Selkirk Sport', 'Courtana', 'Life Time', 'Chicken N Pickle', 'JOOLA',
  'Centerline Athletics', 'Dink Dynamics', 'Dinkville Nashville', 'Cellutrex', 'Franklin Sports', 'Paddletek',
];

const testimonials = [
  { quote: "I went from a 3.8 to 4.5 DUPR in three months. The AI catches things I'd never notice on my own, and Coach Marcus's feedback made it click.", name: 'Tyler R.', role: 'Recreational Player', location: 'Austin, TX' },
  { quote: "I review 6x more sessions than I could in person, and my students improve faster. The AI does the heavy lifting, I add the insight.", name: 'Sarah K.', role: 'Certified Coach', location: 'Nashville, TN' },
  { quote: "This is what the sport needs. A scalable coaching layer that brings pro-level insight to every player at every facility.", name: 'Bryan P.', role: 'Industry Executive', location: 'Court Kings' },
];

const coachStats = [
  { value: '$4,200', label: 'Avg Monthly Earnings', icon: DollarSign },
  { value: '4.2 min', label: 'Avg Review Time', icon: Clock },
  { value: '14x', label: 'Time Leverage vs In-Person', icon: TrendingUp },
  { value: '89%', label: 'Student Retention Rate', icon: BarChart3 },
];

// Network constellation background
const networkNodes = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
}));

const networkEdges = networkNodes.flatMap((n, i) =>
  networkNodes.slice(i + 1).filter(() => Math.random() > 0.6).map(m => ({ from: n, to: m }))
);

const hudStats = [
  '14,847 frames processed',
  '312 shot events',
  '89,201 tracking points',
  '48 facilities connected',
];

function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-20">
        {networkEdges.map((e, i) => (
          <motion.line
            key={i}
            x1={`${e.from.x}%`} y1={`${e.from.y}%`}
            x2={`${e.to.x}%`} y2={`${e.to.y}%`}
            stroke="hsl(145, 100%, 45%)"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
        {networkNodes.map((n) => (
          <motion.circle
            key={n.id}
            cx={`${n.x}%`} cy={`${n.y}%`}
            r="2"
            fill="hsl(145, 100%, 45%)"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.2, 0.7, 0.2], cx: [`${n.x}%`, `${n.x + (Math.random() - 0.5) * 3}%`] }}
            transition={{ duration: 5 + Math.random() * 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </svg>
      {/* HUD stat readouts */}
      {hudStats.map((stat, i) => (
        <motion.div
          key={stat}
          className="absolute text-[10px] font-mono text-primary/30 tracking-wider"
          style={{ left: `${8 + i * 22}%`, top: `${75 + (i % 2) * 10}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1.5 + 2, ease: 'easeInOut' }}
        >
          {stat}
        </motion.div>
      ))}
    </div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/20"
          initial={{ x: `${Math.random() * 100}%`, y: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ y: [`${20 + Math.random() * 60}%`, `${10 + Math.random() * 40}%`], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, repeatType: 'loop', delay: Math.random() * 5, ease: 'easeInOut' }}
          style={{ width: 1 + Math.random() * 3, height: 1 + Math.random() * 3 }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  usePageTitle('King of the Courtana — AI Coaching Ecosystem');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistContext, setWaitlistContext] = useState('');

  return (
    <div className="min-h-screen">
      {/* 1. Hero */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
          <div className="absolute top-2/3 right-1/4 w-[400px] h-[300px] bg-[hsl(var(--gold))]/4 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsla(145,100%,45%,0.03)_0%,transparent_60%)]" />
        </div>
        <NetworkBackground />
        <Particles />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-medium mb-8 badge-glow">
              <Crown size={12} />
              Powered by Courtana × Court Kings
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.9] tracking-tight text-foreground" style={{ textWrap: 'balance' }}>
              King of the<br />
              <span className="text-gradient">Court</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed" style={{ textWrap: 'pretty' }}>
              AI-powered courts meet elite coaching networks. Every session captured, analyzed, and coached — from anywhere.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button size="lg" className="font-semibold active:scale-95 transition-transform text-base px-8 h-12 glow-sm" asChild>
                <Link to="/coaches">Explore Coaches <ArrowRight size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="active:scale-95 transition-transform text-base px-8 h-12 border-border/60 hover:border-primary/30" asChild>
                <Link to="/ai-hub">Try AI Analysis</Link>
              </Button>
            </div>
            <a href="#see-it-live" className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer mt-3 inline-flex items-center gap-1">
              ↓ See it live on real courts
            </a>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Activity size={12} className="text-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <LiveCounter min={10} max={15} className="text-primary font-semibold" /> sessions being analyzed right now
              </span>
              <span className="text-border">·</span>
              <span><LiveCounter min={40} max={55} /> coaches online</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. See It Live */}
      <section id="see-it-live" className="py-20 lg:py-24 section-gradient-1">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs mb-4 badge-glow">
                <Globe size={10} className="mr-1" /> Live on Courtana
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3" style={{ textWrap: 'balance' }}>Already Live. Right Now.</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Not mock-ups — these are real, live features running on courtana.com right now.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {seeItLiveCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="glass rounded-2xl p-6 glass-hover group active:scale-[0.97] transition-transform h-full relative overflow-hidden">
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] text-primary font-medium">Live</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                      <card.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-1.5">{card.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{card.desc}</p>
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View on Courtana <ExternalLink size={11} />
                    </span>
                  </motion.div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats bar */}
      <ScrollReveal>
        <section className="border-y border-border/20 section-gradient-2">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
            {[
              { label: 'Alpha Sessions', value: 50, suffix: '+', decimals: 0 },
              { label: 'Coaches', value: 15, suffix: '', decimals: 0 },
              { label: 'Pro Networks', value: 12, suffix: '', decimals: 0 },
              { label: 'Court Kings Facilities', value: 48, suffix: '+', decimals: 0 },
              { label: 'Avg Coach Rating', value: 4.8, suffix: '/5', decimals: 1 },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-3xl lg:text-4xl text-primary">
                  <CountUp end={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </div>
                <div className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* 4. Your Role in the Kingdom */}
      <section className="py-20 lg:py-28 section-gradient-2">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4" style={{ textWrap: 'balance' }}>Your Role in the Kingdom</h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">Three doors into the ecosystem. Every role benefits from the network effect.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {audienceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <Link to={card.link} className="block h-full">
                  <motion.div whileHover={{ scale: 1.03, y: -6 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="glass rounded-2xl p-8 glass-hover group active:scale-[0.97] transition-transform h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-secondary/60 border border-border/40 flex items-center justify-center mb-5 group-hover:border-primary/20 transition-colors">
                        <card.icon size={24} className="text-foreground" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-2">{card.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{card.desc}</p>
                      <span className="text-sm text-primary font-semibold flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        {card.cta} <ArrowRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="py-20 lg:py-24 section-gradient-2">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3" style={{ textWrap: 'balance' }}>How It Works</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Three steps from court to coaching — powered by AI and expert review.</p>
            </div>
          </ScrollReveal>
          <div className="max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 -translate-y-1/2" />
            <div className="grid md:grid-cols-3 gap-6">
              {howItWorks.map((step, i) => (
                <ScrollReveal key={step.title} delay={i * 0.12}>
                  <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="glass rounded-2xl p-8 text-center glass-hover relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg shadow-primary/25">
                      {i + 1}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-5">
                      <step.icon size={28} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3" style={{ textWrap: 'balance' }}>What People Are Saying</h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <div className="glass rounded-2xl p-6 glass-hover h-full flex flex-col">
                  <Quote size={20} className="text-primary/30 mb-4" />
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{t.quote}</p>
                  <div className="pt-4 border-t border-border/20">
                    <div className="font-display font-semibold text-foreground text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role} · {t.location}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Pricing teaser */}
          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <p className="text-sm text-muted-foreground">
                Coaching starts at <span className="text-primary font-semibold">$35/session</span> for rising stars, 
                <span className="text-foreground font-medium"> $85–150</span> for certified coaches, 
                and <span className="text-[hsl(var(--gold))] font-semibold">$500+</span> for celebrity pro reviews.
              </p>
              <Button variant="ghost" className="mt-3 text-primary text-sm" asChild>
                <Link to="/coaches">Browse All Coaches <ArrowRight size={12} /></Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Featured Coaches */}
      <section className="py-20 lg:py-28 section-gradient-2">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-3">Elite Network</div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold" style={{ textWrap: 'balance' }}>Featured Coaches</h2>
                <p className="text-muted-foreground mt-2">From world #1 pros to rising stars ready to help you level up.</p>
              </div>
              <Button variant="ghost" className="hidden sm:flex text-primary" asChild>
                <Link to="/coaches">View All <ArrowRight size={14} /></Link>
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coaches.filter(c => c.tier === 'celebrity').slice(0, 3).map((coach, i) => (
              <ScrollReveal key={coach.id} delay={i * 0.1}>
                <CoachCard coach={coach} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Why Coaches Love This */}
      <section className="py-20 lg:py-28 section-gradient-1">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs mb-4">
                <TrendingUp size={10} className="mr-1" /> Coach Economics
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3" style={{ textWrap: 'balance' }}>Why Coaches Love This</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Leverage AI to review more sessions, earn more, and help more players — without burning out.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {coachStats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 text-center glass-hover">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4">
                    <stat.icon size={20} className="text-primary" />
                  </div>
                  <div className="stat-number text-2xl lg:text-3xl text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Court Kings Partnership */}
      <ScrollReveal>
        <section id="court-kings-partnership" className="py-20 lg:py-28 section-gradient-1 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[hsl(var(--gold))]/5 rounded-full blur-[150px]" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] text-xs font-medium mb-6">
                  <Crown size={12} /> Strategic Partnership
                </div>
                <h2 className="font-display text-3xl lg:text-5xl font-bold mb-5" style={{ textWrap: 'balance' }}>Court Kings × Courtana</h2>
                <p className="text-muted-foreground leading-relaxed mb-10 text-lg max-w-2xl mx-auto">
                  Building the coaching infrastructure layer for every racquet sport facility in America. Court Kings brings the courts, pros, and nationwide distribution. Courtana brings AI, smart court tech, and the player ecosystem.
                </p>
              </div>

              {/* Partnership value exchange */}
              <p className="text-sm text-muted-foreground italic text-center mb-8 max-w-xl mx-auto">
                "Every Court Kings facility ships with a built-in coaching ecosystem. Players get better, coaches earn more, and your courts generate revenue beyond court time."
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
                <div className="glass rounded-2xl p-6 border-[hsl(var(--gold))]/15">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-[hsl(var(--gold))]/12 flex items-center justify-center">
                      <Crown size={14} className="text-[hsl(var(--gold))]" />
                    </div>
                    <span className="font-display font-bold text-foreground text-sm">Court Kings Brings</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> 48+ facilities nationwide</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> Pro player relationships (Ben Johns, Annalee Waters)</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> USA Pickleball official partner status</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> National distribution & brand recognition</li>
                  </ul>
                </div>
                <div className="glass rounded-2xl p-6 border-primary/15">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/12 flex items-center justify-center">
                      <Zap size={14} className="text-primary" />
                    </div>
                    <span className="font-display font-bold text-foreground text-sm">Courtana Brings</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> AI video analysis engine</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Smart court hardware & camera tech</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Coaching marketplace platform</li>
                    <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> Gamification, XP, and rewards engine</li>
                  </ul>
                </div>
              </div>

              {/* Pilot Facility Pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {['Black Barn Pickleball — Ohio', 'Dinkville — Nashville', 'Centerline Athletics — Austin'].map((f) => (
                  <Badge key={f} variant="outline" className="bg-[hsl(var(--gold))]/8 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/20 text-xs px-3 py-1">
                    🏟️ {f}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <Button size="lg" className="font-semibold active:scale-95 transition-transform px-8 h-12 glow-sm" onClick={() => { setWaitlistContext('Court Kings × Courtana Early Access'); setWaitlistOpen(true); }}>Join the Ecosystem — Early Access</Button>
                <Button size="lg" variant="outline" className="active:scale-95 transition-transform px-8 h-12" asChild>
                  <Link to="/dashboard">See Coach Economics</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 10. Ecosystem Flywheel */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4" style={{ textWrap: 'balance' }}>The Ecosystem Flywheel</h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">Every element feeds the next — creating a self-reinforcing loop that grows the entire network.</p>
            </div>
          </ScrollReveal>
          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
            <div className="grid md:grid-cols-5 gap-4 lg:gap-5">
              {flywheelSteps.map((step, i) => (
                <ScrollReveal key={step.label} delay={i * 0.1}>
                  <motion.div whileHover={{ scale: 1.04, y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="glass rounded-2xl p-6 text-center glass-hover relative group cursor-default">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-card border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">{i + 1}</div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-all duration-300">
                      <step.icon size={24} className={step.color} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-1.5">{step.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    {i < flywheelSteps.length - 1 && <ArrowRight size={16} className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-primary/30 z-10" />}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
            <ScrollReveal delay={0.6}>
              <div className="hidden md:flex justify-center mt-6">
                <div className="flex items-center gap-2 text-xs text-primary/40">
                  <div className="w-24 h-px bg-primary/15" />
                  <span className="text-primary/60 font-medium">Repeat & Scale</span>
                  <div className="w-24 h-px bg-primary/15" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Tune In Live */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs mb-4 badge-glow">
                <Radio size={10} className="mr-1" /> Live Now
              </Badge>
              <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3" style={{ textWrap: 'balance' as any }}>Tune In Live</h2>
              <p className="text-muted-foreground max-w-md mx-auto">Watch real sessions happening right now on Courtana-powered courts.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {[
              { title: 'Live at Seven Oaks (Outdoor)', desc: 'Watch outdoor sessions in real-time from our Seven Oaks facility.', url: 'https://courtana.com/display/3AELvCgGmzas/', location: 'Seven Oaks, TN' },
              { title: 'Live at The Underground', desc: 'Indoor sessions from our flagship Underground facility.', url: 'https://courtana.com/display/Sy6gIO44K3MG/', location: 'Nashville, TN' },
            ].map((feed, i) => (
              <ScrollReveal key={feed.title} delay={i * 0.1}>
                <a href={feed.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                  <motion.div whileHover={{ scale: 1.03, y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 25 }} className="glass rounded-2xl p-6 glass-hover group h-full relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] text-red-400 font-semibold uppercase tracking-wider">Live</span>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-4">
                      <Radio size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-1">{feed.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{feed.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground">{feed.location}</span>
                      <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">Watch <ExternalLink size={11} /></span>
                    </div>
                  </motion.div>
                </a>
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://courtana.com/signup/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium">
              Try Courtana Free — Sign Up <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      {/* 11. Court Availability Marquee */}
      <CourtAvailabilityBar />

      {/* 12. Activity Ticker */}
      <ActivityTicker />

      {/* 13. Community Partners */}
      <section className="py-16 border-t border-border/15">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h3 className="font-display text-lg font-bold text-foreground mb-1">Court Kings Community Partners</h3>
              <p className="text-xs text-muted-foreground mb-1">Join 40+ partners building the future of racquet sports</p>
              <a href="https://courtkings.com/community-partners/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-primary hover:underline">Become a Partner →</a>
            </div>
          </ScrollReveal>
          <div className="overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
            <motion.div animate={{ x: [0, -1200] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="flex gap-6 whitespace-nowrap">
              {[...partnerNames, ...partnerNames].map((name, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-secondary/20 border border-border/15 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary/60">{name.charAt(0)}</span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} context={waitlistContext} />
    </div>
  );
}