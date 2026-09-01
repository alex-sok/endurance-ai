#!/usr/bin/env python3
"""Generate the Endurance favicon set from one geometry definition.

Every icon in the set is the same dashed ring. Before this script existed the
vector and raster copies were maintained by hand and drifted apart: the SVG was
on brand Night, the PNGs were on a navy that is not in the palette at all, so
the mark changed colour depending on which file a browser happened to pick.
Geometry and colour now live here only.

    python3 scripts/generate-favicons.py

Requires Pillow (`pip install Pillow`). Not wired into the Next build — icons
are committed assets, so run this by hand when the mark changes and commit the
output alongside it.

Three treatments, because the formats have different constraints:

  full bleed   The ring runs to the trim, outer edge tangent to all four canvas
               edges. Any inset margin reads as a border around the mark once
               the icon is down at 16px, which is the whole reason for this file.
  maskable     Android crops the icon to its own shape, so this one keeps a safe
               zone and must NOT bleed. Mark stays inside the 80% safe circle.
  opaque       iOS composites transparency onto black, so the apple touch icon
               keeps its Night field rather than going clear.

The SVG drops the field entirely and adapts to the browser's colour scheme, so
it carries no tile at all. Raster formats can't adapt, so they keep the field.
"""

import math
from pathlib import Path

from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parent.parent

# Brand pair, per the palette in components/system/SystemBook.tsx.
NIGHT = (0x16, 0x14, 0x12, 255)  # --lp-night
SNOW = (0xF6, 0xF4, 0xEF, 255)  # --lp-snow
CLEAR = (0, 0, 0, 0)

# Geometry in a 64-unit canvas. Outer radius 32 puts the ring's outer edge on
# the canvas edge; stroke is held proportional to it.
OUTER = 32.0
STROKE = 12.0

# Twelve dashes on the clock, one centred at 12 o'clock. The ratio is inherited
# from the original mark (dasharray "8.4 2.5956").
NDASH = 12
DASH_FRACTION = 8.4 / (8.4 + 2.5956)

# Maskable keeps the mark at 75% of the canvas, a margin inside the 80% circle
# that Android guarantees is visible under every mask shape.
MASKABLE_OUTER = 24.0
MASKABLE_STROKE = 9.0


def ring(size, outer=OUTER, stroke=STROKE, field=NIGHT, mark=SNOW):
    """Render the ring at `size` px. Geometry args are in 64-unit canvas terms."""
    supersample = 16 if size <= 256 else 8
    edge = size * supersample
    image = Image.new("RGBA", (edge, edge), field)
    draw = ImageDraw.Draw(image)

    unit = edge / 64.0
    radius, width = outer * unit, stroke * unit
    centre = edge / 2.0
    # Pillow grows an arc's width inward from the bounding box, so the box sits
    # on the outer radius.
    box = [centre - radius, centre - radius, centre + radius, centre + radius]

    period = 360.0 / NDASH
    arc = period * DASH_FRACTION
    for i in range(NDASH):
        mid = -90.0 + period * i  # first dash centred at 12 o'clock
        draw.arc(box, mid - arc / 2, mid + arc / 2, fill=mark, width=max(1, round(width)))

    return image.resize((size, size), Image.LANCZOS)


def svg():
    """Build the vector favicon: no field, mark follows the browser's scheme."""
    centreline = OUTER - STROKE / 2
    period = 2 * math.pi * centreline / NDASH
    dash = period * DASH_FRACTION
    gap = period - dash
    night = "#%02x%02x%02x" % NIGHT[:3]
    snow = "#%02x%02x%02x" % SNOW[:3]
    n = lambda x: f"{round(x, 4):g}"  # noqa: E731 - trim float noise out of the markup
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <title>Endurance AI Labs</title>
  <style>
    /* No field behind the mark, so the ring reads at full size in the tab.
       Night on light chrome, Snow on dark. */
    circle {{ stroke: {night}; }}
    @media (prefers-color-scheme: dark) {{ circle {{ stroke: {snow}; }} }}
  </style>
  <circle cx="32" cy="32" r="{n(centreline)}" fill="none" stroke-width="{n(STROKE)}" stroke-dasharray="{n(dash)} {n(gap)}" stroke-dashoffset="{n(dash / 2)}" transform="rotate(-90 32 32)"></circle>
</svg>
"""


def write(rel, payload):
    path = REPO / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    if isinstance(payload, Image.Image):
        payload.save(path)
    else:
        path.write_text(payload)
    print(f"  {rel}")


def main():
    print("vector")
    # app/icon.svg is Next's file convention, public/favicon.svg is the copy
    # declared in metadata.icons. Both are served; keep them identical.
    markup = svg()
    for rel in ("public/favicon.svg", "app/icon.svg"):
        write(rel, markup)

    print("tab and PWA icons, full bleed")
    for size, rel in (
        (16, "public/favicon/favicon-16.png"),
        (32, "public/favicon/favicon-32.png"),
        (48, "public/favicon/favicon-48.png"),
        (192, "public/favicon/icon-192.png"),
        (512, "public/favicon/icon-512.png"),
    ):
        write(rel, ring(size))

    print("maskable, safe zone preserved")
    write(
        "public/favicon/icon-maskable-512.png",
        ring(512, outer=MASKABLE_OUTER, stroke=MASKABLE_STROKE),
    )

    print("apple touch icon, opaque")
    apple = ring(180)
    for rel in ("public/apple-touch-icon.png", "app/apple-icon.png"):
        write(rel, apple)

    print("ico, each size rendered natively rather than downscaled")
    sizes = (16, 32, 48)
    frames = [ring(size) for size in sizes]
    for rel in ("public/favicon.ico", "app/favicon.ico"):
        path = REPO / rel
        frames[-1].save(
            path,
            format="ICO",
            sizes=[(s, s) for s in sizes],
            append_images=frames,
        )
        print(f"  {rel}")


if __name__ == "__main__":
    main()
