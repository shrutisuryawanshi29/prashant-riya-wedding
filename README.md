# Riya & Prashant — wedding invitation

A mobile-first React, TypeScript, Vite and Tailwind invitation. Decorative artwork is original CSS and SVG; no couple photographs are included.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` for a production build and `npm run preview` to preview it.

## Customize

Edit `src/data.ts` for names, family details, invocations, event information, venues, messages and photo paths. The three pre-wedding venues are intentionally `null` until confirmed. Event cards only show a venue when one is provided. Styling and responsive layout live in `src/style.css`.

## Add photographs

Place optimized images in `public/images/` and set `portraits.bride`, `portraits.groom`, and entries in `gallery` in `src/data.ts` to paths such as `/images/riya.jpg`. Portrait-oriented images work best for the arched frames. The site displays neutral placeholders until paths are supplied. Update the alt text in `src/main.tsx` if needed. The current sharing preview is `public/images/groom-social-preview-v1.jpg` (1200 × 630).

Google Fonts requires a network connection; fallback serif fonts are provided. Directions open Google Maps searches using the supplied addresses; map pins have not been independently verified.

## Guest sharing and deployment

Configure `VITE_SITE_URL` with this project’s own public HTTPS URL in its deployment environment, then rebuild. Do not reuse the original wedding website’s Vercel project or URL. Never configure a localhost or private address. `.env.example` documents the setting for local development. Without a configured public HTTPS URL, the share control is disabled and URL-dependent metadata is omitted.

Vite injects canonical, Open Graph URL/image/dimensions and Twitter image metadata into the served HTML, so crawlers do not need JavaScript. The static preview uses the current indoor photograph and cover artwork in a landscape composition. After deploying, verify `/images/groom-social-preview-v1.jpg` returns HTTP 200 publicly and check the HTML source. WhatsApp caches previews and may show an earlier preview for some time after deployment.

Share Invitation uses the native share sheet when available. If unsupported or unsuccessful, an explicit Share on WhatsApp link appears; cancellation closes the share sheet without launching another app. Browsing never requires WhatsApp.

## Calendar controls

Each confirmed venue has Add to Calendar with Google Calendar and an ICS download for Apple Calendar/Outlook. Start timestamps carry an explicit +05:30 offset; generated values use UTC and Google Calendar specifies `Asia/Kolkata`. Wedding starts at 9:00 AM IST, with the 10:15 AM muhurat in its description. Reception starts at 6:00 PM IST. Full venue addresses come from `src/data.ts`.

No factual end times have been supplied. ICS omits DTEND/DURATION (valid under RFC 5545); Google Calendar uses identical start/end timestamps as a zero-duration technical placeholder. Guests may adjust their calendar duration. Descriptions explicitly say the end is unspecified. ICS text is escaped, UTF-8 lines are folded at 75 bytes, and temporary download URLs are revoked.

Run `npm run build && node scripts/verify-guest-experience.mjs` to verify calendar timestamps, ICS serialization, sharing encoding and static metadata. Native share sheets and actual Apple/Outlook imports need final device testing.

Heading, label and divider reveals reuse the existing one-time Intersection Observer. Content is visible by default. Reduced-motion disables moving reveals, petals and smooth scrolling. Back to Top appears after the hero leaves view and sits at the upper right to avoid venue/calendar controls and mobile bottom browser controls.
