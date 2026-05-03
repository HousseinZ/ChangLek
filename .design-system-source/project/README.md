# ChangLek Design System

> **Learn · Grow · Shine** — design system for ChangLek (ช้างเล็ก, "Little Elephant"), an English teaching center for Thai kids ages 3–12.

ChangLek is the brand. **Nong** (น้อง, "little one") is our mascot — a friendly baby elephant who learns alongside the kids. The brand name is always styled **ChangLek** (camel case, one word).

---

## At a glance

| Thing | Answer |
|---|---|
| **Brand name** | ChangLek |
| **Mascot** | Nong, a baby elephant — gray body, pink ears, yellow bow tie, often winking |
| **Tagline** | Learn · Grow · Shine |
| **Audience** | Thai parents (decision makers) + their kids ages 3–12 (end users) |
| **Tone** | Playful & energetic, but trustworthy. Like a fun friend who's also a great teacher. |
| **Languages** | Bilingual — Thai for parents, English for kids learning |
| **Primary palette** | Warm sunset — coral orange, golden amber, soft cream |
| **Accent** | Soft sky blue (Nong's wink) |
| **Visual style** | Friendly geometric — Duolingo-adjacent, rounded everything, generous whitespace |
| **Fonts** | **Knewave** for hero/tagline accent (uploaded by user), **Baloo 2** for display, **Nunito** for body, **Noto Sans Thai Looped** for Thai |

---

## Sources & inputs

This system was created from:

1. **Logo file** — uploaded by the user (`uploads/logo_upload-1777651758326.png`, copied to `assets/logo-full.png`). The logo includes Nong the elephant, a multi-hue wordmark ("ChangLek" with each letter in blue/green/orange/purple/pink/teal), and the curved tagline "Learn · Grow · Shine".
2. **User questionnaire** — direction on palette (warm orange + sky blue accent), audience lean (parent-trustworthy with kid-friendly accents), products (kid learning app + parent dashboard), tone (playful & energetic), and font family (rounded & friendly).
3. **No codebase or Figma was provided** — components, screens, and color tokens here are **original work**, designed to fit the brand the logo establishes. Substitute these with real product code if/when it exists.

---

## Index — what's in this project

```
README.md                     ← you are here
SKILL.md                      ← Agent Skill manifest, for Claude Code use
colors_and_type.css           ← all color + type tokens, semantic CSS vars
fonts/
  Knewave-Regular.ttf         ← brand display accent (uploaded by user)
assets/
  logo-full.png               ← original logo (Nong + wordmark + tagline)
  logo-wordmark.svg           ← "ChangLek" wordmark, multi-color letters
  app-icon.png                ← square app icon, cream rounded bg
  nong-mascot.png             ← Nong isolated, transparent-ready
  nong-avatar.png             ← Nong in a circle, for avatars
  pattern-confetti.svg        ← repeating celebration pattern
  sticker-star.svg            ← yellow star sticker
  sticker-confetti-burst.svg  ← burst of streamers
  sticker-bubble-abc.svg      ← speech bubble with ABC
preview/                      ← cards shown in the Design System tab
ui_kits/
  kid_app_web/                ← lessons, games, mascot interactions (web)
    index.html, components.jsx, screens.jsx, browser-window.jsx, README.md
  parent_dashboard/           ← progress, billing, scheduling (web)
    index.html, components.jsx, screens.jsx, browser-window.jsx, README.md
```

Open `colors_and_type.css` first if you want to start building. Open `ui_kits/<product>/index.html` for an interactive demo of each surface.

---

## CONTENT FUNDAMENTALS

### Voice
ChangLek talks like **a kind, slightly silly older sibling who is also a great teacher**. Encouraging, never condescending. We celebrate effort more than correctness.

- **Pronouns:** "you" (parents) and "your little one" / "your kid". For kids reading, second person too — "Let's go!", "You did it!".
- **Casing:** Sentence case for everything except the brand name (always `ChangLek`) and Nong's name. **No ALL CAPS** for buttons or headings — it feels stern. Title Case is fine for proper nouns and course names.
- **Emoji:** Sparingly and only kid-facing. ⭐️ 🎉 👏 are fine in lesson screens or celebration toasts. Never in parent-facing copy (billing, schedules, progress reports). When in doubt, use a Nong sticker or an SVG icon instead.
- **Length:** Short. Headlines under 8 words. Buttons are 1–3 words. Body copy is direct.
- **Numbers:** Numerals always (`3 years`, not `three years`). Currency in THB (`฿1,290 / month`).

### Tone matrix

| Surface | Lean |
|---|---|
| Marketing → Parents | **Trustworthy + warm.** Lead with outcomes, end with a smile. |
| Parent dashboard | **Clear + reassuring.** Less mascot, more numbers and progress. |
| Kid lesson app | **Playful + celebratory.** Mascot present, big buttons, sound + motion. |
| Errors / billing | **Plain + helpful.** Drop the mascot. Be a calm adult. |

### Examples

✅ Good
- Hero: **"English that little ears love."** / *ภาษาอังกฤษที่หูน้อยๆ ชอบ*
- Button: **Start free trial** (not "GET STARTED NOW!!")
- Empty state: "No homework today — go play!" + small Nong waving
- Streak toast: "5 days in a row! 🎉 Nong is so proud."
- Billing: "Your next charge is ฿1,290 on May 15." (no mascot, no exclamation)

❌ Avoid
- "UNLOCK YOUR CHILD'S POTENTIAL TODAY!!!" — too marketing-y
- "Oopsie woopsie 🥺 something went wrong" — too cutesy for an error
- "Click here" — vague; say what happens
- Long marketing paragraphs — break into bullets or pair with imagery

### Bilingual rules
- **Marketing + parent surfaces:** Thai is primary, English is the supporting accent (and the proof-of-product, since we teach English). Format: Thai sentence, English subhead in lighter weight underneath, OR English headline + Thai translation underneath in 80% size.
- **Kid lessons:** Whichever the lesson is teaching is primary. The other language is small/optional.
- Never mix mid-sentence except for the brand and product names.

---

## VISUAL FOUNDATIONS

### Color
- **Primary** is `--coral-500` (#FF7A45) — warm, energetic, the color of late-afternoon sun. This is the CTA color and the "ChangLek" brand color when used as a single hue.
- **Secondary warms** sweep amber → gold → cream: `--amber-500`, `--gold-400`, `--cream-100`. These build the warm sunset gradient backgrounds.
- **Accent** is `--sky-400` (#4FB8E5) — Nong's wink color. Used for trust signals (verified, secure, info), links in body copy, and to balance large warm areas. Never let sky blue exceed ~15% of a composition's color area.
- **Neutrals** are warm-tinted (slight rose/amber bias), not pure gray. Pure gray feels cold next to coral.
- **Celebration palette** = the six logo letters. Used **only** for kid-facing celebration moments, achievement badges, and decorative confetti. Never for UI chrome, never as a gradient.
- **Semantic:** success uses a leafy `--success-500`, warning leans amber (close to brand), danger is a desaturated coral-red (so errors don't shout).

### Typography
- **Brand accent:** **Knewave** — heavy, hand-drawn, all-caps display. Use *only* for big hero / tagline moments (`"LEARN · GROW · SHINE"`, splash screens, marketing key art). Never for UI chrome, never under 32px. Pair with cream backgrounds; the texture reads as warm-marker.
- **Display:** **Baloo 2** — chunky, rounded, friendly. For all H1/H2 and large hero numbers. Always `font-weight: 700` or `800` at display sizes.
- **Body:** **Nunito** — clean, rounded sans, very legible at small sizes. Weights 400 / 600 / 700.
- **Thai:** **Noto Sans Thai Looped** — the looped Thai script feels rounder and more childlike, better matched to Baloo than the unlooped style.
- **No serifs.** No monospace except in dev/admin contexts (use `JetBrains Mono`).
- **Line height:** generous — 1.5 for body, 1.15–1.25 for display.
- **Letter spacing:** zero for display (Baloo's drawn that way). +0.01em for tiny caps labels.
- **Minimum body size 16px**, ideally 17–18px since parents are reading on phones.

### Spacing & layout
- Base unit **4px**. Spacing scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 56 / 80 / 120.
- Grid: 12-col on web, 4-col on mobile, 24px gutters by default, generous outer margin.
- **Generous whitespace.** Kid-friendly does not mean cluttered. Cards breathe.
- Layouts use **off-grid playful elements** — a Nong sticker peeking past a card edge, a star floating in negative space, a tilted (-3deg or +5deg) callout.

### Backgrounds
- **Default surface:** `--cream-50` (#FFFCF5). Almost-but-not-quite white, warmer.
- **Hero / featured:** soft sunset gradient — `--cream-100` → `--gold-100` → `--coral-100`. Very low saturation. Never harsh.
- **Kid lesson screens:** can go bolder — full coral or amber backgrounds with white cards on top.
- **Confetti pattern** (`assets/pattern-confetti.svg`) — small, sparse, used as background texture on celebration screens at low opacity (15–25%).
- **No photographs as background** unless they're real classroom photos with a coral/cream color overlay. Stock photography is forbidden.

### Corners, borders, shadows
- **Border radius scale:** `--r-sm: 8px`, `--r-md: 14px`, `--r-lg: 20px`, `--r-xl: 28px`, `--r-pill: 999px`.
- Cards default to `--r-lg` (20px). Buttons default to `--r-pill`. Inputs `--r-md`.
- **Borders are rare.** Most cards use shadow + cream background, not a 1px line. When a border is used, it's 2px and uses a warm neutral.
- **Shadows are warm-tinted, not gray.** Use `0 4px 16px rgba(255, 122, 69, 0.08)` for default cards; deepen for elevated. Never use neutral black shadows — they look cold against cream.
- Cards rest on **gentle bottom-only shadow + a 1–2px inner highlight at top** for a tactile, almost-3D feel. Think: chunky candy.

### Buttons (the signature touch)
- **Primary buttons have a "press depth" effect**: the button has a 3–4px solid shadow underneath in a darker shade of itself. On press, the button moves down 2px and the shadow shrinks. This is the brand's most distinctive interaction — it makes everything feel like a physical, pressable kid's toy.
- Hover: brightens by ~6% + tiny scale (1.02). Press: depth shrinks + scale to 0.98.
- All transitions use `cubic-bezier(0.34, 1.56, 0.64, 1)` (back-out / "bouncy") — never linear.

### Animation
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` for bouncy entrances, `cubic-bezier(0.4, 0, 0.2, 1)` for everything else.
- **Durations:** 150ms micro, 250ms standard, 400ms emphasized, 600ms+ for celebration moments.
- **Mascot wiggle:** Nong has a gentle idle wiggle (±2deg, 3s loop) on lesson screens.
- **Celebrations:** confetti burst + scale-bounce on achievement. Use sparingly — only for streaks, level-ups, lesson completion. Never for routine clicks.
- **No fades by themselves.** Always pair fade with a slight upward translate (8–12px) for entry.

### Hover & press states
- **Buttons:** see above (depth + scale).
- **Cards (interactive):** lift 2px + shadow grows. No color change.
- **Links in body copy:** underline appears on hover, color stays sky blue.
- **Disabled:** 40% opacity, no shadow, no transitions.

### Transparency & blur
- Used **rarely**. The brand is bright and confident, not glassy.
- Sticky headers: `rgba(255, 252, 245, 0.85)` + `backdrop-filter: blur(12px)` is acceptable.
- Modals: page overlay is `rgba(74, 47, 30, 0.5)` (warm dark, not pure black).

### Imagery
- **Color vibe:** warm, golden-hour, soft contrast. Never cool/blue, never high-contrast/edgy, never grainy.
- **Subject matter:** real kids learning (when we have photos), Nong illustrations, abstract geometric shapes (rounded squares, soft blobs, stars).
- **Illustration style:** flat with one or two tones of shading. Thick rounded outlines optional. Same family as the logo.
- **No stock photography** of generic happy families. Use Nong, geometric scenes, or wait until we have real classroom photos.

### Layout rules (fixed elements)
- **Top nav** is sticky on scroll, gets a subtle shadow once scrolled past 8px.
- **Mobile bottom nav** for the kid app — 4 items max, large hit targets (60px+).
- **Floating Nong** — on the parent dashboard, a small Nong sticker often sits at the bottom-right corner pointing toward the primary CTA. Decorative, never blocks content.

---

## ICONOGRAPHY

### Approach
ChangLek uses **Lucide** (https://lucide.dev) as its base icon system, customized: stroke width `2.25` (slightly chunkier than default 2), all icons set to `stroke-linecap: round` and `stroke-linejoin: round`. This matches the rounded, friendly geometry of the logo and the Baloo typeface.

> **Substitution flag:** No icon system was provided. Lucide is loaded from CDN as a starting point. If the production codebase uses something else, swap `colors_and_type.css` and the UI kits to match.

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

CSS overrides applied in `colors_and_type.css`:
```css
.lucide { stroke-width: 2.25; stroke-linecap: round; stroke-linejoin: round; }
```

### Sizes
- **Inline body icon:** 16px or 18px.
- **UI button icon:** 20px.
- **Nav / tab bar:** 24px.
- **Feature illustration icon:** 40–56px, often inside a tinted rounded square (`--r-md`).
- **Celebration / hero icon:** 80px+, often paired with Nong.

### Color
- Default icon color is `currentColor` so they inherit text color. Most are `--ink-700`.
- Active state icons use `--coral-500`. Disabled use `--ink-300`.
- "Tinted icon tile" pattern: 40px rounded square in `--coral-100` containing a 20px `--coral-700` icon. We use this all over the parent dashboard.

### Emoji
- Allowed only on kid-facing surfaces, in copy (not as UI elements). ⭐ 🎉 👏 🎈 🎁 🌟. Never in chrome (no emoji buttons, no emoji bullets in admin views).
- Never use emoji as logos, navigation, or status indicators — use SVG/Lucide icons.

### Custom illustrated stickers
We ship a small set of brand-original SVG stickers in `assets/`:
- `sticker-star.svg` — the yellow star from the logo
- `sticker-confetti-burst.svg` — multicolor streamers
- `pattern-confetti.svg` — repeating background pattern

These are used **decoratively only** — never as functional UI controls.

### Logo usage
- `assets/logo-full.png` — full lockup, use on hero / about / loading screens. Min width 240px.
- `assets/logo-mark.svg` — Nong only. Use as app icon, favicon, avatar.
- `assets/logo-wordmark.svg` — wordmark only. Use when Nong is already nearby (e.g. footer of a page where Nong waves at the top).
- `assets/logo-horizontal.svg` — small Nong + wordmark side-by-side. Default header lockup. Min width 140px.

Clear space around any lockup: equal to the cap-height of the wordmark on all sides.

---

## Font availability note

The fonts (Baloo 2, Nunito, Noto Sans Thai Looped, JetBrains Mono) are loaded from **Google Fonts**, not bundled locally. If you need offline or self-hosted fonts, download from Google Fonts and place them in `fonts/`, then update `colors_and_type.css` to reference local `@font-face` declarations.

---

## SKILL.md

This project is also a portable Agent Skill — see `SKILL.md`. You can drop the project folder into a Claude Code skills directory and invoke it as `changlek-design` to get a brand-expert assistant on demand.
