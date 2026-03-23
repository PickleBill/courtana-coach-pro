import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import SignInModal from '@/components/SignInModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mainLinks = [
  { label: 'Ecosystem', path: '/' },
  { label: 'Coaches', path: '/coaches' },
  { label: 'Scout', path: '/scout' },
  { label: 'AI Analysis', path: '/ai-hub' },
];

const moreLinks = [
  { label: 'Curriculum', path: '/curriculum' },
  { label: 'Rewards', path: '/rewards' },
  { label: 'Dashboard', path: '/dashboard' },
];

const allLinks = [...mainLinks, ...moreLinks];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const location = useLocation();

  const isMoreActive = moreLinks.some(l => l.path === location.pathname);

  // No-op — CTA now navigates via Link

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary transition-all duration-200 group-hover:scale-95 group-hover:bg-primary/20 group-active:scale-90">
              <Crown size={18} />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg tracking-tight leading-none text-foreground">
                Courtana
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-primary/70 font-medium leading-none mt-0.5">
                Coaching
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* More dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`relative px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                    isMoreActive
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  More <ChevronDown size={12} />
                  {isMoreActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border/40 backdrop-blur-xl">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={`w-full cursor-pointer ${
                        location.pathname === link.path ? 'text-primary' : ''
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setSignInOpen(true)}>
              Sign In
            </Button>
            <Button size="sm" className="font-semibold active:scale-95 transition-transform glow-sm" asChild>
              <Link to="/coaches">Join the Network</Link>
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
              className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/30 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {allLinks.map((link) => (
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
                  <Button variant="ghost" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); setSignInOpen(true); }}>Sign In</Button>
                  <Button size="sm" className="flex-1" onClick={() => setMobileOpen(false)} asChild><Link to="/coaches">Join the Network</Link></Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} />
    </>
  );
}
