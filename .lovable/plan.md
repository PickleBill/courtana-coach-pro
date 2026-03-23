# UX Overhaul — Make It Real, Fix Dead Ends, Prioritize Action

## What's Wrong (from your feedback)

1. **Dead buttons everywhere** — "Confirm Booking" just animates and toasts, no actual checkout. "Request Pro Review" does nothing. "Review Now" just navigates to AI Hub with no context. "Offer Contract" opens a waitlist modal instead of something dynamic.
2. **AI Hub layout is wrong** — the cool stuff (shot grades, drills, strengths) is buried below a giant SVG court visualization that looks fake. Upload/action should be prominent, analysis should be condensed.
3. **Coach Match Quiz is too many steps** — 4 steps including budget (awkward). Should be 2-3 steps max, personality-driven, single-pane feel.
4. **Curriculum is static** — no real interactivity beyond viewing. Reply input does nothing useful, no sense of progression or coach interaction loop.
5. **Dashboard "7 videos waiting" loops to AI Hub** which doesn't show pending reviews — circular dead end.
6. **Demo banner is unnecessary** — remove it.
7. **Double AskAProChat** still possible — need to verify single instance.
8. **Checkout doesn't exist** — booking modal shows "Confirm Booking" but never goes to payment.
9. **"See It Live" card on homepage links to main courtana.com** — should link to something more specific like the highlights.

## Execution Plan (3 passes)

### Pass 1: Fix Every Dead Button + Remove Cruft (~8 changes)

**Dashboard.tsx:**

- Remove demo banner entirely
- "Review Now" → instead of navigating to `/ai-hub`, open the ReviewModal directly with the first pending review pre-selected
- "Message Student" → open a simple chat-style toast or inline panel, not just a generic toast

**AIHub.tsx:**

- "Request Pro Review" / "Send to Coach" button → wire to BookingModal or VideoUploadModal with coach pre-selected, or show a real action toast with next step
- "Share with Coach" button → open VideoUploadModal
- Consolidate the 4 redundant upload/connect/try/signup links into 2 clear CTAs: "Upload Video" and "See Sample Analysis" (links to `https://courtana.com/highlight/td7vCCWTXosp`)

**BookingModal.tsx:**

- "Confirm Booking" → show payment summary step with "Pay with Stripe" button (uses Stripe payment link or shows toast that Stripe checkout is loading). Even if Stripe secret key isn't set, show the UI flow.

**Scout.tsx:**

- "Offer Contract" → replace WaitlistModal with a slider-style offer card: show a contract value slider ($500-$5000/mo), term selector (3mo/6mo/12mo), and "Send Offer" button that toasts confirmation. Much more dynamic than a waitlist form.

### Pass 2: Redesign Coach Match Quiz + AI Hub Layout (~6 changes)

**CoachMatchQuiz.tsx — Complete rewrite to 2-step personality quiz:**

- Step 1: Single pane with 6 clickable personality cards (not a dropdown): "I want to compete 🏆", "I just want to have fun 🎉", "I'm obsessed with technique 🔬", "I need accountability 💪", "I want to go pro 🌟", "I'm brand new 🌱" - yea maybe use emoji's but either make the questions more playful and funny or use the emoji to lighten or punny iy up.
- Step 2: Show a quick "matching..." animation (1.5s), then reveal 3 coach matches with match %, personality fit reason, and a "Book Intro Session" button on each
- No budget question. No learning style question. Fast, fun, personality-first.

**AIHub.tsx — Reorder for action-first layout:**

- Move "Analyze Your Own Session" (upload zone) to position 1, right after header. Make it more visual — show a court thumbnail background with the upload overlay.   you can put some future did connected court looking almost like a maybe even the good light peak into like the AI analysis ecosystem as of the background image of that which I think would get the point across in that big panel
- Move shot grades grid to position 2 (condensed, horizontal scroll on mobile)
- Move strengths/weaknesses to position 3 (combine into a single card with tabs or toggle, not two separate cards)
- Move AI + Human comparison to position 4
- Move "Ask the Coaches" roster to position 5

AND--> MAKE ALL THESE DYNAMIC, use glow effects  Halo, animated subtle animations. Think about ways to click through. Maybe you don't click to a full separate page, but a subtle little thing that, like, this thing is going to, like, you're going to learn more and hint somewhere. I know you can do really good stuff with this if you've done it in other apps.

What I'm trying to get at is that we want this thing to be interactive, and there are opportunities to use design aesthetic, copy called actions, and just different flows, even inside this hub where one thing affects the other. You just have this dynamic, visually appealing thing. You're almost there, but again just want to make it less basic. A good way to do that is to provide light contrast between the separate sections, so think through that and implement as best as you can. 

- Push the court SVG visualization down to position 6 or remove it — it looks fake and isn't actionable
- Remove the "Coming Soon" live court feed placeholder
- Keep CourtSense Data Layer section but move to bottom

### Pass 3: Curriculum Interactivity + Flow Connections (~5 changes)

**Curriculum.tsx:**

- Make the reply input functional: typing + Send button → shows a mock coach response after 2 seconds (pre-written, contextual to the module)
- Add "Mark as Complete" button on the current module → animates the checkmark, advances progress bar, shows confetti toast, unlocks next module
- Upload zone click → VideoUploadModal (already wired, verify it works)
- Great also think about like a simple like ad you know curriculum or add a simple drill right like you can like pre-populate it and make it like you know they don't have to type out a whole bunch of stuff but like like show the coaches that they could do this and like, maybe even move the panels up and down in order or dragon drop. You've got a lot of creative latitude here and I know you can make it fun engaging.... and then use like sporadic opportunities to like create a nice CTA within that and all of these different animations, visuals and models

**Dashboard.tsx → AI Hub flow fix:**

- Instead of "Review Now" navigating away, show an inline expandable review panel right on the dashboard with the video preview, grade selector, and feedback textarea (reuse ReviewModal content but inline)

**Rewards.tsx:**

- "Claim" buttons → for items with a price, open a simple checkout confirmation: "Claim for 500 XP" → "Confirm" → animated success. For Court Kings gear, show a shipping info toast.
-  for anything clicked on here, it should have some sort of action. The gear should show a shipping information toast, I think, to confirm. What about all the exclusive events? That's like schedule, right, like "Book your slot". Give them a call to action that's real. Again, we said we integrated Stripe, and I want to actually get people to enter email addresses and do stuff with us. I think this is another opportunity to do it 

**Index.tsx:**

- Change "Smart Court in Action" link from `https://courtana.com/` to `https://courtana.com/highlight/LKXstelDDjZb` (actual highlight, not homepage)

## Files Impacted


| File                                | Changes                                                 |
| ----------------------------------- | ------------------------------------------------------- |
| `src/pages/Dashboard.tsx`           | Remove banner, fix Review Now flow, inline review panel |
| `src/pages/AIHub.tsx`               | Reorder sections, consolidate CTAs, wire buttons        |
| `src/components/CoachMatchQuiz.tsx` | Complete rewrite to 2-step personality quiz             |
| `src/components/BookingModal.tsx`   | Add payment step with Stripe UI                         |
| `src/pages/Scout.tsx`               | Replace waitlist with contract offer slider             |
| `src/pages/Curriculum.tsx`          | Functional reply, mark complete, verify upload          |
| `src/pages/Rewards.tsx`             | Wire claim buttons with XP/checkout flow                |
| `src/pages/Index.tsx`               | Fix See It Live link                                    |
