import { curriculumItems } from '@/data/mockData';
import ScrollReveal from '@/components/ScrollReveal';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, BookOpen, Video, BarChart3 } from 'lucide-react';

const typeIcons = { drill: BookOpen, video: Video, analysis: BarChart3 };
const completedCount = curriculumItems.filter((c) => c.completed).length;
const progressPct = Math.round((completedCount / curriculumItems.length) * 100);

const skills = [
  { name: 'Third Shot Drop', value: 87 },
  { name: 'Dinking', value: 82 },
  { name: 'Serve', value: 78 },
  { name: 'Return', value: 91 },
  { name: 'Volley', value: 74 },
  { name: 'Footwork', value: 69 },
];

export default function Curriculum() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">Your Curriculum</h1>
          <p className="text-muted-foreground mb-8">Assigned by <span className="text-primary">Marcus Chen</span> · Ben Johns Network</p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main curriculum list */}
          <div className="lg:col-span-2 space-y-3">
            <ScrollReveal>
              <div className="glass rounded-xl p-5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Overall Progress</span>
                  <span className="text-sm text-primary font-semibold">{progressPct}%</span>
                </div>
                <Progress value={progressPct} className="h-2.5" />
                <p className="text-xs text-muted-foreground mt-2">{completedCount} of {curriculumItems.length} modules complete · Unlock Gold reward at 100%</p>
              </div>
            </ScrollReveal>

            {curriculumItems.map((item, i) => {
              const Icon = typeIcons[item.type];
              return (
                <ScrollReveal key={item.id} delay={i * 0.06}>
                  <div className={`glass rounded-xl p-5 glass-hover ${item.completed ? 'border-primary/20' : ''}`}>
                    <div className="flex items-start gap-3">
                      {item.completed ? (
                        <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                      ) : (
                        <Circle size={20} className="text-muted-foreground/40 mt-0.5 shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold text-sm ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {item.title}
                          </h3>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                            <Icon size={10} className="mr-0.5" /> {item.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                        {item.coachFeedback && (
                          <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                            <p className="text-xs text-primary/90 font-medium mb-0.5">Coach Feedback</p>
                            <p className="text-xs text-muted-foreground">{item.coachFeedback}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Sidebar: Skills */}
          <div>
            <ScrollReveal delay={0.15}>
              <div className="glass rounded-xl p-5 sticky top-24">
                <h3 className="font-display font-semibold text-foreground mb-4">Skill Breakdown</h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">{skill.name}</span>
                        <span className="text-foreground font-medium">{skill.value}</span>
                      </div>
                      <Progress value={skill.value} className="h-1.5" />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-lg bg-amber-500/8 border border-amber-500/15">
                  <p className="text-xs font-semibold text-amber-400 mb-1">🏆 Next Milestone</p>
                  <p className="text-xs text-muted-foreground">Complete 2 more modules to unlock <strong className="text-foreground">VIP PPA Championship Seats</strong></p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
