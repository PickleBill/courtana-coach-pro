# Courtana Coach Pro — Master Context Document

> Single source of truth for all Courtana-related links, APIs, partners, personas, and integration points.
> Last updated: 2026-03-23

---

## 🔗 Live Links

### Courtana Platform
| Label | URL | Notes |
|-------|-----|-------|
| Homepage | https://courtana.com/ | Smart court platform |
| Player Profile (sample) | https://courtana.com/player/bGLx1SV3k1lT/ | Real player with badges, XP, rank |
| Session Highlights (sample) | https://courtana.com/session-highlights/J8UKbUJaBKxT | Real highlight clips |
| AI Analysis | https://courtana.com/ai-analysis/ | AI shot analysis tool |
| Signup | https://courtana.com/signup/ | Basic signup flow |
| Facility Signup | https://courtana.com/facility/3/courts/qgvE48pkCVOp/play-highlights/ | QR code / facility signup |

### Live Display Feeds
| Location | URL | Type |
|----------|-----|------|
| Seven Oaks (Outdoor) | https://courtana.com/display/3AELvCgGmzas/ | Outdoor facility |
| The Underground | https://courtana.com/display/Sy6gIO44K3MG/ | Indoor flagship |

### Partner Sites
| Partner | URL | Integration |
|---------|-----|-------------|
| Court Kings | https://courtkings.com/ | Court builder partner |
| Court Kings Shop | https://shop.courtkings.com/ | Merch & gear |
| Freakshow Paddles | https://freak-flow-hub.lovable.app/ | Paddle partner demo |

---

## 👤 AI Chat Personas

| Persona | Sport | Emoji | Social | Notes |
|---------|-------|-------|--------|-------|
| Anna Leigh Waters | Pickleball | 🏓 | — | Net play, speed-ups, doubles |
| Carlos Alcaraz | Tennis | 🎾 | — | Groundstrokes, footwork, intensity |
| Bryant | Padel | 🏸 | [@padelbryant](https://www.instagram.com/padelbryant/) | Wall play, bandeja, positioning |
| AI Coach | All Sports | 🤖 | — | Data-driven analysis |
| Chuck Norris | Everything | 🥋 | — | Wildcard / humor. CTAs → rickroll |

### Chuck Norris CTA Pattern
All Chuck responses include:
1. A "secret video" link → YouTube rickroll (`https://www.youtube.com/watch?v=dQw4w9WgXcQ`)
2. A real CTA (signup, gear, curriculum)

---

## 🎬 Session Highlights & AI Coaching Videos

> **Placeholder** — Drop share links here as they become available:

| Video | URL | Use Location |
|-------|-----|-------------|
| _Example: AI Coaching Overlay_ | _TBD_ | AI Hub, Chat |
| _Example: Session Highlight Reel_ | _TBD_ | Landing page, Chat |
| _Example: Pro Review Demo_ | _TBD_ | AI Hub |

---

## 🔑 API Keys & Secrets

| Service | Key Type | Status | Notes |
|---------|----------|--------|-------|
| Stripe | Publishable (test) | ✅ Connected | `pk_test_51TE9VX...` |
| Stripe | Secret | ⏳ Needed | For edge function checkout |
| Google OAuth | Client ID | ⏳ Needed | For Google sign-in |
| Apple Sign-In | Credentials | ⏳ Needed | For Apple sign-in |
| Lovable AI | LOVABLE_API_KEY | ✅ Auto-provisioned | For AI chat edge functions |

---

## 🏗️ Court Kings Partnership Context

- **CEO**: Rich
- **Pitch**: Joint venture evaluation ($250-500K)
- **Value prop**: Every CK facility ships with built-in coaching ecosystem
- **Stats**: 48+ facilities, 24+ with Courtana integration
- **Key metric for Rich**: Coach time leverage ($1,100+/hr effective rate)

---

## 📊 App Architecture

| Page | Route | Primary Audience |
|------|-------|-----------------|
| Ecosystem (Landing) | `/` | All visitors |
| Coach Marketplace | `/coaches` | Players |
| Scout & Draft | `/scout` | Pros & coaches |
| Curriculum | `/curriculum` | Players (auth required) |
| AI Analysis Hub | `/ai-hub` | Players |
| Rewards | `/rewards` | Players |
| Coach Dashboard | `/dashboard` | Coaches (auth required) |

---

## 🎯 Future Integration Ideas

- [ ] Ghost user creation in Courtana from Coach Pro signup
- [ ] Auto-populate email between platforms
- [ ] Bulk upload session highlights
- [ ] Live display "Tune In" embedded iframe
- [ ] Coach influencer social links (Jack Munro, etc.)
- [ ] DUPR API integration for real ratings
- [ ] Tournament signup deep links
