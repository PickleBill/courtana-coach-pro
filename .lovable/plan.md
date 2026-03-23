

# V8: Phase 2 Completion + Phase 3 Stripe + Phase 4 Live Links

## Phase 2 Status Check

Phase 1 (Auth + Waitlist + Cloud) is complete. Phase 2 is **partially done** — the coaching calculator, quick actions, and basic toast interactions exist, but the **interactive modals** planned for Phase 2 are missing:

- No video upload modal (Curriculum upload just has a drag-zone placeholder)
- No booking modal on coach cards (just toasts)
- No review video modal on Dashboard (pending reviews are static)
- No message student modal
- WaitlistModal exists but isn't wired to most CTAs (Book Session, Offer Contract, etc.)

## Plan

### Step 1: Phase 2 Completion — Interactive Modals & Flows (~6 changes)

**A. Video Upload Modal (Curriculum):** When clicking "Upload Practice Video" zone, open a modal showing: a placeholder court thumbnail, "Sending to Coach Marcus" with avatar, estimated response time (48 hrs standard), and an "⚡ Expedite Review — $5 for 2-hour response" option. Confirm button shows animated checkmark + toast.

**B. Coach Booking Flow (Coaches):** Replace the toast-only "Book Session" on CoachCard with a real booking modal: session type picker (Video Review / Live Drill / Curriculum), date preference (this week / next week / flexible), payment preview showing coach price, and a "Confirm Booking" button that either opens WaitlistModal (for unauthenticated) or shows a success confirmation.

**C. Dashboard Review Modal:** Clicking a pending review row opens a modal with: mock video frame (placeholder), text area for feedback, grade selector (A through C), "Submit Review" button → toast: "Tyler R. just received your feedback!"

**D. Wire WaitlistModal to remaining CTAs:** "Offer Contract" on Scout page, "Book Session" on coach cards (for non-authenticated users), "Claim" buttons on Rewards page — all open WaitlistModal with contextual text.

### Step 2: Phase 3 — Stripe Integration (~4 changes)

First, enable Stripe via the tool. The publishable key provided (`pk_test_51TE...`) is a test-mode key — we'll need the **secret key** for the backend. I'll enable Stripe which will prompt for the secret key.

**Checkout flows to build:**
- **Coach session booking:** After the booking modal confirms, route to a Stripe checkout for the coach's price ($35-$750)
- **Expedited review:** $5 one-click payment from the video upload modal
- **Basic subscription page:** A simple `/pricing` page with 3 tiers (Player Basic $35/mo, Pro $99/mo, Elite $249/mo) — mostly shell UI, wired to Stripe checkout when keys are ready

The publishable key goes in the codebase. The secret key is needed for the edge function that creates checkout sessions.

### Step 3: Phase 4 — Live Integration Links (~3 changes)

**Add to Index.tsx:**
- "Tune In Live" section with 2 cards:
  - "Live at Seven Oaks (Outdoor)" → `https://courtana.com/display/3AELvCgGmzas/`
  - "Live at The Underground" → `https://courtana.com/display/Sy6gIO44K3MG/`
  - Each card: green pulse dot, "LIVE" badge, opens in new tab

**Add Courtana signup bridge:**
- "Try Courtana Free" CTA that links to `https://courtana.com/signup/`
- On the AI Hub "Upload Video" flow, after the upload modal, offer: "Or sign up at a Courtana facility" → `https://courtana.com/facility/3/courts/qgvE48pkCVOp/play-highlights/`

### Step 4: Mobile Polish (concurrent)

- Fix Curriculum page slider (upload zone → modal instead)
- Ensure all new modals use full-screen sheet style on mobile (`max-h-[90vh] overflow-y-auto` on small screens)
- CoachCard booking modal responsive stacking

## File Impact

| File | Changes |
|---|---|
| New: `src/components/VideoUploadModal.tsx` | Upload + expedite review modal |
| New: `src/components/BookingModal.tsx` | Coach session booking flow |
| New: `src/components/ReviewModal.tsx` | Dashboard video review modal |
| `src/pages/Curriculum.tsx` | Wire upload zone → VideoUploadModal |
| `src/components/CoachCard.tsx` | Wire Book Session → BookingModal |
| `src/pages/Dashboard.tsx` | Wire pending reviews → ReviewModal |
| `src/pages/Scout.tsx` | Wire Offer Contract → WaitlistModal |
| `src/pages/Rewards.tsx` | Wire Claim → WaitlistModal |
| `src/pages/Index.tsx` | Add Tune In Live section + Courtana signup link |
| `src/pages/AIHub.tsx` | Add Courtana facility signup bridge |
| New: `supabase/functions/create-checkout/index.ts` | Stripe checkout session creator |

## Sequence

1. Enable Stripe (tool call — will prompt you for the secret key)
2. Build all 3 modals + wire them
3. Add Stripe checkout edge function
4. Add live feed links + Courtana signup bridge
5. Mobile polish pass on all new modals

