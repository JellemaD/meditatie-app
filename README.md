# Meditatie app

Rustige meditatie-app voor Elke: een schil om de gratis YouTube-meditaties van
[Meditation Moments](https://www.youtube.com/@MeditationMomentsApp), zodat ze niet naar YouTube hoeft
en met één tik een meditatie kan afspelen.

**App:** https://jellemad.github.io/meditatie-app/ — openen op de telefoon en "Toevoegen aan beginscherm".

- `app/` — de app (HTML/CSS/JS, geen build). Videolijst: `app/videos.js`. Versie: `VERSIE` in `app/app.js` en `CACHE` in `app/sw.js`.
- `docs/BACKLOG.md`, `docs/VERSIES.md` — de bron; gaan bij elke push naar de
  [Google Sheet](https://docs.google.com/spreadsheets/d/1HjDXdNUJuUCYPQEok78HBzUUly7QQW8VMljmLr69rJA/edit).
- `tools/` — scripts (zie `tools/LEESMIJ.md`).
- Online zetten gaat vanzelf: push naar `main` met wijzigingen in `app/` → Action `pages.yml`.

Lokaal testen:

```bash
cd "G:/Mijn Drive/DATA70 - Programming en Bots/20 - Claude Code/Projecten/31 - Elke projecten en vragen/04 - Meditatie-app"
python -m http.server 8141 --directory app
```

De video's blijven van Meditation Moments en spelen af via hun eigen YouTube-speler; er wordt niets gedownload of gekopieerd.
