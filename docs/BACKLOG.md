# Backlog — Meditatie-app Elke

*Bijgewerkt 01-11-2026*

Meditatie-app voor Elke: een rustige schil om de gratis YouTube-meditaties van Meditation Moments
(kanaal [@MeditationMomentsApp](https://www.youtube.com/@MeditationMomentsApp)), zodat Elke niet naar YouTube hoeft
en makkelijk een meditatie kan afspelen. Keuze Durk 01-11-2026: **optie B, video's ingebouwd in de app.**
Achtergrond: `../ONDERZOEK - Meditation Moments.md`. Geen account, geen abonnement.

## Werkwijze (geldt voor elk item)

1. **Eén ding tegelijk.** Hooguit 1 item staat op "Nu". Pas als het af is, komt het volgende.
2. **Volgorde = het knelpunt.** Het knelpunt is dat Elke elke dag even mediteert. Wat daar niet aan bijdraagt, komt later of gaat naar de nee-lijst.
3. **"Af" vooraf vastleggen.** Elk item heeft een regel "Af als…". Daar stoppen we, er komt niets extra's bij.
4. **Simpel eerst.** Is er een manier met minder stappen, dan nemen we die. Liever iets schrappen dan versimpelen.
5. **Durk kiest.** Waar een keuze in zit, legt Claude de opties voor en wacht.
6. **Na 4 weken gebruik evalueren** (B8), en daarna pas uitbreiden.

## Nu (max 1)

| # | Item | Af als… |
|---|---|---|
| B7 | **Bij Elke installeren.** Link: https://jellemad.github.io/meditatie-app/ → in de browser "Toevoegen aan beginscherm". Eerst door Durk op zijn eigen telefoon testen. | Elke heeft de app op haar beginscherm en één meditatie afgespeeld. |

## Volgende

| # | Item | Af als… |
|---|---|---|
| B9 | **Videolijst nalopen** (Durk/Elke): `app/videos.js`, nu 32 video's in 8 onderwerpen. Weg wat niet past, erbij wat mist. | Durk of Elke zegt: lijst is goed. |
| B8 | **Evaluatie na 4 weken.** Hoe vaak gebruikt Elke hem? Wat mist ze? | Besluit: zo laten, uitbreiden of stoppen. |

## Later

- Eigen meditaties met een AI-stem (B1, B3, B4): offline en zonder reclame. Pas als de YouTube-schil na 4 weken tekortschiet (B8).
  - B1 Stem kiezen: 8 voorbeelden in `stemkeuze/Stemkeuze meditatie-app.html`.
  - B3 Teksten schrijven, B4 audio maken.
- Stiltetimer met belletje.
- Dagelijkse herinnering (pushmelding op een vaste tijd).
- Bijhouden hoeveel dagen op rij Elke mediteert.
- Videolijst automatisch bijwerken met nieuwe video's van het kanaal.

## Nee-lijst

- Honderden meditaties: keuzestress, geen extra rust.
- Account, inloggen, abonnement.
- Video's of audio van Meditation Moments downloaden of kopiëren (auteursrecht). Alleen hun eigen YouTube-speler insluiten.
- Podcasts en lange gesprekken: dit is een app om te mediteren.
- Volgen of meten wat Elke doet buiten haar eigen telefoon.

## Af

| # | Item | Klaar |
|---|---|---|
| B6 | **Repo + Google Sheet + online.** Repo [JellemaD/meditatie-app](https://github.com/JellemaD/meditatie-app), GitHub Pages via Action `pages.yml`, sheet via `sync-sheet.yml`. | 01-11-2026, v0.2.1 |
| B2 | **Keuzes Durk**: naam "Meditatie app", hosting GitHub Pages, video's ingebouwd (optie B). | 01-11-2026 |
| B5 | **App v1 (schil om YouTube)**: begroeting en "Voor nu"-tip op tijd van de dag, 8 onderwerpen, 32 meditaties, speler in de app (youtube-nocookie), laatst geluisterd, te installeren op het beginscherm, opent ook zonder internet. Lokaal getest. Code: `app/`. | 01-11-2026, v0.2.0 |

---

Lokaal testen: `python -m http.server 8141 --directory app` in de projectmap, dan http://localhost:8141.
App: https://jellemad.github.io/meditatie-app/ ·
Google Sheet: [Meditatie app — backlog en versies](https://docs.google.com/spreadsheets/d/1HjDXdNUJuUCYPQEok78HBzUUly7QQW8VMljmLr69rJA/edit)
