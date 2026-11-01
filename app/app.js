const VERSIE = "0.2.1";

const $ = (s) => document.querySelector(s);
const catNaam = Object.fromEntries(CATEGORIEEN.map((c) => [c.id, c.naam]));
const thumb = (id) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`;
const meta = (v) => [v.sub, `${v.min} min`].filter(Boolean).join(" · ");

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

// ---- weergave ----
function item(v) {
  const b = document.createElement("button");
  b.className = "item";
  b.innerHTML = `<img loading="lazy" alt="" src="${thumb(v.id)}"><div><div class="t"></div><div class="m"></div></div>`;
  b.querySelector(".t").textContent = v.titel;
  b.querySelector(".m").textContent = meta(v);
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

let gekozen = lees("onderwerp", dagdeel().cat);
function toonChips() {
  const chips = CATEGORIEEN.map((c) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = c.naam;
    b.setAttribute("aria-pressed", String(c.id === gekozen));
    b.onclick = () => { gekozen = c.id; schrijf("onderwerp", c.id); toonChips(); toonLijst(); };
    return b;
  });
  $("#chips").replaceChildren(...chips);
}
function toonLijst() {
  $("#lijst").replaceChildren(...VIDEOS.filter((v) => v.cat === gekozen).map(item));
}

// ---- speler ----
function open(v, metGeschiedenis = true) {
  const f = document.createElement("iframe");
  // youtube-nocookie: geen cookies tot er op play wordt gedrukt
  f.src = `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true;
  f.title = v.titel;
  f.id = "frame";
  $("#frame").replaceWith(f);
  $("#s-cat").textContent = catNaam[v.cat];
  $("#s-titel").textContent = v.titel;
  $("#s-sub").textContent = meta(v);
  $("#speler").hidden = false;
  document.body.style.overflow = "hidden";
  schrijf("laatst", [v.id, ...lees("laatst", []).filter((x) => x !== v.id)].slice(0, 10));
  if (metGeschiedenis) history.pushState({ v: v.id }, "", `#${v.id}`);
}

function sluit() {
  const leeg = document.createElement("div");
  leeg.id = "frame";
  $("#frame").replaceWith(leeg); // stopt het geluid
  $("#speler").hidden = true;
  document.body.style.overflow = "";
  toonLaatst();
}

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
$("#versie").textContent = `versie ${VERSIE}`;
toonAanbevolen();
toonLaatst();
toonChips();
toonLijst();
netwerk();
history.replaceState(null, "", location.pathname);

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
