import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardMetrics, coaches } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import CoachingCalculator from '@/components/CoachingCalculator';
import usePageTitle from '@/hooks/usePageTitle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, Clock, Users, TrendingUp, CheckCircle, BarChart3, Crown, Timer, ArrowRight, Zap, Video, MessageSquare, UserPlus, Play, BookOpen, AlertCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/hooks/use-toast';

const metricCards = [
  { label: 'Monthly Earnings', value: `$${dashboardMetrics.monthlyEarnings.toLocaleString()}`, icon: DollarSign, delta: '+23% vs last month', highlight: true },
  { label: 'Pending Reviews', value: dashboardMetrics.pendingReviews.toString(), icon: Clock, delta: '~$595 pending revenue', highlight: false, urgent: true },
  { label: 'Active Students', value: `${dashboardMetrics.activeStudents}/${dashboardMetrics.totalStudents}`, icon: Users, delta: '+4 this month', highlight: false },
  { label: 'Avg Review Time', value: dashboardMetrics.avgReviewTime, icon: Timer, delta: '-18s improvement', highlight: false },
  { label: 'Retention Rate', value: `${dashboardMetrics.studentRetention}%`, icon: TrendingUp, delta: '+2.1% this quarter', highlight: false },
  { label: 'Completed This Week', value: dashboardMetrics.completedThisWeek.toString(), icon: BarChart3, delta: null, highlight: false },
];

const recentReviews = [
  { student: 'Alex T.', type: 'Match Analysis', time: '3.8 min', earned: '$85', status: 'completed' },
  { student: 'Jordan M.', type: 'Drill Review', time: '2.1 min', earned: '$45', status: 'completed' },
  { student: 'Sam K.', type: 'Serve Breakdown', time: '4.5 min', earned: '$95', status: 'completed' },
  { student: 'Pat W.', type: 'Match Analysis', time: '—', earned: '$120', status: 'pending' },
  { student: 'Casey L.', type: 'Curriculum Check-in', time: '—', earned: '$65', status: 'pending' },
];

const recentActivity = [
  { icon: Video, text: 'Tyler R. submitted a new practice video', time: '4 min ago', color: 'text-primary' },
  { icon: CheckCircle, text: 'Maya O. completed Module 3 of her curriculum', time: '1 hr ago', color: 'text-primary' },
  { icon: Zap, text: 'AI Analysis ready for review: Sarah K.', time: '2 hrs ago', color: 'text-blue-400' },
  { icon: UserPlus, text: 'New rising star applied to your network', time: '3 hrs ago', color: 'text-[hsl(var(--gold))]' },
  { icon: DollarSign, text: 'Revenue share payout of $1,280 from Ben Johns processed', time: '6 hrs ago', color: 'text-primary' },
];

// Weekly earnings data (V4c)
const weeklyEarnings = [
  { day: 'Mon', amount: 280 },
  { day: 'Tue', amount: 420 },
  { day: 'Wed', amount: 350 },
  { day: 'Thu', amount: 510 },
  { day: 'Fri', amount: 180 },
  { day: 'Sat', amount: 54 },
  { day: 'Sun', amount: 0 },
];
const maxEarning = Math.max(...weeklyEarnings.map(d => d.amount));

export default function Dashboard() {
  const [showBanner, setShowBanner] = useState(true);
  usePageTitle('Coach Dashboard — Courtana Coaching');
  const navigate = useNavigate();
  const certifiedCoaches = coaches.filter((c) => c.tier === 'certified');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Demo banner (V5c) */}
        {showBanner && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-primary">🎯 Demo Mode</span> — You're viewing a sample coach dashboard. In production, this populates with real coaching data from Courtana-powered courts at your facility.
            </p>
            <button onClick={() => setShowBanner(false)} className="text-xs text-muted-foreground hover:text-foreground ml-4 shrink-0">✕ Dismiss</button>
          </div>
        )}
        <ScrollReveal>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl lg:text-5xl font-bold">Coach Dashboard</h1>
              <p className="text-muted-foreground mt-2 text-lg">Welcome back, Marcus. Here's your coaching snapshot.</p>
            </div>
            <div className="text-right hidden sm:block glass rounded-xl p-4 px-6">
              <div className="stat-number text-3xl text-primary">${dashboardMetrics.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Total Earnings</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Coaching Economics Calculator */}
        <ScrollReveal>
          <CoachingCalculator />
        </ScrollReveal>

        {/* Quick Actions */}
        <ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Review Next Video', icon: Play, color: 'text-primary', action: () => { navigate('/ai-hub'); toast({ title: 'Opening AI Hub', description: 'Navigate to review pending videos.' }); } },
              { label: 'Message Student', icon: MessageSquare, color: 'text-blue-400', action: () => toast({ title: 'Messages', description: 'Opening student messages...' }) },
              { label: 'Update Curriculum', icon: BookOpen, color: 'text-[hsl(var(--gold))]', action: () => navigate('/curriculum') },
              { label: 'Send Update', icon: Send, color: 'text-[hsl(var(--platinum))]', action: () => toast({ title: 'Update Sent', description: 'Weekly progress update sent to all 34 active students.' }) },
            ].map((action) => (
              <Button key={action.label} variant="outline" className="h-auto py-4 flex-col gap-2 border-border/30 hover:border-primary/20 active:scale-[0.97] transition-transform" onClick={action.action}>
                <action.icon size={18} className={action.color} />
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            ))}
          </div>
        </ScrollReveal>

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {metricCards.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.06}>
              <Card className={`glass border-border/30 ${m.highlight ? 'border-primary/20 glow-sm' : ''} ${(m as any).urgent ? 'border-[hsl(var(--gold))]/25' : ''}`}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground">{m.label}</CardTitle>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.highlight ? 'bg-primary/12' : (m as any).urgent ? 'bg-[hsl(var(--gold))]/12' : 'bg-secondary/40'}`}>
                    <m.icon size={14} className={m.highlight ? 'text-primary' : (m as any).urgent ? 'text-[hsl(var(--gold))]' : 'text-muted-foreground'} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`stat-number text-2xl ${m.highlight ? 'text-primary' : 'text-foreground'}`}>{m.value}</div>
                  {m.delta && <p className={`text-xs mt-1.5 ${(m as any).urgent ? 'text-[hsl(var(--gold))]' : 'text-primary/80'}`}>
                    {(m as any).urgent && <AlertCircle size={10} className="inline mr-1" />}
                    {m.delta}
                  </p>}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Earnings Chart (V4c) */}
            <ScrollReveal>
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-display text-xl font-bold">Weekly Earnings</h2>
                  <span className="text-xs text-muted-foreground">Platform Growth: +23% MoM</span>
                </div>
                <div className="flex items-end gap-3 h-32">
                  {weeklyEarnings.map((d, i) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground tabular-nums">${d.amount}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${Math.max((d.amount / maxEarning) * 100, 4)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className={`w-full rounded-t-md ${d.amount > 0 ? 'bg-primary/60' : 'bg-secondary/30'}`}
                      />
                      <span className="text-[10px] text-muted-foreground">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Review Next Video CTA */}
            <ScrollReveal>
              <div className="glass rounded-xl p-4 flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/12 flex items-center justify-center">
                    <Video size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">7 videos waiting for review</p>
                    <p className="text-xs text-muted-foreground">~$595 pending revenue · Est. 28 min total</p>
                  </div>
                </div>
                <Button size="sm" className="glow-sm active:scale-95 transition-transform gap-1" onClick={() => navigate('/ai-hub')}>
                  Review Now <ArrowRight size={12} />
                </Button>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal>
                <h2 className="font-display text-xl font-bold mb-5">Recent Reviews</h2>
              </ScrollReveal>
              <div className="space-y-2">
                {recentReviews.map((r, i) => (
                  <ScrollReveal key={i} delay={i * 0.06}>
                    <motion.div whileHover={{ scale: 1.01 }} className="glass rounded-xl p-4 flex items-center justify-between glass-hover cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-secondary/60 border border-border/30 flex items-center justify-center text-xs font-bold text-foreground">
                          {r.student.charAt(0)}{r.student.split(' ')[1]?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{r.student}</p>
                          <p className="text-xs text-muted-foreground">{r.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {r.time !== '—' && <span className="text-xs text-muted-foreground hidden sm:block">{r.time}</span>}
                        <span className="stat-number text-base text-foreground">{r.earned}</span>
                        <Badge variant="outline" className={`text-[10px] ${
                          r.status === 'completed' ? 'text-primary border-primary/25 bg-primary/8' : 'text-[hsl(var(--gold))] border-[hsl(var(--gold))]/25 bg-[hsl(var(--gold))]/8'
                        }`}>
                          {r.status === 'completed' ? <CheckCircle size={9} className="mr-0.5" /> : <Clock size={9} className="mr-0.5" />}
                          {r.status}
                        </Badge>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Recent Activity Feed */}
            <ScrollReveal delay={0.05}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display font-bold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, i) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-lg bg-secondary/40 flex items-center justify-center shrink-0 mt-0.5">
                          <ActivityIcon size={12} className={activity.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground leading-relaxed">{activity.text}</p>
                          <p className="text-[10px] text-muted-foreground/50 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>

            {/* Network Overview */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--gold))]/3 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown size={14} className="text-[hsl(var(--gold))]" />
                    <h3 className="font-display font-bold text-foreground">Network Revenue Chain</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">You are part of the <span className="text-[hsl(var(--gold))] font-semibold">Ben Johns</span> coaching network</p>

                  <div className="space-y-2 mb-4 p-3 rounded-lg bg-secondary/20 border border-border/15">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[hsl(var(--gold))] font-medium">Ben Johns (Celebrity)</span>
                      <span className="text-[hsl(var(--gold))] font-semibold">40% → $1,280/mo</span>
                    </div>
                    <div className="text-center text-muted-foreground/30 text-xs">↓</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-primary font-medium">You (Certified)</span>
                      <span className="text-primary font-semibold">45% → $1,440/mo</span>
                    </div>
                    <div className="text-center text-muted-foreground/30 text-xs">↓</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-medium">Platform</span>
                      <span className="text-muted-foreground font-semibold">15% → $480/mo</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {certifiedCoaches.map((c) => (
                      <div key={c.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{c.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm text-foreground font-medium">{c.name}</span>
                          <p className="text-[10px] text-muted-foreground">{c.studentsCoached} students</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Revenue Share bars */}
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-2xl p-5">
                <h3 className="font-display font-bold text-foreground mb-4">Revenue Share</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Your Cut', pct: '45%', amount: '$1,440', color: 'text-primary', bg: 'bg-primary' },
                    { label: 'Ben Johns (Pro)', pct: '40%', amount: '$1,280', color: 'text-[hsl(var(--gold))]', bg: 'bg-[hsl(var(--gold))]' },
                    { label: 'Platform', pct: '15%', amount: '$480', color: 'text-muted-foreground', bg: 'bg-muted-foreground' },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <div className="text-right flex items-center gap-2">
                          <span className={`stat-number text-lg ${item.color}`}>{item.pct}</span>
                          <span className="text-xs text-muted-foreground">{item.amount}/mo</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-secondary/40 overflow-hidden">
                        <div className={`h-full rounded-full ${item.bg}`} style={{ width: item.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
