# Homepage sharing assets

Used only by `app/opengraph-image.tsx`. The homepage originals are unchanged.

- `homepage-sunrise.jpg`: 1200 × 630 center crop of
  `public/artfield/assets/hopeful-sunrise.png`, resized with nearest-neighbor
  sampling and encoded at JPEG quality 88 with mozjpeg (169,534 bytes).
- `endurance-wordmark-ink.png`: the alpha silhouette of
  `public/artfield/assets/endurance-logo-white.png`, resized to 548px wide
  and filled with the homepage ink color `#193b51` (15,344 bytes).
- The card uses Geist Regular from the official `geist@1.5.1` package.
  Its local TTF and SIL Open Font License are in `public/fonts/`.

Artwork, wordmark and font are local so sharing-card rendering does not
depend on a network request or a production deployment URL.
