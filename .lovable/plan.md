

# V5 Sequence Implementation Plan

## What the V5 Prompts Do

Three sequential prompts that layer on top of V4:

**V5a — Demo Polish + Real Partner Data** (~8 changes)
Wire broken Quick Action buttons in Dashboard.tsx, add "Court Kings Facilities: 24+" stat to Index.tsx stats bar, replace partner ticker with real CK partner names, add pilot facility pills to the Court Kings section, add Chuck Norris persona to AskAProChat.tsx (live API call to chucknorris.io), add welcome message to chat, add coach search input to Coaches.tsx, wire navbar CTA.

**V5b — AI Edge Features + Matchmaking** (~3 components + 3 refinements)
New TournamentFeed.tsx component with mock tournament data from real CK venues, new MatchmakingModal.tsx (3-step "Tinder for pickleball" flow), add "Analyzing" pulse badge + "CourtSense Shot Analysis" branding + data layer stats row to AIHub.tsx.

**V5c — DaaS Vision + Court Kings Shop + Rewards** (~3 components + 3 edits)
New CourtAvailabilityBar.tsx (live court marquee for Index.tsx), new CourtKingsShop.tsx (3 real CK products with Shopify CDN images for Rewards.tsx), "Earn XP at Court Kings" CTA card on Rewards, "Share with Coach" button + Pickle DaaS teaser section on AIHub.tsx, dismissible demo banner on Dashboard, DUPR keyword response in AskAProChat.

## Current State Assessment

- **Navbar CTA**: Currently has `scrollToPartner` — V5a wants it to navigate to `/coaches`. Simple fix.
- **Quick Actions**: Currently 3 buttons (Review/Message/Curriculum) with no navigation wiring. V5a wants 4 wired buttons.
- **Partner ticker**: Already has real names (Court Kings, PPA Tour, DUPR, etc.) — V5a's list overlaps ~70%. Will merge, adding Centerline Athletics, Dink Dynamics, Dinkville Nashville, Cellutrex.
- **Chuck Norris**: Entirely new — AskAProChat has 3 personas, needs a 4th with live API.
- **Tournament/Matchmaking**: Entirely new components for AIHub.
- **Court Kings Shop**: New component using real Shopify CDN product images.
- **CourtAvailabilityBar**: New component for Index.

## Edits to the Sequence

1. **V5a partner names**: The current `partnerNames` array already has Court Kings, PPA Tour, DUPR, Black Barn, etc. I'll merge rather than replace — keeping existing good names and adding the CK-specific ones (Centerline Athletics, Dink Dynamics, Dinkville Nashville, Cellutrex).

2. **V5a Quick Actions**: The prompt says 4 buttons but current code has 3. I'll add the 4th ("Send Update") and wire all with `useNavigate` + toast.

3. **V5a stats bar**: Need to find where the stats are rendered in Index.tsx and add the Court Kings entry.

4. **V5b AIHub state**: Need to add `matchOpen` state and wire both new components into the existing AIHub page layout.

5. **V5c product images**: These reference `shop.courtkings.com` CDN URLs — will use directly as `<img>` sources. If CORS blocks them, I'll add fallback placeholder styling.

## Uploaded Assets Plan

The uploaded files (MHTML pages, levelup.png, courtana.ai) are **reference only** for now. After V5 is stable, the next pass could:
- Copy the levelup.png to `src/assets/` and use it as a visual in the Rewards or Curriculum page to show the gamification TV overlay
- Extract visual patterns from the Courtana profile/session MHTML to align card layouts
- Use the AI Analysis MHTML structure to make our AIHub shot grades match the real Courtana UI more closely

For now, these inform design decisions but don't get embedded directly.

## Execution Order

1. **Pass 1 (V5a)**: Wire navbar, add CK stat, merge partner names, add pilot facility pills, wire quick actions, add Chuck Norris persona + welcome message, add coach search
2. **Pass 2 (V5b)**: Create TournamentFeed + MatchmakingModal, add to AIHub with state, add Analyzing badge + CourtSense branding + data layer stats
3. **Pass 3 (V5c)**: Create CourtAvailabilityBar + CourtKingsShop, add to Index/Rewards, add Earn XP card, add Share + DaaS teaser to AIHub, add demo banner to Dashboard, add DUPR response to chat

Files touched per pass:
- V5a: `Navbar.tsx`, `Index.tsx`, `Dashboard.tsx`, `AskAProChat.tsx`, `Coaches.tsx`
- V5b: New `TournamentFeed.tsx`, new `MatchmakingModal.tsx`, `AIHub.tsx`
- V5c: New `CourtAvailabilityBar.tsx`, new `CourtKingsShop.tsx`, `Index.tsx`, `Rewards.tsx`, `AIHub.tsx`, `Dashboard.tsx`, `AskAProChat.tsx`

