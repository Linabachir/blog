/* =========================================================
   created.bylina — content (FR + EN)
   All copy lives here; pages.jsx reads window.BL_CONTENT[lang].
   ========================================================= */

// ---------- destinations & articles (shared data, copy localized) -------

const CONTINENTS = [
  { id: "asia",    tint: "mint",     visited: true,
    fr: { name: "Asie",       blurb: "Là où tout a commencé. Six pays, une année à voyager seule." },
    en: { name: "Asia",       blurb: "Where it all began. Six countries, a year on the road, solo." } },
  { id: "europe",  tint: "sky",      visited: false,
    fr: { name: "Europe",     blurb: "Bientôt. Valence, en Espagne, est déjà dans les plans." },
    en: { name: "Europe",     blurb: "Coming soon. Valencia, Spain, is already in the plans." } },
  { id: "africa",  tint: "peach",    visited: true,
    fr: { name: "Afrique",    blurb: "Cap sur l’Afrique du Nord. Deux pays explorés entre culture, désert et traditions." },
    en: { name: "Africa",     blurb: "Heading to North Africa. Two countries explored between culture, desert and tradition." } },
  { id: "americas",tint: "lavender", visited: false,
    fr: { name: "Océanie",   blurb: "Un rêve : l'Australie. Début de mon stage à Melbourne le 31 août." },
    en: { name: "Oceania",   blurb: "A dream: Australia. My internship in Melbourne starts August 31." } },
];

const COUNTRIES = [
  { id: "taiwan",      continent: "asia", tint: "mint",     hasArticles: true, articleCount: 1, lat: 23.7, lng: 121,
    fr: { name: "Ta\u00efwan",      blurb: "L'\u00eele o\u00f9 j'ai pos\u00e9 mes valises pour un master \u2014 et o\u00f9 j'ai compris que j'allais rester voyager." } ,
    en: { name: "Taiwan",      blurb: "The island where I came for a master's \u2014 and where I realized I'd keep traveling." } },
  { id: "vietnam",     continent: "asia", tint: "mint",     hasArticles: true, articleCount: 1, lat: 14.0583, lng: 108.2772,
    fr: { name: "Vietnam",     blurb: "Du nord brumeux au delta du M\u00e9kong. Trois semaines, trop courtes." } ,
    en: { name: "Vietnam",     blurb: "From the misty north to the Mekong delta. Three weeks, far too short." } },
  { id: "philippines", continent: "asia", tint: "sky",      hasArticles: true, articleCount: 1, lat: 12.8797, lng: 121.7740,
    fr: { name: "Philippines",blurb: "Sept mille \u00eeles. J'en ai vu quatre. La premi\u00e8re fois que j'ai dormi sur une plage." } ,
    en: { name: "Philippines",blurb: "Seven thousand islands. I saw four. The first time I slept on a beach." } },
  { id: "thailand-n",  continent: "asia", tint: "peach",    hasArticles: true, articleCount: 1, lat: 19.9, lng: 99.0,
    fr: { name: "Tha\u00eflande \u2014 Nord",  blurb: "Chiang Mai, Pai, et la moto-taxi qui m'a sauv\u00e9 d'un orage \u00e0 Mae Hong Son." } ,
    en: { name: "Thailand \u2014 North", blurb: "Chiang Mai, Pai, and the motorbike taxi that saved me from a storm in Mae Hong Son." } },
  { id: "thailand-bkk",continent: "asia", tint: "rose",     hasArticles: true, articleCount: 1, lat: 13.7563, lng: 100.5018,
    fr: { name: "Bangkok",     blurb: "La ville que je pensais d\u00e9tester. Trois retours plus tard, j'y reviens encore." } ,
    en: { name: "Bangkok",     blurb: "The city I thought I'd hate. Three returns later, I still come back." } },
  { id: "okinawa",     continent: "asia", tint: "cream",    hasArticles: false, articleCount: 0, lat: 26.3344, lng: 127.8056,
    fr: { name: "Okinawa",     blurb: "Le carnet n'est pas encore \u00e9crit. Mais l'eau \u00e9tait turquoise comme nulle part ailleurs." } ,
    en: { name: "Okinawa",     blurb: "The notebook isn't written yet. But the water was a turquoise I haven't seen anywhere else." } },
  { id: "malaysia",    continent: "asia", tint: "lavender", hasArticles: false, articleCount: 0, lat: 4.2105, lng: 101.9758,
    fr: { name: "Malaisie",    blurb: "Kuala Lumpur, les Cameron Highlands, et un train de nuit que je n'oublierai pas." } ,
    en: { name: "Malaysia",    blurb: "Kuala Lumpur, the Cameron Highlands, and an overnight train I won't forget." } },
];

// ----- Articles --------------------------------------------------------
// The featured one is fully written (FR + EN). Others are stubs with
// kicker/title/dek/meta so list pages look real.

const ARTICLES = window.BL_ARTICLES;

// ---------- Image placeholder palettes (used by PhotoTile) -------------
const IMG_PALETTES = {
  "taiwan-tea":       { from: "#9bb087", to: "#4a6b4f", label: "Ta\u00efwan" },
  "vietnam-rice":     { from: "#bccf8f", to: "#5a7a3a", label: "Vietnam" },
  "vietnam-misty":    { from: "#a8b8b0", to: "#5a6e6a", label: "Sapa" },
  "vietnam-lanterns": { from: "#e8b888", to: "#a85a3a", label: "Hoi An" },
  "philippines-beach":{ from: "#9ccfd6", to: "#4a7a98", label: "El Nido" },
  "philippines-tent": { from: "#d6c499", to: "#8a6e3a", label: "Siargao" },
  "thailand-temples": { from: "#e0b878", to: "#9c5a2a", label: "Chiang Mai" },
  "thailand-mountains":{ from: "#a8c0a8", to: "#5a7466", label: "Pai" },
  "thailand-bangkok": { from: "#c89ab8", to: "#6a3a5a", label: "Bangkok" },
  "okinawa-water":    { from: "#a5d9d4", to: "#3a8a8a", label: "Okinawa" },
  "malaysia-jungle":  { from: "#9cbf9c", to: "#3a6a4a", label: "Malaisie" },
  "lina-portrait":    { from: "#c4a888", to: "#7a5a3a", label: "Lina" },
  "lisbon":           { from: "#c8d5e0", to: "#6a8aa8", label: "Lisboa" },
  "marrakech":        { from: "#d8b89c", to: "#a8593a", label: "Marrakech" },
};

// ---------- UI strings (FR + EN) ---------------------------------------

const UI = {
  fr: {
    brand: "created.bylina",
    nav: {
      home: "Accueil",
      destinations: "Destinations",
      solo: "Voyager seule",
      about: "\u00c0 propos",
      collab: "Collaborer",
    },
    cta: { read: "Lire le carnet", subscribe: "S'abonner", contact: "\u00c9crivez-moi" },

    home: {
      hero: {
        kicker: "CARNET DE VOYAGE \u00b7 ASIE 2024\u201326",
        titleLead: "Carnet de voyage.",
        rotating: ["Ta\u00efwan.", "Vietnam.", "Philippines.", "Tha\u00eflande.", "Okinawa.", "Malaisie."],
        sub: "Moi c'est Lina. J'\u00e9cris ce que je vois, ce que je mange, et les jours o\u00f9 je doute. Un carnet tenu \u00e0 la main, quelque part en Asie.",
        ctaPrimary: "Lire le dernier carnet",
        ctaSecondary: "Toutes les destinations",
      },
      latest: { kicker: "DERNIERS CARNETS", title: "Derni\u00e8res aventures", cta: "Voir tous les carnets \u2192" },
      categories: { kicker: "EXPLORER", title: "Par o\u00f9 commencer", sub: "Trois fa\u00e7ons d'entrer dans le carnet selon ce que tu cherches aujourd'hui." },
      catCards: [
        { tint: "mint",     emoji: "\ud83c\udf3f", title: "Itin\u00e9raires & guides",  desc: "Des plans jour-par-jour, test\u00e9s, avec ce que j'ai aim\u00e9 et ce que j'\u00e9viterais.", to: { kind: "page", id: "destinations" } },
        { tint: "rose",     emoji: "\ud83c\udf92", title: "Voyager seule",     desc: "Tout ce que j'aurais voulu lire avant de partir seule. Concret, honnête, sans clichés.", to: { kind: "page", id: "solo" } },
        { tint: "cream",    emoji: "\u270d\ufe0f", title: "Mindset & solo dates", desc: "Ce que la solitude m'a appris. Petits rituels, mauvais jours, et faire du sport à l'autre bout du monde.", to: { kind: "page", id: "solo" } },
      ],
      mapKicker: "OU JE SUIS PASSEE",
      mapTitle: "L'Asie, un pays \u00e0 la fois",
      mapSub: "Une carte que je mets \u00e0 jour quand je rentre. Clique sur un pays pour ouvrir son carnet.",
      bigBanner: { title: "Mon prochain départ : l'Indonésie, été 2026. Puis Valence, en Espagne. Tu veux suivre ?", link: "S'abonner au carnet \u2192" },
      about: {
        kicker: "\u00c0 PROPOS",
        title: "Salut, moi c'est Lina.",
        body: "Je suis ing\u00e9nieure en intelligence artificielle, et mon aventure en solo a commenc\u00e9 par un master \u00e0 Ta\u00efwan. Ce qui ne devait \u00eatre qu'une ann\u00e9e d'\u00e9tudes s'est transform\u00e9 en un voyage bien plus profond : celui de la reconqu\u00eate de ma propre confiance.",
        cta: "Lire toute l'histoire \u2192",
      },
    },

    destinations: {
      kicker: "DESTINATIONS",
      title: "O\u00f9 j'ai pos\u00e9 mes valises",
      sub: "Six pays visit\u00e9s, beaucoup encore en projet. Choisis un continent pour entrer.",
      visitedLabel: "VISIT\u00c9",
      soonLabel: "BIENT\u00d4T",
      countriesIn: "pays",
      noArticlesYet: "Carnet \u00e0 \u00e9crire",
      articleSingular: "carnet",
      articlePlural: "carnets",
      back: "\u2190 Toutes les destinations",
      backToContinent: (c) => `\u2190 ${c}`,
    },

    article: {
      backHome: "\u2190 Retour au carnet",
      readMin: (n) => `${n} min de lecture`,
      published: "Publi\u00e9 le",
      byLina: "Par Lina Bachir",
      share: "Partager",
      bookmark: "Sauvegarder",
      next: "Carnet suivant",
      tableOfContents: "Sommaire",
      shuffle: "Au hasard \u2192",
    },

    solo: {
      kicker: "VOYAGER SEULE",
      title: "Partir seule, sans la version motivationnelle.",
      sub: "Ce que j'ai appris en un an de solo travel en Asie : ce qui marche, ce qui fait peur, et ce que personne ne te dit.",
      essays: [
        { kicker: "\u00c9TAT D'ESPRIT",   title: "Apprendre \u00e0 manger seule",   dek: "Le geste le plus difficile du voyage solo, et celui qui devient le plus pr\u00e9cieux." },
        { kicker: "S\u00c9CURIT\u00c9",      title: "Les r\u00e8gles que je me suis donn\u00e9es", dek: "Sept r\u00e8gles non-n\u00e9gociables. Plus une qui change tout : faire confiance \u00e0 ton instinct." },
        { kicker: "BUDGET",        title: "Budget : l'Asie du Sud-Est",    dek: "Combien co\u00fbte vraiment un voyage en Asie du Sud-Est, pays par pays, sans embellir." },
        { kicker: "SANT\u00c9 MENTALE", title: "Les jours o\u00f9 \u00e7a ne va pas",         dek: "Les bas du solo travel. Pourquoi ils arrivent, et comment je les traverse." },
        { kicker: "ENTRA\u00ceNEMENT",title: "Continuer \u00e0 s'entra\u00eener en Asie", dek: "Comment je garde le sport dans ma vie de voyage, et pourquoi c'est devenu ma fa\u00e7on de rencontrer du monde." },
        { kicker: "PACKING",       title: "Ce que je mets vraiment dans mon sac", dek: "65 litres au d\u00e9part, 40 \u00e0 la fin. La liste \u00e0 jour, t\u00e9l\u00e9chargeable." },
      ],
    },

    about: {
      kicker: "\u00c0 PROPOS",
      title: "Salut, moi c'est Lina.",
      lead: "Je suis ing\u00e9nieure en intelligence artificielle, et mon aventure en solo a commenc\u00e9 par un master ici, \u00e0 Ta\u00efwan. Ce qui ne devait \u00eatre qu'une ann\u00e9e d'\u00e9tudes s'est transform\u00e9 en un voyage bien plus profond : celui de la reconqu\u00eate de ma propre confiance.",
      body: [
        "Je ne suis pas une voyageuse de luxe, et je ne cherche pas \u00e0 cocher des lieux touristiques sur une liste. Mon truc \u00e0 moi, c'est de naviguer entre mes algorithmes et mes explorations en sac \u00e0 dos \u00e0 travers l'Asie.",
        "Apr\u00e8s avoir longtemps dout\u00e9 de moi et prioris\u00e9 les autres, j'ai choisi la solitude pour apprendre \u00e0 ma\u00eetriser mes \u00e9motions, savourer mes \u00ab solo dates \u00bb et m'entra\u00eener dans des salles de sport \u00e0 l'autre bout du monde.",
        "Je suis ici pour partager mon expertise, mes erreurs, et prouver qu'on peut \u00eatre une femme de t\u00eate tout en osant partir seule face \u00e0 l'inconnu.",
      ],
      stats: [
        { num: "6",  lbl: "pays visit\u00e9s en solo" },
        { num: "12", lbl: "mois sur la route" },
        { num: "8",  lbl: "carnets publi\u00e9s" },
      ],
      pull: "Mon truc \u00e0 moi, c'est de naviguer entre mes algorithmes et mes explorations en sac \u00e0 dos.",
      contactKicker: "ME PARLER",
      contactTitle: "Le plus simple reste Instagram",
      contactBody: "Je partage mes voyages, r\u00e9flexions et aventures en Asie au jour le jour. Pour me contacter ou collaborer \u2014 c'est par l\u00e0.",
    },

    collab: {
      kicker: "COLLABORER",
      title: "Travaillons ensemble.",
      sub: "Je travaille avec des marques que j'utilise vraiment, ou qui correspondent \u00e0 ma fa\u00e7on de voyager. Voici comment.",
      services: [
        { tag: "CONTENU", title: "Carnets sponsoris\u00e9s",       desc: "Un article long format autour de votre destination, h\u00e9bergement ou produit. Toujours sign\u00e9 \u00ab partenariat \u00bb." },
        { tag: "INSTAGRAM", title: "Reels & stories",           desc: "Reels narratifs et stories en duplex FR/EN \u2014 deux audiences, un seul d\u00e9livrable." },
        { tag: "PRODUITS", title: "Tests de mat\u00e9riel & gear", desc: "Sac \u00e0 dos, tech outdoor, applications voyage. Je teste sur trois pays minimum avant d'\u00e9crire." },
        { tag: "SPEAKING", title: "Talks & ateliers",          desc: "Femmes en tech, voyage solo, mindset. Disponible en FR et EN." },
      ],
      kit: {
        title: "Quelques chiffres",
        items: [
          { num: "28k",  lbl: "abonn\u00e9s Instagram" },
          { num: "4.8k", lbl: "lecteurs / mois sur le carnet" },
          { num: "75%",  lbl: "audience femmes 22\u201335" },
          { num: "FR/EN",lbl: "deux langues, deux audiences" },
        ],
      },
      form: {
        title: "\u00c9crivez-moi",
        sub: "R\u00e9ponse sous 72h. Pour les partenariats, pr\u00e9cisez le timing souhait\u00e9 et la destination.",
        name: "Votre nom",
        email: "Email",
        type: "Type de projet",
        types: ["Partenariat marque", "Office de tourisme", "Speaking / atelier", "Presse", "Autre"],
        msg: "Message",
        msgPh: "Parlez-moi de votre projet \u2014 destination, timing, ce que vous cherchez.",
        submit: "Envoyer la demande",
        thanks: "Merci. Je reviens vers toi dans la semaine.",
      },
    },

    footer: {
      tagline: "Carnet de voyage et de solo travel \u2014 \u00e9crit depuis l'Asie, parfois ailleurs.",
      cols: [
        { h: "Lire",       l: [{ t: "Accueil", to: { kind: "page", id: "home" } }, { t: "Destinations", to: { kind: "page", id: "destinations" } }, { t: "Voyager seule", to: { kind: "page", id: "solo" } }] },
        { h: "Decouvrir", l: [{ t: "Asie",    to: { kind: "continent", id: "asia" } }, { t: "Vietnam", to: { kind: "country", id: "vietnam" } }, { t: "Ta\u00efwan", to: { kind: "country", id: "taiwan" } }, { t: "Tha\u00eflande", to: { kind: "country", id: "thailand-n" } }] },
        { h: "\u00c9changer",     l: [{ t: "\u00c0 propos", to: { kind: "page", id: "about" } }, { t: "Collaborer", to: { kind: "page", id: "collab" } }, { t: "Instagram", to: { kind: "ext", url: "https://www.instagram.com/created.bylina/" } }] },
      ],
      legal: "\u00a9 2026 Lina Bachir \u2014 created.bylina. Tous les textes et photos sont de moi, sauf mention contraire.",
    },
  },

  // ----------------------------------- ENGLISH -----------------------------------
  en: {
    brand: "created.bylina",
    nav: {
      home: "Home",
      destinations: "Destinations",
      solo: "Solo travel",
      about: "About",
      collab: "Work with me",
    },
    cta: { read: "Read the journal", subscribe: "Subscribe", contact: "Write to me" },

    home: {
      hero: {
        kicker: "TRAVEL JOURNAL \u00b7 ASIA 2024\u201326",
        titleLead: "A travel journal.",
        rotating: ["Taiwan.", "Vietnam.", "Philippines.", "Thailand.", "Okinawa.", "Malaysia."],
        sub: "I'm Lina. I write down what I see, what I eat, and the days I doubt myself. A journal kept by hand, somewhere in Asia.",
        ctaPrimary: "Read the latest journal",
        ctaSecondary: "All destinations",
      },
      latest: { kicker: "LATEST JOURNALS", title: "Recent adventures", cta: "All journals \u2192" },
      categories: { kicker: "EXPLORE", title: "Where to start", sub: "Three ways into the journal, depending on what you came here for." },
      catCards: [
        { tint: "mint",     emoji: "\ud83c\udf3f", title: "Itineraries & guides",  desc: "Day-by-day plans, tested, with what I loved and what I'd skip next time.", to: { kind: "page", id: "destinations" } },
        { tint: "rose",     emoji: "\ud83c\udf92", title: "Solo travel",     desc: "Everything I wish I'd read before leaving alone. Honest, concrete, no clichés.", to: { kind: "page", id: "solo" } },
        { tint: "cream",    emoji: "\u270d\ufe0f", title: "Mindset & solo dates", desc: "What solitude taught me. Small rituals, bad days, training on the other side of the world.", to: { kind: "page", id: "solo" } },
      ],
      mapKicker: "WHERE I'VE BEEN",
      mapTitle: "Asia, one country at a time",
      mapSub: "A map I update when I come home. Click a country to open its journal.",
      bigBanner: { title: "Next stops: Indonesia, summer 2026, then Valencia, Spain. Want to follow along?", link: "Subscribe \u2192" },
      about: {
        kicker: "ABOUT",
        title: "Hi, I'm Lina.",
        body: "I'm an AI engineer, and my solo adventure started with a master's in Taiwan. What was supposed to be a year of studies turned into a much deeper journey: rebuilding my own confidence.",
        cta: "Read the full story \u2192",
      },
    },

    destinations: {
      kicker: "DESTINATIONS",
      title: "Where I've set down my bags",
      sub: "Six countries visited, many more on the list. Pick a continent to enter.",
      visitedLabel: "VISITED",
      soonLabel: "SOON",
      countriesIn: "countries",
      noArticlesYet: "Journal to write",
      articleSingular: "journal",
      articlePlural: "journals",
      back: "\u2190 All destinations",
      backToContinent: (c) => `\u2190 ${c}`,
    },

    article: {
      backHome: "\u2190 Back to the journal",
      readMin: (n) => `${n} min read`,
      published: "Published",
      byLina: "By Lina Bachir",
      share: "Share",
      bookmark: "Bookmark",
      next: "Next journal",
      tableOfContents: "Contents",
      shuffle: "Surprise me \u2192",
    },

    solo: {
      kicker: "SOLO TRAVEL",
      title: "Going alone, without the motivational version.",
      sub: "What I learned from a year of solo travel in Asia: what works, what's scary, and what no one tells you.",
      essays: [
        { kicker: "MINDSET",   title: "Learning to eat alone",   dek: "The hardest single act of solo travel, and the one that becomes the most precious." },
        { kicker: "SAFETY",    title: "The rules I gave myself",         dek: "Seven non-negotiable rules. Plus one that changes everything: trust your gut." },
        { kicker: "BUDGET",     title: "Budget: Southeast Asia",dek: "What a trip through Southeast Asia actually costs, country by country, no sugar-coating." },
        { kicker: "MENTAL HEALTH", title: "The days it doesn't feel good", dek: "The lows of solo travel. Why they come, and how I move through them." },
        { kicker: "TRAINING",      title: "Keeping up training in Asia",     dek: "How I keep sport in my travel life, and why it became my way of meeting people." },
        { kicker: "PACKING",   title: "What's actually in my bag",       dek: "65 liters at the start, 40 at the end. The current list, downloadable." },
      ],
    },

    about: {
      kicker: "ABOUT",
      title: "Hi, I'm Lina.",
      lead: "I'm an AI engineer, and my solo adventure started with a master's right here, in Taiwan. What was meant to be a year of studies turned into something much deeper: rebuilding my own confidence.",
      body: [
        "I'm not a luxury traveler, and I'm not trying to check tourist sites off a list. My thing is navigating between my algorithms and my backpack explorations across Asia.",
        "After years of doubting myself and putting others first, I chose solitude to learn to handle my emotions, savor my \u201csolo dates,\u201d and train in gyms on the other side of the world.",
        "I'm here to share what I've learned, the mistakes I've made, and to prove that you can be a sharp woman and still dare to leave, alone, into the unknown.",
      ],
      stats: [
        { num: "6",  lbl: "countries solo" },
        { num: "12", lbl: "months on the road" },
        { num: "8",  lbl: "journals published" },
      ],
      pull: "My thing is navigating between my algorithms and my backpack explorations.",
      contactKicker: "TALK TO ME",
      contactTitle: "Instagram is the easiest place",
      contactBody: "I share my trips, thoughts and adventures in Asia day by day. To reach me or work together \u2014 head over there.",
    },

    collab: {
      kicker: "WORK WITH ME",
      title: "Let's work together.",
      sub: "I work with brands I actually use, or that match the way I travel. Here's how.",
      services: [
        { tag: "CONTENT", title: "Sponsored journals",   desc: "A long-form article around your destination, stay, or product. Always marked \u201cpartnership.\u201d" },
        { tag: "INSTAGRAM", title: "Reels & stories",   desc: "Narrative reels and bilingual FR/EN stories \u2014 two audiences, one deliverable." },
        { tag: "PRODUCTS", title: "Gear & app reviews", desc: "Backpacks, outdoor tech, travel apps. I test across at least three countries before writing." },
        { tag: "SPEAKING", title: "Talks & workshops", desc: "Women in tech, solo travel, mindset. Available in FR and EN." },
      ],
      kit: {
        title: "A few numbers",
        items: [
          { num: "28k",  lbl: "Instagram followers" },
          { num: "4.8k", lbl: "readers / month on the journal" },
          { num: "75%",  lbl: "audience women 22\u201335" },
          { num: "FR/EN",lbl: "two languages, two audiences" },
        ],
      },
      form: {
        title: "Write to me",
        sub: "Reply within 72 hours. For partnerships, please mention timing and destination.",
        name: "Your name",
        email: "Email",
        type: "Project type",
        types: ["Brand partnership", "Tourism board", "Speaking / workshop", "Press", "Other"],
        msg: "Message",
        msgPh: "Tell me about your project \u2014 destination, timing, what you're looking for.",
        submit: "Send",
        thanks: "Thanks. I'll get back to you within the week.",
      },
    },

    footer: {
      tagline: "Travel and solo-travel journal \u2014 written from Asia, sometimes elsewhere.",
      cols: [
        { h: "Read",       l: [{ t: "Home", to: { kind: "page", id: "home" } }, { t: "Destinations", to: { kind: "page", id: "destinations" } }, { t: "Solo travel", to: { kind: "page", id: "solo" } }] },
        { h: "Discover",   l: [{ t: "Asia",    to: { kind: "continent", id: "asia" } }, { t: "Vietnam", to: { kind: "country", id: "vietnam" } }, { t: "Taiwan", to: { kind: "country", id: "taiwan" } }, { t: "Thailand", to: { kind: "country", id: "thailand-n" } }] },
        { h: "Connect",    l: [{ t: "About", to: { kind: "page", id: "about" } }, { t: "Work with me", to: { kind: "page", id: "collab" } }, { t: "Instagram", to: { kind: "ext", url: "https://www.instagram.com/created.bylina/" } }] },
      ],
      legal: "\u00a9 2026 Lina Bachir \u2014 created.bylina. All text and photos by me unless otherwise noted.",
    },
  },
};

// ---------- expose to window ------------------------------------------
window.BL_DATA = { CONTINENTS, COUNTRIES, ARTICLES, IMG_PALETTES, UI };
