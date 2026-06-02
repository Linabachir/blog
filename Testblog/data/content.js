'use strict';
// Content data — CommonJS module for the static build.

const CONTINENTS = [
  { id: "asia",     tint: "mint",     visited: true,
    fr: { name: "Asie",     blurb: "Là où tout a commencé. Six pays, une année à voyager seule." },
    en: { name: "Asia",     blurb: "Where it all began. Six countries, a year on the road, solo." } },
  { id: "europe",   tint: "sky",      visited: false,
    fr: { name: "Europe",   blurb: "Bientôt. Valence, en Espagne, est déjà dans les plans." },
    en: { name: "Europe",   blurb: "Coming soon. Valencia, Spain, is already in the plans." } },
  { id: "africa",   tint: "peach",    visited: true,
    fr: { name: "Afrique",  blurb: "Cap sur l'Afrique du Nord. Deux pays explorés entre culture, désert et traditions." },
    en: { name: "Africa",   blurb: "Heading to North Africa. Two countries explored between culture, desert and tradition." } },
  { id: "americas", tint: "lavender", visited: false,
    fr: { name: "Océanie",  blurb: "Un rêve : l'Australie. Début de mon stage à Melbourne le 31 août." },
    en: { name: "Oceania",  blurb: "A dream: Australia. My internship in Melbourne starts August 31." } },
];

const COUNTRIES = [
  { id: "taiwan",       continent: "asia", tint: "mint",     hasArticles: true,  articleCount: 1,
    imgKey: "taiwan-tea",
    fr: { name: "Taïwan",      blurb: "L'île où j'ai posé mes valises pour un master — et où j'ai compris que j'allais rester voyager." },
    en: { name: "Taiwan",      blurb: "The island where I came for a master's — and where I realized I'd keep traveling." } },
  { id: "vietnam",      continent: "asia", tint: "mint",     hasArticles: true,  articleCount: 1,
    imgKey: "vietnam-rice",
    fr: { name: "Vietnam",     blurb: "Du nord brumeux au delta du Mékong. Trois semaines, trop courtes." },
    en: { name: "Vietnam",     blurb: "From the misty north to the Mekong delta. Three weeks, far too short." } },
  { id: "philippines",  continent: "asia", tint: "sky",      hasArticles: true,  articleCount: 1,
    imgKey: "philippines-beach",
    fr: { name: "Philippines", blurb: "Sept mille îles. J'en ai vu quatre. La première fois que j'ai dormi sur une plage." },
    en: { name: "Philippines", blurb: "Seven thousand islands. I saw four. The first time I slept on a beach." } },
  { id: "thailand-n",   continent: "asia", tint: "peach",    hasArticles: true,  articleCount: 1,
    imgKey: "thailand-mountains",
    fr: { name: "Thaïlande — Nord", blurb: "Chiang Mai, Pai, et la moto-taxi qui m'a sauvé d'un orage à Mae Hong Son." },
    en: { name: "Thailand — North", blurb: "Chiang Mai, Pai, and the motorbike taxi that saved me from a storm in Mae Hong Son." } },
  { id: "thailand-bkk", continent: "asia", tint: "rose",     hasArticles: true,  articleCount: 1,
    imgKey: "thailand-bangkok",
    fr: { name: "Bangkok",     blurb: "La ville que je pensais détester. Trois retours plus tard, j'y reviens encore." },
    en: { name: "Bangkok",     blurb: "The city I thought I'd hate. Three returns later, I still come back." } },
  { id: "okinawa",      continent: "asia", tint: "cream",    hasArticles: false, articleCount: 0,
    imgKey: "okinawa-water",
    fr: { name: "Okinawa",     blurb: "Le carnet n'est pas encore écrit. Mais l'eau était turquoise comme nulle part ailleurs." },
    en: { name: "Okinawa",     blurb: "The notebook isn't written yet. But the water was a turquoise I haven't seen anywhere else." } },
  { id: "malaysia",     continent: "asia", tint: "lavender", hasArticles: false, articleCount: 0,
    imgKey: "malaysia-jungle",
    fr: { name: "Malaisie",    blurb: "Kuala Lumpur, les Cameron Highlands, et un train de nuit que je n'oublierai pas." },
    en: { name: "Malaysia",    blurb: "Kuala Lumpur, the Cameron Highlands, and an overnight train I won't forget." } },
];

module.exports = { CONTINENTS, COUNTRIES };
