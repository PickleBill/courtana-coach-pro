import { dashboardMetrics, coaches } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Clock, Users, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';

const metricCards = [
  { label: 'Monthly Earnings', value: `$${dashboardMetrics.monthlyEarnings.toLocaleString()}`, icon: DollarSign, delta: '+23%' },
  { label: 'Pending Reviews', value: dashboardMetrics.pendingReviews.toString(), icon: Clock, delta: null },
  { label: 'Active Students', value: `${dashboardMetrics.activeStudents}/${dashboardMetrics.totalStudents}`, icon: Users, delta: '+4 this month' },
  { label: 'Avg Review Time', value: dashboardMetrics.avgReviewTime, icon: CheckCircle, delta: '-18s this week' },
  { label: 'Retention Rate', value: `${dashboardMetrics.studentRetention}%`, icon: TrendingUp, delta: '+2.1%' },
  { label: 'Completed This Week', value: dashboardMetrics.completedThisWeek.toString(), icon: BarChart3, delta: null },
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl lg:text-4xl font-bold">Coach Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, Marcus. Here's your coaching snapshot.</p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="font-display text-2xl font-bold text-foreground">${dashboardMetrics.totalEarnings.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Earnings</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {metricCards.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.05}>
              <Card className="glass border-border/40">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-xs font-medium text-muted-foreground">{m.label}</CardTitle>
                  <m.icon size={14} className="text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="font-display text-xl font-bold text-foreground">{m.value}</div>
                  {m.delta && <p className="text-xs text-primary mt-1">{m.delta}</p>}
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent reviews */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <h2 className="font-display text-xl font-bold mb-4">Recent Reviews</h2>
            </ScrollReveal>
            <div className="space-y-2">
              {recentReviews.map((r, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <div className="glass rounded-lg p-4 flex items-center justify-between glass-hover">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-xs font-semibold text-secondary-foreground">
                        {r.student.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.student}</p>
                        <p className="text-xs text-muted-foreground">{r.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {r.time !== '—' && <span className="text-xs text-muted-foreground">{r.time}</span>}
                      <span className="font-semibold text-sm text-foreground">{r.earned}</span>
                      <Badge variant="outline" className={r.status === 'completed' ? 'text-primary border-primary/30 bg-primary/10 text-[10px]' : 'text-amber-400 border-amber-500/30 bg-amber-500/10 text-[10px]'}>
                        {r.status}
                      </Badge>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Network sidebar */}
          <div>
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-xl p-5 mb-5">
                <h3 className="font-display font-semibold text-foreground mb-1">Your Network</h3>
                <p className="text-xs text-muted-foreground mb-4">You are part of the <span className="text-amber-400">Ben Johns</span> coaching network</p>
                <div className="space-y-2">
                  {certifiedCoaches.map((c) => (
                    <div key={c.id} className="flex items-center gap-2 text-sm">
                      <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-[10px] font-semibold text-secondary-foreground">{c.avatar}</div>
                      <span className="text-muted-foreground">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass rounded-xl p-5">
                <h3 className="font-display font-semibold text-foreground mb-3">Revenue Share</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Your Cut', pct: '45%', amount: '$1,440', color: 'text-primary' },
                    { label: 'Ben Johns (Pro)', pct: '40%', amount: '$1,280', color: 'text-amber-400' },
                    { label: 'Platform', pct: '15%', amount: '$480', color: 'text-muted-foreground' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <div className="text-right">
                        <span className={`font-display font-semibold text-sm ${item.color}`}>{item.pct}</span>
                        <span className="text-xs text-muted-foreground ml-2">{item.amount}/mo</span>
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
