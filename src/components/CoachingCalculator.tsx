import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Zap } from 'lucide-react';

export default function CoachingCalculator() {
  const [sessions, setSessions] = useState(23);
  const [minutes, setMinutes] = useState(4.2);
  const [revenue, setRevenue] = useState(78);

  const weeklyEarnings = sessions * revenue;
  const totalHours = (sessions * minutes) / 60;
  const effectiveRate = totalHours > 0 ? weeklyEarnings / totalHours : 0;
  const multiplier = effectiveRate / 80;
  const monthlyProjection = weeklyEarnings * 4.3;

  return (
    <div className="glass rounded-2xl p-8 lg:p-10 mb-8 relative overflow-hidden glow">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/6 via-primary/3 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs mb-6 badge-glow">
          <Zap size={10} className="mr-1" /> Coaching Economics Calculator
        </Badge>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-7">
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Sessions reviewed per week</label>
                <span className="stat-number text-lg text-primary">{sessions}</span>
              </div>
              <Slider
                value={[sessions]}
                onValueChange={(v) => setSessions(v[0])}
                min={5}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5"><span>5</span><span>50</span></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Avg minutes per review</label>
                <span className="stat-number text-lg text-primary">{minutes.toFixed(1)} min</span>
              </div>
              <Slider
                value={[minutes * 10]}
                onValueChange={(v) => setMinutes(v[0] / 10)}
                min={20}
                max={80}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5"><span>2 min</span><span>8 min</span></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Avg revenue per session</label>
                <span className="stat-number text-lg text-primary">${revenue}</span>
              </div>
              <Slider
                value={[revenue]}
                onValueChange={(v) => setRevenue(v[0])}
                min={35}
                max={150}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5"><span>$35</span><span>$150</span></div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-primary/5 rounded-xl p-6 flex flex-col justify-center">
            <div className="text-center mb-5">
              <div className="stat-number text-5xl lg:text-6xl text-primary">${Math.round(effectiveRate).toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">effective hourly rate</div>
              <div className="text-sm text-primary font-semibold mt-1">{multiplier.toFixed(1)}x traditional coaching</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-secondary/20">
                <div className="stat-number text-xl text-foreground">${weeklyEarnings.toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground">Weekly Earnings</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/20">
                <div className="stat-number text-xl text-foreground">${Math.round(monthlyProjection).toLocaleString()}</div>
                <div className="text-[10px] text-muted-foreground">Monthly Projection</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-secondary/20">
                <div className="stat-number text-xl text-foreground">{totalHours.toFixed(1)}h</div>
                <div className="text-[10px] text-muted-foreground">Hours Spent</div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-5">Based on async video review model. Traditional rate assumes $80/hr for 1:1 in-person coaching.</p>
      </div>
    </div>
  );
}
