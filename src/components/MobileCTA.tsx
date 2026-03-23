import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 px-4 py-3 flex gap-2">
      <Button size="sm" className="flex-1 font-semibold glow-sm gap-1 active:scale-95 transition-transform" asChild>
        <Link to="/coaches">Find a Coach <ArrowRight size={12} /></Link>
      </Button>
      <Button size="sm" variant="outline" className="flex-1 border-border/50 active:scale-95 transition-transform" asChild>
        <Link to="/ai-hub">Try AI Analysis</Link>
      </Button>
    </div>
  );
}
