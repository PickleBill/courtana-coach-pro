import { useState } from 'react';
import { aiAnalysisResult } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import ScrollReveal from '@/components/ScrollReveal';
import VideoUploadModal from '@/components/VideoUploadModal';
import BookingModal from '@/components/BookingModal';
import usePageTitle from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Wifi, Send, CheckCircle, AlertTriangle, Lightbulb, Brain, User, Zap, Play, ExternalLink, Clock, ShieldCheck, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { coaches } from '@/data/mockData';

const gradeColors: Record<string, string> = {
  'A+': 'text-primary', 'A': 'text-primary', 'A-': 'text-primary',
  'B+': 'text-blue-400', 'B': 'text-blue-400', 'B-': 'text-blue-400',
  'C+': 'text-[hsl(var(--gold))]', 'C': 'text-[hsl(var(--gold))]',
};

const recentSessions = [
  { date: 'Mar 21, 2026', grade: 'B+', rallies: 47, label: 'Doubles Match — Austin, TX' },
  { date: 'Mar 18, 2026', grade: 'B', rallies: 38, label: 'Singles Practice — Nashville, TN' },
  { date: 'Mar 14, 2026', grade: 'A-', rallies: 52, label: 'Tournament Warmup — San Diego, CA' },
  { date: 'Mar 10, 2026', grade: 'B-', rallies: 31, label: 'Kitchen Drills — Black Barn, OH' },
];

const sparklineData: Record<string, number[]> = {
  'Third Shot Drop': [72, 78, 80, 84, 87],
  'Dinking': [75, 77, 79, 81, 82],
  'Serve': [70, 73, 76, 75, 78],
  'Return of Serve': [85, 87, 88, 90, 91],
  'Volley': [68, 70, 71, 73, 74],
  'Overhead': [60, 63, 65, 66, 68],
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const min = Math.min(...data) - 5;
  const max = Math.max(...data) + 5;
  const h = 24;
  const w = 48;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min)) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={color} />
    </svg>
  );
}

export default function AIHub() {
  usePageTitle('AI Analysis Hub — Courtana Coaching');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('strengths');

  const selectedCoach = coaches.find(c => c.name.includes('Marcus')) || coaches[2];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs gap-1 badge-glow">
                  <Sparkles size={10} /> CourtSense™ Shot Analysis
                </Badge>
                <Badge variant="outline" className="bg-blue-400/10 text-blue-400 border-blue-400/20 text-[10px] gap-1 animate-pulse">
                  <Zap size={8} /> Analyzing
                </Badge>
              </div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">AI Coaching Hub</h1>
              <p className="text-muted-foreground max-w-lg text-lg">
                Upload a video or connect your Courtana session. Our AI breaks down every shot — then a pro adds the human touch.
              </p>
            </div>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-sm px-4 py-2 badge-glow gap-1.5">
              <ShieldCheck size={14} /> AI Confidence: 94.2%
            </Badge>
          </div>
          <div className="flex flex-wrap gap-4 mb-10 text-xs text-muted-foreground">
            {[
              { label: 'Frames Processed', value: '14,847' },
              { label: 'Shot Events Detected', value: '312' },
              { label: 'Player Tracking Points', value: '89,201' },
              { label: 'Model Version', value: 'CourtSense v3.2' },
            ].map((d) => (
              <span key={d.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/20 border border-border/15">
                <span className="text-foreground font-medium">{d.value}</span> {d.label}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">

            {/* 1. Analyze Your Own Session — HERO position */}
            <ScrollReveal>
              <div className="glass rounded-2xl overflow-hidden relative group cursor-pointer border-primary/15 glow-pulse" onClick={() => setUploadOpen(true)}>
                <div className="h-56 bg-gradient-to-br from-primary/8 via-secondary/40 to-blue-500/5 relative flex items-center justify-center overflow-hidden">
                  {/* Futuristic court background */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,_hsla(145,100%,45%,0.08),transparent_60%)]" />
                  <svg className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] opacity-15" viewBox="0 0 400 200" fill="none">
                    <rect x="20" y="10" width="360" height="180" rx="4" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="200" y1="10" x2="200" y2="190" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
                    <line x1="130" y1="10" x2="130" y2="190" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="3 3" />
                    <line x1="270" y1="10" x2="270" y2="190" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="3 3" />
                  </svg>
                  {/* Floating analysis badges */}
                  {[
                    { x: '15%', y: '25%', label: 'Serve: A-', color: 'text-primary' },
                    { x: '70%', y: '40%', label: 'Drop: B+', color: 'text-blue-400' },
                    { x: '45%', y: '70%', label: 'Kitchen: A', color: 'text-primary' },
                  ].map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 0.7, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.2, type: 'spring' }}
                      className="absolute"
                      style={{ left: m.x, top: m.y }}
                    >
                      <div className={`px-2 py-0.5 rounded-md bg-card/60 border border-border/20 text-[9px] font-semibold ${m.color} backdrop-blur-sm`}>{m.label}</div>
                    </motion.div>
                  ))}
                  <div className="text-center relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl bg-primary/90 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow"
                    >
                      <Upload size={24} className="text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">Analyze Your Session</h3>
                    <p className="text-sm text-muted-foreground">Drop a video or connect your Courtana session</p>
                  </div>
                </div>
                <div className="p-4 bg-card/80 border-t border-border/20 flex flex-wrap items-center justify-center gap-3">
                  <Button size="sm" className="active:scale-95 transition-transform glow-sm gap-1.5" onClick={(e) => { e.stopPropagation(); setUploadOpen(true); }}>
                    <Upload size={12} /> Upload Video
                  </Button>
                  <Button size="sm" variant="outline" className="active:scale-95 transition-transform gap-1.5 border-border/40" onClick={(e) => { e.stopPropagation(); window.open('https://courtana.com/facility/3/courts/qgvE48pkCVOp/play-highlights/', '_blank'); }}>
                    <Wifi size={12} /> Connect Courtana
                  </Button>
                  <a href="https://courtana.com/highlight/td7vCCWTXosp" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                    See Sample Analysis <ExternalLink size={9} />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Shot grades grid */}
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <Brain size={18} className="text-primary" />
                <h2 className="font-display text-xl font-bold">Shot Breakdown</h2>
                <Badge className="bg-primary/12 text-primary border-primary/25 text-xs gap-1">
                  <Zap size={10} /> AI Generated
                </Badge>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {aiAnalysisResult.shotBreakdown.map((shot, i) => (
                  <motion.div key={shot.shot} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="glass rounded-xl p-4 text-center glass-hover group cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className={`stat-number text-2xl ${gradeColors[shot.grade]}`}>{shot.grade}</div>
                      <div className="text-[11px] text-muted-foreground mt-1 font-medium">{shot.shot}</div>
                      <div className="text-[10px] text-muted-foreground/60 mt-0.5">{shot.score}/100</div>
                      <div className="flex justify-center mt-2">
                        <Sparkline data={sparklineData[shot.shot] || [50, 55, 60, 65, 70]} color={gradeColors[shot.grade]} />
                      </div>
                      <div className="text-[9px] text-primary/60 mt-0.5">5-session trend ↑</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* 3. Strengths & Weaknesses — combined with toggle */}
            <ScrollReveal>
              <div className="glass rounded-2xl overflow-hidden">
                <div className="flex border-b border-border/20">
                  {[
                    { id: 'strengths', label: 'Strengths', icon: CheckCircle, color: 'text-primary' },
                    { id: 'improve', label: 'Areas to Improve', icon: AlertTriangle, color: 'text-[hsl(var(--gold))]' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setExpandedSection(expandedSection === tab.id ? null : tab.id)}
                      className={`flex-1 p-4 flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                        expandedSection === tab.id ? 'bg-secondary/20 text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <tab.icon size={14} className={expandedSection === tab.id ? tab.color : ''} />
                      {tab.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  {expandedSection === 'strengths' && (
                    <motion.div key="strengths" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-5">
                      <ul className="space-y-2.5">
                        {['Kitchen control is exceptional — top 20% percentile', 'Serve placement accuracy above average', 'Court positioning IQ in top 20% of analyzed players'].map((s) => (
                          <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {s}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                  {expandedSection === 'improve' && (
                    <motion.div key="improve" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="p-5">
                      <ul className="space-y-2.5">
                        {['Third shot drop consistency needs work — 62% success rate', 'Backhand return tends to float on 40% of attempts', 'Transition zone movement can be faster — split step timing late'].map((w) => (
                          <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> {w}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/15">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-foreground">Export Session Report</p>
                            <p className="text-[10px] text-muted-foreground">Underground 50 data — analyzed and packaged.</p>
                          </div>
                          <Button size="sm" variant="outline" className="text-xs border-primary/20 text-primary hover:bg-primary/10 gap-1 active:scale-95 transition-transform" onClick={() => toast({ title: '📄 Report export coming soon', description: 'Request early access at partnerships@courtana.com' })}>
                            <ExternalLink size={11} /> Export PDF
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>

            {/* 4. AI + Human comparison */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-6 border-primary/10 relative overflow-hidden animated-gradient-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">AI + Human</Badge>
                    <Badge variant="outline" className="bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/20 text-[10px]">
                      <CheckCircle size={8} className="mr-0.5" /> Pro Review Received
                    </Badge>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/20 border border-border/20">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Brain size={12} className="text-primary" />
                        <span className="text-xs font-semibold text-primary">AI Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">Your overhead timing is late on 62% of shots. Recommend split-step timing drill to get into position earlier. Paddle angle averaging 54° — aim for 38-42° for optimal drop placement.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-1.5 mb-2">
                        <User size={12} className="text-primary" />
                        <span className="text-xs font-semibold text-foreground">Coach Marcus</span>
                        <span className="text-[10px] text-muted-foreground/50">2h ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">The AI is spot on — that third shot drop inconsistency is because you're dropping your paddle head too early. Try this drill: stand at the transition zone, partner feeds, focus on keeping the paddle face open until contact.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Ask the Coaches */}
            <ScrollReveal delay={0.12}>
              <div>
                <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" /> Ask the Coaches
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'Anna Leigh Waters', avatar: 'ALW', accent: 'text-primary', border: 'border-primary/20', bg: 'bg-primary/8', sport: 'Pickleball', tagline: 'Net play, speed-ups, and competitive doubles strategy.' },
                    { name: 'Carlos Alcaraz', avatar: 'CA', accent: 'text-blue-400', border: 'border-blue-400/20', bg: 'bg-blue-400/8', sport: 'Tennis', tagline: 'Groundstrokes, footwork, and match-level intensity.' },
                    { name: 'Bryant', avatar: 'BP', accent: 'text-[hsl(var(--gold))]', border: 'border-[hsl(var(--gold))]/20', bg: 'bg-[hsl(var(--gold))]/8', sport: 'Padel', tagline: 'Wall play, bandeja, and padel-specific positioning.' },
                    { name: 'Chuck Norris', avatar: 'CN', accent: 'text-red-400', border: 'border-red-400/20', bg: 'bg-red-400/8', sport: 'Wildcard', tagline: 'Ask Chuck anything. You might get a roundhouse kick.' },
                  ].map((coach) => (
                    <motion.div
                      key={coach.name}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className={`glass rounded-xl p-4 text-center glass-hover cursor-pointer ${coach.border}`}
                      onClick={() => toast({ title: `${coach.name} is analyzing your session...`, description: 'Open the chat to continue the conversation.' })}
                    >
                      <div className={`w-12 h-12 rounded-full ${coach.bg} border ${coach.border} flex items-center justify-center font-display font-bold text-sm ${coach.accent} mx-auto mb-2`}>
                        {coach.avatar}
                      </div>
                      <p className="font-display font-semibold text-foreground text-sm">{coach.name}</p>
                      <Badge variant="outline" className="text-[9px] mt-1 mb-2">{coach.sport}</Badge>
                      <p className="text-[10px] text-muted-foreground leading-relaxed">{coach.tagline}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center">Ask one coach or crowdsource all four. AI synthesizes responses from every perspective.</p>
              </div>
            </ScrollReveal>

            {/* 6. Share + Export buttons */}
            <ScrollReveal delay={0.15}>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 gap-1.5 text-xs border-primary/20 text-primary hover:bg-primary/10 active:scale-95 transition-transform" onClick={() => setUploadOpen(true)}>
                  <Send size={12} /> Share with Coach
                </Button>
                <Button variant="outline" className="flex-1 gap-1.5 text-xs border-border/30 hover:border-primary/20 active:scale-95 transition-transform" onClick={() => toast({ title: '📄 Report export coming soon', description: 'Request early access at partnerships@courtana.com' })}>
                  <ExternalLink size={12} /> Export Report
                </Button>
              </div>
            </ScrollReveal>

            {/* 7. CourtSense Data Layer */}
            <ScrollReveal delay={0.18}>
              <div className="glass rounded-xl p-5 border-blue-400/15 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/3 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <Badge variant="outline" className="bg-blue-400/10 text-blue-400 border-blue-400/20 text-[10px] mb-3">
                    <Brain size={8} className="mr-0.5" /> CourtSense™ Data Layer
                  </Badge>
                  <h4 className="font-display font-bold text-foreground text-sm mb-1">Every Session Generates Facility Intelligence</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">Court utilization, peak hours, player engagement, coaching revenue per court — all captured automatically.</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { val: '87%', label: 'Court Utilization' },
                      { val: '$340', label: 'Revenue/Court/Mo' },
                      { val: '2.4x', label: 'Player Retention' },
                    ].map(s => (
                      <div key={s.label} className="text-center p-2 rounded-lg bg-secondary/20">
                        <div className="stat-number text-lg text-blue-400">{s.val}</div>
                        <div className="text-[9px] text-muted-foreground">{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] text-primary mt-3 font-medium">Alpha data from The Underground · 50 sessions analyzed</p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Request Pro Review CTA */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-6 glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Send size={14} className="text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-foreground">Request Pro Review</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Get expert eyes on this analysis</p>
                  <p className="text-xs text-muted-foreground mb-5">
                    <span className="text-foreground font-medium">$75 one-time</span> or <span className="text-primary font-medium">Free with Gold</span>
                  </p>
                  <Button className="w-full active:scale-95 transition-transform glow-sm font-semibold gap-1.5 h-11" onClick={() => setBookingOpen(true)}>
                    <Send size={14} /> Send to Coach
                  </Button>
                  <p className="text-[10px] text-muted-foreground/60 text-center mt-3">Avg response time: 2.4 hours · 94% satisfaction</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Recent Sessions with Courtana links */}
            <ScrollReveal delay={0.12}>
              <div className="glass rounded-2xl p-5">
                <h4 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-1.5"><Clock size={13} /> Recent Analyses</h4>
                <div className="space-y-2.5">
                  {recentSessions.slice(0, 2).map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/20 border border-border/15 hover:border-primary/15 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`stat-number text-lg ${gradeColors[s.grade]}`}>{s.grade}</span>
                        <span className="text-[10px] text-muted-foreground">{s.date}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground/50">{s.rallies} rallies</p>
                    </div>
                  ))}
                  {/* Real Courtana highlight links */}
                  <a href="https://courtana.com/highlight/td7vCCWTXosp" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-primary/5 border border-primary/15 hover:border-primary/25 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-medium text-primary">Live on Courtana</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Serve Analysis Highlight</p>
                  </a>
                  <a href="https://courtana.com/highlight-group/wFaqzjLm0Ghg" target="_blank" rel="noopener noreferrer" className="block p-3 rounded-lg bg-primary/5 border border-primary/15 hover:border-primary/25 transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs font-medium text-primary">Live on Courtana</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">Full Match Highlight Group</p>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Drills */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-5">
                <h4 className="flex items-center gap-1.5 font-display font-semibold text-sm text-foreground mb-4"><Lightbulb size={14} className="text-[hsl(var(--gold))]" /> Recommended Drills</h4>
                <ul className="space-y-2">
                  {aiAnalysisResult.drills.map((d, i) => (
                    <li key={d} className="text-xs text-muted-foreground p-3 rounded-lg bg-secondary/30 border border-border/20 hover:border-primary/15 transition-colors cursor-pointer flex items-start gap-2">
                      <span className="stat-number text-primary text-sm">{i + 1}</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <VideoUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} coach={selectedCoach} />
    </div>
  );
}
