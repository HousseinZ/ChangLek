# Nong Learning App Design

_Started 2026-05-01 16:01 UTC_

---

## User



## Assistant

I'll create a design system for ChangLek, an English teaching center for Thai kids. Let me start by setting up a todo list and asking some clarifying questions since we're building this from scratch without existing assets.

_[tool: update_todos]_

Since no codebase, Figma, or assets were attached, I need to ask some quick questions to ground the design system in real direction before I build it.

_[tool: questions_v2]_

## User

Questions answered:
- name_meaning: yeah it is Little Elephant , it should be style ChangLek : the elephant name is Nong
- age_range: Both K and Primary (3–12)
- audience_priority: Lean parent — trustworthy, polished, kid-friendly accents
- warm_palette: 0
- accent_colors: Add a soft sky blue accent
- logo_upload: uploads/logo_upload-1777651758326.png
- visual_style: Friendly geometric / Duolingo-ish
- mascot: yes a baby elephant and his name is Nong
- thai_english: Bilingual (Thai + English side by side)
- products: Kid learning app (lessons, games), Parent dashboard (track child's progress, billing)
- tone: Playful & energetic (like a fun friend)
- fonts: Rounded & friendly (Quicksand, Nunito, Baloo)

## Assistant

Great answers — let me start by looking at the uploaded logo and then begin building.

_[tool: view_image]_

_[tool: image_metadata]_

The logo gives me a lot to work with — Nong (gray baby elephant with pink ears, yellow bow tie, winking), the tagline "Learn · Grow · Shine", and a colorful multi-hue wordmark. The logo is colorful (blue/green/orange/purple/pink/teal) but the user picked a warm orange palette with sky blue accent — so I'll lean warm-orange for the brand surface and treat the multicolor logo letters as a secondary "celebration" palette for accents and kid-facing surfaces.

Let me set up the project.

_[tool: set_project_title]_

_[tool: copy_files]_

Now let me create the foundational README, color/type tokens, and start scaffolding.

_[tool: write_file]_

## Assistant

_[tool: update_todos]_

Now let me build the foundations. I'll write the README, the colors/type CSS, and start producing isolated logo asset variants from the source.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now let me extract Nong (the elephant) from the source logo into a clean isolated mark, and create supporting brand SVG assets (stickers, patterns, wordmark).

_[tool: run_script]_

Let me check that the crop captured Nong cleanly:

_[tool: view_image]_

The crop is too tight — cuts off the trunk on the right and top of the head. Let me redo with a wider crop, then continue building.

_[tool: run_script]_

_[tool: view_image]_

_[tool: snip]_

The viewer might be caching. Let me check the actual file dimensions and try a more aggressive crop.

_[tool: image_metadata]_

New file but same content shown — viewer may be caching. The crop is correct dimensions; the elephant just sits in the upper portion of the source. Let me look at the source more carefully and pick the right region:

_[tool: run_script]_

_[tool: snip]_

_[tool: view_image]_

The bbox-detect picked up "Cha" letters because they extend above the 60% line. I'll just hand-pick a tighter crop based on what I now know — the elephant body sits roughly y=160 to y=600, x=290 to x=920. Let me also just generate proper SVG-based brand assets (wordmark, stickers, patterns) since those are cleaner than cropping a busy raster.

_[tool: run_script]_

_[tool: view_image]_

_[tool: snip]_

The viewer is showing a stale cached version. Let me force-clear by writing through HTML preview, but actually the metadata showed a 660x485 file so the file IS correct — viewer cache only. I'll move on and create the SVG brand assets which I have full control over.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: update_todos]_

Now let me build the preview cards. I'll create a shared CSS-loaded HTML wrapper for them.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now type cards.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Now component preview cards.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

Brand cards next.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: register_assets]_

_[tool: update_todos]_

The user updated the products to "Kid learning app (lessons, games), Parent dashboard". Let me build those two UI kits now. I'll skip the marketing website task and replace with kid app since they didn't pick it.

_[tool: update_todos]_

_[tool: snip]_

Now I'll build the kid learning app UI kit (mobile, iPhone frame). Iconographic, mascot-driven.

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

Now let me build the kid app components and screens. I'll keep files small and focused.

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: snip]_

_[tool: snip]_

The kid app is rendering well — the iOS status bar overlaps the header (because the IOSDevice frame draws its own status bar above content), but the layout is mostly correct. The home shows greeting, goal card, lesson list. Path screen shows the winding path with checkmarks and current node. Let me fix the status bar overlap and continue.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: copy_files]_

Knewave is a chunky display font — perfect for a brand display accent. Let me check it exists and add it to the CSS as a special "brand display" face. I'll keep Baloo 2 for general display since the user picked rounded & friendly, and use Knewave for the very biggest hero text / "Learn · Grow · Shine" tagline moments.

_[tool: list_files]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: snip]_

Now update README to mention Knewave, refresh the type-display preview card to show Knewave, then continue with the parent dashboard UI kit.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: register_assets]_

_[tool: snip]_

Now I'll mark the kid app done and build the parent dashboard UI kit.

_[tool: update_todos]_

_[tool: snip]_

Now let me build the parent dashboard. It's a desktop web product (browser frame) — different vibe from the kid app: more numbers, less mascot, calmer.

_[tool: copy_starter_component]_

_[tool: snip]_

_[tool: grep]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: register_assets]_

_[tool: snip]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: update_todos]_

_[tool: snip]_

_[tool: write_file]_

_[tool: str_replace_edit]_

_[tool: update_todos]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

The ChangLek design system is complete. Here's what's in the project:

- **Brand spec** — `README.md` covers voice, type, color, mascot rules, content fundamentals, and an index of every file
- **Tokens** — `colors_and_type.css` with the full coral/cream/sky/amber palette, type scale, spacing, radii, shadows, and component classes
- **Typography** — Knewave (uploaded) for hero accents, Baloo 2 for display, Nunito for body, Noto Thai Looped for Thai
- **Brand assets** — wordmark, mascot (Nong), avatar, app icon, confetti pattern, stickers
- **Preview cards** — Type / Colors / Spacing / Components / Brand sections in the Design System tab
- **UI kits** — interactive kid iOS app (home, lesson path, lesson, profile) and parent web dashboard (overview, schedule, billing)
- **`SKILL.md`** for Claude-Code use

Next steps you might want: real photography for the marketing site, a teacher-facing dashboard, or Thai-language copy passes on the kid app screens. Let me know!

## User

Verifier agent check completed

## Assistant

Let me look at the kid app and fix the top spacing.

_[tool: grep]_

Bumping top padding on Home and Path so content clears the iOS notch:

_[tool: str_replace_edit]_

_[tool: done]_

Top padding bumped to 56–64px on all four kid app screens so content clears the iOS status bar / notch.

## User

where can i view the design

## Assistant

You're already viewing it! A few ways to navigate:

- **Design System tab** (top of the preview pane) — the curated card view: Type, Colors, Spacing, Components, Brand sections with all the swatches and previews
- **Files tab** — open any HTML file directly. Good ones to start with:
  - `ui_kits/kid_app/index.html` — interactive iOS app (tap the bottom tabs)
  - `ui_kits/parent_dashboard/index.html` — parent web dashboard (click sidebar items)
  - `preview/*.html` — individual swatches/components
- **README.md** — full brand spec with the file index at the bottom

Want me to surface a specific one in your tab bar?

## User

I don't see the design where is it

## Assistant

Let me open the main design system view in your tab bar.

_[tool: snip]_

_[tool: show_to_user]_

I opened `README.md`. To see the actual visual designs, here are the key files — let me open the kid app for you which is the most visually rich:

_[tool: show_to_user]_

_[tool: snip]_

You should now see the kid app — four iPhone screens side by side: Home, Lesson Path, Lesson Question, and Profile. Other places to view designs:

- **Design System tab** at the top of the preview pane — shows all the swatches, type specimens, and component cards organized by section
- `ui_kits/parent_dashboard/index.html` — parent web dashboard
- `preview/*.html` — individual cards (e.g. `preview/colors-primary.html`, `preview/components-buttons.html`)

Want me to open the parent dashboard or the Design System tab next?

## User

can you open for me the parent dashboard

## Assistant

_[tool: snip]_

_[tool: show_to_user]_

_[tool: snip]_

Open. Click the sidebar items (Overview, Schedule, Billing) to switch views.

## User

I don't want it for mobile design instead I want web base desgin please

## Assistant

_[tool: snip]_

Got it — let me convert the kid app from iOS frames to a web-based design. A quick clarifying question: should this be:

**A. A web-based learning app for kids** — same lessons/path/games but redesigned as a desktop/laptop browser experience (think kids using a Chromebook in class, bigger screen, mouse interactions)

**B. A marketing/landing website for ChangLek** — for parents to discover the school, see classes, book a trial — no learning UI

**C. A teacher's web dashboard** — for teachers to manage classes and students

Which one? Or did you mean something else?

## User

A

## Assistant

_[tool: snip]_

_[tool: list_files]_

_[tool: copy_files]_

_[tool: copy_starter_component]_

_[tool: delete_file]_

_[tool: unregister_assets]_

_[tool: delete_file]_

_[tool: snip]_

_[tool: read_file]_

I'll rewrite components and screens for a desktop-web kid app — sidebar nav instead of bottom tabs, larger play area, mouse-sized hit targets, no phone bezel.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: register_assets]_

_[tool: str_replace_edit]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

The kid app is now web-based — sidebar nav, large lesson card grid, bigger play areas. Click sidebar items to navigate Home → Lessons (path) → Lesson question → celebration → back, plus Me.

