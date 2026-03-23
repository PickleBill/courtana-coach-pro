import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ScrollReveal';
import { ecosystemStats, coaches } from '@/data/mockData';
import CoachCard from '@/components/CoachCard';
import { ArrowRight, Zap, Users, Trophy, Brain, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const formatNum = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toString();

const flywheelSteps = [
  { icon: Zap, label: 'Smart Court', desc: 'Courtana-powered facilities capture every shot' },
  { icon: Brain, label: 'AI Analysis', desc: 'Instant video breakdown and skill grading' },
  { icon: Users, label: 'Coach Network', desc: 'Async reviews from pros and certified coaches' },
  { icon: TrendingUp, label: 'Player Growth', desc: 'Curriculum, progress tracking, skill metrics' },
  { icon: Trophy, label: 'Rewards', desc: 'VIP experiences, merch, and exclusive events' },
];

const audienceCards = [
  {
    title: 'Players',
    desc: 'Get coached by the best — from AI-powered analysis to personalized pro feedback. Level up on your schedule.',
    cta: 'Find Your Coach',
    link: '/coaches',
    icon: '🎯',
  },
  {
    title: 'Coaches',
    desc: 'Leverage your time. Review sessions in minutes, grow your student base globally, earn more with less.',
    cta: 'Join the Network',
    link: '/dashboard',
    icon: '📋',
  },
  {
    title: 'Pros & Celebrities',
    desc: 'Build your coaching empire. Approve networks, earn revenue share, and create once-in-a-lifetime fan experiences.',
    cta: 'Scout Talent',
    link: '/scout',
    icon: '👑',
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                <Shield size={12} />
                Powered by Court Kings × Courtana
              </div>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-foreground" style={{ textWrap: 'balance' }}>
              The Kingdom of<br />
              <span className="text-gradient">Racquet Sports Coaching</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed" style={{ textWrap: 'pretty' }}>
              AI-powered analysis meets elite coaching networks. Get reviewed by the world's best — from anywhere, on any court, on your time.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" className="font-semibold active:scale-95 transition-transform" asChild>
                <Link to="/coaches">Explore Coaches <ArrowRight size={16} /></Link>
              </Button>
              <Button size="lg" variant="outline" className="active:scale-95 transition-transform" asChild>
                <Link to="/ai-hub">Try AI Analysis</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <ScrollReveal>
        <section className="border-y border-border/30 bg-card/30">
          <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Sessions Analyzed', value: formatNum(ecosystemStats.sessionsAnalyzed) },
              { label: 'Coaches', value: formatNum(ecosystemStats.coachesOnPlatform) },
              { label: 'Facilities Connected', value: ecosystemStats.facilitiesConnected.toString() },
              { label: 'Player Satisfaction', value: `${ecosystemStats.playerSatisfaction}%` },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Flywheel */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-center mb-4" style={{ textWrap: 'balance' }}>
              The Ecosystem Flywheel
            </h2>
            <p className="text-muted-foreground text-center max-w-lg mx-auto mb-14">
              Every element feeds the next. Courts power data. Data powers coaching. Coaching powers growth. Growth powers experiences.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-5 gap-4">
            {flywheelSteps.map((step, i) => (
              <ScrollReveal key={step.label} delay={i * 0.08}>
                <div className="glass rounded-xl p-5 text-center glass-hover relative group">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <step.icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-sm">{step.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{step.desc}</p>
                  {i < flywheelSteps.length - 1 && (
                    <ArrowRight size={14} className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 text-primary/40" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Audience entry */}
      <section className="py-16 lg:py-24 bg-card/20">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-center mb-12" style={{ textWrap: 'balance' }}>
              Your Role in the Kingdom
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-5">
            {audienceCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <Link to={card.link} className="block glass rounded-xl p-7 glass-hover group active:scale-[0.98] transition-transform h-full">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{card.desc}</p>
                  <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    {card.cta} <ArrowRight size={14} />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured coaches preview */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coaches.slice(0, 3).map((coach, i) => (
              <ScrollReveal key={coach.id} delay={i * 0.08}>
                <CoachCard coach={coach} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Court Kings CTA */}
      <ScrollReveal>
        <section className="py-16 lg:py-24 bg-card/20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <div className="text-sm text-primary font-medium mb-4">Court Kings × Courtana</div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4" style={{ textWrap: 'balance' }}>
              The Future of Facility Coaching
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We're building the coaching infrastructure layer for every racquet sport facility in America. Court Kings brings the courts, pros, and distribution. Courtana brings the AI, smart court tech, and player ecosystem.
            </p>
            <div className="flex justify-center gap-3">
              <Button size="lg" className="font-semibold active:scale-95 transition-transform">
                Partner With Us
              </Button>
              <Button size="lg" variant="outline" className="active:scale-95 transition-transform" asChild>
                <Link to="/dashboard">See Coach Economics</Link>
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
