// Meditaties van het YouTube-kanaal Meditation Moments (@MeditationMomentsApp).
// Alleen video's die in een andere site mogen spelen (gecontroleerd 01-11-2026).
// min = duur in minuten (afgerond). Lijst aanpassen = dit bestand aanpassen.

const CATEGORIEEN = [
  { id: "slapen", naam: "Slapen" },
  { id: "ochtend", naam: "Ochtend" },
  { id: "rust", naam: "Rust" },
  { id: "kort", naam: "Kort & beginnen" },
  { id: "dank", naam: "Dankbaarheid" },
  { id: "loslaten", naam: "Loslaten" },
  { id: "lang", naam: "Lang & samen" },
  { id: "muziek", naam: "Muziek & geluid" },
];

const VIDEOS = [
  // Slapen
  { id: "cGeTCxd0USw", cat: "slapen", titel: "Heerlijk in slaap vallen", min: 11 },
  { id: "6bvt4-ian_w", cat: "slapen", titel: "Gedachten loslaten voor de nacht", sub: "Yoga nidra tegen piekeren", min: 13 },
  { id: "eEdXk_3VQsg", cat: "slapen", titel: "Slaapverhaal: Het heilige pad", min: 32 },

  // Ochtend
  { id: "korQGPwu0L8", cat: "ochtend", titel: "Geleide ochtendmeditatie", min: 6 },
  { id: "IsU-x5Tmnvc", cat: "ochtend", titel: "Visualiseer je dag", min: 4 },
  { id: "UHroQoIAbno", cat: "ochtend", titel: "Positieve start voor je dag", min: 10 },
  { id: "qhgxUEwjRWw", cat: "ochtend", titel: "Begin je dag vanuit rust en stilte", min: 11 },

  // Rust
  { id: "k0KJXvorsiM", cat: "rust", titel: "Rustgevende meditatie", min: 8 },
  { id: "T_KqvekIrZM", cat: "rust", titel: "Stilte in jezelf", min: 6 },
  { id: "FB4r3-78alw", cat: "rust", titel: "Rust in jezelf", min: 6 },
  { id: "gxl2ndzF_No", cat: "rust", titel: "Even stilte voor jezelf", min: 11 },
  { id: "ovPBUPuyBIE", cat: "rust", titel: "Innerlijke rust", min: 10 },
  { id: "a9wp5A4j7Lk", cat: "rust", titel: "Laat spanning los", min: 11 },
  { id: "5fmBCZ2KCrs", cat: "rust", titel: "Ontspanningsoefeningen", min: 11 },
  { id: "042ZxDilih0", cat: "rust", titel: "Diepe rust", min: 13 },
  { id: "f6VEJnH9Y2g", cat: "rust", titel: "Yoga nidra voor diepe ontspanning", min: 20 },

  // Kort & beginnen
  { id: "LTVkFP_LV4U", cat: "kort", titel: "Focus op dit moment", min: 4 },
  { id: "agYsqJ5eG4c", cat: "kort", titel: "Ademhalingsoefening", sub: "Minder stress", min: 8 },
  { id: "jrg4LbdUkl8", cat: "kort", titel: "Beginnen met mediteren", min: 11 },

  // Dankbaarheid
  { id: "WN0zuF_GcU4", cat: "dank", titel: "Zelfvertrouwen en zelfliefde", sub: "Affirmaties", min: 4 },
  { id: "P4y7rFROAhw", cat: "dank", titel: "Dankbaarheid", min: 6 },
  { id: "4eBIpcyeV4A", cat: "dank", titel: "Bewuste aandacht en dankbaarheid", min: 10 },

  // Loslaten
  { id: "RJdg2p1Qd00", cat: "loslaten", titel: "Laat los en neem het mooie mee", min: 15 },
  { id: "BMfm6e0pobo", cat: "loslaten", titel: "Visualisatie", min: 26 },

  // Lang & samen
  { id: "Lsj9cwQ6xg8", cat: "lang", titel: "Terug naar jezelf", min: 59 },
  { id: "Q2lB3rwz2eg", cat: "lang", titel: "Dankbaarheid (live)", min: 59 },
  { id: "vW8OQZQuAZI", cat: "lang", titel: "Samen mediteren voor vrede", sub: "Volle maan", min: 35 },
  { id: "4EN6xcsCjrc", cat: "lang", titel: "Liefdevol bewustzijn", sub: "Volle maan", min: 53 },

  // Muziek & geluid
  { id: "SJ-k1b1yW_U", cat: "muziek", titel: "Relaxmuziek om te slapen", min: 58 },
  { id: "V0NEHc9Jx1I", cat: "muziek", titel: "White noise", sub: "Voor rust en slapen", min: 10 },
  { id: "LEArfBMhnlU", cat: "muziek", titel: "Diepe slaap", sub: "Binaural beats", min: 10 },
  { id: "ETQHHQpAdY4", cat: "muziek", titel: "Helende muziek", sub: "Binaural beats", min: 8 },
];
