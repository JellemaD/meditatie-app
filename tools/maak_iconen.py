"""Tekent de app-icoontjes (zelfde ontwerp als app/icon.svg) als PNG: 180, 192 en 512 px."""
import math
from pathlib import Path

from PIL import Image, ImageDraw

APP = Path(__file__).resolve().parent.parent / "app"
ACCENT = (201, 118, 74)
LICHT = (246, 227, 212)


def golf(d, y, amp, breedte, x0, x1, alpha, s):
    pts = [(x, y + amp * math.sin((x - x0) / (x1 - x0) * 2 * math.pi)) for x in range(int(x0), int(x1) + 1)]
    pts = [(x * s, yy * s) for x, yy in pts]
    d.line(pts, fill=LICHT + (alpha,), width=int(breedte * s), joint="curve")
    r = breedte * s / 2
    for x, yy in (pts[0], pts[-1]):
        d.ellipse([x - r, yy - r, x + r, yy + r], fill=LICHT + (alpha,))


def teken(maat: int):
    s = 4 * maat / 512  # 4x tekenen, dan verkleinen = gladde randen
    img = Image.new("RGBA", (4 * maat, 4 * maat), ACCENT + (255,))
    laag = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(laag)
    d.ellipse([(256 - 92) * s, (226 - 92) * s, (256 + 92) * s, (226 + 92) * s], fill=LICHT + (242,))
    golf(d, 352, -15, 22, 96, 416, 230, s)
    golf(d, 408, -10, 18, 136, 376, 153, s)
    img = Image.alpha_composite(img, laag).resize((maat, maat), Image.LANCZOS).convert("RGB")
    img.save(APP / f"icon-{maat}.png")


for m in (180, 192, 512):
    teken(m)
print("klaar")
