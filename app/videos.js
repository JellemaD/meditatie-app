// Meditaties van YouTube, gegroepeerd per onderwerp. Alleen video's die in een andere app mogen spelen
// (gecontroleerd 01-11-2026). min = duur in minuten. Lijst aanpassen = dit bestand aanpassen.

const KANALEN = {
  mm: { naam: "Meditation Moments", url: "https://www.youtube.com/@MeditationMomentsApp" },
  denise: { naam: "Denise van Beek", url: "https://www.youtube.com/@denisevbeek" },
  gerjan: { naam: "Gerjan Schoemaker", url: "https://www.youtube.com/@Gerjan" },
  radboud: { naam: "Radboudumc Mindfulness", url: "https://www.youtube.com/@radboudumccentrumvoormindf6698" },
};

const CATEGORIEEN = [
  { id: "slapen", naam: "Slapen" },
  { id: "ochtend", naam: "Ochtend" },
  { id: "rust", naam: "Rust" },
  { id: "kort", naam: "Kort & beginnen" },
  { id: "bodyscan", naam: "Bodyscan" },
  { id: "stilte", naam: "Stilte & aandacht" },
  { id: "dank", naam: "Zelfliefde & dank" },
  { id: "loslaten", naam: "Loslaten" },
  { id: "lang", naam: "Lang & samen" },
  { id: "muziek", naam: "Muziek & geluid" },
];

const VIDEOS = [
  // Slapen (11)
  { id: "cGeTCxd0USw", kanaal: "mm", cat: "slapen", titel: "Heerlijk in slaap vallen", min: 11 },
  { id: "fJW2UN-IvGA", kanaal: "mm", cat: "slapen", titel: "Slaapmeditatie voor rust in je hoofd", min: 11 },
  { id: "LaerVo5xOjQ", kanaal: "denise", cat: "slapen", titel: "Avondmeditatie: de dag achter je laten", min: 11 },
  { id: "6bvt4-ian_w", kanaal: "mm", cat: "slapen", titel: "Gedachten loslaten voor de nacht", sub: "Yoga nidra tegen piekeren", min: 13 },
  { id: "DcdpdMXvCfw", kanaal: "denise", cat: "slapen", titel: "Val ontspannen in slaap", min: 14 },
  { id: "SzJP3rxYW3k", kanaal: "denise", cat: "slapen", titel: "Zachte en voedende nachtrust", min: 20 },
  { id: "qfU8kFrRAZE", kanaal: "denise", cat: "slapen", titel: "Makkelijk in slaap vallen", sub: "Met ademhaling", min: 25 },
  { id: "trdOp8X_SJM", kanaal: "denise", cat: "slapen", titel: "Stress en onrust loslaten voor de nacht", min: 28 },
  { id: "eEdXk_3VQsg", kanaal: "mm", cat: "slapen", titel: "Slaapverhaal: Het heilige pad", min: 32 },
  { id: "Rrr-ecFhHDs", kanaal: "gerjan", cat: "slapen", titel: "Yoga nidra voor slaap en loslaten", min: 41 },
  { id: "kfqYR3X5k88", kanaal: "denise", cat: "slapen", titel: "Moeiteloos in slaap", min: 56 },

  // Ochtend (8)
  { id: "IsU-x5Tmnvc", kanaal: "mm", cat: "ochtend", titel: "Visualiseer je dag", min: 4 },
  { id: "korQGPwu0L8", kanaal: "mm", cat: "ochtend", titel: "Geleide ochtendmeditatie", min: 6 },
  { id: "UHroQoIAbno", kanaal: "mm", cat: "ochtend", titel: "Positieve start voor je dag", min: 10 },
  { id: "qhgxUEwjRWw", kanaal: "mm", cat: "ochtend", titel: "Begin je dag vanuit rust en stilte", min: 11 },
  { id: "4b3OJ12pqFk", kanaal: "denise", cat: "ochtend", titel: "Zachte start, nog vóór je opstaat", min: 11 },
  { id: "eRko6z9BkBQ", kanaal: "denise", cat: "ochtend", titel: "Begin je dag zacht en ontspannen", min: 11 },
  { id: "OHyRPGzvMgk", kanaal: "denise", cat: "ochtend", titel: "Begin je dag kalm en met energie", min: 13 },
  { id: "jmULyX5sv1c", kanaal: "denise", cat: "ochtend", titel: "Start de dag zonder stress", min: 14 },

  // Rust (24)
  { id: "T_KqvekIrZM", kanaal: "mm", cat: "rust", titel: "Stilte in jezelf", min: 6 },
  { id: "FB4r3-78alw", kanaal: "mm", cat: "rust", titel: "Rust in jezelf", min: 6 },
  { id: "qM2flNXMjXY", kanaal: "radboud", cat: "rust", titel: "De veilige plek", min: 7 },
  { id: "k0KJXvorsiM", kanaal: "mm", cat: "rust", titel: "Rustgevende meditatie", min: 8 },
  { id: "ovPBUPuyBIE", kanaal: "mm", cat: "rust", titel: "Innerlijke rust", min: 10 },
  { id: "gxl2ndzF_No", kanaal: "mm", cat: "rust", titel: "Even stilte voor jezelf", min: 11 },
  { id: "a9wp5A4j7Lk", kanaal: "mm", cat: "rust", titel: "Laat spanning los", min: 11 },
  { id: "5fmBCZ2KCrs", kanaal: "mm", cat: "rust", titel: "Ontspanningsoefeningen", min: 11 },
  { id: "wskgmOoNqFg", kanaal: "denise", cat: "rust", titel: "Diepe ontspanning", min: 11 },
  { id: "E6d2Az5D0OM", kanaal: "denise", cat: "rust", titel: "Ontprikkelen", sub: "Voor als het te veel is", min: 11 },
  { id: "2764LGrWgt8", kanaal: "denise", cat: "rust", titel: "Volledig tot rust komen", min: 11 },
  { id: "042ZxDilih0", kanaal: "mm", cat: "rust", titel: "Diepe rust", min: 13 },
  { id: "_8aPhRtLgKs", kanaal: "gerjan", cat: "rust", titel: "Ontspanningsoefening Jacobson", sub: "Spieren ontspannen", min: 13 },
  { id: "-w1JslW43Po", kanaal: "denise", cat: "rust", titel: "Even niks moeten", min: 14 },
  { id: "m1aGSmnkZl8", kanaal: "denise", cat: "rust", titel: "Mentale rust", min: 14 },
  { id: "lT529_JJwVI", kanaal: "denise", cat: "rust", titel: "Rust in je hoofd", sub: "Gedachten laten gaan", min: 14 },
  { id: "Wz-QYDrDEwY", kanaal: "denise", cat: "rust", titel: "Bij onrust en piekergedachten", min: 14 },
  { id: "C-sCx2JMdJk", kanaal: "denise", cat: "rust", titel: "Zenuwstelsel tot rust brengen", min: 15 },
  { id: "pCI2_S__6uE", kanaal: "denise", cat: "rust", titel: "Als je je onrustig of opgejaagd voelt", min: 16 },
  { id: "tRbdCt6dq9k", kanaal: "denise", cat: "rust", titel: "Yoga nidra: complete rust", min: 16 },
  { id: "zg8LYeTbIjk", kanaal: "gerjan", cat: "rust", titel: "Korte yoga nidra", min: 16 },
  { id: "DL_7_w1uUrs", kanaal: "denise", cat: "rust", titel: "Diep ontspannen", min: 16 },
  { id: "f6VEJnH9Y2g", kanaal: "mm", cat: "rust", titel: "Yoga nidra voor diepe ontspanning", min: 20 },
  { id: "9Ohc1JgeAb4", kanaal: "gerjan", cat: "rust", titel: "Meditatie bij angst", min: 24 },

  // Kort & beginnen (11)
  { id: "LTVkFP_LV4U", kanaal: "mm", cat: "kort", titel: "Focus op dit moment", min: 4 },
  { id: "noDY0LOjTFA", kanaal: "radboud", cat: "kort", titel: "3 minuten ademruimte", min: 4 },
  { id: "tFcJE1tsZ2Q", kanaal: "denise", cat: "kort", titel: "Extra korte meditatie", min: 5 },
  { id: "hodseT_iyXc", kanaal: "denise", cat: "kort", titel: "Ontspan lichaam en geest", min: 5 },
  { id: "5RDG99jFKBY", kanaal: "denise", cat: "kort", titel: "Ademhalingsoefening: reset en ontspan", min: 6 },
  { id: "Bicwb6Z-ntw", kanaal: "denise", cat: "kort", titel: "Meditatie voor in de pauze", min: 7 },
  { id: "agYsqJ5eG4c", kanaal: "mm", cat: "kort", titel: "Ademhalingsoefening", sub: "Minder stress", min: 8 },
  { id: "9EL179POFzw", kanaal: "radboud", cat: "kort", titel: "Ademruimte met vriendelijkheid", min: 9 },
  { id: "jrg4LbdUkl8", kanaal: "mm", cat: "kort", titel: "Beginnen met mediteren", min: 11 },
  { id: "8iGJrhFnyuU", kanaal: "gerjan", cat: "kort", titel: "Ontspanning met ademoefening", min: 11 },
  { id: "mV27J9vhjMA", kanaal: "denise", cat: "kort", titel: "Leren mediteren, stap voor stap", sub: "Voor beginners", min: 12 },

  // Bodyscan (6)
  { id: "ZNAQQxp6hss", kanaal: "radboud", cat: "bodyscan", titel: "Bodyscan met compassie", min: 18 },
  { id: "85xq36aSXo0", kanaal: "radboud", cat: "bodyscan", titel: "Bodyscan kort", sub: "Nicole Schoonbrood", min: 20 },
  { id: "_Y_FBDz4mE8", kanaal: "denise", cat: "bodyscan", titel: "Bodyscan als je te veel in je hoofd zit", min: 22 },
  { id: "eeUyhHArkoY", kanaal: "radboud", cat: "bodyscan", titel: "Bodyscan kort", sub: "Renée Metzemaekers", min: 22 },
  { id: "doDZ1kzww2s", kanaal: "gerjan", cat: "bodyscan", titel: "Mindfulness bodyscan", min: 23 },
  { id: "_7jpAgh3LDU", kanaal: "denise", cat: "bodyscan", titel: "Bodyscan: oordeelloze aandacht", min: 25 },

  // Stilte & aandacht (4)
  { id: "1drKe5KuuuY", kanaal: "gerjan", cat: "stilte", titel: "Concentratie: 10 minuten", min: 10 },
  { id: "dBILPFBWXLI", kanaal: "denise", cat: "stilte", titel: "Stilte meditatie", sub: "Zonder muziek", min: 11 },
  { id: "ImazkYyMfzM", kanaal: "radboud", cat: "stilte", titel: "Zitten in aandacht", min: 20 },
  { id: "SzfAY-3mWg4", kanaal: "gerjan", cat: "stilte", titel: "Aandacht bij de adem", sub: "Samatha", min: 21 },

  // Zelfliefde & dank (12)
  { id: "WN0zuF_GcU4", kanaal: "mm", cat: "dank", titel: "Zelfvertrouwen en zelfliefde", sub: "Affirmaties", min: 4 },
  { id: "P4y7rFROAhw", kanaal: "mm", cat: "dank", titel: "Dankbaarheid", min: 6 },
  { id: "2IEJRVOdUJ4", kanaal: "gerjan", cat: "dank", titel: "Korte vriendelijkheidsmeditatie", sub: "Metta", min: 6 },
  { id: "4eBIpcyeV4A", kanaal: "mm", cat: "dank", titel: "Bewuste aandacht en dankbaarheid", min: 10 },
  { id: "oVJ9WYL38dM", kanaal: "denise", cat: "dank", titel: "Zelfliefde", min: 10 },
  { id: "RLqWfATKAfI", kanaal: "denise", cat: "dank", titel: "Ik ben: affirmaties voor rust en vertrouwen", min: 15 },
  { id: "847dqEFOD3U", kanaal: "denise", cat: "dank", titel: "Vriendelijkheid voor jezelf en anderen", sub: "Metta", min: 16 },
  { id: "RvgW05AQjA0", kanaal: "gerjan", cat: "dank", titel: "Zelfcompassie", min: 16 },
  { id: "U-dBOxtvFa4", kanaal: "denise", cat: "dank", titel: "Zelfvertrouwen en innerlijke kracht", sub: "Bergmeditatie", min: 18 },
  { id: "G6r3Y5sf-Xg", kanaal: "radboud", cat: "dank", titel: "Vriendelijkheidsmeditatie", sub: "Metta", min: 19 },
  { id: "7MKcnBgi4n8", kanaal: "mm", cat: "dank", titel: "Zelfvertrouwen en eigenwaarde", sub: "Live", min: 60 },
  { id: "IY1o1sRrX1s", kanaal: "mm", cat: "dank", titel: "Waar ben jij dankbaar voor?", sub: "Live", min: 66 },

  // Loslaten (9)
  { id: "DQWZwc3Vql8", kanaal: "denise", cat: "loslaten", titel: "Acceptatie", min: 14 },
  { id: "RJdg2p1Qd00", kanaal: "mm", cat: "loslaten", titel: "Laat los en neem het mooie mee", min: 15 },
  { id: "bnyU8gNOf5c", kanaal: "denise", cat: "loslaten", titel: "Loslaten: stress of een vervelende situatie", min: 16 },
  { id: "c1loDMI_k-A", kanaal: "denise", cat: "loslaten", titel: "Bij liefdesverdriet of rouw", min: 16 },
  { id: "eBj2A0JabcI", kanaal: "gerjan", cat: "loslaten", titel: "Stress en spanning loslaten", sub: "Met ademoefening", min: 16 },
  { id: "BMfm6e0pobo", kanaal: "mm", cat: "loslaten", titel: "Visualisatie", min: 26 },
  { id: "LQaVvYUcCU4", kanaal: "gerjan", cat: "loslaten", titel: "Bij piekeren en in je hoofd zitten", min: 41 },
  { id: "nYPHERJ_Vqc", kanaal: "mm", cat: "loslaten", titel: "Negatieve gedachten loslaten", sub: "Live", min: 60 },
  { id: "QRmodLwPayY", kanaal: "mm", cat: "loslaten", titel: "De kunst van het loslaten", sub: "Live", min: 90 },

  // Lang & samen (11)
  { id: "Ic4AVSh4vvY", kanaal: "mm", cat: "lang", titel: "Volle maan, april", sub: "Live", min: 32 },
  { id: "vW8OQZQuAZI", kanaal: "mm", cat: "lang", titel: "Samen mediteren voor vrede", sub: "Volle maan", min: 35 },
  { id: "4Ca0qrulxgk", kanaal: "mm", cat: "lang", titel: "Lente", sub: "Live", min: 51 },
  { id: "4EN6xcsCjrc", kanaal: "mm", cat: "lang", titel: "Liefdevol bewustzijn", sub: "Volle maan", min: 53 },
  { id: "-pRB4UHf_1I", kanaal: "mm", cat: "lang", titel: "Leef vanuit je innerlijke kracht", sub: "Live", min: 53 },
  { id: "Lsj9cwQ6xg8", kanaal: "mm", cat: "lang", titel: "Terug naar jezelf", min: 59 },
  { id: "Q2lB3rwz2eg", kanaal: "mm", cat: "lang", titel: "Dankbaarheid (live)", min: 59 },
  { id: "ymkoOaOYiJ4", kanaal: "mm", cat: "lang", titel: "Meditatie voor vrede", sub: "Live", min: 59 },
  { id: "AibcckVjHjo", kanaal: "mm", cat: "lang", titel: "Meer rust in je hoofd", sub: "Live", min: 66 },
  { id: "5ildebx_YUk", kanaal: "mm", cat: "lang", titel: "Verbinding vanuit vertrouwen", sub: "Live", min: 70 },
  { id: "EM4qUmQ8nng", kanaal: "mm", cat: "lang", titel: "Tegen angst en negatieve gedachten", sub: "Live", min: 104 },

  // Muziek & geluid (4)
  { id: "ETQHHQpAdY4", kanaal: "mm", cat: "muziek", titel: "Helende muziek", sub: "Binaural beats", min: 8 },
  { id: "V0NEHc9Jx1I", kanaal: "mm", cat: "muziek", titel: "White noise", sub: "Voor rust en slapen", min: 10 },
  { id: "LEArfBMhnlU", kanaal: "mm", cat: "muziek", titel: "Diepe slaap", sub: "Binaural beats", min: 10 },
  { id: "SJ-k1b1yW_U", kanaal: "mm", cat: "muziek", titel: "Relaxmuziek om te slapen", min: 58 },

];
