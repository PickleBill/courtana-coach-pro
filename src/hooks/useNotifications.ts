import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link: string | null;
  created_at: string;
}

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);
    if (data) {
      setNotifications(data as unknown as Notification[]);
      setUnreadCount((data as unknown as Notification[]).filter(n => !n.read).length);
    }
  }, [user]);

  const markAsRead = useCallback(async (id: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  }, []);

  const markAllRead = useCallback(async () => {
    if (!user) return;
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  }, [user]);

  // Seed demo notifications on first login
  const seedDemoNotifications = useCallback(async () => {
    if (!user) return;
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    if (count === 0) {
      const demos = [
        { user_id: user.id, title: 'Welcome to Courtana! 🎾', message: 'Start with a free AI analysis of your game.', type: 'system', link: '/ai-hub' },
        { user_id: user.id, title: 'Coach Marcus reviewed your serve video', message: 'Grade: B+ — Check out his detailed feedback.', type: 'review_complete', link: '/curriculum' },
        { user_id: user.id, title: 'You earned 50 XP!', message: 'Completing Module 3 earned you 50 XP toward your next reward.', type: 'xp_earned', link: '/rewards' },
        { user_id: user.id, title: 'New module unlocked', message: 'Kitchen Reset Combo is now available in your curriculum.', type: 'new_submission', link: '/curriculum' },
      ];
      await supabase.from('notifications').insert(demos as any);
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // Seed on first auth
  useEffect(() => {
    if (user) seedDemoNotifications();
  }, [user, seedDemoNotifications]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel('notifications-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` }, (payload) => {
        const newNotif = payload.new as unknown as Notification;
        setNotifications(prev => [newNotif, ...prev]);
        setUnreadCount(prev => prev + 1);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  return { notifications, unreadCount, markAsRead, markAllRead, fetchNotifications };
}
