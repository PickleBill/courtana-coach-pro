import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-xs">C</div>
              <span className="font-display font-semibold text-foreground">Kings of The Court</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The coaching ecosystem for racquet sports. Powered by AI, driven by pros.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/coaches" className="hover:text-foreground transition-colors">Coaches</Link></li>
              <li><Link to="/ai-hub" className="hover:text-foreground transition-colors">AI Analysis</Link></li>
              <li><Link to="/curriculum" className="hover:text-foreground transition-colors">Curriculum</Link></li>
              <li><Link to="/rewards" className="hover:text-foreground transition-colors">Rewards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Network</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/scout" className="hover:text-foreground transition-colors">Scout & Draft</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground transition-colors">Coach Dashboard</Link></li>
              <li>
                <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Courtana.com <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Partners</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://courtkings.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Court Kings <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://courtkings.com/community-partners/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Court Kings Partners <ExternalLink size={10} />
                </a>
              </li>
              <li><span>PPA Tour</span></li>
              <li><span>USA Pickleball</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <span>© 2026 Courtana. All rights reserved.</span>
          <a href="https://courtana.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground transition-colors">
            Powered by Courtana Smart Court Technology <ExternalLink size={10} />
          </a>
        </div>
      </div>
    </footer>
  );
}
