"""Maakt van één korte proefmeditatie een mp3 per AI-stem, zodat Durk/Elke een stem kunnen kiezen.

Gebruikt edge-tts (gratis Microsoft-stemmen, geen sleutel nodig) en ffmpeg voor de stiltes.
Uitvoer: stemkeuze/<stem>.mp3 + stemkeuze/stemmen.json
"""
import asyncio
import json
import subprocess
import tempfile
from pathlib import Path

import edge_tts

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "stemkeuze"

# (zin, stilte in seconden erna)
TEKST = [
    ("Welkom.", 1.5),
    ("Neem even de tijd om rustig te gaan zitten.", 2.0),
    ("Sluit je ogen, als dat prettig voelt.", 2.5),
    ("Adem rustig in, door je neus.", 3.0),
    ("En laat de adem langzaam weer gaan.", 3.0),
    ("Merk op hoe je lichaam gedragen wordt door de stoel onder je.", 2.5),
    ("Er hoeft nu even niets.", 2.0),
    ("Je bent hier. En dat is genoeg.", 2.0),
]

STEMMEN = [
    # id, naam, omschrijving
    ("nl-NL-FennaNeural", "Fenna", "Vrouw, Nederlands"),
    ("nl-NL-ColetteNeural", "Colette", "Vrouw, Nederlands"),
    ("nl-NL-MaartenNeural", "Maarten", "Man, Nederlands"),
    ("nl-BE-DenaNeural", "Dena", "Vrouw, Vlaams"),
    ("nl-BE-ArnaudNeural", "Arnaud", "Man, Vlaams"),
    ("en-US-AvaMultilingualNeural", "Ava", "Vrouw, meertalig (licht accent mogelijk)"),
    ("de-DE-SeraphinaMultilingualNeural", "Seraphina", "Vrouw, meertalig (licht accent mogelijk)"),
    ("en-US-AndrewMultilingualNeural", "Andrew", "Man, meertalig (licht accent mogelijk)"),
]

TEMPO = "-15%"   # rustiger dan normaal
TOON = "-2Hz"    # iets lager, zachter


def stilte(pad: Path, sec: float):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "lavfi", "-i",
                    "anullsrc=r=24000:cl=mono", "-t", str(sec), "-q:a", "4", str(pad)], check=True)


async def maak(stem_id: str, naam: str, tmp: Path):
    delen = []
    for i, (zin, pauze) in enumerate(TEKST):
        z = tmp / f"{naam}_{i}.mp3"
        for poging in range(4):  # de dienst geeft soms tijdelijk niets terug
            try:
                await edge_tts.Communicate(zin, stem_id, rate=TEMPO, pitch=TOON).save(str(z))
                break
            except edge_tts.exceptions.NoAudioReceived:
                if poging == 3:
                    raise
                await asyncio.sleep(2)
        # opnieuw coderen naar zelfde formaat, zodat concat netjes werkt
        zz = tmp / f"{naam}_{i}_n.mp3"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(z), "-ar", "24000",
                        "-ac", "1", "-q:a", "4", str(zz)], check=True)
        s = tmp / f"{naam}_{i}_s.mp3"
        stilte(s, pauze)
        delen += [zz, s]
    lijst = tmp / f"{naam}.txt"
    lijst.write_text("".join(f"file '{p.as_posix()}'\n" for p in delen), encoding="utf-8")
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lijst),
                    "-ar", "24000", "-ac", "1", "-b:a", "64k", str(OUT / f"{naam.lower()}.mp3")], check=True)
    print("klaar:", naam)


async def main():
    OUT.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory() as t:
        for stem_id, naam, _ in STEMMEN:
            await maak(stem_id, naam, Path(t))
    meta = [{"id": s, "naam": n, "omschrijving": o, "bestand": f"{n.lower()}.mp3"} for s, n, o in STEMMEN]
    (OUT / "stemmen.json").write_text(json.dumps({"tekst": [z for z, _ in TEKST], "stemmen": meta},
                                                 ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    asyncio.run(main())
