import { aiAnalysisResult } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, Wifi, Send, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const gradeColors: Record<string, string> = {
  'A+': 'text-primary', 'A': 'text-primary', 'A-': 'text-primary',
  'B+': 'text-blue-400', 'B': 'text-blue-400', 'B-': 'text-blue-400',
  'C+': 'text-amber-400', 'C': 'text-amber-400',
};

export default function AIHub() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">AI Coaching Hub</h1>
          <p className="text-muted-foreground mb-10 max-w-lg">
            Upload a video or connect your Courtana session. Our AI breaks down every shot — then a pro adds the human touch.
          </p>
        </ScrollReveal>

        {/* Upload area */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-8 mb-10 text-center border-dashed border-2 border-border/60 hover:border-primary/30 transition-colors cursor-pointer">
            <Upload size={36} className="mx-auto text-muted-foreground mb-3" />
            <h3 className="font-display font-semibold text-foreground mb-1">Upload Match Video</h3>
            <p className="text-sm text-muted-foreground mb-4">Drag & drop or click to upload. MP4, MOV up to 500MB.</p>
            <div className="flex justify-center gap-3">
              <Button className="active:scale-95 transition-transform">
                <Upload size={14} /> Upload Video
              </Button>
              <Button variant="outline" className="active:scale-95 transition-transform">
                <Wifi size={14} /> Connect Courtana Session
              </Button>
            </div>
          </div>
        </ScrollReveal>

        {/* Analysis results (mock) */}
        <ScrollReveal>
          <div className="flex items-center gap-2 mb-6">
            <h2 className="font-display text-2xl font-bold">Analysis Results</h2>
            <Badge className="bg-primary/15 text-primary border-primary/30">AI Generated</Badge>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Shot breakdown */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="glass rounded-xl p-6 mb-5">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <span className={`font-display text-2xl font-bold ${gradeColors[aiAnalysisResult.overallGrade]}`}>
                      {aiAnalysisResult.overallGrade}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">Overall Grade</h3>
                    <p className="text-xs text-muted-foreground">Based on 6 skill categories across 47 rallies analyzed</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {aiAnalysisResult.shotBreakdown.map((shot) => (
                    <div key={shot.shot}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground">{shot.shot}</span>
                        <span className={`font-display font-semibold text-sm ${gradeColors[shot.grade]}`}>{shot.grade}</span>
                      </div>
                      <Progress value={shot.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Strengths & Weaknesses */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.05}>
                <div className="glass rounded-xl p-5">
                  <h4 className="flex items-center gap-1.5 font-semibold text-sm text-primary mb-3"><CheckCircle size={14} /> Strengths</h4>
                  <ul className="space-y-2">
                    {aiAnalysisResult.strengths.map((s) => (
                      <li key={s} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">•</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <div className="glass rounded-xl p-5">
                  <h4 className="flex items-center gap-1.5 font-semibold text-sm text-amber-400 mb-3"><AlertTriangle size={14} /> Areas to Improve</h4>
                  <ul className="space-y-2">
                    {aiAnalysisResult.weaknesses.map((w) => (
                      <li key={w} className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span> {w}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-xl p-5">
                <h4 className="flex items-center gap-1.5 font-semibold text-sm text-foreground mb-3"><Lightbulb size={14} /> Recommended Drills</h4>
                <ul className="space-y-2">
                  {aiAnalysisResult.drills.map((d) => (
                    <li key={d} className="text-xs text-muted-foreground p-2.5 rounded-lg bg-secondary/30">{d}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass rounded-xl p-5 glow-sm">
                <h4 className="font-display font-semibold text-foreground mb-2">Request Pro Review</h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Send this analysis to a coach for personalized feedback. They'll annotate the AI results with expert insight.
                </p>
                <Button className="w-full active:scale-95 transition-transform" size="sm">
                  <Send size={14} /> Send to Coach — from $35
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
