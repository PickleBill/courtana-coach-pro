import { aiAnalysisResult } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import usePageTitle from '@/hooks/usePageTitle';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Wifi, Send, CheckCircle, AlertTriangle, Lightbulb, Brain, ArrowRight, User, Zap, Play, ExternalLink, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const gradeColors: Record<string, string> = {
  'A+': 'text-primary', 'A': 'text-primary', 'A-': 'text-primary',
  'B+': 'text-blue-400', 'B': 'text-blue-400', 'B-': 'text-blue-400',
  'C+': 'text-[hsl(var(--gold))]', 'C': 'text-[hsl(var(--gold))]',
};

const gradeBg: Record<string, string> = {
  'A+': 'bg-primary/12', 'A': 'bg-primary/12', 'A-': 'bg-primary/12',
  'B+': 'bg-blue-400/12', 'B': 'bg-blue-400/12', 'B-': 'bg-blue-400/12',
  'C+': 'bg-[hsl(var(--gold))]/12', 'C': 'bg-[hsl(var(--gold))]/12',
};

const recentSessions = [
  { date: 'Mar 21, 2026', grade: 'B+', rallies: 47, label: 'Doubles Match — Austin, TX' },
  { date: 'Mar 18, 2026', grade: 'B', rallies: 38, label: 'Singles Practice — Nashville, TN' },
  { date: 'Mar 14, 2026', grade: 'A-', rallies: 52, label: 'Tournament Warmup — San Diego, CA' },
  { date: 'Mar 10, 2026', grade: 'B-', rallies: 31, label: 'Kitchen Drills — Black Barn, OH' },
];

export default function AIHub() {
  usePageTitle('AI Analysis Hub — Courtana Coaching');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">AI Coaching Hub</h1>
          <p className="text-muted-foreground mb-10 max-w-lg text-lg">
            Upload a video or connect your Courtana session. Our AI breaks down every shot — then a pro adds the human touch.
          </p>
        </ScrollReveal>

        {/* Upload area */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-10 mb-12 text-center border-dashed border-2 border-border/40 hover:border-primary/25 transition-all cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-4">
                <Upload size={28} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">Upload Match Video</h3>
              <p className="text-sm text-muted-foreground mb-6">Drag & drop or click to upload. MP4, MOV up to 500MB.</p>
              <div className="flex justify-center gap-3">
                <Button className="active:scale-95 transition-transform glow-sm gap-1.5 px-6">
                  <Upload size={14} /> Upload Video
                </Button>
                <Button variant="outline" className="active:scale-95 transition-transform gap-1.5 px-6 border-border/50 hover:border-primary/20">
                  <Wifi size={14} /> Connect Courtana Session
                </Button>
              </div>
              <a href="https://courtana.com/ai-analysis/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary/70 hover:text-primary mt-4 transition-colors">
                Try AI Analysis on Courtana <ExternalLink size={10} />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Mock completed analysis */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-6">
            <Brain size={20} className="text-primary" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold">Analysis Complete</h2>
            <Badge className="bg-primary/12 text-primary border-primary/25 text-xs gap-1">
              <Zap size={10} /> AI Generated
            </Badge>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Video thumbnail + shot markers */}
            <ScrollReveal>
              <div className="glass rounded-2xl overflow-hidden relative group cursor-pointer">
                <div className="h-64 bg-gradient-to-br from-secondary/60 via-primary/5 to-secondary/40 relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_hsla(145,100%,45%,0.06),transparent_50%)]" />
                  {/* Heat zones */}
                  <div className="absolute left-[10%] top-[20%] w-[25%] h-[30%] rounded-lg bg-primary/8 border border-primary/15" />
                  <div className="absolute left-[40%] top-[40%] w-[20%] h-[35%] rounded-lg bg-[hsl(var(--gold))]/8 border border-[hsl(var(--gold))]/15" />
                  <div className="absolute right-[10%] top-[15%] w-[20%] h-[25%] rounded-lg bg-blue-400/8 border border-blue-400/15" />
                  {/* Shot markers */}
                  {[
                    { x: '20%', y: '35%', label: 'Serve A-', color: 'text-primary' },
                    { x: '55%', y: '55%', label: 'Drop B+', color: 'text-blue-400' },
                    { x: '75%', y: '30%', label: 'Volley B-', color: 'text-blue-400' },
                    { x: '40%', y: '70%', label: 'Kitchen A', color: 'text-primary' },
                    { x: '65%', y: '65%', label: 'Lob C+', color: 'text-[hsl(var(--gold))]' },
                  ].map((marker, i) => (
                    <motion.div key={i} initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 400 }} className="absolute" style={{ left: marker.x, top: marker.y }}>
                      <div className={`px-2 py-0.5 rounded-md bg-card/80 border border-border/30 text-[10px] font-semibold ${marker.color} backdrop-blur-sm`}>
                        {marker.label}
                      </div>
                    </motion.div>
                  ))}
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                    <Play size={24} className="text-primary-foreground ml-1" />
                  </div>
                  <Badge variant="outline" className="absolute top-4 left-4 bg-card/80 text-foreground border-border/30 text-[10px] backdrop-blur-sm">
                    Match Replay · 23:47 min
                  </Badge>
                  <Badge variant="outline" className="absolute top-4 right-4 bg-primary/10 text-primary border-primary/20 text-[10px]">
                    47 rallies analyzed
                  </Badge>
                </div>
              </div>
            </ScrollReveal>

            {/* Shot grades grid */}
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {aiAnalysisResult.shotBreakdown.map((shot, i) => (
                  <motion.div key={shot.shot} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-4 text-center glass-hover">
                    <div className={`stat-number text-2xl ${gradeColors[shot.grade]}`}>{shot.grade}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 font-medium">{shot.shot}</div>
                    <div className="text-[10px] text-muted-foreground/60 mt-0.5">{shot.score}/100</div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Strengths & Weaknesses */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.05}>
                <div className="glass rounded-xl p-5 h-full border-primary/10">
                  <h4 className="flex items-center gap-1.5 font-display font-semibold text-sm text-primary mb-3"><CheckCircle size={14} /> Strengths</h4>
                  <ul className="space-y-2.5">
                    {['Kitchen control is exceptional — top 20% percentile', 'Serve placement accuracy above average', 'Court positioning IQ in top 20% of analyzed players'].map((s) => (
                      <li key={s} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="glass rounded-xl p-5 h-full border-[hsl(var(--gold))]/10">
                  <h4 className="flex items-center gap-1.5 font-display font-semibold text-sm text-[hsl(var(--gold))] mb-3"><AlertTriangle size={14} /> Areas to Improve</h4>
                  <ul className="space-y-2.5">
                    {['Third shot drop consistency needs work — 62% success rate', 'Backhand return tends to float on 40% of attempts', 'Transition zone movement can be faster — split step timing late'].map((w) => (
                      <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Pro Review Received */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-6 border-primary/10 relative overflow-hidden">
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
                      <p className="text-xs text-muted-foreground leading-relaxed">The AI is spot on — that third shot drop inconsistency is because you're dropping your paddle head too early. Try this drill: stand at the transition zone, partner feeds, focus on keeping the paddle face open until contact. I've added a footwork module to your curriculum.</p>
                    </div>
                  </div>
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
                    <span className="text-foreground font-medium">$75 one-time</span> or <span className="text-primary font-medium">Free with Gold subscription</span>
                  </p>
                  <Button className="w-full active:scale-95 transition-transform glow-sm font-semibold gap-1.5 h-11">
                    <Send size={14} /> Send to Coach
                  </Button>
                  <p className="text-[10px] text-muted-foreground/60 text-center mt-3">Avg response time: 2.4 hours · 94% satisfaction</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Recent Sessions */}
            <ScrollReveal delay={0.12}>
              <div className="glass rounded-2xl p-5">
                <h4 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-1.5"><Clock size={13} /> Recent Analyses</h4>
                <div className="space-y-2.5">
                  {recentSessions.map((s, i) => (
                    <div key={i} className="p-3 rounded-lg bg-secondary/20 border border-border/15 hover:border-primary/15 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`stat-number text-lg ${gradeColors[s.grade]}`}>{s.grade}</span>
                        <span className="text-[10px] text-muted-foreground">{s.date}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground/50">{s.rallies} rallies</p>
                    </div>
                  ))}
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
    </div>
  );
}
