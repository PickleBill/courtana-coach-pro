

# V4 Prompt Sequence — Execution Plan with Stakeholder-Informed Edits

## Assessment: What's Already Done vs What V4 Asks For

After reading every page file and all 4 prompts against the stakeholder perspectives doc, here's the gap analysis:

### V4a (Global + Landing) — ~60% already exists
- **Already done:** index.html cleaned (Lovable defaults gone), How It Works section exists, See It Live section exists, stats with CountUp exist, LiveCounter for dynamic numbers exists, partner scroll exists, particles exist
- **Still needed:** Reorder "Your Role" above flywheel (V4a #3), partner names instead of categories (V4a #6), footer branded content (V4a #7), nav "More" dropdown (V4a #8), See It Live hover thumbnails (V4a #9), page transitions in App.tsx (V4a #10)

### V4b (Coaches + Scout + Curriculum) — ~40% already exists
- **Already done:** Featured Coach spotlight card for Ben Johns, Coach Match Quiz, pro mentors with rev share numbers, revenue share expandable section
- **Still needed:** CoachCard hover animation smoothing (V4b #2), video preview pulse (V4b #3), quiz contextual result card (V4b #4), rising star enhancements (V4b #5), rev share flow animation (V4b #6), curriculum celebrations (V4b #7), coach feedback polish (V4b #8), social proof strip (V4b #9)

### V4c (AI Hub + Dashboard + Rewards) — ~30% already exists
- **Already done:** Heat zones exist (basic colored divs), shot grades grid exists, AI+Coach comparison exists, time leverage card is already hero-sized with `text-5xl lg:text-6xl`, recent activity feed exists
- **Still needed:** Court SVG underlay + legend (V4c #1), sparkline trends (V4c #2), sequential reveal animation (V4c #3), prominent Courtana link badge (V4c #4), comparison bar visual (V4c #5), weekly earnings chart (V4c #6), pending review urgency (V4c #7), Court Kings gear reward (V4c #8), progress bar gamification (V4c #9)

### V4d (Stakeholder Credibility) — ~10% already exists
- **Almost all new:** Testimonials, partnership value exchange visual, "Why Coaches Love This" stats, AI confidence badge, chat demo question, footer link, mobile CTA bar

## Stakeholder Lens: What to Edit/Add to the Sequence

From the stakeholder perspectives doc, these are the highest-leverage gaps NOT covered by V4a-V4d:

1. **Player POV gap:** No pricing overview on homepage. The stakeholder doc says "a first-time visitor who's price-curious will bounce." **Edit to V4d:** Add a small pricing teaser below testimonials — "Starting at $35/session" with tier range.

2. **Coach POV gap:** "I'm a Coach" card links to Dashboard (someone else's logged-in state). **Edit to V4a:** Change the Coach audience card CTA from "Join the Network" → link to `/coaches` with a scroll anchor to the "Why Coaches Love This" section (added in V4d).

3. **Investor POV gap:** Partner scroll shows generic categories, not real names. **V4a #6 already fixes this** — the prompt replaces with real brand names. This is critical for Rich.

4. **First-time visitor POV:** Nav has 7 items — overwhelming. **V4a #8 already fixes this** with a "More" dropdown. Keep it.

5. **Investor POV gap:** No growth trajectory / trend data. **Add to V4c:** On Dashboard, the weekly earnings chart (V4c #6) partially addresses this. I'll enhance it with a "Platform Growth" note.

## Execution Plan: Modified Sequence

I'll run all 4 prompts in order with these modifications:

### Pass 1: V4a — Global + Landing (~10 changes)
Focus: Reorder homepage sections, replace partner placeholders with real names, add nav dropdown, page transitions, footer polish

Key edits vs the original prompt:
- Skip items already done (#1 index.html, #4 LiveCounter, #5 CountUp — all exist)
- Execute: #3 (move "Your Role" up), #6 (real partner names), #7 (footer), #8 (nav dropdown), #9 (See It Live thumbnails), #10 (page transitions)
- **New edit:** Change "I'm a Coach" card link from `/dashboard` to `/coaches`

### Pass 2: V4b — Coaches + Scout + Curriculum (~9 changes)
Focus: CoachCard hover smoothing, quiz result card, rising star enhancements, curriculum celebrations, social proof strip

All items are net-new. Execute as written.

### Pass 3: V4c — AI Hub + Dashboard + Rewards (~9 changes)
Focus: Court SVG overlay, sparklines, sequential reveal, comparison bars, weekly earnings chart, Court Kings gear card

Key edits:
- Skip V4c #5 (time leverage sizing) — already at `text-5xl lg:text-6xl`
- Execute the comparison bar visual as an addition to the existing card
- **New edit:** Add "AI Confidence: 94.2%" badge from V4d #4 here instead (it's an AI Hub change, fits better in V4c)

### Pass 4: V4d — Credibility Layer (~6 changes)
Focus: Testimonials, partnership value exchange visual, "Why Coaches Love This" stats, chat demo question, mobile CTA bar

Key edits:
- Move V4d #4 (AI confidence badge) to V4c — already handled
- **New:** Add pricing teaser below testimonials (stakeholder gap fix)
- Execute the rest as written

### Estimated scope per pass:
- V4a: ~7 meaningful changes (3 already done, skip those)
- V4b: ~9 changes (all new)
- V4c: ~8 changes (1 already done, add 1 from V4d)
- V4d: ~6 changes (moved 1 to V4c, added 1 new)

Total: ~30 changes across 4 passes, each well within the attention budget.

## Technical Approach

- All changes are to existing files — no new pages or components needed
- Partner names array swap is a one-liner in `Index.tsx`
- Nav dropdown uses existing shadcn DropdownMenu component
- Page transitions wrap Routes in AnimatePresence (App.tsx)
- SVG court overlay is inline SVG in AIHub.tsx
- Sparklines are simple `<svg><polyline>` elements — no charting library
- Weekly earnings chart uses div bars like the prompt specifies
- Sequential reveal uses staggered framer-motion delays
- Mobile CTA bar is a new fixed-bottom div in App.tsx, hidden on `lg:`

