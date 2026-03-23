import { curriculumItems } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, BookOpen, Video, BarChart3, Lock, Trophy, MessageSquare, User, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

const typeIcons = { drill: BookOpen, video: Video, analysis: BarChart3 };
const completedCount = curriculumItems.filter((c) => c.completed).length;
const progressPct = Math.round((completedCount / curriculumItems.length) * 100);

const skills = [
  { name: 'Third Shot Drop', value: 87, color: 'bg-primary' },
  { name: 'Dinking', value: 82, color: 'bg-primary' },
  { name: 'Serve', value: 78, color: 'bg-blue-400' },
  { name: 'Return', value: 91, color: 'bg-primary' },
  { name: 'Volley', value: 74, color: 'bg-blue-400' },
  { name: 'Footwork', value: 69, color: 'bg-[hsl(var(--gold))]' },
];

const milestones = [
  { label: 'Complete 4 modules', reward: 'Signed Pro Paddle', tier: 'silver', unlocked: false, progress: `${completedCount}/4` },
  { label: 'Complete all modules', reward: 'VIP PPA Championship Seats', tier: 'gold', unlocked: false, progress: `${completedCount}/6` },
];

export default function Curriculum() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-4xl lg:text-5xl font-bold mb-2">Your Curriculum</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Assigned by <span className="text-primary font-medium">Marcus Chen</span> · Ben Johns Network
          </p>
        </ScrollReveal>

        {/* Progress summary */}
        <ScrollReveal>
          <div className="glass rounded-2xl p-6 mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/3 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-foreground">Overall Progress</span>
                <span className="stat-number text-2xl text-primary">{progressPct}%</span>
              </div>
              <Progress value={progressPct} className="h-3 mb-3" />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{completedCount} of {curriculumItems.length} modules complete</p>
                <p className="text-xs text-[hsl(var(--gold))]">🏆 2 modules to Gold status</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main curriculum timeline */}
          <div className="lg:col-span-2 space-y-3">
            {curriculumItems.map((item, i) => {
              const Icon = typeIcons[item.type];
              const isCurrent = !item.completed && (i === 0 || curriculumItems[i - 1].completed);
              return (
                <ScrollReveal key={item.id} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`glass rounded-xl p-5 glass-hover relative ${
                      item.completed ? 'border-primary/15' : isCurrent ? 'border-primary/30 glow-sm' : 'opacity-60'
                    }`}
                  >
                    {i < curriculumItems.length - 1 && (
                      <div className="absolute left-[29px] top-full w-px h-3 bg-border/30 z-10" />
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.completed
                          ? 'bg-primary/15 text-primary'
                          : isCurrent
                          ? 'bg-primary/10 text-primary animate-pulse'
                          : 'bg-secondary/40 text-muted-foreground/40'
                      }`}>
                        {item.completed ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.2 }}
                          >
                            <CheckCircle size={18} />
                          </motion.div>
                        ) : isCurrent ? <Circle size={18} /> : <Lock size={14} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-display font-semibold text-sm ${item.completed || isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.title}
                          </h3>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 gap-0.5">
                            <Icon size={9} /> {item.type}
                          </Badge>
                          {isCurrent && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-primary/10 text-primary border-primary/25 badge-glow">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        {item.coachFeedback && (
                          <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded-md bg-primary/15 flex items-center justify-center">
                                <User size={10} className="text-primary" />
                              </div>
                              <span className="text-[10px] text-primary font-semibold">Coach Marcus</span>
                              <span className="text-[10px] text-muted-foreground/50">2d ago</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.coachFeedback}</p>
                          </div>
                        )}

                        {/* Coach Notes for current module */}
                        {isCurrent && (
                          <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center">
                                <MessageSquare size={10} className="text-blue-400" />
                              </div>
                              <span className="text-[10px] text-blue-400 font-semibold">Coach Notes</span>
                              <span className="text-[10px] text-muted-foreground/50">Just now</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              Great progress on your kitchen positioning! For this module, I want you to focus on the approach shot — record yourself from the side angle and upload here. Pay attention to your split-step timing.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Skill Breakdown */}
            <ScrollReveal delay={0.1}>
              <div className="glass rounded-2xl p-5 sticky top-24">
                <h3 className="font-display font-bold text-foreground mb-5">Skill Breakdown</h3>
                <div className="space-y-3.5">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="stat-number text-sm text-foreground">{skill.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          className={`h-full rounded-full ${skill.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Milestone Rewards */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Milestone Rewards</h4>
                  {milestones.map((m) => (
                    <div key={m.label} className={`p-3 rounded-lg border ${
                      m.tier === 'gold' ? 'bg-[hsl(var(--gold))]/5 border-[hsl(var(--gold))]/15' : 'bg-secondary/20 border-border/20'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                          {m.tier === 'gold' ? <Trophy size={11} className="text-[hsl(var(--gold))]" /> : '🏓'}
                          {m.reward}
                        </span>
                        <Lock size={11} className="text-muted-foreground/40" />
                      </div>
                      <p className="text-[10px] text-muted-foreground">{m.label} · {m.progress}</p>
                    </div>
                  ))}
                </div>

                {/* Next Reward Unlock */}
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift size={14} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Next Reward Unlock</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Complete 2 more modules → <span className="text-primary font-medium">Signed Pro Paddle 🏓</span></p>
                  <Progress value={(completedCount / 4) * 100} className="h-2" />
                  <p className="text-[10px] text-muted-foreground mt-1.5">{completedCount}/4 modules complete</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
