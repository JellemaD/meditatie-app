const VERSIE = "0.5.0";

const $ = (s) => document.querySelector(s);
const catNaam = Object.fromEntries(CATEGORIEEN.map((c) => [c.id, c.naam]));
const thumb = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
const meta = (v) => [v.sub, `${v.min} min`, KANALEN[v.kanaal]?.naam].filter(Boolean).join(" · ");

// ---- per-telefoon onthouden (alleen gemak, mag leeg zijn) ----
function lees(sleutel, standaard) {
  try { return JSON.parse(localStorage.getItem(sleutel)) ?? standaard; } catch { return standaard; }
}
function schrijf(sleutel, waarde) {
  try { localStorage.setItem(sleutel, JSON.stringify(waarde)); } catch { /* geen opslag: niet erg */ }
}

// ---- begroeting en aanbeveling op tijd van de dag ----
function dagdeel() {
  const u = new Date().getHours();
  if (u >= 5 && u < 11) return { groet: "Goedemorgen Elke", vraag: "Rustig de dag in?", cat: "ochtend" };
  if (u >= 11 && u < 18) return { groet: "Hoi Elke", vraag: "Even een moment voor jezelf?", cat: "rust" };
  if (u >= 18 && u < 21) return { groet: "Goedenavond Elke", vraag: "Even tot rust komen?", cat: "rust" };
  return { groet: "Hoi Elke", vraag: "Klaar om te gaan slapen?", cat: "slapen" };
}

function aanbeveling(cat) {
  const opties = VIDEOS.filter((v) => v.cat === cat);
  // elke dag een andere, maar vast binnen de dag
  const dag = Math.floor(Date.now() / 864e5);
  return opties[dag % opties.length];
}

// ---- favorieten (Mijn meditaties), alleen op deze telefoon ----
const HART_SVG = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20s-7-4.4-9.2-8.6C1.3 8.5 3 5 6.4 5c2 0 3.3 1.1 4.1 2.3h3c.8-1.2 2.1-2.3 4.1-2.3 3.4 0 5.1 3.5 3.6 6.4C19 15.6 12 20 12 20z" fill="currentColor"/></svg>';
const favs = () => lees("favorieten", []);
const isFav = (id) => favs().includes(id);
function wisselFav(id) {
  const f = favs();
  schrijf("favorieten", f.includes(id) ? f.filter((x) => x !== id) : [id, ...f]);
}

// ---- hoeveel tijd heb je? ----
const TIJDEN = [
  { id: "alle", naam: "Alles", past: () => true },
  { id: "5", naam: "± 5 min", past: (m) => m <= 7 },
  { id: "10", naam: "± 10 min", past: (m) => m >= 8 && m <= 13 },
  { id: "20", naam: "± 20 min", past: (m) => m >= 14 && m <= 25 },
  { id: "lang", naam: "Langer", past: (m) => m > 25 },
];
let tijd = lees("tijd", "alle");
if (!TIJDEN.some((x) => x.id === tijd)) tijd = "alle";
const pastTijd = (v) => TIJDEN.find((x) => x.id === tijd).past(v.min);

function toonTijden() {
  $("#tijden").replaceChildren(...TIJDEN.map((x) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = x.naam;
    b.setAttribute("aria-pressed", String(x.id === tijd));
    b.onclick = () => { tijd = x.id; schrijf("tijd", x.id); toonTijden(); toonChips(); toonLijst(); };
    return b;
  }));
}

// ---- weergave ----
function item(v) {
  const b = document.createElement("button");
  b.className = "item";
  b.innerHTML = `<img loading="lazy" alt="" src="${thumb(v.id)}"><div><div class="t"></div><div class="m"></div></div>`;
  b.querySelector(".t").textContent = v.titel;
  b.querySelector(".m").textContent = meta(v);
  if (isFav(v.id)) {
    const h = document.createElement("span");
    h.className = "fav-teken";
    h.setAttribute("aria-label", "In Mijn meditaties");
    h.innerHTML = HART_SVG;
    b.append(h);
  }
  b.onclick = () => open(v);
  return b;
}

function toonAanbevolen() {
  const d = dagdeel();
  $("#groet").textContent = d.groet;
  $("#vraag").textContent = d.vraag;
  const v = aanbeveling(d.cat);
  const b = document.createElement("button");
  b.innerHTML = `
    <div class="beeld"><img alt="" src="${thumb(v.id).replace("mqdefault", "hqdefault")}">
      <span class="play"><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></span></div>
    <div class="tekst"><div class="label">Voor nu</div><div class="titel"></div><div class="meta"></div></div>`;
  b.querySelector(".titel").textContent = v.titel;
  b.querySelector(".meta").textContent = `${catNaam[v.cat]} · ${meta(v)}`;
  b.onclick = () => open(v);
  $("#aanbevolen").replaceChildren(b);
}

function toonLaatst() {
  const ids = lees("laatst", []);
  const lijst = ids.map((id) => VIDEOS.find((v) => v.id === id)).filter(Boolean).slice(0, 3);
  $("#laatst-blok").hidden = lijst.length === 0;
  $("#laatst").replaceChildren(...lijst.map(item));
}

function toonFav() {
  const lijst = favs().map((id) => VIDEOS.find((v) => v.id === id)).filter(Boolean);
  $("#fav-blok").hidden = lijst.length === 0;
  $("#fav").replaceChildren(...lijst.map(item));
}

let gekozen = lees("onderwerp", dagdeel().cat);
function toonChips() {
  const chips = CATEGORIEEN.map((c) => {
    const b = document.createElement("button");
    b.className = "chip";
    const n = VIDEOS.filter((v) => v.cat === c.id && pastTijd(v)).length;
    b.textContent = c.naam;
    if (tijd !== "alle") {
      const s = document.createElement("span");
      s.className = "n"; s.textContent = n;
      b.append(s);
      b.disabled = n === 0 && c.id !== gekozen;
    }
    b.setAttribute("aria-pressed", String(c.id === gekozen));
    b.onclick = () => { gekozen = c.id; schrijf("onderwerp", c.id); toonChips(); toonLijst(); };
    return b;
  });
  $("#chips").replaceChildren(...chips);
}
function toonLijst() {
  const lijst = VIDEOS.filter((v) => v.cat === gekozen && pastTijd(v));
  $("#lijst").replaceChildren(...lijst.map(item));
  const t = TIJDEN.find((x) => x.id === tijd);
  $("#leeg").hidden = lijst.length > 0;
  $("#leeg").textContent = `Geen meditaties van ${t.naam.replace("± ", "ongeveer ").toLowerCase()} bij ${catNaam[gekozen]}. Kies een ander onderwerp of een andere tijd.`;
}

// ---- speler ----
// YouTube-speler zonder eigen YouTube-knoppen (controls=0), met onze eigen voorkant en bediening.
// Er wordt pas iets van YouTube geladen als Elke op play drukt.
// Afspeelstatus van YouTube (vast; YT bestaat pas na het laden)
const SPEELT = 1, PAUZE = 2, KLAAR = 0;
const staat = () => (speler?.getPlayerState ? speler.getPlayerState() : -9);
let speler = null, huidig = null, klok = null, startWacht = null, ytLaden = null, slepen = false;

function laadYT() {
  if (!ytLaden) {
    ytLaden = new Promise((ok, fout) => {
      window.onYouTubeIframeAPIReady = ok;
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.onerror = fout;
      document.head.append(s);
    });
  }
  return ytLaden;
}

// Ondertitels uit: YouTube zet ze soms vanzelf aan
function geenOndertitels(p) {
  try { p.unloadModule("captions"); p.setOption("captions", "track", {}); } catch { /* geen ondertitels */ }
}

const mmss = (s) => { s = Math.max(0, Math.floor(s || 0)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

function knop(speelt) {
  $("#ic-play").toggleAttribute("hidden", speelt); // SVG kent .hidden niet, dus via het attribuut
  $("#ic-pauze").toggleAttribute("hidden", !speelt);
  $("#pp").setAttribute("aria-label", speelt ? "Pauze" : "Afspelen");
}

function voorkant(zichtbaar, tekst = "") {
  $("#voorkant").classList.toggle("weg", !zichtbaar);
  $("#vk-tekst").hidden = !tekst;
  $("#vk-tekst").textContent = tekst;
}

function nieuwVak() {
  const d = document.createElement("div");
  d.id = "yt";
  $("#yt").replaceWith(d);
}

function bijwerken() {
  if (!speler?.getCurrentTime) return;
  const t = speler.getCurrentTime(), d = speler.getDuration() || huidig.min * 60;
  $("#positie").max = Math.floor(d);
  if (!slepen) { $("#positie").value = Math.floor(t); $("#tijd").textContent = mmss(t); }
  $("#duur").textContent = mmss(d);
}

async function start() {
  if (speler) { speler.playVideo(); return; }
  $("#voorkant").classList.add("laden");
  try { await laadYT(); } catch {
    $("#voorkant").classList.remove("laden");
    voorkant(true, "Geen verbinding met YouTube. Probeer het zo nog eens.");
    return;
  }
  const v = huidig;
  speler = new YT.Player("yt", {
    host: "https://www.youtube-nocookie.com",
    videoId: v.id,
    playerVars: { autoplay: 1, controls: 0, playsinline: 1, rel: 0, iv_load_policy: 3, disablekb: 1, fs: 0, cc_load_policy: 0 },
    events: {
      onReady: (e) => { if (huidig !== v) return; geenOndertitels(e.target); e.target.playVideo(); bijwerken(); },
      onStateChange: (e) => {
        if (huidig !== v) return;
                if (e.data === SPEELT) {
          clearTimeout(startWacht);
          $("#voorkant").classList.remove("laden");
          voorkant(false); $("#hint").hidden = true; knop(true); geenOndertitels(speler);
          clearInterval(klok); klok = setInterval(bijwerken, 500);
        } else if (e.data === PAUZE) {
          knop(false); bijwerken();
        } else if (e.data === KLAAR) {
          knop(false); clearInterval(klok); bijwerken();
          voorkant(true, "Klaar. Fijn dat je even de tijd voor jezelf nam.");
        }
      },
    },
  });
  // Start de telefoon niet vanzelf (bijv. iPhone)? Dan de video zelf laten zien om op te tikken.
  clearTimeout(startWacht);
  startWacht = setTimeout(() => {
    if (huidig !== v || staat() === SPEELT) return;
    $("#voorkant").classList.remove("laden");
    voorkant(false); $("#hint").hidden = false;
  }, 3500);
}

function stop() {
  clearInterval(klok); clearTimeout(startWacht);
  try { speler?.destroy(); } catch { /* al weg */ }
  speler = null;
  nieuwVak();
}

function open(v, metGeschiedenis = true) {
  stop();
  huidig = v;
  $("#vk-img").src = thumb(v.id).replace("mqdefault", "hqdefault");
  $("#voorkant").classList.remove("laden");
  voorkant(true);
  $("#hint").hidden = true;
  knop(false);
  $("#positie").max = v.min * 60; $("#positie").value = 0;
  $("#tijd").textContent = "0:00"; $("#duur").textContent = `${v.min}:00`;
  $("#s-cat").textContent = catNaam[v.cat];
  $("#s-titel").textContent = v.titel;
  $("#s-sub").textContent = meta(v);
  toonHart();
  $("#speler").hidden = false;
  document.body.style.overflow = "hidden";
  schrijf("laatst", [v.id, ...lees("laatst", []).filter((x) => x !== v.id)].slice(0, 10));
  if (metGeschiedenis) history.pushState({ v: v.id }, "", `#${v.id}`);
}

function toonHart() {
  const aan = isFav(huidig.id);
  $("#hart").setAttribute("aria-pressed", String(aan));
  $("#hart-tekst").textContent = aan ? "In Mijn meditaties" : "Bewaar in Mijn meditaties";
}
$("#hart").onclick = () => { if (huidig) { wisselFav(huidig.id); toonHart(); } };

function sluit() {
  stop();
  huidig = null;
  $("#speler").hidden = true;
  document.body.style.overflow = "";
  toonFav();
  toonLaatst();
  toonLijst();
}

$("#voorkant").onclick = () => {
  if (staat() === KLAAR) speler.seekTo(0, true);
  start();
};
$("#pp").onclick = () => {
  if (staat() === SPEELT) speler.pauseVideo();
  else if (staat() === KLAAR) { speler.seekTo(0, true); speler.playVideo(); }
  else start();
};
const spring = (sec) => { if (speler?.getCurrentTime) { speler.seekTo(Math.max(0, speler.getCurrentTime() + sec), true); bijwerken(); } };
$("#min15").onclick = () => spring(-15);
$("#plus15").onclick = () => spring(15);
$("#positie").oninput = () => { slepen = true; $("#tijd").textContent = mmss($("#positie").value); };
$("#positie").onchange = () => { slepen = false; if (speler?.seekTo) speler.seekTo(Number($("#positie").value), true); else start(); };

$("#terug").onclick = () => (history.state?.v ? history.back() : sluit());
addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  const v = VIDEOS.find((x) => x.id === id);
  v ? open(v, false) : sluit();
});

// ---- offline-melding ----
function netwerk() { $("#offline").hidden = navigator.onLine; }
addEventListener("online", netwerk);
addEventListener("offline", netwerk);

// ---- start ----
$("#bronnen").replaceChildren(...Object.values(KANALEN).flatMap((k, i, a) => {
  const l = document.createElement("a");
  l.href = k.url; l.target = "_blank"; l.rel = "noopener"; l.textContent = k.naam;
  return i < a.length - 1 ? [l, i < a.length - 2 ? ", " : " en "] : [l];
}));
$("#aantal").textContent = VIDEOS.length;
$("#versie").textContent = `versie ${VERSIE}`;
toonAanbevolen();
toonFav();
toonLaatst();
toonTijden();
toonChips();
toonLijst();
netwerk();
history.replaceState(null, "", location.pathname);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
