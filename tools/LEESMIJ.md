# Tools — Meditatie-app

Nodig: Python 3.12, `pip install edge-tts`, en ffmpeg op het pad.

## maak_stemvoorbeelden.py
Laat 8 AI-stemmen dezelfde proefmeditatie voorlezen, met stiltes tussen de zinnen.
Uitvoer: `stemkeuze/<stem>.mp3` en `stemkeuze/stemmen.json`. Tekst, stemmen, tempo en toon staan bovenin het script.

## maak_luisterpagina.py
Zet alle voorbeelden in één losse pagina, `stemkeuze/Stemkeuze meditatie-app.html` (audio zit erin, werkt ook op de telefoon).

## maak_iconen.py
Tekent de app-icoontjes (`app/icon-180.png`, `-192`, `-512`) met Pillow, in hetzelfde ontwerp als `app/icon.svg`.

## sync_sheet.py
Zet `docs/BACKLOG.md` en `docs/VERSIES.md` in de Google Sheet. Draait vanzelf bij een push (Action `sync-sheet.yml`).
Lokaal:

```bash
cd "G:/Mijn Drive/DATA70 - Programming en Bots/20 - Claude Code/Projecten/31 - Elke projecten en vragen/04 - Meditatie-app"
GOOGLE_SA_FILE="C:/Users/dell/Downloads/yt-comment-bot-494117-20ed92f4f3dd.json" python tools/sync_sheet.py
```

## github_secret.py
Zet een bestand als versleuteld secret in een GitHub-repo (`pip install pynacl`). Zo is `GOOGLE_SA_JSON` gezet:

```bash
cd "G:/Mijn Drive/DATA70 - Programming en Bots/20 - Claude Code/Projecten/31 - Elke projecten en vragen/04 - Meditatie-app"
python tools/github_secret.py JellemaD/meditatie-app GOOGLE_SA_JSON "C:/Users/dell/Downloads/yt-comment-bot-494117-20ed92f4f3dd.json"
```

## Opnieuw draaien

```bash
cd "G:/Mijn Drive/DATA70 - Programming en Bots/20 - Claude Code/Projecten/31 - Elke projecten en vragen/04 - Meditatie-app"
python tools/maak_stemvoorbeelden.py
python tools/maak_luisterpagina.py
```
