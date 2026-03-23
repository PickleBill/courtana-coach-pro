import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, LogOut, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import SignInModal from '@/components/SignInModal';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
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

function PickleballCrownLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-200 group-hover:scale-95 group-active:scale-90">
      {/* Crown */}
      <path d="M8 14L11 8L18 12L25 8L28 14" stroke="hsl(43, 96%, 56%)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="hsl(43, 96%, 56%)" fillOpacity="0.15" />
      <circle cx="11" cy="7.5" r="1.5" fill="hsl(43, 96%, 56%)" />
      <circle cx="18" cy="11.5" r="1.5" fill="hsl(43, 96%, 56%)" />
      <circle cx="25" cy="7.5" r="1.5" fill="hsl(43, 96%, 56%)" />
      {/* Pickleball */}
      <circle cx="18" cy="23" r="9" stroke="hsl(145, 100%, 45%)" strokeWidth="1.5" fill="hsl(145, 100%, 45%)" fillOpacity="0.12" />
      {/* Holes */}
      <circle cx="15" cy="21" r="1.2" fill="hsl(145, 100%, 45%)" fillOpacity="0.4" />
      <circle cx="21" cy="21" r="1.2" fill="hsl(145, 100%, 45%)" fillOpacity="0.4" />
      <circle cx="18" cy="26" r="1.2" fill="hsl(145, 100%, 45%)" fillOpacity="0.4" />
      <circle cx="15" cy="25.5" r="0.8" fill="hsl(145, 100%, 45%)" fillOpacity="0.3" />
      <circle cx="21" cy="25.5" r="0.8" fill="hsl(145, 100%, 45%)" fillOpacity="0.3" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInMode, setSignInMode] = useState<'signin' | 'signup'>('signin');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut, loading } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  const isMoreActive = moreLinks.some(l => l.path === location.pathname);

  const openSignIn = (mode: 'signin' | 'signup') => {
    setSignInMode(mode);
    setSignInOpen(true);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 group">
            <PickleballCrownLogo />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight leading-none text-foreground">
                King of the Courtana
              </span>
              <span className="text-[8px] tracking-[0.12em] uppercase text-primary/60 font-medium leading-none mt-0.5">
                Powered by Courtana
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

          <div className="hidden lg:flex items-center gap-2">
            {/* Notification bell */}
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 rounded-lg hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground">
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 min-w-[18px] rounded-full bg-primary text-primary-foreground text-[9px] font-bold flex items-center justify-center shadow-sm shadow-primary/30">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-card border-border/40 backdrop-blur-xl p-0">
                  <div className="p-3 border-b border-border/20 flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Notifications</span>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-[10px] text-primary hover:underline">Mark all read</button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-muted-foreground">No notifications yet</div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <button
                          key={n.id}
                          onClick={() => {
                            markAsRead(n.id);
                            if (n.link) navigate(n.link);
                          }}
                          className={`w-full text-left p-3 hover:bg-secondary/30 transition-colors border-b border-border/10 last:border-0 ${!n.read ? 'bg-primary/3' : ''}`}
                        >
                          <div className="flex items-start gap-2">
                            {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />}
                            <div className={!n.read ? '' : 'ml-3.5'}>
                              <p className="text-xs font-medium text-foreground leading-tight">{n.title}</p>
                              <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{n.message}</p>
                              <p className="text-[9px] text-muted-foreground/50 mt-1">
                                {new Date(n.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {!loading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-secondary/50 transition-colors">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-7 h-7 rounded-full object-cover" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">
                        {(profile?.display_name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm font-medium text-foreground">{profile?.display_name || user.email?.split('@')[0]}</span>
                    <ChevronDown size={12} className="text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border/40 backdrop-blur-xl">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer"><User size={14} className="mr-2" /> Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive">
                    <LogOut size={14} className="mr-2" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => openSignIn('signin')}>
                  Sign In
                </Button>
                <Button size="sm" className="font-semibold active:scale-95 transition-transform glow-sm" onClick={() => openSignIn('signup')}>
                  Join the Network
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-1">
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative p-2 text-muted-foreground hover:text-foreground">
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 bg-card border-border/40 backdrop-blur-xl p-0">
                  <div className="p-3 border-b border-border/20 flex items-center justify-between">
                    <span className="text-sm font-semibold">Notifications</span>
                    {unreadCount > 0 && <button onClick={markAllRead} className="text-[10px] text-primary">Mark all read</button>}
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-muted-foreground">No notifications</div>
                    ) : notifications.slice(0, 4).map((n) => (
                      <button
                        key={n.id}
                        onClick={() => { markAsRead(n.id); if (n.link) navigate(n.link); }}
                        className={`w-full text-left p-3 hover:bg-secondary/30 border-b border-border/10 last:border-0 ${!n.read ? 'bg-primary/3' : ''}`}
                      >
                        <p className="text-xs font-medium text-foreground">{n.title}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{n.message}</p>
                      </button>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <button
              className="p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
                {user && (
                  <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-secondary/20 border border-border/20">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold">
                        {(profile?.display_name || user.email || '?').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">{profile?.display_name || user.email?.split('@')[0]}</p>
                      <p className="text-[10px] text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                )}
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
                  {user ? (
                    <Button variant="ghost" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); signOut(); }}>
                      <LogOut size={14} className="mr-2" /> Sign Out
                    </Button>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" className="flex-1" onClick={() => { setMobileOpen(false); openSignIn('signin'); }}>Sign In</Button>
                      <Button size="sm" className="flex-1" onClick={() => { setMobileOpen(false); openSignIn('signup'); }}>Join the Network</Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <SignInModal open={signInOpen} onClose={() => setSignInOpen(false)} mode={signInMode} />
    </>
  );
}
