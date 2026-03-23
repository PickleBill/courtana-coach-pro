# Courtana Coaching Ecosystem — MVP

A multi-page interactive app that showcases and enables the full async coaching ecosystem, extending beyond Courtana-powered courts. Dark theme with Courtana's green (#00E676) accent, inspired by both existing sites but built fresh.

## Pages & Key Flows

### 1. Landing / Ecosystem Overview

- Hero: "The Coaching Ecosystem for Racquet Sports" — positions this as the layer on top of Courtana's smart court -> yes but we can do better with hero.  Thinking "King of the Court" - the royal or future of racket sports network something like that
- Animated flywheel diagram showing: **Smart Court → AI Analysis → Coach Network → Player Growth → Experiences & Rewards** — all connected
- Three audience entry points: "I'm a Player," "I'm a Coach," "I'm a Pro/Celebrity" — each links to their respective flow
- Social proof stats (sessions analyzed, coaches, revenue generated)

### NOTE -> I moved the sections around and importantly, I wanna focus on the coaching in pro part of this.… You can do whatever order you want, but I just want you to know that and there's a bit more context behind this. We have a call with [CourtKings.com](http://CourtKings.com) ....

**--**

**CourtKings Partnership Context:** Court Kings ([courtkings.com](http://courtkings.com)) is the official USA Pickleball partner and nationwide leader in pickleball court construction, led by CEO Rich with CRO Bryan Pettit (ex-PPA Tour) and COO Nate Adams. They bring brand recognition, pro player relationships (Ben Johns level), franchise/facility access across the US, and deep industry distribution — but no tech. They want to co-build the coaching ecosystem layer powered by Cortana's AI and smart court infrastructure. Their vision: a scalable, AI-driven async coaching platform where elite pros (Ben Johns, Annalee Waters) approve and mentor tiered coaching networks, players globally can subscribe to personalized video coaching at any price point, and facilities embed the tech to differentiate and drive foot traffic. The JV model combines Court Kings' brand/distribution/pro network with Cortana's AI coaching engine, video analysis, gamification, and smart court hardware. Dual revenue: facilities pay for coaching tech ($250/mo+), consumers subscribe for personal coaching ($50-500 depending on tier). Initial pilots planned at Black Barn Pickleball (Ohio) and 3 Nashville facilities. MVP target: 1-2 months, $250-500K ballpark. Court Kings cares most about: the pro coach network hierarchy, async coaching that scales beyond physical presence, data/analytics as a revenue asset, and experiences/rewards that keep players engaged. This demo should showcase how that full coaching ecosystem looks and feels from the player, coach, and pro/celebrity perspectives — with Court Kings' vision of a global coaching marketplace built on top of Cortana-powered courts.

--

### 2. Coach Marketplace / Network

- **Tiered coach directory:**
  - **Celebrity Tier** — Ben Johns, Annalee Waters level. Brief video review, premium price ($500+), limited slots
  - **Certified Coaches** — vetted by a pro, part of their network. Detailed async coaching ($50-150)
  - **Rising Stars** — up-and-coming players who coach (from the audition/draft concept). Affordable entry point
- Each coach card: avatar, sport, specialties, rating, price, "their network" indicator (e.g., "Ben Johns Certified")
- Coach detail page: bio, methodology, sample AI prompts they use, curriculum preview, reviews

### 3. Pro Scout / Draft (from Audition)

- Mentor mode: Pros/coaches browse rising stars, draft them to their coaching network
- Rising star profiles with DUPR, sample clips, what they're looking for
- Revenue share model displayed: how earnings split between pro → certified coach → platform

### 4. Curriculum & Player Progress

- A coach assigns a curriculum to a student: sequence of drills, focus areas, video submissions
- Progress dashboard: completion %, skill radar chart, coach feedback history
- Milestone rewards tied to curriculum completion (unlocks experiences — see below)



### 6. AI Coaching Hub (Player View) - moved down.

- Upload video or connect a Courtana session for AI analysis
- AI analysis results card: shot grades, strengths/weaknesses, drills recommended (mock data inspired by your existing courtanacoach site)
- "Request Pro Review" CTA — sends the analysis to a coach for async feedback
- Coach feedback overlay: a coach's personalized notes layered on top of the AI analysis, showing the human + AI combo

### 6. Experiences & Rewards Store

- Tiered rewards unlocked by coaching engagement:
  - **Silver**: Custom merch, signed paddles
  - **Gold**: VIP seats at PPA/tournaments, "play with a pro" events
  - **Platinum**: Private clinic with a celebrity coach, courtside at Wimbledon
- Each reward card shows: what it is, how to earn it, spots remaining
- E-commerce integration placeholder for purchasing experiences/merch

### 7. Revenue Model / Coach Dashboard

- Coach-side view: earnings breakdown, student roster, pending reviews
- Shows the layered revenue share: Celebrity → their certified coaches → platform cut
- Time leverage metrics: "You reviewed 47 sessions this week, earning $X in Y hours"

## Design & UX

- Dark theme matching Courtana's brand (dark navy/charcoal background, #00E676 green accents, white text)
- Courtana logo in the nav, consistent with courtana.com branding
- Card-heavy layout with glassmorphism effects, similar to the TV display screenshots
- All data is mock/static for the MVP — no backend required initially
- Responsive for desktop-first, mobile-friendly

## Technical Approach

- React + Tailwind + shadcn/ui in this project
- Static mock data for coaches, players, curricula, and rewards
- Smooth scroll navigation and page transitions
- Framer Motion for key animations (flywheel, level-up moments)