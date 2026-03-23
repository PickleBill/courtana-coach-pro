import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Ecosystem', path: '/' },
  { label: 'Coaches', path: '/coaches' },
  { label: 'Scout', path: '/scout' },
  { label: 'Curriculum', path: '/curriculum' },
  { label: 'AI Analysis', path: '/ai-hub' },
  { label: 'Rewards', path: '/rewards' },
  { label: 'Dashboard', path: '/dashboard' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm transition-transform duration-200 group-hover:scale-95 group-active:scale-90">
            C
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-foreground">
            Courtana
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Sign In
          </Button>
          <Button size="sm" className="font-semibold active:scale-95 transition-transform">
            Get Started
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-border/30 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border/30 flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1">Sign In</Button>
                <Button size="sm" className="flex-1">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
