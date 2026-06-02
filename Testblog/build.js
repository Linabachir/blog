#!/usr/bin/env node
'use strict';
/**
 * created.bylina — Static Site Generator
 * Generates dist/ with one HTML file per page / article / country / continent.
 * Run: node build.js
 */

const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const { CONTINENTS, COUNTRIES } = require('./data/content');

// Custom marked renderer — preserves CSS classes used by site.css
const renderer = {
  paragraph({ text }) { return `<p class="art-p">${text}</p>\n`; },
  heading({ text, depth }) {
    const plain = text.replace(/<[^>]+>/g, '');
    if (depth === 2) return `<h2 class="art-h2" id="${slugify(plain)}">${text}</h2>\n`;
    return `<h${depth}>${text}</h${depth}>\n`;
  },
  blockquote({ text }) {
    const inner = text.replace(/<p class="art-p">([\s\S]*?)<\/p>\n?/g, '$1');
    return `<blockquote class="art-quote">${inner.trim()}</blockquote>\n`;
  },
  list({ body }) { return `<ul class="art-ul">${body}</ul>\n`; },
};
marked.use({ renderer });

function loadArticles() {
  const dir = path.join(__dirname, 'content', 'articles');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      const { data, content } = matter(raw);
      const headings = [...content.matchAll(/^## (.+)$/gm)].map(m => ({ text: m[1].trim() }));
      const body = marked.parse(content);
      return { ...data, headings, body };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

const ARTICLES = loadArticles();

const DIST        = path.join(__dirname, 'dist');
const SITE_DOMAIN = 'https://created.bylina.com';

// ---------------------------------------------------------------------------
// Image palettes (gradient placeholders)
// ---------------------------------------------------------------------------
const IMG = {
  'taiwan-tea':         { from: '#9bb087', to: '#4a6b4f', label: 'Taïwan' },
  'vietnam-rice':       { from: '#bccf8f', to: '#5a7a3a', label: 'Vietnam' },
  'vietnam-misty':      { from: '#a8b8b0', to: '#5a6e6a', label: 'Sapa' },
  'vietnam-lanterns':   { from: '#e8b888', to: '#a85a3a', label: 'Hoi An' },
  'philippines-beach':  { from: '#9ccfd6', to: '#4a7a98', label: 'El Nido' },
  'philippines-tent':   { from: '#d6c499', to: '#8a6e3a', label: 'Siargao' },
  'thailand-temples':   { from: '#e0b878', to: '#9c5a2a', label: 'Chiang Mai' },
  'thailand-mountains': { from: '#a8c0a8', to: '#5a7466', label: 'Pai' },
  'thailand-bangkok':   { from: '#c89ab8', to: '#6a3a5a', label: 'Bangkok' },
  'okinawa-water':      { from: '#a5d9d4', to: '#3a8a8a', label: 'Okinawa' },
  'malaysia-jungle':    { from: '#9cbf9c', to: '#3a6a4a', label: 'Malaisie' },
  'lina-portrait':      { from: '#c4a888', to: '#7a5a3a', label: 'Lina' },
};

const TINT = {
  mint:     'var(--bl-tint-mint)',
  sky:      'var(--bl-tint-sky)',
  peach:    'var(--bl-tint-peach)',
  rose:     'var(--bl-tint-rose)',
  lavender: 'var(--bl-tint-lavender)',
  cream:    'var(--bl-tint-cream)',
  yellow:   'var(--bl-tint-yellow)',
};

// ---------------------------------------------------------------------------
// Utils
// ---------------------------------------------------------------------------
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slugify(text) {
  return text.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function mkdirp(dir) { fs.mkdirSync(dir, { recursive: true }); }

function write(file, content) {
  mkdirp(path.dirname(file));
  fs.writeFileSync(file, content, 'utf8');
  console.log('  ✓', path.relative(__dirname, file));
}

function copy(src, dest) {
  if (!fs.existsSync(src)) return;
  mkdirp(path.dirname(dest));
  fs.copyFileSync(src, dest);
  console.log('  ✓', path.relative(__dirname, dest));
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else copy(s, d);
  }
}

// ---------------------------------------------------------------------------
// HTML atoms
// ---------------------------------------------------------------------------
function photo(which, { aspect = '16/10', fill = false, label, src, position = 'center' } = {}) {
  const p   = IMG[which] || IMG['taiwan-tea'];
  const lbl = label !== undefined ? label : p.label;
  const sty = fill ? 'width:100%;height:100%;' : `aspect-ratio:${aspect};`;
  const img = src
    ? `<img src="${esc(src)}" alt="${esc(lbl)}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${position};">`
    : '';
  const overlay = lbl && !src
    ? `<div style="position:absolute;inset:0;display:flex;align-items:flex-end;padding:18px;pointer-events:none"><span style="font-family:var(--font-serif);font-style:italic;font-weight:500;font-size:20px;color:#fff;text-shadow:0 1px 16px rgba(0,0,0,.45);letter-spacing:-.5px">${esc(lbl)}</span></div>`
    : '';
  return `<div style="${sty}position:relative;overflow:hidden;background:linear-gradient(135deg,${p.from},${p.to})">${img}${overlay}</div>`;
}

function kicker(text, color = 'var(--fg-3)', mb = '12px') {
  return `<div class="kicker" style="color:${color};margin-bottom:${mb}">${esc(text)}</div>`;
}

// ---------------------------------------------------------------------------
// Nav + Footer (same on every page)
// ---------------------------------------------------------------------------
function nav(current) {
  const links = [
    { id: 'home',         label: 'Accueil',       href: '/' },
    { id: 'destinations', label: 'Destinations',  href: '/destinations/' },
    { id: 'solo',         label: 'Voyager seule', href: '/solo/' },
    { id: 'about',        label: 'À propos',      href: '/about/' },
    { id: 'collab',       label: 'Collaborer',    href: '/collab/' },
  ];
  const ls = links.map(l =>
    `<a href="${l.href}" class="nav-link${l.id === current ? ' nav-link--active' : ''}">${esc(l.label)}</a>`
  ).join('');
  return `<nav class="site-nav" id="site-nav">
  <div class="site-nav__inner">
    <a href="/" class="site-nav__logo">created<span class="dot">.</span>bylina</a>
    <div class="site-nav__links" id="nav-links">${ls}</div>
    <div class="site-nav__actions">
      <a href="/collab/" class="btn-contact">Écrivez-moi</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>`;
}

function footer() {
  return `<footer class="site-footer">
  <div class="site-footer__inner">
    <div class="site-footer__brand">
      <div class="site-footer__logo">created<span class="dot">.</span>bylina</div>
      <p>Carnet de voyage et de solo travel — écrit depuis l'Asie, parfois ailleurs.</p>
    </div>
    <div class="site-footer__col">
      <h4>Lire</h4>
      <ul>
        <li><a href="/">Accueil</a></li>
        <li><a href="/destinations/">Destinations</a></li>
        <li><a href="/solo/">Voyager seule</a></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <h4>Découvrir</h4>
      <ul>
        <li><a href="/continent/asia/">Asie</a></li>
        <li><a href="/country/vietnam/">Vietnam</a></li>
        <li><a href="/country/taiwan/">Taïwan</a></li>
        <li><a href="/country/thailand-n/">Thaïlande</a></li>
      </ul>
    </div>
    <div class="site-footer__col">
      <h4>Échanger</h4>
      <ul>
        <li><a href="/about/">À propos</a></li>
        <li><a href="/collab/">Collaborer</a></li>
        <li><a href="https://www.instagram.com/created.bylina/" target="_blank" rel="noopener">Instagram ↗</a></li>
      </ul>
    </div>
  </div>
  <div class="site-footer__legal">
    <span>© 2026 Lina Bachir — created.bylina. Tous les textes et photos sont de moi, sauf mention contraire.</span>
    <span class="site-footer__legal-links">
      <a href="https://www.instagram.com/created.bylina/" target="_blank" rel="noopener">Instagram</a>
      <a href="/collab/">Contact</a>
    </span>
  </div>
</footer>`;
}

// ---------------------------------------------------------------------------
// Page shell
// ---------------------------------------------------------------------------
const PALETTE = `
    :root {
      --bl-canvas:#f7f4ee; --bl-surface:#efeae1;
      --bl-ink:#262320; --bl-charcoal:#3a352f; --bl-slate:#6a635a;
      --bl-steel:#8b8479; --bl-stone:#b4ada0;
      --bl-navy:#2b2722; --bl-navy-deep:#221e1a;
      --bl-hairline:#e6e0d4; --bl-hairline-strong:#cfc7b8;
      --bl-tint-mint:#e1e5dd; --bl-tint-sky:#dde2e3;
      --bl-tint-peach:#ecdfd2; --bl-tint-rose:#ece0dc;
      --bl-tint-lavender:#e6e1d8; --bl-tint-cream:#efe8da;
      --bl-tint-yellow:#f0e9d6; --bl-tint-yellow-bold:#e7d6b0;
      --accent:#b0694e; --accent-pressed:#97583f; --accent-deep:#7d4732;
    }
    body { background:var(--bg-page); color:var(--fg-1); }
    html { scroll-behavior:smooth; }
    *    { box-sizing:border-box; }
    a    { color:inherit; }`;

function shell({ title, desc, canonical, og = {}, current, root, body }) {
  const ogExtra = og.type === 'article'
    ? `\n  <meta property="article:published_time" content="${og.date}">`
    : '';
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:type" content="${og.type || 'website'}">
  <meta property="og:site_name" content="created.bylina">${ogExtra}
  <link rel="canonical" href="${SITE_DOMAIN}${canonical}">
  <link rel="stylesheet" href="${root}colors_and_type.css">
  <link rel="stylesheet" href="${root}site.css">
  <style>${PALETTE}
  </style>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
${nav(current)}
<main>
${body}
</main>
${footer()}
<script src="${root}site.js" defer></script>
<script>
if(window.netlifyIdentity){window.netlifyIdentity.on("init",function(u){if(!u){window.netlifyIdentity.on("login",function(){document.location.href="/admin/";});}});}
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Post card (used everywhere an article is listed)
// ---------------------------------------------------------------------------
function postCard(article) {
  const date = new Date(article.date).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  return `<a href="/articles/${article.id}/" class="post-card">
  <div class="post-card__img">${photo(article.img, { aspect: '16/10', src: article.photo ? `/uploads/${article.photo}` : undefined, position: article.photoPosition || 'center' })}</div>
  <div class="post-card__body">
    ${kicker(article.kicker, 'var(--fg-3)', '10px')}
    <h3 class="post-card__title">${esc(article.title)}</h3>
    <p class="post-card__dek">${esc(article.dek)}</p>
    <div class="post-card__meta">
      <span>${article.readMin} min de lecture</span>
      <span>·</span>
      <span>${date}</span>
    </div>
  </div>
</a>`;
}

// ---------------------------------------------------------------------------
// Article body renderer
// ---------------------------------------------------------------------------
function renderBody(blocks) {
  return blocks.map(b => {
    switch (b.kind) {
      case 'p':
        return `<p class="art-p">${esc(b.text)}</p>`;
      case 'h':
        return `<h2 class="art-h2" id="${slugify(b.text)}">${esc(b.text)}</h2>`;
      case 'quote':
        return `<blockquote class="art-quote">${esc(b.text)}</blockquote>`;
      case 'ul':
        return `<ul class="art-ul">${b.items.map(it => `<li>${esc(it)}</li>`).join('')}</ul>`;
      default:
        return '';
    }
  }).join('\n');
}

// ---------------------------------------------------------------------------
// Asia schematic SVG map (inline)
// ---------------------------------------------------------------------------
function asiaMapSvg(countries) {
  const SHAPES = {
    taiwan:           'M 432,222 q 12,-2 18,8 q 4,14 -2,28 q -4,12 -14,18 q -10,2 -14,-8 q -6,-18 -2,-32 q 2,-12 14,-14 z',
    'thailand-n':     'M 240,210 q 16,-6 30,4 q 10,12 6,30 q -6,18 -22,22 q -16,-2 -22,-16 q -6,-22 8,-40 z',
    'thailand-bkk':   'M 256,278 q 12,2 16,14 q 2,12 -8,18 q -12,4 -20,-4 q -6,-12 0,-22 q 4,-8 12,-6 z',
    vietnam:          'M 312,178 q 16,-4 26,8 q 8,18 -2,40 q -8,22 -24,40 q -16,16 -28,8 q -10,-12 -2,-32 q 8,-26 18,-46 q 4,-14 12,-18 z',
    philippines:      'M 416,290 q 14,-2 22,10 q 6,18 -4,32 q -10,16 -28,16 q -16,-2 -20,-18 q -2,-22 12,-32 q 8,-6 18,-8 z',
    malaysia:         'M 286,348 q 30,-8 56,4 q 18,12 8,28 q -16,16 -42,12 q -28,-4 -36,-22 q -4,-14 14,-22 z',
    okinawa:          'M 470,180 q 12,-2 16,8 q 2,12 -8,18 q -14,4 -20,-6 q -4,-12 12,-20 z',
  };
  const CENTROIDS = {
    taiwan: [444,248], 'thailand-n': [254,232], 'thailand-bkk': [260,296],
    vietnam: [320,232], philippines: [424,322], malaysia: [318,366], okinawa: [478,196],
  };

  const shapes = countries
    .filter(c => SHAPES[c.id])
    .map(c => {
      const [cx, cy] = CENTROIDS[c.id];
      const href     = `/country/${c.id}/`;
      const tint     = TINT[c.tint] || 'var(--bl-tint-mint)';
      return `<a href="${href}">
        <path d="${SHAPES[c.id]}" fill="${tint}" stroke="var(--fg-1)" stroke-width="1.25" style="transition:all 220ms"/>
      </a>
      <text x="${cx}" y="${cy}" text-anchor="middle" pointer-events="none"
        font-family="Inter,sans-serif" font-size="11" font-weight="600" fill="var(--fg-1)">${esc(c.fr.name)}</text>`;
    }).join('');

  return `<div style="position:relative;aspect-ratio:600/440;width:100%">
  <svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block">
    <rect width="600" height="440" fill="var(--bg-subtle)"/>
    ${[100,200,300,400,500].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="440" stroke="var(--border)" stroke-width=".5"/>`).join('')}
    ${[100,200,300].map(y=>`<line x1="0" y1="${y}" x2="600" y2="${y}" stroke="var(--border)" stroke-width=".5"/>`).join('')}
    <path d="M 60,80 q 80,-30 160,-10 q 100,30 120,90 q 20,80 -60,90 q -80,10 -150,-30 q -90,-50 -70,-140 z" fill="#efece7" stroke="var(--border)" stroke-width="1"/>
    <path d="M 500,80 q 60,10 70,60 q -10,40 -50,40 q -40,-10 -30,-60 q 0,-30 10,-40 z" fill="#efece7" stroke="var(--border)" stroke-width="1"/>
    ${shapes}
    <text x="572" y="420" text-anchor="end" font-family="Fraunces,serif" font-style="italic" font-size="22" fill="var(--fg-4)" font-weight="500">Asie</text>
  </svg>
</div>`;
}

// World map SVG (for destinations page)
function worldMapSvg(visitedIds) {
  const SHAPES = [
    { id:'americas', d:'M 80,120 q 30,-40 60,-30 q 30,10 30,80 q 0,80 -20,120 q -30,40 -50,20 q -30,-30 -20,-100 q 0,-50 0,-90 z M 130,260 q 20,0 30,30 q 0,40 -30,40 q -20,-10 -10,-50 z' },
    { id:'europe',   d:'M 360,140 q 30,-20 60,-10 q 20,10 20,40 q -10,30 -50,30 q -50,0 -50,-30 q 0,-20 20,-30 z' },
    { id:'africa',   d:'M 380,200 q 40,-10 70,20 q 30,40 20,90 q -20,60 -60,70 q -40,0 -60,-40 q -20,-60 0,-110 q 10,-20 30,-30 z' },
    { id:'asia',     d:'M 480,130 q 60,-30 130,-10 q 60,20 70,80 q 0,60 -40,90 q -50,30 -110,20 q -60,-10 -80,-60 q -10,-60 30,-120 z' },
  ];
  const paths = SHAPES.map(s => {
    const vis  = visitedIds.includes(s.id);
    const href = vis ? `/continent/${s.id}/` : null;
    const elem = `<path d="${s.d}" fill="${vis ? 'var(--accent)' : '#efece7'}" stroke="var(--fg-1)" stroke-width="${vis ? 1.5 : 1}" opacity="${vis ? .92 : 1}"/>`;
    return href ? `<a href="${href}">${elem}</a>` : elem;
  }).join('');
  return `<svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;display:block">
    <rect width="800" height="400" fill="var(--bg-subtle)"/>
    ${[100,200,300,400,500,600,700].map(x=>`<line x1="${x}" y1="0" x2="${x}" y2="400" stroke="var(--border)" stroke-width=".5"/>`).join('')}
    ${[100,200,300].map(y=>`<line x1="0" y1="${y}" x2="800" y2="${y}" stroke="var(--border)" stroke-width=".5"/>`).join('')}
    ${paths}
    <text x="780" y="385" text-anchor="end" font-family="Fraunces,serif" font-style="italic" font-size="22" fill="var(--fg-4)" font-weight="500">the world</text>
  </svg>`;
}

// ---------------------------------------------------------------------------
// PAGE BUILDERS
// ---------------------------------------------------------------------------

function buildHome() {
  console.log('\nHome');
  const featured    = ARTICLES.find(a => a.featured);
  const latestOrder = ['vietnam-solo', 'philippines-palawan', 'taiwan-first-solo'];
  const latest      = latestOrder.map(id => ARTICLES.find(a => a.id === id)).filter(Boolean);
  const asiaCountries = COUNTRIES.filter(c => c.continent === 'asia');

  const catCards = [
    { tint:'mint',  emoji:'🌿', title:'Itinéraires & guides',  desc:"Des plans jour-par-jour, testés, avec ce que j'ai aimé et ce que j'éviterais.", href:'/destinations/' },
    { tint:'rose',  emoji:'🎒', title:'Voyager seule',         desc:"Tout ce que j'aurais voulu lire avant de partir seule. Concret, honnête, sans clichés.", href:'/solo/' },
    { tint:'cream', emoji:'✍️', title:'Mindset & solo dates',  desc:"Ce que la solitude m'a appris. Petits rituels, mauvais jours, et faire du sport à l'autre bout du monde.", href:'/solo/' },
  ];

  const body = `
  <section class="hero">
    <div class="hero__inner">
      <div class="hero__text">
        <span class="hero__kicker">CARNET DE VOYAGE · ASIE 2024–26</span>
        <h1 class="hero__title">
          <span>Carnet de voyage.</span>
          <span class="hero__rotating" id="rotating-word"
            data-words="Taïwan.,Vietnam.,Philippines.,Thaïlande.,Okinawa.,Malaisie."
            aria-live="polite">Taïwan.</span>
        </h1>
        <p class="hero__sub">Moi c'est Lina. J'écris ce que je vois, ce que je mange, et les jours où je doute. Un carnet tenu à la main, quelque part en Asie.</p>
        <div class="hero__btns">
          <a href="/articles/${featured.id}/" class="btn-primary">Lire le dernier carnet</a>
          <a href="/destinations/" class="btn-ghost">Toutes les destinations</a>
        </div>
      </div>
      <div class="hero__featured">
        <a href="/articles/${featured.id}/" class="featured-card">
          ${photo(featured.img, { aspect:'4/3' })}
          <div class="featured-card__body">
            <span class="featured-card__kicker">${esc(featured.kicker)}</span>
            <h3 class="featured-card__title">${esc(featured.title)}</h3>
            <div class="featured-card__meta">Par Lina Bachir · ${featured.readMin} min de lecture</div>
          </div>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--pb64">
    <div class="section__inner">
      <div class="section-header">
        <div>
          ${kicker('DERNIERS CARNETS', 'var(--accent)')}
          <h2 class="section-title">Dernières aventures</h2>
        </div>
        <a href="/destinations/" class="section-cta">Voir tous les carnets →</a>
      </div>
      <div class="post-grid">
        ${latest.map(a => postCard(a)).join('')}
      </div>
    </div>
  </section>

  <section class="section section--pt64 section--pb64">
    <div class="section__inner">
      <div style="margin-bottom:36px">
        ${kicker('EXPLORER', 'var(--fg-3)')}
        <h2 class="section-title" style="margin:0 0 12px">Par où commencer</h2>
        <p class="section-sub" style="max-width:540px">Trois façons d'entrer dans le carnet selon ce que tu cherches aujourd'hui.</p>
      </div>
      <div class="cat-grid">
        ${catCards.map(c => `
        <a href="${c.href}" class="cat-card" style="background:${TINT[c.tint]}">
          <div class="cat-card__emoji">${c.emoji}</div>
          <div>
            <h3 class="cat-card__title">${esc(c.title)}</h3>
            <p class="cat-card__desc">${esc(c.desc)}</p>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section__inner">
      <div class="map-layout">
        <div>
          ${kicker('OÙ JE SUIS PASSÉE', 'var(--accent)')}
          <h2 class="section-title" style="margin:0 0 16px;letter-spacing:-.5px">L'Asie, un pays à la fois</h2>
          <p class="section-sub" style="margin-bottom:28px">Une carte que je mets à jour quand je rentre. Clique sur un pays pour ouvrir son carnet.</p>
          <div class="country-chips">
            ${asiaCountries.filter(c=>c.hasArticles).map(c =>
              `<a href="/country/${c.id}/" class="country-chip"><span class="chip-dot" style="background:${TINT[c.tint]}"></span>${esc(c.fr.name)}</a>`
            ).join('')}
          </div>
        </div>
        <div class="map-card">${asiaMapSvg(asiaCountries)}</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section__inner">
      <div class="about-teaser">
        <div class="about-teaser__photo">${photo('lina-portrait', { aspect:'4/5' })}</div>
        <div>
          ${kicker('À PROPOS', 'var(--accent)')}
          <h2 class="section-title t-serif" style="margin:0 0 18px;letter-spacing:-.5px">Salut, moi c'est Lina.</h2>
          <p style="font-size:17px;line-height:1.6;color:var(--fg-2);margin:0 0 24px;max-width:540px">
            Je suis ingénieure en intelligence artificielle, et mon aventure en solo a commencé par un master à Taïwan.
            Ce qui ne devait être qu'une année d'études s'est transformé en un voyage bien plus profond : celui de la reconquête de ma propre confiance.
          </p>
          <a href="/about/" style="color:var(--accent);font-weight:600;font-size:15px;text-decoration:underline;text-underline-offset:4px">Lire toute l'histoire →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--pt32 section--pb32">
    <div class="section__inner">
      <div class="big-banner">
        <h2 class="big-banner__title">Mon prochain départ : l'Indonésie, été 2026. Puis Valence, en Espagne. Tu veux suivre&nbsp;?</h2>
        <a href="/collab/" class="big-banner__link">S'abonner au carnet →</a>
      </div>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="newsletter">
        <div>
          ${kicker('LETTRE MENSUELLE', 'var(--accent)')}
          <h2 class="newsletter__title">Une lettre par mois, depuis l'endroit où je suis.</h2>
          <p class="newsletter__sub">Le prochain carnet, ce que je lis, ce qui m'a fait douter. Pas de spam, pas d'affiliés.</p>
        </div>
        <div>
          <form class="newsletter__form" id="newsletter-form" novalidate>
            <input type="email" name="email" placeholder="ton@email.com" class="newsletter__input" required aria-label="Adresse email">
            <button type="submit" class="newsletter__btn">S'abonner</button>
          </form>
          <div class="newsletter__success" id="newsletter-ok" role="status">Merci, on se retrouve dans la boîte. ✓</div>
        </div>
      </div>
    </div>
  </section>`;

  write(path.join(DIST, 'index.html'), shell({
    title:    'created.bylina — Carnet de voyage en Asie',
    desc:     "Carnets de voyage en solo en Asie — Taïwan, Vietnam, Philippines, Thaïlande. Par Lina Bachir, ingénieure IA.",
    canonical:'/s',
    current:  'home',
    root:     './',
    body,
  }).replace('/s"', '/"'));
}

function buildDestinations() {
  console.log('\nDestinations');
  const visited = CONTINENTS.filter(c => c.visited).map(c => c.id);

  const continentCards = CONTINENTS.map(c => {
    const countriesIn = COUNTRIES.filter(co => co.continent === c.id);
    const href        = c.visited ? `/continent/${c.id}/` : '#';
    return `<a href="${href}" class="continent-card continent-card--${c.visited ? 'visited' : 'soon'}" style="background:${TINT[c.tint]}">
      <span class="continent-card__badge">${c.visited ? 'VISITÉ' : 'BIENTÔT'}</span>
      <div>
        <h2 class="continent-card__name">${esc(c.fr.name)}</h2>
        <p class="continent-card__blurb">${esc(c.fr.blurb)}</p>
      </div>
      ${c.visited ? '<div class="continent-card__arrow">→</div>' : ''}
    </a>`;
  }).join('');

  const body = `
  <section class="section section--pb32">
    <div class="section__inner">
      ${kicker('DESTINATIONS', 'var(--accent)')}
      <h1 class="t-h1" style="margin:0 0 14px;max-width:820px;letter-spacing:-.5px">Où j'ai posé mes valises</h1>
      <p class="t-subtitle" style="margin:0;max-width:620px">Six pays visités, beaucoup encore en projet. Choisis un continent pour entrer.</p>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="world-map-wrap">${worldMapSvg(visited)}</div>
      <div class="continent-grid">${continentCards}</div>
    </div>
  </section>`;

  write(path.join(DIST, 'destinations', 'index.html'), shell({
    title:    'Destinations — created.bylina',
    desc:     "Tous mes carnets de voyage : Asie, Afrique et bientôt Europe. Taïwan, Vietnam, Philippines, Thaïlande.",
    canonical:'/destinations/',
    current:  'destinations',
    root:     '../',
    body,
  }));
}

function buildContinent(continent) {
  console.log('\nContinent:', continent.id);
  const countries = COUNTRIES.filter(c => c.continent === continent.id);
  const isAsia    = continent.id === 'asia';

  const countryCards = countries.map(co => {
    const countStr = co.articleCount > 0
      ? `${co.articleCount} carnet${co.articleCount > 1 ? 's' : ''}`
      : 'Carnet à écrire';
    return `<a href="/country/${co.id}/" class="country-card">
      ${photo(co.imgKey || 'taiwan-tea', { aspect:'4/3', label:co.fr.name })}
      <div class="country-card__body">
        <p class="country-card__blurb">${esc(co.fr.blurb)}</p>
        <div class="country-card__footer">
          <span>${countStr}</span>
          ${co.hasArticles ? '<span class="country-card__arrow">→</span>' : ''}
        </div>
      </div>
    </a>`;
  }).join('');

  const body = `
  <section class="section section--pb32">
    <div class="section__inner">
      <a href="/destinations/" style="font-size:14px;font-weight:500;color:var(--fg-3);text-decoration:none;display:inline-block;margin-bottom:28px">← Toutes les destinations</a>
      ${kicker('CONTINENT', 'var(--accent)')}
      <h1 style="font-family:var(--font-serif);font-style:italic;font-weight:500;font-size:80px;line-height:1;letter-spacing:-2px;margin:0 0 18px;color:var(--fg-1)">${esc(continent.fr.name)}</h1>
      <p style="font-size:19px;line-height:1.5;color:var(--fg-3);margin:0;max-width:640px">${esc(continent.fr.blurb)}</p>
    </div>
  </section>

  ${isAsia ? `
  <section class="section section--pt32 section--pb32">
    <div class="section__inner">
      <div class="map-card">${asiaMapSvg(countries)}</div>
    </div>
  </section>` : ''}

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <h2 class="t-h3" style="margin:0 0 28px;letter-spacing:-.3px">Tous les pays</h2>
      <div class="country-grid">${countryCards}</div>
    </div>
  </section>`;

  write(path.join(DIST, 'continent', continent.id, 'index.html'), shell({
    title:    `${continent.fr.name} — created.bylina`,
    desc:     continent.fr.blurb,
    canonical:`/continent/${continent.id}/`,
    current:  'destinations',
    root:     '../../',
    body,
  }));
}

function buildCountry(country) {
  console.log('\nCountry:', country.id);
  const cont     = CONTINENTS.find(c => c.id === country.continent);
  const articles = ARTICLES.filter(a => a.country === country.id);

  const articlesList = articles.length > 0
    ? `<section class="section section--pb32">
        <div class="section__inner">
          <div style="margin-bottom:32px">
            ${kicker('CARNETS', 'var(--accent)')}
            <h2 class="section-title" style="margin:0">${articles.length} carnet${articles.length > 1 ? 's' : ''}</h2>
          </div>
          <div class="post-grid">${articles.map(a => postCard(a)).join('')}</div>
        </div>
       </section>`
    : `<section class="section section--pb64">
        <div class="section__inner">
          <div style="background:var(--bg-subtle);border-radius:16px;padding:56px 40px;text-align:center">
            ${kicker('BIENTÔT', 'var(--fg-3)', '12px')}
            <h2 class="t-h3" style="margin:0 0 14px">Le carnet n'est pas encore écrit.</h2>
            <p style="font-size:16px;line-height:1.55;color:var(--fg-3);margin:0 auto;max-width:480px">
              J'écris encore mes notes. Abonne-toi à la lettre pour être prévenu(e) quand il paraît.
            </p>
          </div>
        </div>
       </section>`;

  const body = `
  <section class="geo-hero">
    <div style="width:100%;height:100%">${photo(country.imgKey || 'taiwan-tea', { fill:true, label:'', src: country.photo ? `/uploads/${country.photo}` : undefined, position: country.photoPosition || 'center' })}</div>
    <div class="geo-hero__overlay"></div>
    <div class="geo-hero__content">
      <div class="geo-hero__inner">
        <a href="/continent/${cont.id}/" class="geo-hero__back">← ${esc(cont.fr.name)}</a>
        <h1 class="geo-hero__title">${esc(country.fr.name)}</h1>
        <p class="geo-hero__blurb">${esc(country.fr.blurb)}</p>
      </div>
    </div>
  </section>
  ${articlesList}`;

  write(path.join(DIST, 'country', country.id, 'index.html'), shell({
    title:    `${country.fr.name} — created.bylina`,
    desc:     country.fr.blurb,
    canonical:`/country/${country.id}/`,
    current:  'destinations',
    root:     '../../',
    body,
  }));
}

function buildArticle(article) {
  if (!article.body) {
    console.log('\nArticle (skipped — no body):', article.id);
    return;
  }
  console.log('\nArticle:', article.id);

  const country  = COUNTRIES.find(c => c.id === article.country);
  const headings = article.headings || [];
  const others   = [...ARTICLES].filter(x => x.id !== article.id && x.body)
    .sort((x, y) => new Date(y.date) - new Date(x.date));
  const next     = others[0];
  const dateStr  = new Date(article.date).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' });

  const imgSrc = article.photo ? `/uploads/${article.photo}` : undefined;

  const tocHtml = headings.length > 0 ? `
  <aside class="art-toc">
    <div class="art-toc__label">Sommaire</div>
    <ul class="art-toc__list">
      ${headings.map(h => `<li><a href="#${slugify(h.text)}">${esc(h.text)}</a></li>`).join('')}
    </ul>
  </aside>` : '';

  const body = `
  <div class="reading-progress" id="reading-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div>

  <div class="art-hero">
    <div class="art-hero__img">${photo(article.img, { fill:true, label:'', src:imgSrc, position: article.photoPosition || 'center' })}</div>
    <div class="art-hero__overlay"></div>
    <div class="art-hero__content">
      <div class="art-hero__inner">
        <a href="/country/${article.country}/" class="art-hero__kicker">${esc(article.kicker)}</a>
        <h1 class="art-hero__h1">${esc(article.title)}</h1>
        <p class="art-hero__dek">${esc(article.dek)}</p>
      </div>
    </div>
  </div>

  <div class="art-meta">
    <div class="art-meta__inner">
      <div class="art-meta__author">
        <span class="art-meta__avatar" aria-hidden="true"></span>
        <div>
          <div class="art-meta__name">Par Lina Bachir</div>
          <div class="art-meta__date">${dateStr} · ${article.readMin} min de lecture</div>
        </div>
      </div>
      <div>
        <button class="btn-pill" onclick="if(navigator.share){navigator.share({title:document.title,url:location.href})}else{navigator.clipboard.writeText(location.href).then(()=>alert('Lien copié'))}">Partager</button>
      </div>
    </div>
  </div>

  <div class="art-layout">
    <div class="art-layout__inner${headings.length === 0 ? ' art-layout__inner--no-toc' : ''}">
      ${tocHtml}
      <article class="art-body" itemscope itemtype="https://schema.org/Article">
        <meta itemprop="author" content="Lina Bachir">
        <meta itemprop="datePublished" content="${article.date}">
        ${article.body}
      </article>
    </div>
  </div>

  ${next ? `
  <div class="art-next">
    <div class="art-next__inner">
      <span class="art-next__label">Carnet suivant</span>
      ${postCard(next)}
    </div>
  </div>` : ''}`;

  write(path.join(DIST, 'articles', article.id, 'index.html'), shell({
    title:    `${article.title} — created.bylina`,
    desc:     article.dek,
    canonical:`/articles/${article.id}/`,
    og:       { type:'article', date:article.date },
    current:  null,
    root:     '../../',
    body,
  }));
}

function buildSolo() {
  console.log('\nSolo');
  const essays = [
    { kicker:'ÉTAT D\'ESPRIT',  title:'Apprendre à manger seule',         dek:'Le geste le plus difficile du voyage solo, et celui qui devient le plus précieux.' },
    { kicker:'SÉCURITÉ',       title:'Les règles que je me suis données',  dek:'Sept règles non-négociables. Plus une qui change tout : faire confiance à ton instinct.' },
    { kicker:'BUDGET',         title:'Budget : l\'Asie du Sud-Est',        dek:'Combien coûte vraiment un voyage en Asie du Sud-Est, pays par pays, sans embellir.' },
    { kicker:'SANTÉ MENTALE',  title:'Les jours où ça ne va pas',          dek:'Les bas du solo travel. Pourquoi ils arrivent, et comment je les traverse.' },
    { kicker:'ENTRAÎNEMENT',   title:'Continuer à s\'entraîner en Asie',   dek:'Comment je garde le sport dans ma vie de voyage, et pourquoi c\'est devenu ma façon de rencontrer du monde.' },
    { kicker:'PACKING',        title:'Ce que je mets vraiment dans mon sac',dek:'65 litres au départ, 40 à la fin. La liste à jour, téléchargeable.' },
  ];
  const TINT_LIST = ['mint','rose','cream','lavender','sky','peach'];

  const essayCards = essays.map((e, i) =>
    `<div class="essay-card" style="background:${TINT[TINT_LIST[i % TINT_LIST.length]]}">
      <span class="essay-card__kicker">${esc(e.kicker)}</span>
      <h3 class="essay-card__title">${esc(e.title)}</h3>
      <p class="essay-card__dek">${esc(e.dek)}</p>
    </div>`
  ).join('');

  const body = `
  <section class="section section--pb32">
    <div class="section__inner">
      ${kicker('VOYAGER SEULE', 'var(--accent)')}
      <h1 class="t-h1" style="margin:0 0 18px;max-width:820px;letter-spacing:-.5px">Partir seule, sans la version motivationnelle.</h1>
      <p class="t-subtitle" style="margin:0;max-width:640px">Ce que j'ai appris en un an de solo travel en Asie : ce qui marche, ce qui fait peur, et ce que personne ne te dit.</p>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="essay-grid">${essayCards}</div>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="solo-download">
        <div>
          <span class="download-kicker">GUIDE GRATUIT</span>
          <h2 class="download-title">La liste de packing, en PDF — 65L à 40L.</h2>
          <p class="download-sub">Tout ce que j'ai gardé, ce que j'ai jeté, et pourquoi. Mise à jour après chaque pays.</p>
        </div>
        <div>
          <button class="btn-download">Télécharger le PDF (3.2 Mo)</button>
        </div>
      </div>
    </div>
  </section>`;

  write(path.join(DIST, 'solo', 'index.html'), shell({
    title:    'Voyager seule — created.bylina',
    desc:     "Conseils pour voyager seule en Asie : sécurité, budget, packing, santé mentale. Retours d'expérience honnêtes.",
    canonical:'/solo/',
    current:  'solo',
    root:     '../',
    body,
  }));
}

function buildAbout() {
  console.log('\nAbout');
  const stats = [
    { num:'6',  lbl:'pays visités en solo' },
    { num:'12', lbl:'mois sur la route' },
    { num:'8',  lbl:'carnets publiés' },
  ];
  const bodyParas = [
    "Je ne suis pas une voyageuse de luxe, et je ne cherche pas à cocher des lieux touristiques sur une liste. Mon truc à moi, c'est de naviguer entre mes algorithmes et mes explorations en sac à dos à travers l'Asie.",
    "Après avoir longtemps douté de moi et priorisé les autres, j'ai choisi la solitude pour apprendre à maîtriser mes émotions, savourer mes « solo dates » et m'entraîner dans des salles de sport à l'autre bout du monde.",
    "Je suis ici pour partager mon expertise, mes erreurs, et prouver qu'on peut être une femme de tête tout en osant partir seule face à l'inconnu.",
  ];

  const body = `
  <div class="about-layout">
    <div class="about-sticky">
      <div class="about-photo">${photo('lina-portrait', { aspect:'4/5' })}</div>
      <div class="about-status">
        <div class="about-status-label">EN CE MOMENT</div>
        <div class="about-status-city">Taipei, Taïwan</div>
        <div class="about-status-next">Prochain départ : l'Indonésie, été 2026</div>
      </div>
    </div>
    <div>
      ${kicker('À PROPOS', 'var(--accent)')}
      <h1 class="about-title">Salut, moi c'est Lina.</h1>
      <p class="about-lead">Je suis ingénieure en intelligence artificielle, et mon aventure en solo a commencé par un master ici, à Taïwan. Ce qui ne devait être qu'une année d'études s'est transformé en un voyage bien plus profond : celui de la reconquête de ma propre confiance.</p>
      ${bodyParas.map(p => `<p class="about-body-p">${esc(p)}</p>`).join('')}
      <blockquote class="about-pull">Mon truc à moi, c'est de naviguer entre mes algorithmes et mes explorations en sac à dos.</blockquote>
      <div class="stats-grid">
        ${stats.map(s => `<div><div class="stat-num">${esc(s.num)}</div><div class="stat-lbl">${esc(s.lbl)}</div></div>`).join('')}
      </div>
      <div class="about-contact">
        ${kicker('ME PARLER', 'var(--accent)')}
        <h2 class="about-contact-title">Le plus simple reste Instagram</h2>
        <p class="about-contact-body">Je partage mes voyages, réflexions et aventures en Asie au jour le jour. Pour me contacter ou collaborer — c'est par là.</p>
        <a href="https://www.instagram.com/created.bylina/" target="_blank" rel="noopener" class="btn-instagram">@created.bylina <span style="opacity:.7">↗</span></a>
      </div>
    </div>
  </div>`;

  write(path.join(DIST, 'about', 'index.html'), shell({
    title:    'À propos — created.bylina',
    desc:     "Lina Bachir, ingénieure IA et voyageuse solo en Asie. Taïwan, Vietnam, Philippines, Thaïlande — un carnet de voyage honnête.",
    canonical:'/about/',
    current:  'about',
    root:     '../',
    body,
  }));
}

function buildCollab() {
  console.log('\nCollab');
  const services = [
    { tag:'CONTENU',    title:'Carnets sponsorisés',      desc:"Un article long format autour de votre destination, hébergement ou produit. Toujours signé « partenariat »." },
    { tag:'INSTAGRAM',  title:'Reels & stories',          desc:"Reels narratifs et stories en duplex FR/EN — deux audiences, un seul délivrable." },
    { tag:'PRODUITS',   title:'Tests de matériel & gear', desc:"Sac à dos, tech outdoor, applications voyage. Je teste sur trois pays minimum avant d'écrire." },
    { tag:'SPEAKING',   title:'Talks & ateliers',         desc:"Femmes en tech, voyage solo, mindset. Disponible en FR et EN." },
  ];
  const kit = [
    { num:'28k',  lbl:'abonnés Instagram' },
    { num:'4.8k', lbl:'lecteurs / mois sur le carnet' },
    { num:'75%',  lbl:'audience femmes 22–35' },
    { num:'FR/EN',lbl:'deux langues, deux audiences' },
  ];
  const projectTypes = ['Partenariat marque','Office de tourisme','Speaking / atelier','Presse','Autre'];

  const body = `
  <section class="section section--pb32">
    <div class="section__inner">
      ${kicker('COLLABORER', 'var(--accent)')}
      <h1 class="t-h1" style="margin:0 0 18px;max-width:820px;letter-spacing:-.5px">Travaillons ensemble.</h1>
      <p class="t-subtitle" style="margin:0;max-width:640px">Je travaille avec des marques que j'utilise vraiment, ou qui correspondent à ma façon de voyager. Voici comment.</p>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="services-grid">
        ${services.map(s => `
        <div class="service-card">
          <span class="service-tag">${esc(s.tag)}</span>
          <h3 class="service-title">${esc(s.title)}</h3>
          <p class="service-desc">${esc(s.desc)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <h2 class="t-h3" style="margin:0 0 28px;letter-spacing:-.3px">Quelques chiffres</h2>
      <div class="kit-grid">
        ${kit.map(s => `<div><div class="kit-num">${esc(s.num)}</div><div class="kit-lbl">${esc(s.lbl)}</div></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="section section--pt32 section--pb64">
    <div class="section__inner">
      <div class="form-dark">
        <div>
          <h2 class="form-dark-title">Écrivez-moi</h2>
          <p class="form-dark-sub">Réponse sous 72h. Pour les partenariats, précisez le timing souhaité et la destination.</p>
        </div>
        <div>
          <form id="collab-form" class="form-fields" novalidate>
            <div class="form-row">
              <input type="text"  name="name"  placeholder="Votre nom" required>
              <input type="email" name="email" placeholder="Email"     required>
            </div>
            <select name="type">
              ${projectTypes.map(t => `<option value="${esc(t)}">${esc(t)}</option>`).join('')}
            </select>
            <textarea name="message" rows="5" placeholder="Parlez-moi de votre projet — destination, timing, ce que vous cherchez."></textarea>
            <button type="submit" class="btn-submit">Envoyer la demande</button>
          </form>
          <div class="form-success" id="collab-ok" role="status">Merci. Je reviens vers toi dans la semaine.</div>
        </div>
      </div>
    </div>
  </section>`;

  write(path.join(DIST, 'collab', 'index.html'), shell({
    title:    'Collaborer — created.bylina',
    desc:     "Partenariats, collaborations et speaking avec Lina Bachir. Blog voyage solo en Asie, 28k abonnés Instagram.",
    canonical:'/collab/',
    current:  'collab',
    root:     '../',
    body,
  }));
}

// ---------------------------------------------------------------------------
// Sitemap + robots.txt
// ---------------------------------------------------------------------------
function buildSitemap() {
  console.log('\nSitemap + robots');
  const staticUrls = ['/', '/destinations/', '/solo/', '/about/', '/collab/'];
  const contUrls   = CONTINENTS.filter(c=>c.visited).map(c=>`/continent/${c.id}/`);
  const countryUrls= COUNTRIES.map(c=>`/country/${c.id}/`);
  const artUrls    = ARTICLES.filter(a=>a.body).map(a=>`/articles/${a.id}/`);

  const all = [...staticUrls, ...contUrls, ...countryUrls, ...artUrls];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map(u => `  <url><loc>${SITE_DOMAIN}${u}</loc></url>`).join('\n')}
</urlset>`;
  write(path.join(DIST, 'sitemap.xml'), xml);

  write(path.join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_DOMAIN}/sitemap.xml\n`);
}

// ---------------------------------------------------------------------------
// Copy static assets
// ---------------------------------------------------------------------------
function copyAssets() {
  console.log('\nAssets');
  copy(path.join(__dirname, 'colors_and_type.css'), path.join(DIST, 'colors_and_type.css'));
  copy(path.join(__dirname, 'site.css'),            path.join(DIST, 'site.css'));
  copy(path.join(__dirname, 'static', 'site.js'),   path.join(DIST, 'site.js'));
  copyDir(path.join(__dirname, 'assets'),            path.join(DIST, 'assets'));
  copyDir(path.join(__dirname, 'uploads'),           path.join(DIST, 'uploads'));
  copyDir(path.join(__dirname, 'admin'),             path.join(DIST, 'admin'));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function build() {
  console.log('=== created.bylina static build ===');
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST);

  buildHome();
  buildDestinations();
  buildSolo();
  buildAbout();
  buildCollab();

  for (const c of CONTINENTS.filter(c => c.visited)) buildContinent(c);
  for (const c of COUNTRIES) buildCountry(c);
  for (const a of ARTICLES)  buildArticle(a);

  buildSitemap();
  copyAssets();

  console.log('\n=== Build complete ===');
  console.log(`Output: ${path.relative(process.cwd(), DIST)}/`);
}

build();
