"""Generates favicon.svg, favicon.ico (16/32/48) and apple-touch-icon.png from
one polygon, so the three can't drift. Run: python favicon.py  (needs Pillow)

Mark: a single wave band that swells along its length like the pavilion's
lattice limbs. Swell ratio thick:thin = phi.
"""
import math
from PIL import Image, ImageDraw

PHI = (1 + 5 ** 0.5) / 2
U = 32                      # design box, px at 32x32
BG, FG = "#121417", "#8FB8A4"
T_MIN = 6                   # 3px at 16x16
T_MAX = T_MIN * PHI         # 9.71, 4.85px at 16x16
RADIUS = 0.2                # corner radius as a fraction of the size


def wave(n=96):
    top, bot = [], []
    for i in range(n + 1):
        u = i / n
        x = -1 + 34 * u
        y = 17 + 5 * math.sin(2 * math.pi * 1.1 * u + 0.4)
        t = T_MIN + (T_MAX - T_MIN) * math.exp(-((u - 0.35) / 0.28) ** 2)
        top.append((x, y - t / 2))
        bot.append((x, y + t / 2))
    return top + bot[::-1]


BAND = wave()


def svg():
    pts = " ".join(f"{x:.2f},{y:.2f}" for x, y in BAND)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {U} {U}">\n'
            f'<clipPath id="c"><rect width="{U}" height="{U}" rx="{U * RADIUS:g}"/></clipPath>\n'
            f'<g clip-path="url(#c)">\n'
            f'<rect width="{U}" height="{U}" fill="{BG}"/>\n'
            f'<polygon points="{pts}" fill="{FG}"/>\n'
            f'</g>\n</svg>\n')


def raster(px, rounded=True):
    big = px * 16
    f = big / U
    im = Image.new("RGBA", (big, big), BG)
    ImageDraw.Draw(im).polygon([(x * f, y * f) for x, y in BAND], fill=FG)
    if rounded:
        mask = Image.new("L", (big, big), 0)
        ImageDraw.Draw(mask).rounded_rectangle((0, 0, big - 1, big - 1), radius=RADIUS * big, fill=255)
        im.putalpha(mask)
    return im.resize((px, px), Image.LANCZOS)


if __name__ == "__main__":
    with open("favicon.svg", "w", newline="\n") as fh:
        fh.write(svg())
    icons = [raster(s) for s in (16, 32, 48)]
    icons[2].save("favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)], append_images=icons[:2])
    # iOS masks the corners itself, so the touch icon is full-bleed
    raster(180, rounded=False).convert("RGB").save("apple-touch-icon.png")
