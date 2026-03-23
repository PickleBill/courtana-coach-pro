# Okay, so a couple of notes here as I'm going through the business plan----> still follow your plan just make the edits as you see fit and go ahead and approve it --------I'm thinking about this Google or Apple sign-in, real working, if someone enters an email on a lovable site or does it with Google. We figure out a way to automatically add them to Cortana. Maybe what they do is get created as a ghost user in Cortana, or maybe get a separate session started.

# I think there's definitely some stuff we have to do on our end, but I'm just basically thinking about this quick action thing where they go in and do something on this demo but real site, and then get put into our system somehow. At bare minimum, we could just take them to our QR code page, have them sign up, and then start a session. That might get a little messy, because then they'll be like, "Why do I want to do that?" Although we could just advertise it; it could be like, "Try Cortana quick, quick sign up type of thing," and then they get put in and start a session. The highlights have been starts and whatever. We could just keep repeating that or bulk upload them somehow in our system.

# Think about that link sign-in modal, yes avatar sign-in, set out, join the network. Yeah, I think we're to say the player coach pro is optional. Waitlist, yes, 100% on that. Video upload, yes. Mike did support coach completes review, yeah, yep, yep. Coach competes for view dashboard interactivity, yeah, and I would like seeing through the calculator too. I already love the sort of calculations there, but maybe we'll want to add other layers on it, like, "Oh, player view right would be maybe the inverse of creates a value proposition for a player. Why would they do it, so the coach, like, days of the year traveling, right? It's like a big thing, and so getting their, like, thinking about opportunity cost lost for a pro, you know, that's on tour, that might be coaching." We set some dollar hourly rate, so that's some changes there.

Give me the next video like that. Book a session, yeah, yeah, love that! Stripe integration, yeah, I'll get the API key. Let's just do it. I don't know if we need a subscription. Yeah, whatever, we can do a subscription. Definitely do it with all the simulated flows. Live integration, we will run links to an in live public display dashboard. Yeah, I'll give you those links in there and that upload video. Okay, this is fantastic! Why do I need Apple sign-in credentials? I feel like I've used this before. I'll get you the Stripe API key. I don't really care about the tournament sign-up links; just find some random ones. GCourtana Coach Pro — Production Readiness Plan

## Phase 1: Foundation — Lovable Cloud + Auth (First)

Enable Lovable Cloud, then set up real authentication. This is the gating step for everything else.

**Auth setup:**

- Google and Apple OAuth sign-in (real, working)
- Simple `profiles` table: `id`, `user_id`, `display_name`, `avatar_url`, `role` (player/coach/pro), `created_at`
- Separate `user_roles` table per security requirements
- Update `SignInModal.tsx` to use real Supabase auth (Google + Apple buttons, email/password)
- Add auth state to Navbar — show avatar + name when signed in, "Sign Out" replaces "Sign In"
- Protected routes: Dashboard, Curriculum require auth. Everything else is public.
- "Join the Network" → opens SignInModal in "signup" mode with role selection (Player / Coach / Pro)

**Waitlist collection (immediate value):**

- Add `waitlist` table: `id`, `email`, `name`, `role_interest`, `created_at`
- Every CTA that currently toasts ("Join the Ecosystem — Early Access", "Book Session", "Offer Contract") → collects email in a quick inline modal before confirming
- This starts capturing leads immediately

## Phase 2: Interactive Flows — Make Every Click Do Something

**Video upload → Coach review flow (Curriculum.tsx + new modal):**

- Upload button opens a modal: shows a placeholder video thumbnail (court image), "Sending to Coach Marcus" with coach avatar, estimated response time
- Add "⚡ Expedite Review" option: "$5 for 2-hour response (normal: 48 hrs)" — shows a mock Stripe checkout card (Phase 3 wires it real)
- After "send": animated confirmation with confetti/checkmark, toast: "Coach Marcus will review within 48 hours"

**Coach completes review → Player notification flow:**

- On Dashboard: clicking a "pending" review shows a "Review Video" modal with mock video frame, text area for feedback, grade selector, "Submit Review" button
- Submitting triggers a toast simulating push notification: "Tyler R. just received your feedback! 🎾"
- On Curriculum: add a "New Feedback" badge that appears on modules with unread coach notes

**Coaching Calculator mobile fix:**

- Replace HTML range inputs with shadcn `Slider` component (already in project) — much better touch targets on mobile
- Add touch-friendly thumb sizing

**Dashboard interactivity:**

- "Review Next Video" card → opens inline review panel (not just navigate to AI Hub)
- "Message Student" → opens a simple chat-style modal with mock conversation
- Metric cards: clicking "Pending Reviews" scrolls to reviews list, "Active Students" shows student roster modal

**Coach marketplace booking:**

- "Book Session" on any coach → opens booking modal: select session type (Video Review / Live Drill / Curriculum), date preference, payment preview
- For celebrity tier: show "Limited Availability" warning, slot countdown

## Phase 3: Stripe Integration + Checkout Flows

Enable Stripe (will need API key from you).

**Checkout scenarios:**

- Coach booking: real Stripe checkout for session booking ($35-$750 depending on tier)
- Expedited review: $5 micro-payment
- Rewards store: purchase merch/experiences
- Subscription tiers: Player Basic ($35/mo), Player Pro ($99/mo), Player Elite ($249/mo)

**Pre-Stripe (immediate):**

- Build all the checkout UI now with simulated flows
- When Stripe is connected, swap in real payment processing

## Phase 4: Live Integration + Real-World Links

**Courtana live display integration:**

- Add "Tune In Live" section on homepage: links to Courtana's public display dashboard
- "Live at The Underground" card with a green pulse dot, opens courtana.com display view in new tab
- Tournament section: links to real tournament sign-up pages

**Session flow bridge:**

- "Upload Video" → opens courtana.com/ai-analysis in new tab
- When they return: show a "Welcome back! Your session is being analyzed" banner
- "Connect Courtana Account" flow: simple email linking (stored in profiles table)

**Live feed elements:**

- Activity ticker on homepage already exists — make it pull from a `public_activity` table (seeded with mock data, but real infrastructure)
- "Currently analyzing" counter: reads from a simple counter in Supabase, updatable via edge function

## Phase 5: Mobile Polish + UX Tightening

- Coaching calculator: switch to Slider components, larger touch targets
- All modals: full-screen on mobile (sheet-style slide up)
- Coach cards: stack vertically on mobile, larger tap targets
- AI Hub: single-column layout on mobile, collapsible sections
- Bottom CTA bar: context-aware ("Continue Curriculum" on curriculum page, "Find a Coach" on homepage)
- Navbar mobile menu: add role-based quick links after auth

## Phase 6: Notification System + Feedback Loops

**Edge functions for async events:**

- `notify-review-complete`: when coach submits review → sends email to player + creates in-app notification
- `notify-new-submission`: when player uploads video → notifies assigned coach
- `weekly-progress-digest`: weekly email with curriculum progress, earnings (for coaches)

**In-app notifications:**

- Bell icon in navbar with badge count
- Notification dropdown: "Coach Marcus reviewed your serve video", "You earned 50 XP", "New curriculum module unlocked"
- Stored in `notifications` table, real-time via Supabase subscriptions

## Implementation Order

1. **Phase 1** (Cloud + Auth) — must be first, everything depends on it
2. **Phase 2** (Interactive flows) — biggest visual impact for demos
3. **Phase 5** (Mobile polish) — can run in parallel with Phase 2
4. **Phase 3** (Stripe) — after you provide API key
5. **Phase 4** (Live integrations) — links + display connections
6. **Phase 6** (Notifications) — polish layer

## What I Need From You

- **Approve enabling Lovable Cloud** — I'll do this first
- **Google OAuth credentials** — for real Google sign-in (Client ID from Google Cloud Console)
- **Apple Sign-In credentials** — Apple Developer account required
- **Stripe API key** — when ready for Phase 3
- **Courtana display dashboard URL** — the public view of your live displays for the "Tune In" feature
- **Tournament sign-up links** — any real tournament registration pages to link to

I'll start with Phase 1 (Cloud + Auth) and Phase 2 (Interactive flows) simultaneously once approved.