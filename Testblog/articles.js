/* =========================================================
   created.bylina — Long-form journal articles
   Loaded BEFORE content.js. Exposes window.BL_ARTICLES.
   FR bodies are full; EN carries kicker/title/dek (body
   falls back to the FR version with a notice until translated).
   Body block kinds: "p" | "h" | "quote" | "ul" (items[])
   ========================================================= */

window.BL_ARTICLES = [

  // ============================================================
  // TAIWAN — featured, fully bilingual
  // ============================================================
  {
    id: "taiwan-first-solo",
    country: "taiwan",
    img: "taiwan-tea",
    featured: true,
    readMin: 14,
    date: "2024-09-18",
    fr: {
      kicker: "TAÏWAN · 12 MOIS",
      title: "Ma première expérience seule à Taïwan",
      dek: "22 ans, seule pour la première fois. Ce qui devait être une année d'études est devenu autre chose.",
      body: [
        { kind: "p", text: "L'avion s'est posé à Taoyuan un mardi matin. Je n'avais pas dormi de la nuit : quatorze heures à regarder la même carte de l'île en boucle sur l'écran devant moi, en essayant de me convaincre que c'était une bonne idée. À 22 ans, je n'avais jamais voyagé seule. Je n'avais même jamais dormi dans une auberge." },
        { kind: "p", text: "Ce qui devait être une année d'échanges universitaires, propre et cadrée, a tenu peut-être trois semaines avant de se transformer en autre chose. Le master, je l'ai fini. Mais entre les cours, j'ai commencé à prendre des bus, des trains, des scooters loués à des gens qui ne parlaient pas anglais. Et j'ai compris que la solitude que je redoutais en partant n'était pas du tout celle que j'ai trouvée là-bas." },
        { kind: "h", text: "Ce que personne ne m'avait dit" },
        { kind: "p", text: "Tout le monde te parle des choses qui font peur : se perdre, se faire arnaquer, manger un truc qu'il ne fallait pas. Personne ne te dit ce qui est vraiment difficile : manger seule, le soir, dans un restaurant local où tout le monde est en famille. Comprendre, vers le huitième jour, que personne ne va t'appeler ce soir. Et que c'est pour ça que tu es partie." },
        { kind: "quote", text: "J'ai mis trois mois à réaliser que je n'étais pas en train d'attendre que quelque chose commence. Ma vie avait commencé." },
        { kind: "p", text: "Taipei m'a appris à vivre dans une langue que je ne parle pas. J'ai pris l'habitude de pointer du doigt sur les menus, de sourire pour m'excuser, de répéter trois mots en mandarin avant d'entrer dans un magasin. Au bout de quelques mois, je rentrais dans mon appartement à Da'an et j'avais l'impression de rentrer chez moi pour la première fois de ma vie." },
        { kind: "h", text: "Ce que je referais" },
        { kind: "p", text: "Partir avec moins. J'avais un sac de 65 litres ; j'aurais pu vivre avec la moitié. Prendre le train autour de l'île (le TRA, pas le grande vitesse) et descendre dans des villes dont je ne connaissais pas le nom. Manger plus de petit-déjeuner taïwanais et moins de chaussons aux œufs des 7-Eleven. Surtout, ne pas avoir peur d'entrer dans une salle de sport où personne ne parle anglais. C'est là que j'ai rencontré mes meilleurs amis sur l'île." },
        { kind: "p", text: "Si tu lis ça et que tu hésites à partir seule, fais-le. Pas parce que ce sera facile. Parce que tu reviendras quelqu'un d'autre, et que tu ne sauras plus comment c'était avant." },
      ]
    },
    en: {
      kicker: "TAIWAN · 12 MONTHS",
      title: "My first time alone in Taiwan",
      dek: "22, alone for the first time. What was supposed to be a study year became something else.",
      body: [
        { kind: "p", text: "The plane landed in Taoyuan on a Tuesday morning. I hadn't slept all night: fourteen hours staring at the same map of the island, trying to convince myself this was a good idea. At 22, I had never traveled alone. I'd never even slept in a hostel." },
        { kind: "p", text: "What was supposed to be a clean, structured year abroad lasted maybe three weeks before turning into something else. I finished the degree. But between classes I started catching buses, trains, scooters rented from people who didn't speak English. And I realized the loneliness I'd feared was nothing like the one I actually found there." },
        { kind: "h", text: "What no one tells you" },
        { kind: "p", text: "Everyone warns you about the scary things: getting lost, getting scammed, eating something you shouldn't. No one tells you what's actually hard: eating alone in a local restaurant where every other table is a family. Realizing, around day eight, that nobody is going to call you tonight. And that this is exactly why you left." },
        { kind: "quote", text: "It took me three months to realize I wasn't waiting for something to start. My life had started." },
        { kind: "p", text: "Taipei taught me to live in a language I don't speak. I learned to point at menus, smile as an apology, repeat three Mandarin words before walking into a shop. After a few months I'd come back to my apartment in Da'an and feel, for the first time, like I was coming home." },
        { kind: "h", text: "What I'd do again" },
        { kind: "p", text: "Pack lighter. I had a 65-liter bag; half would have been plenty. Ride the slow TRA train around the island and get off in towns whose names you don't recognize. Eat more Taiwanese breakfast and fewer 7-Eleven egg pancakes. Most of all, walk into the gym where nobody speaks English. That's where I met my best friends on the island." },
        { kind: "p", text: "If you're reading this and hesitating to leave alone, go. Not because it'll be easy. Because you'll come back somebody else, and you won't quite remember how you used to be." },
      ]
    }
  },

  // ============================================================
  // VIETNAM
  // ============================================================
  {
    id: "vietnam-solo",
    country: "vietnam",
    img: "vietnam-rice",
    readMin: 12,
    date: "2024-10-28",
    fr: {
      kicker: "NORD VIETNAM · 8 JOURS",
      title: "Vietnam en solo : mon premier trip seule",
      dek: "Il y a 4 ans, je n'aurais jamais imaginé être capable de voyager seule à l'autre bout du monde. Le Vietnam a été mon premier test. Spoiler : j'avais tort sur tout ce qui me faisait peur.",
      body: [
        { kind: "h", text: "Pourquoi le Vietnam, et pourquoi j'étais terrifiée" },
        { kind: "p", text: "Je voulais commencer petit. Un premier solo trip pour me prouver que j'en étais capable, pas une grande aventure, juste un test. Sauf que « petit », ça ne veut rien dire quand tu n'as jamais voyagé sans être attendue quelque part. Sans tes parents. Sans un plan de secours humain." },
        { kind: "p", text: "Mes peurs concrètes avant de partir :" },
        { kind: "ul", items: [
          "L'auberge. Je pensais littéralement qu'on pouvait m'attaquer dans la nuit. Je m'étais préparée au pire.",
          "La solitude. J'avais peur de m'ennuyer, de ne pas savoir quoi faire de moi-même. J'avais pris mon PC, « au cas où je regarderais une série ».",
          "La logistique. Comment gérer les déplacements seule ? Comment s'organiser sans quelqu'un pour partager les décisions ?",
        ]},
        { kind: "p", text: "Ce qui m'a débloquée : tomber sur des témoignages de femmes qui avaient fait le Vietnam en solo, et visualiser concrètement comment ça se passait." },
        { kind: "h", text: "L'itinéraire : 8 jours dans le Nord" },
        { kind: "p", text: "Je suis restée uniquement dans le nord, et même là je n'ai pas tout exploré. C'était un choix assumé pour un premier trip. Hanoï → Sapa → Ninh Binh → Hanoï." },
        { kind: "ul", items: [
          "Hanoï, 3 nuits. Point de départ et d'arrivée. La ville m'a accueillie mieux que prévu.",
          "Sapa, 3 nuits. Le highlight absolu du voyage. J'y reviendrai.",
          "Ninh Binh, 1 nuit. Une étape courte mais marquante. Bus de nuit pour rentrer à Hanoï, et c'était top.",
        ]},
        { kind: "p", text: "Ce que j'ai zappé volontairement : la Ha Giang Loop (magnifique, mais ça se fait souvent en groupe avec des inconnus ; pour une première fois, c'était un non) et la Baie d'Halong (très touristique). Ninh Binh, surnommée « la baie d'Halong terrestre », est bien moins fréquentée. Bon choix." },
        { kind: "h", text: "Les infos pratiques, honnêtement" },
        { kind: "p", text: "Visa : pas besoin pour les Français, c'est simple. Budget : le Vietnam est l'un des pays les moins chers d'Asie." },
        { kind: "ul", items: [
          "Un repas : 50 à 70 000 dongs, environ 2€",
          "Aéroport → Hanoï en taxi : 8€ (1h de trajet)",
          "Nuit en auberge, petit-déjeuner inclus : 5 à 6€",
          "Bus Hanoï → Sapa : environ 15€",
          "Trek d'une journée repas inclus, ou balade en barque à Ninh Binh : environ 15€",
          "Location de scooter à Sapa : 3€ la journée",
        ]},
        { kind: "p", text: "Sécurité pour les femmes : on m'avait raconté des histoires. La réalité, c'est que je me baladais seule la nuit à Hanoï sans aucun problème. Le Vietnam est vraiment safe pour les femmes en solo." },
        { kind: "p", text: "Se déplacer : pas de transport en commun classique, mais les scooter-taxis sont partout, pratiques et pas chers (environ 60 centimes la course). Les bus de nuit inter-villes sont fiables et confortables. Côté assurance, j'avais la Chapka : indispensable." },
        { kind: "h", text: "Hanoï : se perdre, c'est le plan" },
        { kind: "p", text: "J'avais peur de m'ennuyer. J'ai eu l'effet inverse. La vieille ville se visite à pied, en se perdant dans les ruelles. Chaque rue a son commerce, son ambiance, son odeur. La ville nouvelle juste à côté est un contraste saisissant : moderne, propre, presque froide comparée au chaos organisé du centre historique." },
        { kind: "p", text: "Ce que j'ai fait : les musées et l'architecture coloniale française, la cathédrale Saint-Joseph (une réplique de Notre-Dame de Paris), Ta Hien Street (la rue des bars, l'ambiance du soir), et le bâtiment du Puppet Water Show qui vaut le détour même de l'extérieur." },
        { kind: "p", text: "Mon café coup de cœur : le Café Giang, inventeur de l'egg coffee. C'est bizarre, c'est riche, c'est incroyable. À tester aussi : le pho, le bánh mì, le coconut coffee." },
        { kind: "h", text: "Sapa : le moment qui a tout changé" },
        { kind: "p", text: "Honnêtement, Sapa c'est le genre d'endroit qui te fait comprendre pourquoi tu voyages. Je suis arrivée en bus de jour depuis Hanoï (7h de route ; je ne voulais pas faire ça de nuit pour une première fois)." },
        { kind: "p", text: "L'auberge était à 1,6 km du centre, gérée par une famille. La dame préparait le petit-déjeuner elle-même chaque matin, l'hôte jouait à FIFA avec les voyageurs le soir, il y avait un billard. C'était exactement ce que je n'avais pas imaginé en pensant « auberge de jeunesse »." },
        { kind: "p", text: "Le trek d'une journée : ils viennent te chercher à l'auberge, tout est inclus (repas, guide, retour) pour environ 15€. Aucune logistique à gérer. Le scooter en solo : j'en ai loué un à l'auberge pour 3€ et j'ai exploré les villages de montagne seule. C'est là que j'ai compris ce que « liberté » voulait dire concrètement." },
        { kind: "p", text: "Quelques spots en scooter autour de Sapa : Love Waterfall, Rong May Glass Bridge, le village de Ta Phin, et les points de vue sur la route. Arrête-toi, mange avec la vue, prends ton temps." },
        { kind: "h", text: "Ninh Binh : la baie d'Halong terrestre" },
        { kind: "p", text: "Une seule nuit, mais c'était vraiment magnifique. La balade en barque : 3h, 16 km sur l'eau entre les falaises karstiques. Sur ma barque, j'ai parlé pendant des heures avec deux Australiens de 70 ans. Le genre de rencontre qu'on fait uniquement quand on voyage seule." },
        { kind: "p", text: "La Mua Cave : plus de 500 marches pour atteindre le sommet. La vue au bout vaut chaque marche." },
        { kind: "h", text: "Mes auberges recommandées" },
        { kind: "p", text: "À Hanoï : Hanoi Central Backpackers, en plein centre, avec un petit-déjeuner inclus incroyable. Mon choix sans hésitation. À Sapa : l'auberge familiale à 1,6 km du centre. Ambiance chaleureuse, hôtes géniaux, repas faits maison. Je recommande les yeux fermés." },
        { kind: "h", text: "Comment j'ai réservé mes activités" },
        { kind: "p", text: "Mon conseil principal : privilégie le local quand tu peux. Pour les transports entre les villes, j'ai utilisé 12Go Asia, pratique et fiable. Pour le trek à Sapa, je suis passée directement par mon auberge. Pour la barque à Ninh Binh, je suis allée directement sur place au bord du lac, pas besoin de réserver à l'avance." },
        { kind: "h", text: "Quand partir" },
        { kind: "p", text: "J'y suis allée fin octobre et c'était parfait : environ 25°C à Hanoï, agréable, pas trop humide. Sapa, c'est une autre histoire : 14°C. Je n'avais pas prévu et j'ai acheté un poncho traditionnel sur place pour 4€, qui m'a tenu chaud et fait office de souvenir. Pense à un bon pull si tu passes par là." },
        { kind: "p", text: "Les saisons à éviter : janvier (trop froid dans le nord, surtout à Sapa) et août (saison des pluies). La fenêtre idéale pour le nord Vietnam, c'est septembre à novembre, ou mars à mai." },
        { kind: "h", text: "Comment arriver" },
        { kind: "p", text: "Je suis partie de Taipei avec VietJet, environ 3 à 4h de vol, pas cher. Depuis la France, tu auras forcément une escale, souvent à Bangkok ou Doha. Une fois à Hanoï, l'aéroport est à 1h du centre : prends un taxi (environ 8€), c'est simple, et beaucoup de gens vont dans la vieille ville donc les chauffeurs connaissent." },
        { kind: "h", text: "FAQ : les vraies questions" },
        { kind: "p", text: "On parle anglais ? Oui, suffisamment pour voyager sans problème. Dans les auberges, restaurants touristiques et activités, c'est très facile. Dans les villages reculés, les mains et Google Translate suffisent toujours." },
        { kind: "p", text: "Cash ou carte ? Que du cash, mais tu retires facilement aux distributeurs sur place. Aie toujours des dongs sur toi avant de partir explorer." },
        { kind: "p", text: "Safe la nuit pour une femme seule ? Oui. Je me baladais seule la nuit à Hanoï sans aucun problème. Reste attentive comme partout, mais le Vietnam est l'un des pays les plus safe d'Asie pour le solo." },
        { kind: "p", text: "Des galères ? Honnêtement non. La plus grande, c'était de ne pas avoir prévu assez chaud pour Sapa, réglé avec un poncho à 4€." },
        { kind: "h", text: "Ce que j'aurais aimé savoir avant" },
        { kind: "quote", text: "Une seule vraie leçon : se détendre." },
        { kind: "p", text: "Le Vietnam est un pays incroyable, avec des habitants encore plus incroyables. Mes peurs (l'auberge, la solitude, la logistique) se sont toutes évaporées dès le premier jour. C'est ok si au début tu n'arrives pas à te faire des amis. C'est ok si les premiers jours tu observes plus que tu ne participes. Ça vient. Reste sur tes gardes comme partout dans le monde, mais profite." },
        { kind: "p", text: "Tu envisages le Vietnam en solo ? Des questions sur l'itinéraire, le budget ou les auberges ? Écris-moi sur Instagram, je réponds à tout." },
      ]
    },
    en: {
      kicker: "NORTH VIETNAM · 8 DAYS",
      title: "Vietnam solo: my first trip alone",
      dek: "Four years ago I'd never have imagined traveling alone to the other side of the world. Vietnam was my first test. Spoiler: I was wrong about everything that scared me.",
    }
  },

  // ============================================================
  // PHILIPPINES
  // ============================================================
  {
    id: "philippines-palawan",
    country: "philippines",
    img: "philippines-beach",
    readMin: 11,
    date: "2024-02-15",
    fr: {
      kicker: "PALAWAN · 14 JOURS",
      title: "Philippines en solo : 2 semaines à Palawan",
      dek: "On m'avait dit de ne pas y aller seule. Je n'avais personne avec qui y aller. Je suis partie quand même.",
      body: [
        { kind: "p", text: "Les Philippines, c'était mon rêve depuis longtemps. Le seul conseil vraiment concret qu'on m'avait donné, c'était d'éviter Manille. Je l'ai suivi et j'ai décidé de faire uniquement Palawan sur 2 semaines : les vols internes sont compliqués et chers, autant prendre le temps de bien visiter un endroit plutôt que de courir partout." },
        { kind: "h", text: "Le trajet" },
        { kind: "p", text: "Depuis la France : escale à Xiamen, puis Taïwan pour poser mes affaires et dormir quelques heures. Vol à 3h du matin pour Manille, puis un deuxième à 9h pour Puerto Princesa. J'avais tout calculé pour arriver le matin, parce qu'il y a 6h de van qui attendent à l'arrivée jusqu'à El Nido. Au total : plus de 48h de trajet. J'étais KO en arrivant." },
        { kind: "h", text: "El Nido : l'arrivée sous la pluie" },
        { kind: "p", text: "J'avais choisi février, soi-disant la saison sèche. Quelques jours avant le départ, la compagnie me contacte pour me proposer de changer mon vol à cause d'une tempête. Têtue, je reste sur mes plans. Arrivée à El Nido : il pleuvait, tous les départs en bateau annulés, ciel gris." },
        { kind: "p", text: "Mon auberge, The Beach House Hostel (15€/nuit), était propre et bien placée face à la plage, mais pas du tout sociale. Et honnêtement, être dans un endroit aussi beau sous la pluie pendant un voyage qu'on attend depuis des mois, ça teste vraiment l'optimisme." },
        { kind: "p", text: "Deux jours après, la pluie se calme. Je rencontre deux filles de Londres, on va à une cascade : magnifique, 28 degrés. En parlant à d'autres voyageurs, j'ai compris que des petites fenêtres de pluie en saison sèche, c'est normal pour les îles. C'est juste quelque chose dont on ne parle pas assez." },
        { kind: "h", text: "Nacpan Beach : ma plage préférée au monde" },
        { kind: "p", text: "Lassée de l'ambiance et de la météo, je décide d'aller tester le Mad Monkey à Nacpan Beach, à 45 minutes d'El Nido en scooter. Meilleure décision du voyage." },
        { kind: "p", text: "Une plage de 5 km, pas de réseau, mon auberge et deux petits hôtels dessus, c'est tout. Je suis arrivée au coucher du soleil et j'ai tout oublié d'un coup. C'est officiellement ma plage préférée au monde." },
        { kind: "p", text: "Le lendemain, le soleil revient. Je me fais des amis, j'explore, je mange des noix de coco (j'ai fini déshydratée et couverte de coups de soleil ; massage à l'aloe vera frais pour 5€ pour rattraper ça). Le sisig aussi, je recommande : un plat local qu'on trouve facilement. Soirée sympa à l'auberge, sociale mais pas « fête jusqu'au bout de la nuit ». Exactement ce que j'aime." },
        { kind: "p", text: "Une conversation qui m'a marquée : un jeune garçon faisait la promo d'un restaurant pour s'acheter un téléphone pour l'école. Il m'a expliqué que l'université était impossible pour lui, non par manque d'envie, mais parce que c'était bien trop cher d'aller étudier à Manille. La plupart ne quittent jamais l'île et travaillent pour les resorts tenus par des étrangers. Plus tard, j'avais oublié mes AirPods sur un transat : il a couru pour me les rendre." },
        { kind: "p", text: "J'ai aussi exploré Dulli Beach et des plages encore plus désertes au-delà de Nacpan. Vraiment paradisiaques. Trois nuits là-bas, les meilleures de tout mon séjour. Les repas y coûtent moins cher qu'à El Nido (250 pesos contre 350-400). L'auberge : 25€/nuit." },
        { kind: "h", text: "Coron" },
        { kind: "p", text: "Ferry depuis Nacpan, le « fast ferry » qui a pris plus de 5h, sans clim. Coron est plus petit qu'El Nido, plus calme. C'est beau, mais je n'arrivais pas à me sortir Nacpan de la tête. J'ai même pleuré de joie tellement les paysages m'avaient marquée." },
        { kind: "p", text: "Le lendemain, grand tour de Coron : lagons, eau cristalline, snorkeling, îles. Ciel dégagé, repas inclus et vraiment délicieux. Le snorkeling était parmi les plus beaux que j'aie faits. Mon auberge : Alec Lodge, 10€/nuit petit-déjeuner inclus, tenue par une famille, on choisit la veille ce qu'ils préparent pour le matin. Je recommande à fond." },
        { kind: "h", text: "L'expédition Coron → El Nido : 3 jours, 2 nuits" },
        { kind: "p", text: "Le clou du séjour. Je l'ai fait avec Keeloma et je recommande les yeux fermés. Ce qui fait la différence, c'est qu'ils groupent par âge et par profil de voyage. Sur mon bateau : 8 solos (espagnols, philippins, australiens), 4 couples français, quelques duos, tous entre 20 et 30 ans." },
        { kind: "p", text: "Trois spots par jour, repas préparés en direct par le chef à bord avec un choix incroyable. Le soir, chacun a sa hutte sur de petites îles et on fait des activités avec l'équipage. L'ambiance était trop cool, on faisait des jeux tous ensemble. Très safe pour voyager seule : le plus important, c'est vraiment de choisir une compagnie qui prend le temps de faire des groupes par âge." },
        { kind: "p", text: "Ce qui m'a le plus marquée : on a visité des micro-îles habitées par une dizaine de personnes. Leurs enfants prenaient un bateau tous les matins pour aller à l'école. Pas de bus scolaire, un bateau." },
        { kind: "h", text: "Retour à Nacpan" },
        { kind: "p", text: "Une fois l'expédition finie, je n'avais qu'une envie : repartir à Nacpan. J'y suis retournée, j'ai retrouvé mes amis et les volontaires de l'auberge, j'en ai fait de nouveaux. Sunset cruise organisé par Mad Monkey le soir. Puis van jusqu'à Puerto Princesa, puis Taipei." },
        { kind: "h", text: "Ce que je n'ai pas eu le temps de faire" },
        { kind: "p", text: "Port Barton : tout le monde me l'avait recommandé, je n'ai pas réussi à le caser, j'ai la FOMO maintenant. C'est mon seul vrai regret. Et un jour, je reviendrai pour Balabac." },
        { kind: "h", text: "Infos pratiques" },
        { kind: "p", text: "Logement :" },
        { kind: "ul", items: [
          "The Beach House Hostel, El Nido : 15€/nuit",
          "Mad Monkey, Nacpan Beach : 25€/nuit",
          "Alec Lodge, Coron : 10€/nuit, petit-déjeuner inclus (recommandé)",
        ]},
        { kind: "p", text: "Budget repas : environ 250 pesos à Nacpan, 350 à 400 à El Nido. Transport : van Puerto Princesa → El Nido (6h), ferry Nacpan → Coron (prévoir large, pas de clim), scooter depuis El Nido (facile, pas cher). Expédition : Keeloma, groupes par âge, repas inclus, très safe pour le solo." },
        { kind: "h", text: "Quand y aller" },
        { kind: "p", text: "La meilleure période, c'est décembre à avril : saison sèche, mer calme, ciel dégagé. Décembre, janvier et avril sont les plus fréquentés (vacances scolaires), donc plus chers et plus de monde. Février, ce que j'ai fait, c'est bien, mais de petites pluies restent possibles même en pleine saison sèche : ça m'est arrivé et je n'ai pas été la seule. Ça dure rarement plus d'un ou deux jours, l'important c'est de ne pas paniquer." },
        { kind: "p", text: "Mai et novembre sont des périodes de transition : moins de monde, un peu moins cher, mais météo moins fiable. Évite juin à novembre si possible, c'est la saison des typhons : beaucoup d'activités nautiques sont annulées et certains hébergements ferment. Température : entre 27 et 32°C toute l'année, l'eau autour de 28°C." },
      ]
    },
    en: {
      kicker: "PALAWAN · 14 DAYS",
      title: "Philippines solo: two weeks in Palawan",
      dek: "People told me not to go alone. I had no one to go with. I went anyway.",
    }
  },

  // ============================================================
  // BANGKOK
  // ============================================================
  {
    id: "bangkok-muaythai",
    country: "thailand-bkk",
    img: "thailand-bangkok",
    readMin: 9,
    date: "2024-11-02",
    fr: {
      kicker: "BANGKOK · 8 JOURS",
      title: "Bangkok & Muay Thai",
      dek: "Je n'étais pas là pour Bangkok. J'étais là pour la boxe thaïlandaise. Et la ville m'a surprise.",
      body: [
        { kind: "p", text: "Tout le monde parle de la Thaïlande. Après la Malaisie, j'avais envie de voir par moi-même et de comparer un peu. Kuala Lumpur, c'est plus grand, plus de sites culturels, une vraie mixité religieuse (60% de musulmans, 30% de bouddhistes, 10% d'hindous). Bangkok, c'est différent : la culture thaï et bouddhiste est vraiment centrale, la nightlife bien plus présente, et il y a cette sensation internationale que KL a moins." },
        { kind: "h", text: "Mon ressenti" },
        { kind: "p", text: "Je n'avais pas prévu grand-chose pour Bangkok, j'étais là pour le Muay Thai, la ville c'était un peu un bonus. Et en fait, Bangkok m'a surprise." },
        { kind: "p", text: "Je suis arrivée pendant le deuil de la reine, certains temples étaient réservés aux locaux, l'ambiance était particulière. Ça m'a forcée à voir une version de Bangkok un peu différente de celle qu'on décrit d'habitude. Je n'avais pas non plus prévu que la weed serait partout : en Thaïlande c'est légal, et les coffee shops à Bangkok c'est comme à Amsterdam, tu tournes dans une rue et tu en trouves un. Ça m'a surprise parce que personne n'en parle." },
        { kind: "p", text: "J'ai logé à Khaosan Road pendant Halloween : ultra bruyant, des gens qui ne pensaient qu'à être ivres. J'aime la nightlife, mais ce quartier est trop dans sa bulle, il n'y a pas vraiment de culture, juste de la débauche. Je ne recommande pas. La prochaine fois, je logerai ailleurs." },
        { kind: "h", text: "Les temples : par où commencer" },
        { kind: "p", text: "Les temples sont vraiment le cœur de Bangkok et ils méritent leur réputation." },
        { kind: "ul", items: [
          "Wat Phra Kaew : dans l'enceinte du Grand Palais, le temple le plus sacré du pays, qui abrite le Bouddha d'émeraude sculpté dans du jade. Dorures et mosaïques à couper le souffle. Prévois 3h minimum, tenue couverte obligatoire (épaules et genoux).",
          "Wat Pho : juste à côté, avec son Bouddha couché de 46 mètres recouvert de feuilles d'or. Difficile d'en réaliser la taille avant d'être dedans. Massage thaï traditionnel disponible sur place.",
          "Wat Arun : de l'autre côté du Chao Phraya, le temple de l'aube, avec sa tour recouverte de fragments de porcelaine. Le voir au coucher du soleil depuis la rive opposée, c'est une des plus belles choses que j'ai faites à Bangkok.",
        ]},
        { kind: "p", text: "Chinatown : à faire absolument au coucher du soleil. Les étals de street food sortent, les lampions s'allument, l'odeur envahit les ruelles. C'est dense, vivant, complètement addictif. Et le Chong Nonsi Skywalk, une passerelle vitrée suspendue au-dessus de la ville, offre une vue bluffante surtout en fin de journée." },
        { kind: "h", text: "Se déplacer" },
        { kind: "p", text: "Bangkok a un métro aérien (BTS Skytrain) et un métro souterrain (MRT) : rapides, climatisés, moins de 1,50€ le trajet. Pour les temples du vieux Bangkok, le BTS ne va pas jusque-là, prends le MRT ou un taxi. L'appli Grab (l'Uber thaïlandais) est indispensable : prix fixé à l'avance, zéro arnaque. Les scooter-taxis se faufilent dans les embouteillages (environ 50 centimes la course), et les bateaux sur le Chao Phraya sont pratiques et pittoresques pour rejoindre les temples." },
        { kind: "h", text: "Où loger et quoi manger" },
        { kind: "p", text: "Pas Khaosan Road. Préfère Chinatown (bien placé pour les temples, ambiance locale le soir), Sukhumvit (moderne, bien desservi, pour la nightlife) ou Silom (plus calme, central). Côté nourriture : pad thaï, tom yum, curry vert, som tam (salade de papaye verte épicée), khao pad (riz frit), et en dessert l'incontournable mango sticky rice. Mange là où il y a une file de locaux, c'est le meilleur signe." },
        { kind: "p", text: "Budget : repas de rue 50 à 100 baht (1,50 à 3€), nuit en auberge à partir de 600 baht (environ 15€), trajet BTS/MRT 30 à 50 baht. Bangkok est vraiment abordable si tu manges local." },
        { kind: "h", text: "La vraie raison pour laquelle j'étais là" },
        { kind: "p", text: "Un stage intensif d'une semaine de Muay Thai. Je voulais voir si, mentalement et physiquement, je tiendrais. J'aime le sport, et je voulais savoir ce que c'était d'être dans la peau d'une vraie sportive, même pour une courte période." },
        { kind: "p", text: "Le quotidien au camp, du dimanche au vendredi (repos le samedi) : réveil à 6h, 6 à 7 km de running suivis d'une heure d'entraînement. Petit-déjeuner au 7-Eleven, le but n'étant pas de perdre tous nos muscles. De 9h30 à midi, sieste et déjeuner thaï (j'aimais le pad see ew du petit restau d'à côté). Pas de repas après 14h pour ne pas être ballonnée à l'entraînement de 16h : 4 km de run et 3h d'entraînement intense. Dîner local à 19h30, puis dodo. On avait chacun notre petite maison sur le camp, simple et parfaite." },
        { kind: "p", text: "Le club, c'était le TFC Muay Thai Gym, loin des clubs méga touristiques des îles. On était cinq : trois pros, une amatrice là depuis 3 mois, et moi qui ne connaissais rien à ce sport. En pratique, des cours quasi particuliers en permanence. Les coachs avaient tous les deux combattu plus de 350 fois à 27 ans à peine. Ils ne savaient ni lire ni écrire le thaï mais parlaient un peu anglais. Le gérant, d'une famille d'origine chinoise installée en Thaïlande, était techniquement très fort, mais n'a jamais pu monter sur le ring car c'est mal vu dans sa famille. Ces réalités-là, tu ne les croises pas sur internet." },
        { kind: "h", text: "Bang Bo : la Thaïlande qu'on ne te montre pas" },
        { kind: "p", text: "Le camp était à Bang Bo, à une heure du centre, près d'une université. Pas un touriste en vue. C'est les runs du matin avec des chiens errants qui finissent par courir à côté de toi. La dame du 7-Eleven qui te reconnaît dès le deuxième jour. La serveuse du midi qui connaît ta commande. Des repas énormes pour 50 à 60 baht. Ce n'est pas la Thaïlande qu'on te décrit en France." },
        { kind: "h", text: "Ce que ça m'a appris" },
        { kind: "p", text: "J'ai appris à ne pas avoir peur des chiens errants, par immersion totalement forcée. J'ai rencontré des gens vrais, dans un contexte où personne ne jouait de rôle pour les touristes. Et j'ai compris que tenir un rythme, c'est autant une question de tête que de corps : le mien n'était pas habitué à une telle intensité." },
        { kind: "p", text: "J'aurais aimé rester plus longtemps dans le centre de Bangkok, j'ai l'impression de ne pas avoir pu en profiter autant que je l'aurais voulu. Cela dit, je ne pense pas que j'aurais tenu plus d'une semaine à ce rythme." },
        { kind: "h", text: "Infos pratiques" },
        { kind: "p", text: "Repas : 50 à 60 baht (environ 1,50€). Stage TFC Muay Thai Gym : 7 000 baht la semaine tout compris (logement + deux entraînements par jour), 19 500 baht le mois. C'est moins cher sans le logement, mais je conseille de dormir sur place pour le rythme et pour vivre l'expérience à fond." },
      ]
    },
    en: {
      kicker: "BANGKOK · 8 DAYS",
      title: "Bangkok & Muay Thai",
      dek: "I wasn't there for Bangkok. I was there for the boxing. And the city surprised me.",
    }
  },

  // ============================================================
  // THAILAND NORTH
  // ============================================================
  {
    id: "thailand-north",
    country: "thailand-n",
    img: "thailand-temples",
    readMin: 13,
    date: "2024-03-10",
    fr: {
      kicker: "CHIANG MAI & PAI · 15 JOURS",
      title: "Thaïlande du Nord : Chiang Mai & Pai",
      dek: "Je voulais le Sud, comme tout le monde. Le billet le moins cher était pour Chiang Mai. Je ne regrette pas une seule seconde.",
      body: [
        { kind: "h", text: "Le pourquoi" },
        { kind: "p", text: "Au début, je voulais aller à Phuket et Krabi, parce qu'on parle toujours du Sud de la Thaïlande. Mais le billet le moins cher depuis Taipei, c'était pour Chiang Mai, alors j'y suis allée. Et honnêtement, je ne regrette tellement pas. J'avais entendu du bien du nord, mais je ne pensais pas que ce serait aussi bien. Il y a des touristes, oui, mais les prix restent accessibles, les Thaïlandais sont là, on est loin du sentiment d'exploitation ou de ville artificielle. Chiang Mai, c'est quand même la deuxième plus grande ville du pays." },
        { kind: "h", text: "Mon itinéraire" },
        { kind: "p", text: "6 nuits à Chiang Mai, 5 nuits à Pai, puis 4 nuits de retour à Chiang Mai. Je n'ai volontairement pas tout planifié : je décidais le matin ce que j'allais faire. Un séjour très chill, assumé, pour profiter vraiment et pas cocher des cases." },
        { kind: "p", text: "Ce que j'aurais fait hors saison des brûlis : la Mae Hong Son Loop, un circuit en scooter dans les montagnes au nord-ouest de Chiang Mai, des villages authentiques, des paysages incroyables. À faire absolument si tu y vas entre novembre et février." },
        { kind: "h", text: "Comment y aller" },
        { kind: "p", text: "Depuis Taipei, c'est 4h de vol direct. Depuis Bangkok, 1h15 d'avion ou 12h de train de nuit si tu veux prendre le temps. Le taxi depuis l'aéroport de Chiang Mai, c'est à peine 60 baht, 15 minutes en scooter-taxi." },
        { kind: "h", text: "L'ambiance" },
        { kind: "p", text: "Chiang Mai est beaucoup plus petite que Bangkok, mais la vibe est complètement différente : douce, calme, bohème. Il y a de quoi faire la fête, mais ce n'est pas la priorité. La ville est organisée autour d'un carré historique entouré de douves et de remparts, et comme tout le monde se retrouve dans ce périmètre, tu recroises constamment les mêmes personnes. C'est un vrai village dans une ville." },
        { kind: "p", text: "Les marchés artisanaux, les vêtements faits main, la déco en bois, les coffee shops cachés dans des jardins : c'est ça, la vibe Chiang Mai. Je me suis sentie en sécurité dès le premier soir, une des villes les plus safe où j'ai été seule." },
        { kind: "h", text: "Les temples" },
        { kind: "p", text: "Les temples sont vraiment le cœur de Chiang Mai et méritent leur réputation. Quelques incontournables :" },
        { kind: "ul", items: [
          "Wat Phra That Doi Suthep : le temple incontournable du nord, perché à 1 000 mètres sur la montagne qui surplombe la ville. 306 marches bordées de nagas pour y accéder, ou le funiculaire. La vue sur Chiang Mai est incroyable. Entrée 30 baht, ouvert 6h-18h, à faire tôt le matin pour éviter la foule.",
          "Wat Chedi Luang : en plein cœur de la vieille ville, un des plus impressionnants. Son chedi du XIVe siècle, partiellement détruit par un tremblement de terre en 1545, était autrefois le plus haut du royaume Lanna. Entrée 40-50 baht.",
          "Wat Phra Singh : le temple royal de la vieille ville, un des plus vénérés, avec sa statue du Bouddha Phra Singh. Entrée 50 baht.",
          "Wat Phan Tao : juste à côté du Wat Chedi Luang, entièrement construit en teck. Souvent ignoré des touristes, mais magnifique. Entrée libre.",
        ]},
        { kind: "h", text: "Le Sunday Market" },
        { kind: "p", text: "C'est le meilleur marché que j'ai fait dans toute l'Asie. Chaque dimanche soir, toute la vieille ville se transforme, les rues piétonnes se remplissent d'étals de street food, de vêtements faits main, d'artisanat. Des sushis à 5 baht, des massages à 180 baht l'heure, des tenues complètes à 200 baht, des portefeuilles à 10 baht. Je suis tombée amoureuse des vêtements, tout était magnifique et à des prix défiant toute concurrence. Si je pouvais, je reviendrais juste pour refaire ma garde-robe." },
        { kind: "h", text: "Le cours de cuisine" },
        { kind: "p", text: "Je me suis inscrite à un cours de cuisine thaï au Grand Canyon de Chiang Mai. Ils t'emmènent d'abord au marché local pour expliquer chaque ingrédient, d'où il vient, comment le choisir. Ensuite, tu choisis ce que tu prépares : j'ai fait une soupe, un curry, un pad thaï, un mango sticky rice et des nems. C'était délicieux, dans un cadre magnifique, avec une équipe jeune et sympa. Et c'est là que j'ai tissé une des meilleures amitiés du voyage, une Française qui revenait de deux ans en Australie. Le genre d'amitié qu'on fait en vacances et qu'on garde après." },
        { kind: "h", text: "Le lady boy show et la nightlife" },
        { kind: "p", text: "Mon auberge avait organisé une sortie pour un lady boy show : une expérience à part entière, des performances bluffantes, des costumes incroyables, une ambiance dans la salle qui vaut le coup au moins une fois. Côté nightlife, Chiang Mai n'est pas faite pour ça : un seul endroit où sortir, le Zoe in Yellow, une succession de bars en plein air dans la vieille ville. Fun, mais très différent de Bangkok." },
        { kind: "p", text: "Attention aux distributeurs : les ATM thaïlandais donnent l'argent avant de te demander de récupérer ta carte. J'ai oublié la mienne. Ne fais pas cette erreur." },
        { kind: "h", text: "Pai : un rêve éveillé" },
        { kind: "p", text: "Depuis Chiang Mai, Pai c'est 4h de bus via 762 virages (oui, littéralement). Le trajet est horrible si tu es sensible au mal des transports : prends des médicaments, garde un sac plastique. Sur le retour, j'ai vomi. Mais une fois arrivée, rêve éveillé. Réserve directement à la gare routière de Chiang Mai : 300 baht au lieu de 700 sur 12Go Asia." },
        { kind: "p", text: "Pai, c'est un village, pas une ville : tout tient sur quelques rues. La rue du night market est cozy, éclairée de lanternes, avec de la musique partout. La food est incroyable : le meilleur shawarma que j'ai mangé depuis longtemps, des gâteaux faits maison, cookies, carrot cake, banana cake, samossas, tout. C'est un village de hippies et de musique, j'ai fait la fête comme dans un film des années 80. J'étais si heureuse là-bas." },
        { kind: "p", text: "Il y a aussi une petite communauté musulmane qui cohabite avec les Thaïlandais bouddhistes, spécialisée dans les roti, un pain plat d'origine indienne très répandu en Asie du Sud-Est, souvent préparé sucré avec banane, œuf ou miel. Un des meilleurs trucs qu'on mange à Pai." },
        { kind: "h", text: "Ce que j'ai fait à Pai" },
        { kind: "p", text: "J'ai passé 5 nuits là-bas et j'ai vraiment pris le temps. D'abord la waterfall, puis le canyon (prends l'après-midi entière et fais tout le tour, ça vaut le coup). Le Tubing, c'est l'attraction principale : 400 jeunes sur des bouées qui descendent la rivière et s'arrêtent dans la jungle pour faire la fête. Fun, à faire une fois, 400 baht l'après-midi. Et comme tatouages et piercings sont partout à Pai, je me suis fait percer, c'était l'occasion." },
        { kind: "p", text: "J'ai aussi passé une soirée jusqu'à 2h du matin avec une Française à la retraite, un peu hippie, immigrée à Chiang Mai depuis 20 ans et à Pai depuis 4 ans. Ce genre de conversation qu'on a seulement quand on voyage seule. Précision : j'y étais pendant la saison des brûlis, donc la brume se ressentait après quelques jours. Ce n'est pas la période idéale pour Pai, préfère novembre à février." },
        { kind: "p", text: "Où loger à Pai : Revolution Hostel Pai Riverside, 400 baht pour un dortoir de 4 (on n'était que 2), super propre, dîner offert à 19h. Je recommande." },
        { kind: "h", text: "Retour à Chiang Mai" },
        { kind: "p", text: "Je suis revenue avec les amis que je m'étais faits à Pai. J'ai logé au Family Home 2, bien mieux situé que le Mad Monkey où j'avais commencé, ambiance plus conviviale : jeux de cartes, billard, les gens de l'auberge se parlaient. Plus détendu, plus chill." },
        { kind: "p", text: "J'ai passé les 4 dernières nuits à louer un scooter pour aller voir une waterfall et me balader sur les routes de montagne, juste pour les routes, c'était magnifique. J'ai pris mon temps, décidé chaque matin ce que j'allais faire, passé du temps à parler aux gens de l'auberge. Aucun programme. Et c'est ce voyage qui m'a fait comprendre que j'étais prête à me lancer sur les réseaux." },
        { kind: "h", text: "Infos pratiques" },
        { kind: "p", text: "Vols : Taipei-Chiang Mai 4h, Bangkok-Chiang Mai 1h15. Transport sur place : scooter-taxi 30 baht la course, songthaew (camions rouges collectifs) 40 baht, scooter à louer pour les excursions. Auberges : Mad Monkey 300 baht/nuit, Family Home 2 (fortement recommandé), Revolution Hostel Pai 400 baht/nuit. Nourriture : beignets à 7 baht, riz au lait de coco 50 baht, repas complet 50 à 100 baht. Quand y aller : novembre à février pour le meilleur temps et éviter la saison des brûlis (mars-avril)." },
      ]
    },
    en: {
      kicker: "CHIANG MAI & PAI · 15 DAYS",
      title: "Northern Thailand: Chiang Mai & Pai",
      dek: "I wanted the South, like everyone. The cheapest ticket was to Chiang Mai. I don't regret it for a second.",
    }
  },

];
