import { aiAnalysisResult } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Wifi, Send, CheckCircle, AlertTriangle, Lightbulb, Brain, ArrowRight, User, Zap } from 'lucide-react';
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

export default function AIHub() {
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
            </div>
          </div>
        </ScrollReveal>

        {/* Analysis results */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <Brain size={20} className="text-primary" />
            <h2 className="font-display text-2xl lg:text-3xl font-bold">Analysis Results</h2>
            <Badge className="bg-primary/12 text-primary border-primary/25 text-xs gap-1">
              <Zap size={10} /> AI Generated
            </Badge>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shot breakdown */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="glass rounded-2xl p-6 mb-5">
                {/* Overall grade - prominent */}
                <div className="flex items-center gap-5 mb-8 p-4 rounded-xl bg-secondary/30 border border-border/20">
                  <div className={`w-20 h-20 rounded-2xl ${gradeBg[aiAnalysisResult.overallGrade]} border border-primary/15 flex items-center justify-center`}>
                    <span className={`font-display text-3xl font-bold ${gradeColors[aiAnalysisResult.overallGrade]}`}>
                      {aiAnalysisResult.overallGrade}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">Overall Grade</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">Based on 6 skill categories across 47 rallies analyzed</p>
                    <p className="text-xs text-primary mt-1">12 sessions analyzed today</p>
                  </div>
                </div>

                {/* Individual shots */}
                <div className="space-y-4">
                  {aiAnalysisResult.shotBreakdown.map((shot) => (
                    <div key={shot.shot}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-foreground font-medium">{shot.shot}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{shot.score}/100</span>
                          <span className={`font-display font-bold text-sm w-8 text-right ${gradeColors[shot.grade]}`}>{shot.grade}</span>
                        </div>
                      </div>
                      <div className="h-2.5 rounded-full bg-secondary/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${shot.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className={`h-full rounded-full ${shot.score >= 85 ? 'bg-primary' : shot.score >= 70 ? 'bg-blue-400' : 'bg-[hsl(var(--gold))]'}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Strengths & Weaknesses side-by-side */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.05}>
                <div className="glass rounded-xl p-5 h-full border-primary/10">
                  <h4 className="flex items-center gap-1.5 font-display font-semibold text-sm text-primary mb-3"><CheckCircle size={14} /> Strengths</h4>
                  <ul className="space-y-2.5">
                    {aiAnalysisResult.strengths.map((s) => (
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
                    {aiAnalysisResult.weaknesses.map((w) => (
                      <li key={w} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--gold))] mt-1.5 shrink-0" /> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>

            {/* Human + AI combo section */}
            <ScrollReveal delay={0.15}>
              <div className="mt-6 glass rounded-2xl p-6 border-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">AI + Human</Badge>
                    <span className="text-xs text-muted-foreground">Coach feedback layered on AI analysis</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-secondary/20 border border-border/20">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Brain size={12} className="text-primary" />
                        <span className="text-xs font-semibold text-primary">AI Analysis</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Your overhead timing is late on 62% of shots. Recommend split-step timing drill to get into position earlier.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-1.5 mb-2">
                        <User size={12} className="text-primary" />
                        <span className="text-xs font-semibold text-foreground">Coach Marcus</span>
                      </div>
                      <p className="text-xs text-muted-foreground">The AI is spot on. I'd also add: watch your left foot — you're stepping too wide which kills your recovery. Try the wall drill with a 2-step limit.</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <ScrollReveal delay={0.1}>
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

            {/* Request Pro Review — THE KEY CTA */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-6 glow relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                      <Send size={14} className="text-primary" />
                    </div>
                    <h4 className="font-display font-bold text-foreground">Request Pro Review</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    AI analyzed your session → Want expert eyes?
                  </p>
                  <p className="text-xs text-muted-foreground mb-5">
                    Send to a coach for personalized feedback. They'll annotate the AI results with expert insight.
                  </p>
                  <Button className="w-full active:scale-95 transition-transform glow-sm font-semibold gap-1.5 h-11">
                    <Send size={14} /> Send to Coach — from $35
                  </Button>
                  <p className="text-[10px] text-muted-foreground/60 text-center mt-3">
                    Avg response time: 2.4 hours · 94% satisfaction
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
