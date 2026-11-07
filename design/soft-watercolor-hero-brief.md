# Soft watercolor hero: asset preparation

The supplied soft coastal drafts are integrated for local visual review. The previous moonlit backgrounds remain available as fallback assets; neither set has been overwritten.

## Artwork needed

Provide two coordinated, text-free watercolor backgrounds:

- Mobile portrait composition designed for 360–430px screens, with the moon visible high in the scene and calm central space around the couple.
- Desktop landscape composition with a quiet text area on the left, couple space on the right and a visible moon. Avoid busy details directly behind faces or lettering.

The setting should be an understated coastal or waterfront evening in ivory, blush peach, dusty rose, mauve, lavender and muted plum, with gentle gold moonlight. Keep it romantic and universal; no ornate palace, postcard composition, heavy floral frames or embedded text. Preserve the existing transparent couple portrait as a separate layer.

## Integration after approval

1. Archive original artwork in `design/reference-assets/`; do not overwrite the approved moonlit images.
2. Optimize separate mobile and desktop production variants under `public/images/`, preserving useful source resolution and aspect ratio.
3. Update the paths and mobile intrinsic dimensions in `src/data/heroArtwork.ts`. The hero uses `<picture>` to select the desktop source at 1024px and above; only the selected background is fetched.
4. Review text, CTA and navigation contrast against the new image at mobile and desktop widths. Any overlay adjustment should be a separate visually reviewed change, limited to the hero. Avoid opaque panels or changing the portrait, layout and typography.
5. Verify the moon, face clarity, image load and crop at 360, 375, 390, 430, 768, 1024 and 1440px. Run the production build and existing guest-functionality checks.

The supplied drafts are not yet visually approved. They are archived in `design/reference-assets/soft-coastal-hero-mobile-draft.png` and `design/reference-assets/soft-coastal-hero-desktop-draft.png`; production WebP derivatives are selected through `src/data/heroArtwork.ts`. The desktop source is 1056 × 1024 and the mobile source is 464 × 1024, so very large displays may expose their limited resolution. Retain the existing moonlit assets for rollback.
