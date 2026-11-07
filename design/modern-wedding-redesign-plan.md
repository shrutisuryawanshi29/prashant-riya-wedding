# Under the Same Moon — Phase 1 audit and implementation plan

Date: 29 October 2026. Status: planning only; no visual redesign implemented.

## Safety and working location

- Original website folder: `/Users/shrutisuryawanshi/Documents/Projects/VSCode/riya-prashant-wedding-invite-final`. It is not a Git repository.
- Existing Git checkout: `/Users/shrutisuryawanshi/Documents/Codex/2026-10-28/use/work/git-upload`.
- Remote: `https://github.com/shrutisuryawanshi29/riya-prashant-invite.git`.
- Initial branch: `main`; initial status clean. Local tracking reference was `origin/main` at the same commit; no fresh remote fetch was needed for a local planning branch.
- Approved rollback checkpoint already committed: `77f77c0c9e3ba0d1eb5a31c66db164b5cb49b812` — “Show full invitation and remove duplicate transition stairs”. No extra checkpoint of unchanged app files was needed.
- SHA-256 comparison of all source project files against the Git checkout found no differences other than `.gitignore`, which exists only in the Git checkout. Excluded `.git`, dependencies, build output, Finder metadata and TypeScript build cache.
- Created local branch `feature/modern-wedding-redesign` from that checkpoint. No push, deployment, reset or worktree replacement.
- Only this plan, the asset manifest and byte-identical supplied reference images are added on the branch. They are outside `public/` and are not part of Vite's deployed assets.
- Continue future work in the Git checkout on this branch. Do not sync the old working mirror over it: doing so could overwrite future branch work. The original VSCode folder and `main` retain the approved site.
- To inspect the approved site later, use `git switch main` from a clean working tree. Use the branch to inspect the plan. Never reset/discard work to switch versions.

## Existing application audit

The app is React + TypeScript + Vite, with Tailwind's Vite plugin and Lucide React. It is a single scrolling page, with no routing library. All sections and the shared observer are in `src/main.tsx`; root creation is in the same file. Tailwind is imported, but the visual implementation primarily uses hand-written CSS in `src/style.css`.

| Feature | Existing implementation and migration constraint |
|---|---|
| Hero | Inline `#home.hero.hero-illustrated` in `src/main.tsx`. `div.royal-invitation` uses a portrait palace background with `aspect-ratio:2/3`, max-width 840px. Keep the old implementation untouched until the first section is approved for implementation. |
| Couple illustration | Real separate `<img>` using `/images/royal-portrait-optimized.webp`, meaningful alt, explicit dimensions and high fetch priority. Absolute positioning; radial CSS mask blends its ivory background. No generated replacement portrait needed or permitted. |
| Wedding logo | No standalone logo/PR monogram was found in the original project. `public/favicon.svg` is an existing favicon, not the supplied approved logo. `.royal-ganesha` is a cropped decorative motif from `royal-reference-optimized.webp`, not a wedding monogram. Newly supplied logo archived below. |
| Countdown | `src/components/WeddingCountdown.tsx`; `remainingTime()` calculates from `src/data.ts` target `2026-12-03T10:15:00+05:30` (04:45 UTC). One cleaned-up 1-second interval; tabular digits; nonnegative values; completed message. Reuse calculations exactly. |
| Family invitation | `FamilyInvitation()` inline in `src/main.tsx` reads names from data. Currently always visible: separate desktop/mobile wrappers, no invitation `<details>` or toggle in the rendered app. Legacy disclosure CSS remains. New brief calls for an expandable Read Our Invitation: plan this as an intentional future behavior change, not something already present. |
| Celebrations | Inline `#celebrations` ordered list, from `w.events`, compact borderless timeline with HennaMedallion/EventEmblem markers. Five occasions in correct order. Locations are stored but not rendered here. |
| Venues | Inline `#venues`, `w.venues`, complete addresses, correctly encoded Google Maps search links. No verified exact map pins. Keep all addresses confined to this section in the redesign. |
| Sharing | `ShareInvitation` in `src/components/GuestControls.tsx`; `src/utils/shareUtils.ts`. Native Web Share first; cancellation honored; explicit WhatsApp fallback link on failure/unsupported. Public canonical URL required. |
| Social metadata | `index.html` + Vite `transformIndexHtml` plugin in `vite.config.ts`; injects canonical/absolute image metadata before client JS. `.env.production` has the public canonical URL `https://riya-prashant-invite.vercel.app/`. This value is public configuration, not a secret. Development sharing is disabled unless an appropriate public URL is configured for that mode. |
| Calendar | `CalendarControls` in `GuestControls.tsx`; `src/utils/calendarUtils.ts`. Google links and ICS downloads, IST-aware starts, muhurat description, data-derived addresses, no claimed event end. Google zero-duration placeholder documented; ICS omits DTEND. Current events map by venue index; preserve ordering or introduce stable IDs later deliberately. |
| Navigation | Real anchors `#invitation`, `#celebrations`, `#venues`; hero `#home`; smooth scroll with reduced-motion override; BackToTop uses Intersection Observer. Preserve existing anchor targets. |
| Motion | One scroll observer in App, one-time reveals, preference change handling, nearby timeline stagger. Eight mobile CSS petals in a single fixed noninteractive layer. Six normalized HeroSparkles, subtle SVG marker/closing glimmers. Visibility-change pauses ambient effects. No animation library. Reuse mechanics, reduce decorative density for the new direction. |
| Responsive presentation | Desktop >=1024px; mobile editorial overrides <=1023px; additional legacy breakpoints at 700, 390, 370 and timeline desktop breakpoint. Existing CSS contains many successive phase overrides and obsolete card/disclosure/gallery styles. Scope future section styles; avoid appending another competing cascade. |
| Removed/unused content | Couple/gallery are not rendered in current App. Their data placeholders and some styles persist. `FloralContinuation.tsx` is unused. Do not restore placeholder galleries or invent photographs. |

## Exact asset inventory

Paths below are project-relative to the Git checkout. Source and archive checksums, original attachment locations, bytes and image properties are recorded in `design/asset-manifest.json`.

### Already in the approved project

| Asset | Exact path | Size / role |
|---|---|---|
| Approved portrait original | `public/images/riya-prashant-portrait.png` | 1122 × 1402; opaque ivory background |
| Portrait currently rendered | `public/images/royal-portrait-optimized.webp` | 1122 × 1402; also opaque, CSS mask provides apparent feathering |
| Current text-free palace hero | `public/images/royal-palace-text-free.webp` | 1024 × 1536; CSS background |
| Approved old hero reference | `public/images/royal-hero-reference.png` | 1024 × 1536; reference only |
| Reference-derived motif source | `public/images/royal-reference-optimized.webp` | Existing cropped Ganesha source |
| Original portrait source | `public/images/riya-prashant-portrait.png` | Preserve identity, clothing and pose |
| Full-page royal reference | `public/images/approved-royal-website-reference.png` | Previous design reference |
| Desktop environments | `public/images/courtyard-scene.webp`, `public/images/garden-scene.webp`, `public/images/darbar-scene.webp` | Existing palace/courtyard/darbar illustrations |
| Current mobile continuation | `public/images/palace-parchment-transition-v2.webp` | Corrected artwork, no duplicate stairs |
| Earlier retained continuations | `public/images/palace-parchment-transition.webp`, `public/images/palace-continuation-mobile.webp` | Historical unused assets; do not reintroduce |
| Current social preview | `public/images/social-preview.jpg` | 1200 × 630; currently royal branding |

### Supplied now, archived for planning only

These images were NOT already imported into `public/images/`. Originals were copied byte-for-byte from the supplied attachments to prevent loss of temporary files. No image generation, cropping, optimization or app integration occurred.

| Asset | Exact archived path | Dimensions |
|---|---|---|
| Approved illustrated wedding logo | `design/reference-assets/approved-wedding-logo-source.jpg` | 1024 × 1024 |
| Moonlit mobile background | `design/reference-assets/moonlit-mobile-source.png` | 941 × 1672 |
| Moonlit desktop background | `design/reference-assets/moonlit-desktop-source.png` | 1672 × 941 |
| Watercolor desktop story | `design/reference-assets/watercolor-story-desktop-source.png` | 1738 × 905 |
| Watercolor mobile story | `design/reference-assets/watercolor-story-mobile-source.png` | 1122 × 1402 |

The supplied logo includes the names “Prashant & Riya”, the PR-style monogram, floral symbols, badminton/music/chai imagery, California bridge scene and a hashtag. It is a full opaque illustrated composition, not an isolated mark. Do not redraw or regenerate it. A separate approved clean monogram export would be more legible for a small header; use the full source as a deliberate identity detail only if agreed.

### Missing or not yet production-ready

- No mobile or desktop moonlit/story concept is missing: all four supplied originals are now safely archived.
- Optimized WebP/AVIF variants, responsive source sizes and final public asset names are not prepared. Originals are roughly 2.1–2.6 MB each; do not ship all originals to phones.
- A clean alpha cutout of the EXISTING portrait is absent. An edge-preserving background removal may be needed before layering over the dark sky. Do not generate replacement faces. CSS masking alone may leave an ivory halo, while multiply blending could darken faces/clothes.
- No standalone transparent approved PR logo export was supplied.
- No dedicated Mumbai, Nagpur or California closing background is present. These sections can use typography and restrained original linework without requiring more raster assets. If rich illustrated location scenes are later approved, they will require separately approved assets.
- No mobile art-directed version of the complete logo exists. Avoid making its tiny motifs unreadable on a phone.
- No newly branded modern social preview exists. Keep the working royal preview until its replacement is approved.

## Proposed architecture (future work only)

Keep Vite, TypeScript, React and existing data, not a new app/template. Extract current inline features as each section is approved rather than replacing everything at once.

```text
src/
  App.tsx                         # existing page composition extracted from main when needed
  main.tsx                        # mount only after approved refactor
  data.ts                         # retain verified source; add approved story copy separately
  data/modernAssets.ts             # future explicit mobile/desktop asset map
  sections/
    MoonlitHeroSection.tsx         # #home, live text + approved portrait as separate image
    CountdownInvitationSection.tsx # #invitation, reuse WeddingCountdown + family invitation
    BadmintonStorySection.tsx      # From a Badminton Court to Forever
    ThreePlacesSection.tsx         # Mumbai / Nagpur / California, no invented biography
    CelebrationsSection.tsx        # #celebrations, same five-event sequence, no locations
    VenuesSection.tsx              # #venues, full verified addresses + existing controls
    CaliforniaClosingSection.tsx   # approved family sentiment and couple signature
  components/
    FamilyInvitation.tsx           # extract existing wording, no rewriting names
    InvitationDisclosure.tsx       # future native details/summary per latest brief
    WeddingCountdown.tsx           # reuse unchanged calculations
    GuestControls.tsx              # reuse CalendarControls, ShareInvitation, BackToTop
    ResponsiveArtwork.tsx          # only if repeated picture/source usage merits it
  hooks/useScrollReveal.ts         # extract existing single observer, do not duplicate systems
  styles/
    tokens.css                     # wine, twilight plum, ivory, restrained gold
    modern.css                     # scoped modern section styles, deliberate responsive rules
  utils/calendarUtils.ts           # retain
  utils/shareUtils.ts              # retain
```

No files/components in this proposed tree have been implemented.

### Section composition and transitions

1. **Cinematic moonlit hero:** use separate supplied portrait/landscape background via `<picture>` or equivalent source selection, not one universal cover crop. Layer the same couple illustration independently with reserved dimensions. Live accessible names/date/nav. Keep moon and faces clear. Soft one-time entrance; no new persistent sparkle layer.
2. **Interactive countdown + invitation:** reuse the exact muhurat target and elapsed state. Keep readable four-unit row on phones. “Interactive” means existing live behavior plus guest calendar/share options; no new timer games or digit animations. Per latest brief, offer native Read Our Invitation disclosure with full existing family text; it is not present in today's approved baseline and will be introduced only during implementation.
3. **From a Badminton Court to Forever:** the supplied watercolor artwork anchors this chapter; mobile illustration below/beside readable text, desktop editorial side-by-side. Use only user-approved badminton/chai/moon/music themes; do not invent dates, meeting anecdotes or personal details.
4. **Three Places, One Forever:** Mumbai, Nagpur, California, with three compact typographic moments and small visual identifiers, not fake travel-map coordinates or invented timelines. Reuse approved “City of Dreams / City of Oranges / California” line. Keep personal roles/stories out until supplied.
5. **Wedding Celebrations:** elegant modern editorial timeline; the same five occasions and approved taglines; no addresses/cities and no unconfirmed venue messages.
6. **Venues and Directions:** existing full addresses and buttons with reusable calendar controls. Architecture is decorative, not an assertion about the real venues. Keep external links and their accessible names.
7. **California-inspired closing:** typography, quiet twilight/wine atmosphere and a restrained California visual reference, keeping family names, Presents Only in Blessings and Riya & Prashant. No new relationship facts or unsupported location claims.

Transitions: a short twilight-to-ivory color bridge from hero to countdown, matching watercolor paper into story/places, quiet dividers into timeline/venues, and a restrained return to wine/twilight for the close. Avoid repeated background images, palace frames, animated page turns, forced negative margins or blank spacer panels. No Three.js, Blender, parallax or heavy effects.

## Verified content lock

- Countdown/muhurat: 3 December 2026, 10:15 AM IST; exact timestamp `2026-12-03T10:15:00+05:30`.
- Mehendi: 1 December 2026, 11:15 AM onwards; Embracing the Art of Love.
- Engagement: 2 December 2026, 10:30 AM onwards; Exchanging the Shine.
- Haldi: 2 December 2026, 4:00 PM onwards; Activating the Golden Glow.
- Wedding: 3 December 2026, programme 9:00 AM onwards; Vivah Muhurat 10:15 AM IST; Happily Ever After Starts Here.
- Reception: 6 December 2026, 6:00 PM onwards; followed by dinner; no invented tagline.
- Venue addresses remain in the dedicated Venues section. Pre-wedding venues remain null in data.
- Bride/groom full names, grandparents, both sets of parents and both sacred invocations are preserved from `src/data.ts` without rewriting honorifics.
- Calendar start timestamps remain 09:00 and 18:00 IST respectively; no invented factual end times.

## Mobile-first implementation sequence after approval

1. Prepare optimized DERIVED assets without overwriting archived originals. Assess portrait cutout and monogram export before designing around unavailable alpha assets.
2. Implement ONLY the moonlit hero when approved. Compose at 390px first; verify 360/375/430 independently. Background and couple each receive independent dimensions/positioning; keep text in normal flow where practical. Avoid forcing everything into 100vh or cropping the portrait.
3. Use explicit mobile and desktop sources; validate a tablet composition around 768px rather than inheriting a stretched phone or cropped desktop view. Check 1024 and 1440 desktop.
4. Add countdown/invitation in its own approval phase; retain calculation module and calendar/share utilities. Use an accessible disclosure with readable text, naturally growing page height and keyboard support.
5. Add story and three places using approved copy, then adapt timeline and venues. Keep the old page's working IDs or add compatible anchors.
6. Finish closing and transitions. Introduce one lightweight motion hook based on the existing observer, reduced-motion immediate visibility, no constantly moving major art. Decide whether to retain or reduce the original petal layer; never duplicate it.
7. Verify phones at 360, 375, 390, 430; tablet 768; desktop 1024/1440. Test true content height, image loading, tap targets >=44px, headings/faces/moon visibility, screen-reader order, keyboard interaction, no horizontal scroll and stable digits.
8. Run production build and existing guest-experience verification after relevant changes. Test countdown before/at/after target across time zones, native sharing/fallback, Google dates and ICS. Update modern preview only after final identity is approved.
9. Keep branch local and undeployed until explicitly authorized. Vercel may auto-create preview deployments for pushed feature branches, so do not push as part of this phase.

## Risks and migration notes

- Dark hero + opaque portrait: the major artistic/technical risk. Preserve likeness while solving background edges, not by replacing people.
- Existing cascade has many old global selectors and breakpoints. Extract/scoped styles deliberately; do not stack additional override phases or leak rules into approved rollback.
- Current inline App makes section-specific changes easy to couple. Extract incrementally, preserving functionality and IDs before redesigning each section.
- New supplied watercolor art has substantial negative space and object placement designed per orientation. Do not crop the racket, chai, moon or headphones just to fit text.
- Read Our Invitation is currently absent by prior explicit request. Latest brief supersedes that for the future redesign, but no behavior change occurs in this phase.
- Story headings/themes are now authorized, but detailed love-story prose is not supplied. Avoid fictional anecdotes, dates or city biographies.
- Fonts currently load from Google Fonts (Cormorant Garamond, Great Vibes, DM Sans). Plan modern hierarchy before adding font dependencies; keep fallbacks/contrast.
- Package versions use `*`; preserve `package-lock.json` and use `npm ci` for reproducibility. Do not upgrade dependencies during visual work.
- Existing verification script relies on Node's `stripTypeScriptTypes` (available in current Node 24 environment); document/pin an appropriate Node runtime before CI migration.
- Keep `VITE_SITE_URL` public and correct; do not accidentally publish secrets in future environment files. Existing `.env.production` contains only the public canonical URL.
- Current main remains deployable. Redesign source changes and new optimized assets must stay on the local feature branch until explicitly authorized.

## Verification performed in Phase 1

- Inspected Git branch/status/remote/history and compared source files by checksum.
- Confirmed portrait alpha properties and source dimensions; visually inspected the actual approved portrait.
- Confirmed all five attachment files exist; archived byte-identical originals with SHA-256 checksums and dimensions.
- Reviewed live app source, data, countdown, calendar/share utilities, metadata plugin and CSS/animation rules.
- Baseline production build and `scripts/verify-guest-experience.mjs` pass in the existing dependency-equipped working mirror with matching app files. No dependencies were installed or updated.
- No new visual implementation, screenshot claim, push or deployment performed in this planning phase.

Next approval gate: approve the moonlit hero composition and asset preparation before Phase 2 implementation.
