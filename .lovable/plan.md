

# Phase 5 & 6: Mobile Polish, Notification System, Homepage Visuals, and Navbar Refresh

## Changes Overview

### 1. Navbar Brand Refresh
- Change title to **"King of the Courtana"** throughout (page title, index.html, Navbar)
- Replace the Crown icon logo with a custom pickleball-king SVG: a pickleball (circle with holes) wearing a crown on top. Simple inline SVG, 2-color (primary green + gold crown points)
- Add "Powered by Courtana" in the navbar as a subtle `text-[9px]` tag, shifted up closer to the logo since "King of the Court" fits on one line as the brand name
- Compact hero: put "King of the Courtana" on a single line in the hero h1

### 2. Hero Dynamic Background
- Add an animated SVG network/constellation background behind the hero: floating nodes connected by lines, slowly drifting — evokes "connected courts" and data flow
- Use Framer Motion for subtle node animations (position drift + opacity pulse)
- Overlay subtle stat readouts that fade in/out: "14,847 frames processed", "312 shot events", "89,201 tracking points" — like a HUD layer
- Keep existing particle system but layer the network underneath

### 3. Stats Bar — Fix CountUp Numbers
- The CountUp component uses `useInView` — verify it triggers. The issue is likely that the ScrollReveal wrapper around the stats section prevents the CountUp `ref` from being in view at the right time. Fix: remove the outer `<ScrollReveal>` wrapper from the stats section so CountUp's own `useInView` handles the animation directly
- This restores the rolling number animation

### 4. Mobile Polish Pass (Phase 5)

**All modals → full-screen on mobile:**
- BookingModal, VideoUploadModal, ReviewModal, CoachMatchQuiz, WaitlistModal, SignInModal: add `max-h-[90vh] overflow-y-auto` on mobile, use `DialogContent` with `className="sm:max-w-lg max-h-[90vh] overflow-y-auto"`

**Touch targets:**
- CoachingCalculator sliders: already uses shadcn `Slider` — add larger thumb via CSS: `.slider-thumb { width: 24px; height: 24px; }` on mobile
- All buttons in grids: minimum `h-12` on mobile for comfortable tapping

**Layout fixes:**
- MobileCTA: ensure it doesn't overlap content — add `pb-20` to page containers on mobile
- AI Hub coach persona grid: `grid-cols-2` on mobile (already is), ensure cards don't get too cramped
- Dashboard metric cards on mobile: 2-col grid already, verify spacing

**Navbar mobile:**
- Ensure menu closes on any navigation (already wired)
- Add user avatar/name in mobile menu when authenticated

### 5. Notification System (Phase 6)

**Database:**
- Create `notifications` table: `id`, `user_id`, `title`, `message`, `type` (review_complete, new_submission, xp_earned, system), `read`, `created_at`, `link` (optional route)
- RLS: users can only read their own notifications
- Enable realtime on notifications table

**Navbar bell icon:**
- Add Bell icon to Navbar (between nav links and auth section)
- Badge with unread count (query from notifications table)
- Dropdown showing last 5 notifications with timestamps
- Click notification → navigate to `link` route and mark as read
- For unauthenticated users: hide the bell

**Seed notifications (for demo):**
- On first auth, seed 3-4 demo notifications:
  - "Coach Marcus reviewed your serve video" → `/curriculum`
  - "You earned 50 XP for completing Module 3" → `/rewards`
  - "New curriculum module unlocked: Kitchen Reset Combo" → `/curriculum`
  - "Welcome to Courtana! Start with a free AI analysis" → `/ai-hub`

**Edge function `notify-review-complete`:**
- When coach submits review (Dashboard handleSubmitReview), call edge function to create notification for the student
- For now, this is simulated client-side (insert into notifications table directly) since we don't have real student user IDs

**Realtime subscription:**
- In Navbar, subscribe to notifications channel for current user
- New notification → increment badge count + show toast

### 6. AI Hub — More Dynamic & Linked Up
- Add subtle glow pulse on the "Analyze Your Session" hero card border
- Shot grade cards: on click, expand inline to show that shot's 5-session trend detail + a "Drill for this" CTA linking to the relevant drill in the sidebar
- "Request Pro Review" sidebar button → already wired to BookingModal, verify it works
- Add subtle animated border gradient on the AI + Human comparison panel

### 7. index.html Metadata Update
- Change `<title>` to "King of the Courtana — AI Coaching Ecosystem"
- Update og:title and twitter:title to match

## File Impact

| File | Changes |
|---|---|
| `index.html` | Title + meta updates |
| `src/components/Navbar.tsx` | Pickleball crown logo SVG, "King of the Courtana" brand, Bell icon + notification dropdown |
| `src/pages/Index.tsx` | Hero title change, animated network background, remove ScrollReveal from stats bar |
| `src/index.css` | Mobile slider thumb size, glow-pulse keyframe |
| `src/pages/AIHub.tsx` | Shot card click expand, animated borders |
| `src/components/BookingModal.tsx` | Mobile full-screen dialog |
| `src/components/VideoUploadModal.tsx` | Mobile full-screen dialog |
| `src/components/CoachMatchQuiz.tsx` | Mobile full-screen dialog |
| `src/components/SignInModal.tsx` | Mobile full-screen dialog |
| `src/components/WaitlistModal.tsx` | Mobile full-screen dialog |
| New migration | `notifications` table + RLS + realtime |
| `src/hooks/useNotifications.ts` | New hook for notification queries + realtime |
| `src/pages/Dashboard.tsx` | Client-side notification insert on review submit |

## Execution Order

1. Database migration (notifications table)
2. Navbar refresh (logo, title, bell icon, notifications)
3. Hero visual upgrade (network background, title, stats fix)
4. Mobile polish pass (all modals + touch targets)
5. AI Hub dynamic enhancements
6. Metadata updates

