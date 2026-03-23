import { dashboardMetrics, coaches } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, Users, TrendingUp, CheckCircle, BarChart3, Crown, Timer, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const metricCards = [
  { label: 'Monthly Earnings', value: `$${dashboardMetrics.monthlyEarnings.toLocaleString()}`, icon: DollarSign, delta: '+23% vs last month', highlight: true },
  { label: 'Pending Reviews', value: dashboardMetrics.pendingReviews.toString(), icon: Clock, delta: '~$595 pending revenue', highlight: false },
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

export default function Dashboard() {
  const certifiedCoaches = coaches.filter((c) => c.tier === 'certified');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-start justify-between flex-wrap gap-4 mb-10">
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

        {/* Time leverage highlight */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-6 mb-8 relative overflow-hidden glow-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/4 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/12 border border-primary/15 flex items-center justify-center">
                  <Zap size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground text-lg">Time Leverage This Week</h3>
                  <p className="text-sm text-muted-foreground">You reviewed <span className="text-primary font-semibold">{dashboardMetrics.completedThisWeek} sessions</span>, earning <span className="text-primary font-semibold">${(dashboardMetrics.completedThisWeek * 78).toLocaleString()}</span> in <span className="text-primary font-semibold">~1.6 hours</span></p>
                </div>
              </div>
              <div className="text-right">
                <div className="stat-number text-2xl text-primary">$1,122/hr</div>
                <div className="text-xs text-muted-foreground">effective rate</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {metricCards.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.06}>
              <Card className={`glass border-border/30 ${m.highlight ? 'border-primary/20 glow-sm' : ''}`}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground">{m.label}</CardTitle>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.highlight ? 'bg-primary/12' : 'bg-secondary/40'}`}>
                    <m.icon size={14} className={m.highlight ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`stat-number text-2xl ${m.highlight ? 'text-primary' : 'text-foreground'}`}>{m.value}</div>
                  {m.delta && <p className="text-xs text-primary/80 mt-1.5">{m.delta}</p>}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent reviews */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="font-display text-xl font-bold mb-5">Recent Reviews</h2>
            </ScrollReveal>
            <div className="space-y-2">
              {recentReviews.map((r, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="glass rounded-xl p-4 flex items-center justify-between glass-hover cursor-pointer"
                  >
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
                        r.status === 'completed'
                          ? 'text-primary border-primary/25 bg-primary/8'
                          : 'text-[hsl(var(--gold))] border-[hsl(var(--gold))]/25 bg-[hsl(var(--gold))]/8'
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

          {/* Network sidebar */}
          <div className="space-y-5">
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--gold))]/3 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown size={14} className="text-[hsl(var(--gold))]" />
                    <h3 className="font-display font-bold text-foreground">Your Network</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">You are part of the <span className="text-[hsl(var(--gold))] font-semibold">Ben Johns</span> coaching network</p>
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
