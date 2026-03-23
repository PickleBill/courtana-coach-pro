import { useState } from 'react';
import { curriculumItems as initialItems } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import ScrollReveal from '@/components/ScrollReveal';
import VideoUploadModal from '@/components/VideoUploadModal';
import usePageTitle from '@/hooks/usePageTitle';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, BookOpen, Video, BarChart3, Lock, Trophy, MessageSquare, User, Gift, Upload, Send, Plus, GripVertical, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeIcons = { drill: BookOpen, video: Video, analysis: BarChart3 };

const coachResponses: Record<string, string> = {
  '3': "Great question! For the transition zone, focus on your split step right as your opponent makes contact. I've seen your footage — you're about 0.3s late. Let's fix that this week.",
  '4': "Upload your next match and I'll break down your serve patterns. Your toss is inconsistent — we can fix that quickly with the wall drill.",
  '5': "Speed-ups are all about reading your opponent's paddle angle. When it drops below neutral, that's your green light. Let's drill this in your next session.",
  '6': "For the final assessment, I want a full doubles match. Play at least 11 points and focus on implementing everything we've worked on.",
  '7': "The AI drill is designed around your specific weak spots from Sessions 47-49. Complete all three sequences and upload the video.",
  '8': "Enter any DUPR-rated match. The system will auto-capture your performance data. Try to apply the third shot patterns we've been working on.",
};

const skills = [
  { name: 'Third Shot Drop', value: 87, color: 'bg-primary' },
  { name: 'Dinking', value: 82, color: 'bg-primary' },
  { name: 'Serve', value: 78, color: 'bg-blue-400' },
  { name: 'Return', value: 91, color: 'bg-primary' },
  { name: 'Volley', value: 74, color: 'bg-blue-400' },
  { name: 'Footwork', value: 69, color: 'bg-[hsl(var(--gold))]' },
];

export default function Curriculum() {
  usePageTitle('Your Curriculum — Courtana Coaching');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [items, setItems] = useState(initialItems.map(item => ({ ...item })));
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [coachReplies, setCoachReplies] = useState<Record<string, string>>({});
  const [replying, setReplying] = useState<string | null>(null);

  const completedCount = items.filter(c => c.completed).length;
  const progressPct = Math.round((completedCount / items.length) * 100);

  const milestones = [
    { label: 'Complete 4 modules', reward: 'Signed Pro Paddle', tier: 'silver', progress: `${completedCount}/4` },
    { label: 'Complete all modules', reward: 'VIP PPA Championship Seats', tier: 'gold', progress: `${completedCount}/${items.length}` },
  ];

  const handleMarkComplete = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, completed: true } : item));
    toast({ title: '🎉 Module Complete!', description: 'Nice work! Moving to the next module.' });
  };

  const handleSendReply = (id: string) => {
    const text = replyTexts[id];
    if (!text?.trim()) return;
    setReplying(id);
    setReplyTexts(prev => ({ ...prev, [id]: '' }));
    setTimeout(() => {
      setCoachReplies(prev => ({ ...prev, [id]: coachResponses[id] || "Great message! I'll review your progress and get back to you with specific drills. Keep grinding! 🎾" }));
      setReplying(null);
      toast({ title: '💬 Coach Marcus replied!', description: 'Check the module for his response.' });
    }, 2000);
  };

  const handleAddDrill = () => {
    const newItem = {
      id: String(items.length + 1),
      title: 'Custom Drill: Cross-Court Dink Rally',
      description: 'Practice 50 consecutive cross-court dinks with a partner. Focus on placement within 6 inches of the kitchen line.',
      type: 'drill' as const,
      completed: false,
    };
    setItems(prev => [...prev, newItem]);
    toast({ title: '➕ Drill Added!', description: 'Cross-Court Dink Rally added to your curriculum.' });
  };

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
                <p className="text-xs text-muted-foreground">{completedCount} of {items.length} modules complete</p>
                {completedCount < 4 && <p className="text-xs text-[hsl(var(--gold))]">🏆 {4 - completedCount} modules to Gold status</p>}
                {completedCount >= 4 && <p className="text-xs text-primary">🏆 Gold status unlocked!</p>}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main curriculum timeline */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => {
              const Icon = typeIcons[item.type];
              const isCurrent = !item.completed && (i === 0 || items[i - 1].completed);
              return (
                <ScrollReveal key={item.id} delay={i * 0.07}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    layout
                    className={`glass rounded-xl p-5 glass-hover relative ${
                      item.completed ? 'border-primary/15' : isCurrent ? 'border-primary/30 glow-sm' : 'opacity-60'
                    }`}
                  >
                    {i < items.length - 1 && (
                      <div className="absolute left-[29px] top-full w-px h-3 bg-border/30 z-10" />
                    )}
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.completed ? 'bg-primary/15 text-primary' : isCurrent ? 'bg-primary/10 text-primary animate-pulse' : 'bg-secondary/40 text-muted-foreground/40'
                      }`}>
                        {item.completed ? (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 20 }}>
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

                        {/* Coach reply from chat */}
                        {coachReplies[item.id] && (
                          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center">
                                <MessageSquare size={10} className="text-blue-400" />
                              </div>
                              <span className="text-[10px] text-blue-400 font-semibold">Coach Marcus</span>
                              <span className="text-[10px] text-muted-foreground/50">Just now</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">{coachReplies[item.id]}</p>
                          </motion.div>
                        )}

                        {/* Interactive controls for current module */}
                        {isCurrent && (
                          <>
                            <div className="mt-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <div className="w-5 h-5 rounded-md bg-blue-500/15 flex items-center justify-center">
                                  <MessageSquare size={10} className="text-blue-400" />
                                </div>
                                <span className="text-[10px] text-blue-400 font-semibold">Coach Notes</span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                Great progress! For this module, focus on the approach shot — record yourself from the side angle and upload here. Pay attention to your split-step timing.
                              </p>
                            </div>
                            {/* Reply input */}
                            <div className="mt-2 flex gap-2">
                              <input
                                value={replyTexts[item.id] || ''}
                                onChange={(e) => setReplyTexts(prev => ({ ...prev, [item.id]: e.target.value }))}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendReply(item.id)}
                                placeholder="Reply to Coach Marcus..."
                                className="flex-1 bg-secondary/30 border border-border/20 rounded-lg px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/25"
                              />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="shrink-0 w-8 h-8 text-primary"
                                disabled={replying === item.id}
                                onClick={() => handleSendReply(item.id)}
                              >
                                {replying === item.id ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-3 h-3 border border-primary border-t-transparent rounded-full" /> : <Send size={12} />}
                              </Button>
                            </div>
                            {/* Upload zone */}
                            <div onClick={() => setUploadOpen(true)} className="mt-3 p-4 rounded-lg border-2 border-dashed border-border/30 hover:border-primary/20 transition-colors cursor-pointer text-center group">
                              <Upload size={18} className="mx-auto text-muted-foreground/40 group-hover:text-primary/60 transition-colors mb-1" />
                              <p className="text-[10px] text-muted-foreground">Upload Practice Video · MP4, MOV up to 500MB</p>
                            </div>
                            {/* Mark as Complete */}
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-3 w-full text-xs border-primary/20 text-primary hover:bg-primary/10 active:scale-95 transition-transform gap-1.5"
                              onClick={() => handleMarkComplete(item.id)}
                            >
                              <CheckCircle size={12} /> Mark as Complete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}

            {/* Add Drill button */}
            <ScrollReveal>
              <Button
                variant="outline"
                className="w-full py-4 border-dashed border-border/30 hover:border-primary/20 text-muted-foreground hover:text-primary active:scale-[0.98] transition-all gap-2"
                onClick={handleAddDrill}
              >
                <Plus size={16} /> Add Custom Drill
              </Button>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
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
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.value}%` }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className={`h-full rounded-full ${skill.color}`} />
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
                        {completedCount >= (m.tier === 'gold' ? items.length : 4) ? <CheckCircle size={11} className="text-primary" /> : <Lock size={11} className="text-muted-foreground/40" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground">{m.label} · {m.progress}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-primary/8 to-primary/3 border border-primary/15">
                  <div className="flex items-center gap-2 mb-2">
                    <Gift size={14} className="text-primary" />
                    <span className="text-xs font-bold text-foreground">Next Reward Unlock</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">Complete {Math.max(0, 4 - completedCount)} more modules → <span className="text-primary font-medium">Freakshow Gen 3 Paddle (30% off) 🏓</span></p>
                  <Progress value={(completedCount / 4) * 100} className="h-2" />
                  <p className="text-[10px] text-muted-foreground mt-1.5">{completedCount}/4 modules complete</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
      <VideoUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
