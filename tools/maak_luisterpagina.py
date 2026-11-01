"""Maakt stemkeuze/Stemkeuze meditatie-app.html: één losse pagina met alle stemvoorbeelden erin (base64),
zodat hij ook op de telefoon werkt zonder losse mp3's. Eerst maak_stemvoorbeelden.py draaien."""
import base64
import html
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MAP = ROOT / "stemkeuze"
data = json.loads((MAP / "stemmen.json").read_text(encoding="utf-8"))

kaarten = []
for i, s in enumerate(data["stemmen"], 1):
    b64 = base64.b64encode((MAP / s["bestand"]).read_bytes()).decode()
    kaarten.append(f"""
    <section class="kaart">
      <div class="kop"><span class="nr">{i}</span><div><h2>{html.escape(s['naam'])}</h2>
      <p>{html.escape(s['omschrijving'])}</p></div></div>
      <audio controls preload="none" src="data:audio/mpeg;base64,{b64}"></audio>
    </section>""")

tekst = "<br>".join(html.escape(z) for z in data["tekst"])

pagina = f"""<!doctype html>
<html lang="nl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Stemkeuze meditatie-app</title>
<style>
:root {{ --bg:#f6f1ea; --kaart:#fffdf9; --tekst:#3b3430; --zacht:#8a7f76; --accent:#c9764a; --rand:#e8dfd4; }}
@media (prefers-color-scheme: dark) {{ :root {{ --bg:#1f1b18; --kaart:#2a2521; --tekst:#efe7de; --zacht:#a89c91; --accent:#e0956a; --rand:#3a332d; }} }}
* {{ box-sizing:border-box; }}
body {{ margin:0; background:var(--bg); color:var(--tekst); font:16px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif; }}
main {{ max-width:640px; margin:0 auto; padding:24px 16px 48px; }}
h1 {{ font-weight:600; font-size:1.6rem; margin:0 0 4px; }}
.sub {{ color:var(--zacht); margin:0 0 20px; }}
.tekst {{ background:var(--kaart); border:1px solid var(--rand); border-radius:14px; padding:14px 16px; color:var(--zacht); font-style:italic; margin-bottom:20px; }}
.kaart {{ background:var(--kaart); border:1px solid var(--rand); border-radius:14px; padding:14px 16px; margin-bottom:12px; }}
.kop {{ display:flex; gap:12px; align-items:center; margin-bottom:10px; }}
.nr {{ flex:none; width:32px; height:32px; border-radius:50%; background:var(--accent); color:#fff; display:grid; place-items:center; font-weight:600; }}
h2 {{ margin:0; font-size:1.1rem; }}
.kop p {{ margin:0; color:var(--zacht); font-size:.9rem; }}
audio {{ width:100%; }}
</style></head><body><main>
<h1>Welke stem past bij jou?</h1>
<p class="sub">Acht AI-stemmen lezen dezelfde korte meditatie voor (± 45 sec). Kies je favoriet, of noem er twee.</p>
<div class="tekst">{tekst}</div>
{''.join(kaarten)}
</main>
<script>
// maar één voorbeeld tegelijk laten spelen
document.querySelectorAll('audio').forEach(a => a.addEventListener('play', () =>
  document.querySelectorAll('audio').forEach(b => {{ if (b !== a) b.pause(); }})));
</script>
</body></html>"""

uit = MAP / "Stemkeuze meditatie-app.html"
uit.write_text(pagina, encoding="utf-8")
print(uit, round(uit.stat().st_size / 1e6, 1), "MB")
