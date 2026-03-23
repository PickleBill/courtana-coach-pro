

# V3 Prompt Grade + Reviewer Skill Analysis

## Part 1: Grading the V3 Prompt

### Prompt Grade: 39/50

| Dimension | Score | Quick Note |
|---|---|---|
| Context Clarity | 9/10 | Exceptional — business context, stakeholder names, demo timeline, and JV stakes are all explicit. Lovable knows exactly what this is for. |
| Specificity | 8/10 | Strong — references exact copy ("$75 one-time / Free for Gold subscribers"), color codes, stat values, grade systems. Loses points for some "make it larger" / "more prominent" directives without pixel/class specifics. |
| Scope Control | 4/10 | This is where it breaks down. 8 page-level sections + 4 new global features + footer + transitions + a 12-item checklist. This is realistically 3-4 separate prompts crammed into one. Lovable applied ~70% and dropped or simplified the rest. |
| Lovable-Native | 8/10 | References Tailwind, shadcn/ui Badge, Framer Motion, IntersectionObserver patterns. Doesn't fight the stack. Loses a point for not referencing actual component filenames (e.g., "the curriculum page" vs "Curriculum.tsx") and not naming existing CSS utilities. |
| Outcome Definition | 10/10 | The checklist at the end is exactly what Lovable needs. Explicit verification items. Business reason (demo tomorrow) is crystal clear throughout. |

### What Worked

- **Business context is elite.** "Rich will ask about money. This answers it visually." — this kind of directive gives Lovable intent, not just instruction. It produced a revenue share visualization that actually tells a story.
- **The checklist at the bottom.** 12 verification items gave Lovable a clear "definition of done." This is a pattern worth reusing on every prompt.
- **Concrete copy suggestions.** Providing exact strings like "You reviewed 47 sessions this week, earning $X in Y hours" meant Lovable didn't have to invent copy — and the output matched almost verbatim.
- **Layered priority.** Calling the AI Analysis page "makes or breaks the demo" told Lovable where to invest the most effort. That page got the richest treatment.

### What Probably Confused Lovable (or Got Dropped)

- **Scope overload.** 8 sections + 4 new features + global changes. Lovable likely ran into token/attention limits. The "Tournament & Event Finder" feature was deprioritized or dropped entirely. The partner ecosystem scroll was simplified.
- **"Make this LARGER and more prominent"** appears multiple times without specifying what "larger" means (text-5xl? A dedicated hero card? Full-width?). Lovable interprets this inconsistently.
- **Competing instructions.** The prompt says "pick at least 2" for AI features but then describes all 4 in full detail with equal weight. Lovable tried to do all 4, which diluted each one.
- **Missing file anchors.** No component filenames referenced. "The curriculum page" works but "Curriculum.tsx — the module timeline section around line 80" would prevent Lovable from accidentally restructuring things that already work.

### Suggested Improvements (High-Leverage Fixes)

1. **Split into 2 prompts.** Prompt A: "Polish existing 7 pages" (the fixes). Prompt B: "Add Ask a Pro chat + Activity Ticker + Coach Match Quiz." Lovable handles 3-5 focused changes much better than 15+ spread across everything.

2. **Replace subjective size directives with concrete ones.** Instead of "make the time leverage card LARGER and more prominent," say: "Move the time leverage stat card to the top of Dashboard.tsx, make it full-width (col-span-full), use text-4xl for the dollar figure, and add a subtle border-primary/20 glow."

3. **Use component filenames.** Every section header should include `(ComponentName.tsx)` so Lovable edits the right file and doesn't create duplicates.

4. **Cut the "pick at least 2" hedging.** Either commit to specific features or split them into separate prompts. Ambiguous priority = Lovable guessing.

---

## Part 2: Review of the Skill Files

### lovable-prompt-grader.skill — Grade: Strong Foundation

**What works well:**
- The 5-dimension rubric is solid and covers the real failure modes (scope, specificity, outcome).
- Tone guidance ("28/50 isn't bad") prevents the grader from being discouraging.
- The "Pattern Lesson" section catches recurring habits — high value.

**Gaps / Suggested Edits:**

1. **Missing dimension: Priority Signaling (0-10).** Lovable has limited attention per prompt. The best prompts tell it *what matters most*. This is distinct from scope — a prompt can be well-scoped but give equal weight to everything. Add:
   - 9-10: Explicitly ranks items or uses language like "this is the most important change"
   - 6-8: Some implicit prioritization through ordering
   - 3-5: Everything presented with equal weight
   - 0-2: Flat list, no signal of what to do first

2. **Missing dimension: Anchoring to Existing Code (0-10).** The "Lovable-Native" dimension covers stack alignment but not whether the prompt references *what already exists*. Prompts that say "the hero section in Index.tsx" vs "the hero section" get dramatically different results. Add:
   - 9-10: References filenames, component names, existing CSS classes
   - 6-8: References pages/sections by name but not files
   - 3-5: Generic references ("the landing page")
   - 0-2: No anchoring — Lovable may create duplicates

3. **The rubric should be /70 not /50** with the two new dimensions. Or keep /50 and fold Anchoring into Lovable-Native (making it "Lovable-Native & Code Anchoring").

4. **Add a "Prompt Type Classification" step** before grading. Different prompt types have different optimal patterns:
   - **Greenfield** (build from scratch): Context Clarity matters most
   - **Iteration** (V2/V3 polish): Anchoring and Specificity matter most
   - **Feature Addition**: Scope Control matters most
   - This lets the grader weight dimensions appropriately rather than treating all prompts the same.

### lovable-reviewer-v2.skill — Grade: Comprehensive but Operationally Heavy

**What works well:**
- Quick mode vs deep-dive split is excellent — matches real usage patterns.
- The branding checklist (duplicate title tags, Lovable meta, OG images) catches the #1 most common Lovable artifact.
- "Reference actual component names, file paths, and design tokens" — this is the single best instruction in the entire skill.

**Gaps / Suggested Edits:**

1. **The `git clone` step is fragile.** Lovable projects are in-workspace — the reviewer should use `read_file` / `list_dir` / `search_files` tools first, not assume GitHub access. Rewrite Step 2 to: "If reviewing the current workspace, use file tools. If reviewing an external project, ask for repo URL."

2. **Missing: Output Calibration.** The generated prompts from V2 reviewer tend to be too long (the V3 prompt in this conversation is proof — it's ~3000 words). Add a rule: "Generated prompts should target 800-1200 words max. If the change set exceeds this, split into multiple numbered prompts (V3a, V3b) with clear dependencies."

3. **Missing: Before/After Verification.** The checklist says "Post-Apply Check" but doesn't instruct the reviewer to *look at what Lovable actually did* after the prompt was applied. Add: "If the user shares the result, compare intent vs output and generate a focused follow-up prompt for gaps."

4. **The strategic context section is under-specified.** "Use the master context file to add deal-aware observations" is good but needs examples. Add: "For demo-focused reviews, every section critique should answer: 'Would [stakeholder name] notice this? Would it help or hurt the pitch?'"

5. **Add a "Prompt Complexity Budget" rule.** Something like: "Count the number of distinct changes in the generated prompt. If it exceeds 15, split it. Lovable's attention degrades noticeably past ~12 specific instructions per prompt."

---

## Part 3: Proposed V3 Reviewer Skill — "Lovable Prompt Strategist"

This isn't a replacement — it's a companion that sits *above* the grader and reviewer. Its job is **prompt sequencing and architecture** rather than content critique.

### Core Concept

When a user has a complex project (like this Courtana ecosystem), the biggest failure mode isn't bad individual prompts — it's bad *prompt strategy*. The V3 prompt scored 39/50 on content quality but would score ~5/10 on "strategic prompt design" because it tried to do too much in one shot.

### What It Would Do

1. **Decompose a mega-prompt into an ordered sequence** of 3-5 focused prompts, each under 1000 words, with explicit dependencies.

2. **Assign a "Lovable Attention Budget"** to each prompt — estimate how many distinct changes Lovable can reliably apply (rule of thumb: 8-12 specific changes per prompt, fewer if they're complex).

3. **Identify "load-bearing" changes** that affect multiple pages (design system, shared components, nav) and sequence those first.

4. **Generate a "Demo Script"** for investor/pitch contexts — not just what to build but what order to click through during the call, what to say at each page, what to skip.

### Example Output

For the V3 prompt, it would have produced:

```text
Prompt Sequence for V3:
  V3a: Global polish (meta tags, sign-in modal, nav active states, footer) — 8 changes
  V3b: Landing page (How It Works, See It Live, partners, count-up animations) — 10 changes
  V3c: Coach + Scout + Curriculum page fixes — 9 changes
  V3d: AI Hub overhaul (the demo centerpiece) — 7 changes
  V3e: New features (Ask a Pro chat, Activity Ticker) — 6 changes

Estimated total: 5 prompts × ~900 words = 4500 words across prompts
vs. current: 1 prompt × 3000 words with ~70% application rate

Demo click-through order: Landing → AI Hub → Coaches → Scout → Dashboard → Rewards
```

This skill would be highest-value for users doing multi-iteration projects with business stakes.

---

## Summary: What to Feed Back to Claude

**For the Grader:** Add "Priority Signaling" and "Code Anchoring" dimensions (or fold anchoring into Lovable-Native). Add prompt type classification. Total becomes /60 or /70.

**For the Reviewer V2:** Add prompt length caps (~1000 words), split rules (>15 changes = split), and before/after comparison. Fix the git clone assumption.

**For a new V3 "Strategist" skill:** Focus on prompt sequencing, attention budgets, and demo scripting. This is the meta-layer that prevents 3000-word mega-prompts.

**The single biggest lesson from this real data:** The V3 prompt had excellent *content* but poor *delivery architecture*. It would have produced better results as 3-4 smaller prompts than 1 large one. The skills should encode this principle.

