

# Rebrand to "Kings of The Court" + Final Design Polish

## Branding Change

**Current:** "King of the Courtana" with a pickleball-crown SVG logo that looks silly
**New:** "Kings of The Court" with tagline "Coaching powered by Courtana"

### Logo Replacement
Replace the `PickleballCrownLogo` SVG with a clean, minimal crown icon — just 3 sharp crown points in gold, no pickleball. Simple, elegant, not cartoonish. Small enough to sit next to the text naturally.

### Navbar Text
- Line 1: **Kings of The Court** (font-display, bold)
- Line 2: **Coaching powered by Courtana** (tiny tagline, primary/60 color)

### Hero Update
- `King of the` → `Kings of The`
- `Courtana` (green gradient) → `Court` (green gradient)
- Badge: "Powered by Courtana × Court Kings" stays

### All References Updated
- `index.html` title + OG tags
- `usePageTitle` call in Index.tsx
- Footer brand name
- Any other "King of the Courtana" strings

## Final Design Polish

### Hero Section
- Tighten spacing — the hero feels too tall with too much dead space. Reduce `pt-28 pb-20 lg:pt-40 lg:pb-32` to `pt-24 pb-16 lg:pt-32 lg:pb-24`
- Make the live sessions counter more visible — bump opacity
- Ensure the network background animation is subtle but visible

### General Polish Pass
- Verify all page transitions feel smooth
- Ensure consistent section spacing across pages
- Check that the notification bell, auth flow, and all interactive elements are visually cohesive

## Files Impacted

| File | Changes |
|---|---|
| `src/components/Navbar.tsx` | New crown logo, "Kings of The Court" + tagline |
| `src/pages/Index.tsx` | Hero title, page title, hero spacing |
| `src/components/Footer.tsx` | Brand name update |
| `index.html` | Title + meta tags |

