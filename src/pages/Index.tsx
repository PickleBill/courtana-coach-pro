import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { ecosystemStats, coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import { ArrowRight, Zap, Users, Trophy, Brain, TrendingUp, Shield, Crown, Gamepad2, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const formatNum = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toString();

const flywheelSteps = [
  { icon: Zap, label: 'Smart Court', desc: 'Courtana-powered facilities capture every shot in real time', color: 'text-primary' },
  { icon: Brain, label: 'AI Analysis', desc: 'Instant video breakdown, skill grading, and drill recommendations', color: 'text-blue-400' },
  { icon: Users, label: 'Coach Network', desc: 'Tiered async reviews from celebrity pros to certified coaches', color: 'text-[hsl(var(--gold))]' },
  { icon: TrendingUp, label: 'Player Growth', desc: 'Personalized curriculum, progress tracking, and skill metrics', color: 'text-primary' },
  { icon: Trophy, label: 'Experiences', desc: 'VIP events, signed merch, play with pros, and exclusive rewards', color: 'text-[hsl(var(--platinum))]' },
];

const audienceCards = [
  {
    title: 'I\'m a Player',
    desc: 'Get coached by the best — from AI analysis to personalized pro feedback. Level up on any court, on your time.',
    cta: 'Find Your Coach',
    link: '/coaches',
    icon: Gamepad2,
    gradient: 'from-primary/20 to-primary/5',
  },
  {
    title: 'I\'m a Coach',
    desc: 'Review sessions in minutes, not hours. Grow your student base globally. Earn 4x more with less time.',
    cta: 'Join the Network',
    link: '/dashboard',
    icon: Shield,
    gradient: 'from-blue-500/20 to-blue-500/5',
  },
  {
    title: 'I\'m a Pro / Celebrity',
    desc: 'Build your coaching empire. Approve vetted networks, earn revenue share, create once-in-a-lifetime fan experiences.',
    cta: 'Scout Talent',
    link: '/scout',
    icon: Crown,
    gradient: 'from-[hsl(var(--gold))]/20 to-[hsl(var(--gold))]/5',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] bg-primary/6 rounded-full blur-[150px]" />
          <div className="absolute top-2/3 right-1/4 w-[400px] h-[300px] bg-[hsl(var(--gold))]/4 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsla(145,100%,45%,0.03)_0%,transparent_60%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            {/* Partnership badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-xs font-medium mb-8 badge-glow"
            >
              <Crown size={12} />
              Powered by Courtana × Court Kings
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight text-foreground" style={{ textWrap: 'balance' }}>
              King of the<br />
              <span className="text-gradient">Court</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed" style={{ textWrap: 'pretty' }}>
              The global coaching ecosystem for racquet sports. AI-powered analysis meets elite coaching networks — get reviewed by the world's best, from anywhere.
            </p>
            <div className="flex flex-wrap gap-3 mt-10">
              <Button size="lg" className="font-semibold active:scale-95 transition-transform text-base px-8 h-12 glow-sm" asChild>
                <Link to="/coaches">Explore Coaches <ArrowRight size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="active:scale-95 transition-transform text-base px-8 h-12 border-border/60 hover:border-primary/30" asChild>
                <Link to="/ai-hub">Try AI Analysis</Link>
              </Button>
            </div>

            {/* Live activity indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex items-center gap-3 text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <Activity size={12} className="text-primary" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                12 sessions being analyzed right now
              </span>
              <span className="text-border">·</span>
              <span>47 coaches online</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <ScrollReveal>
        <section className="border-y border-border/20 section-gradient-2">
          <div className="container mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Sessions Analyzed', value: formatNum(ecosystemStats.sessionsAnalyzed), suffix: '+' },
              { label: 'Certified Coaches', value: formatNum(ecosystemStats.coachesOnPlatform), suffix: '' },
              { label: 'Facilities Connected', value: ecosystemStats.facilitiesConnected.toString(), suffix: '' },
              { label: 'Player Satisfaction', value: `${ecosystemStats.playerSatisfaction}`, suffix: '%' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="stat-number text-3xl lg:text-4xl text-primary">{stat.value}<span className="text-primary/60">{stat.suffix}</span></div>
                <div className="text-xs text-muted-foreground mt-1.5 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Flywheel — THE CENTERPIECE */}
      <section className="py-24 lg:py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/4 rounded-full blur-[200px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4" style={{ textWrap: 'balance' }}>
                The Ecosystem Flywheel
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-lg">
                Every element feeds the next — creating a self-reinforcing loop that grows the entire network.
              </p>
            </div>
          </ScrollReveal>

          {/* Flywheel visual */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
            
            <div className="grid md:grid-cols-5 gap-4 lg:gap-5">
              {flywheelSteps.map((step, i) => (
                <ScrollReveal key={step.label} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="glass rounded-2xl p-6 text-center glass-hover relative group cursor-default"
                  >
                    {/* Step number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-card border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                      {i + 1}
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/8 border border-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/15 transition-all duration-300">
                      <step.icon size={24} className={step.color} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-1.5">{step.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                    {i < flywheelSteps.length - 1 && (
                      <ArrowRight size={16} className="hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 text-primary/30 z-10" />
                    )}
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>

            {/* Loop arrow */}
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

      {/* Audience entry */}
      <section className="py-20 lg:py-28 section-gradient-1">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-14">
              <h2 className="font-display text-3xl lg:text-5xl font-bold mb-4" style={{ textWrap: 'balance' }}>
                Your Role in the Kingdom
              </h2>
              <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                Three doors into the ecosystem. Every role benefits from the network effect.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {audienceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <Link to={card.link} className="block h-full">
                  <motion.div
                    whileHover={{ scale: 1.03, y: -6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className={`glass rounded-2xl p-8 glass-hover group active:scale-[0.97] transition-transform h-full relative overflow-hidden`}
                  >
                    {/* Gradient bg */}
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

      {/* Featured coaches preview */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-12">
              <div>
                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-3">Elite Network</div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold" style={{ textWrap: 'balance' }}>
                  Featured Coaches
                </h2>
                <p className="text-muted-foreground mt-2">From world #1 pros to rising stars ready to help you level up.</p>
              </div>
              <Button variant="ghost" className="hidden sm:flex text-primary" asChild>
                <Link to="/coaches">View All <ArrowRight size={14} /></Link>
              </Button>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coaches.slice(0, 3).map((coach, i) => (
              <ScrollReveal key={coach.id} delay={i * 0.1}>
                <CoachCard coach={coach} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Court Kings CTA */}
      <ScrollReveal>
        <section className="py-20 lg:py-28 section-gradient-1 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[hsl(var(--gold))]/5 rounded-full blur-[150px]" />
          </div>
          <div className="container mx-auto px-4 text-center max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(var(--gold))]/10 border border-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] text-xs font-medium mb-6">
              <Crown size={12} />
              Strategic Partnership
            </div>
            <h2 className="font-display text-3xl lg:text-5xl font-bold mb-5" style={{ textWrap: 'balance' }}>
              Court Kings × Courtana
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
              Building the coaching infrastructure layer for every racquet sport facility in America. Court Kings brings the courts, pros, and nationwide distribution. Courtana brings AI, smart court tech, and the player ecosystem.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="font-semibold active:scale-95 transition-transform px-8 h-12 glow-sm">
                Partner With Us
              </Button>
              <Button size="lg" variant="outline" className="active:scale-95 transition-transform px-8 h-12" asChild>
                <Link to="/dashboard">See Coach Economics</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
