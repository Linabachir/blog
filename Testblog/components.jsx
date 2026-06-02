/* =========================================================
   created.bylina — Shared chrome components
   Nav, Footer, PhotoTile, MapView, Kicker, ContinentMap.
   ========================================================= */

const { useState: useStateChrome, useEffect: useEffectChrome } = React;

const TINT = {
  mint: "var(--bl-tint-mint)",
  sky: "var(--bl-tint-sky)",
  peach: "var(--bl-tint-peach)",
  rose: "var(--bl-tint-rose)",
  lavender: "var(--bl-tint-lavender)",
  cream: "var(--bl-tint-cream)",
  yellow: "var(--bl-tint-yellow)"
};

// ----------------------------------------------------------------
// PhotoTile — drag-and-drop photo slot with a branded gradient placeholder.
// The user can drop a photo straight onto it (or click to browse); the image
// persists. Until then, the destination gradient + serif label show.
// ----------------------------------------------------------------
function PhotoTile({ which = "taiwan-tea", aspect = "16/10", radius = 0, big = false, label, overlay = true, fill = false, slotId, src }) {
  const p = window.BL_DATA.IMG_PALETTES[which] || window.BL_DATA.IMG_PALETTES["taiwan-tea"];
  const labelText = label !== undefined ? label : p.label;
  const id = slotId || ("photo-" + which);
  return (
    <div style={{
      ...(fill ? { width: "100%", height: "100%" } : { aspectRatio: aspect }),
      borderRadius: radius,
      position: "relative",
      overflow: "hidden",
      background: `linear-gradient(135deg, ${p.from}, ${p.to})`
    }}>
      <image-slot
        id={id}
        className="bl-photo-slot"
        shape="rect"
        fit="cover"
        src={src}
        placeholder=""
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          color: "rgba(255,255,255,0.92)"
        }}></image-slot>
      {overlay && labelText &&
      <div className="bl-photo-label" style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "flex-end",
        padding: big ? 32 : 18,
        pointerEvents: "none"
      }}>
          <span style={{
          fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
          fontSize: big ? 40 : 20,
          color: "#fff",
          textShadow: "0 1px 16px rgba(0,0,0,0.45)",
          letterSpacing: "-0.5px"
        }}>{labelText}</span>
        </div>
      }
    </div>);

}

// ----------------------------------------------------------------
// Kicker — small uppercase label
// ----------------------------------------------------------------
function Kicker({ children, color = "var(--fg-3)", style = {} }) {
  return <div style={{
    fontSize: 12, fontWeight: 600, letterSpacing: "0.4px",
    textTransform: "uppercase", color, ...style
  }}>{children}</div>;
}

// ----------------------------------------------------------------
// PromoBanner
// ----------------------------------------------------------------
function PromoBanner({ text, link, onLink }) {
  const [open, setOpen] = useStateChrome(true);
  if (!open) return null;
  return (
    <div style={{
      background: "var(--accent)",
      padding: "10px 24px",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 14, fontSize: 13, color: "#fff",
      position: "relative", letterSpacing: 0.1
    }}>
      <span>{text}{" "}
        <a onClick={onLink} style={{
          color: "#fff", fontWeight: 600, textDecoration: "underline",
          textUnderlineOffset: 3, cursor: "pointer"
        }}>{link}</a>
      </span>
      <button onClick={() => setOpen(false)} aria-label="dismiss" style={{
        position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)",
        background: "none", border: "none", color: "rgba(255,255,255,0.85)",
        cursor: "pointer", fontSize: 14, padding: 4
      }}>✕</button>
    </div>);

}

// ----------------------------------------------------------------
// LanguageToggle — pill
// ----------------------------------------------------------------
function LanguageToggle({ lang, onChange, onDark = false }) {
  const bg = onDark ? "rgba(255,255,255,0.10)" : "var(--bg-subtle)";
  const active = onDark ? "#fff" : "#fff";
  const activeColor = onDark ? "var(--fg-1)" : "var(--fg-1)";
  const idleColor = onDark ? "rgba(255,255,255,0.7)" : "var(--fg-3)";
  return (
    <div style={{
      display: "inline-flex", gap: 2,
      background: bg, padding: 3, borderRadius: 9999
    }}>
      {["fr", "en"].map((l) =>
      <button key={l} onClick={() => onChange(l)} style={{
        padding: "5px 12px", borderRadius: 9999,
        background: lang === l ? active : "transparent",
        color: lang === l ? activeColor : idleColor,
        border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
        boxShadow: lang === l ? "0 1px 2px rgba(15,15,15,0.06)" : "none",
        textTransform: "uppercase", letterSpacing: "0.5px",
        fontFamily: "var(--font-sans)"
      }}>{l}</button>
      )}
    </div>);

}

// ----------------------------------------------------------------
// Brand wordmark
// ----------------------------------------------------------------
function Wordmark({ size = 22, color = "var(--fg-1)", dotColor = "var(--accent)", onClick }) {
  return (
    <a onClick={onClick} style={{
      fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
      fontSize: size, color, textDecoration: "none", letterSpacing: "-0.5px",
      cursor: "pointer", whiteSpace: "nowrap"
    }}>
      created<span style={{ color: dotColor }}>.</span>bylina
    </a>);

}

// ----------------------------------------------------------------
// Nav — three styles via the navStyle tweak
//   "classic"   logo left, links center, lang + CTA right
//   "split"     logo left, links right, lang inline (no CTA pill)
//   "editorial" stacked: logo top-left, lang top-right, links underlined below
// ----------------------------------------------------------------
function Nav({ ui, lang, onLang, current, onNavigate, navStyle = "classic" }) {
  const links = [
  { id: "home", label: ui.nav.home, to: { kind: "page", id: "home" } },
  { id: "destinations", label: ui.nav.destinations, to: { kind: "page", id: "destinations" } },
  { id: "solo", label: ui.nav.solo, to: { kind: "page", id: "solo" } },
  { id: "about", label: ui.nav.about, to: { kind: "page", id: "about" } },
  { id: "collab", label: ui.nav.collab, to: { kind: "page", id: "collab" } }];


  const isActive = (id) => current === id;

  // ---- shared link renderer ----
  const renderLink = (l, opts = {}) => {
    const active = isActive(l.id);
    const { underline = false } = opts;
    return (
      <a key={l.id} onClick={() => onNavigate(l.to)} style={{
        color: active ? "var(--fg-1)" : "var(--fg-2)",
        fontSize: 14, fontWeight: active ? 600 : 500,
        textDecoration: "none", cursor: "pointer",
        padding: underline ? "0 0 4px" : 0,
        borderBottom: underline ? active ? "2px solid var(--accent)" : "2px solid transparent" : "none",
        transition: "color 120ms"
      }}>{l.label}</a>);

  };

  // ---- EDITORIAL: stacked, full-bleed ----
  if (navStyle === "editorial") {
    return (
      <nav style={{
        background: "var(--bg-page)",
        borderBottom: "1px solid var(--border)",
        padding: "24px 32px 0"
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingBottom: 16
        }}>
          <Wordmark size={26} onClick={() => onNavigate({ kind: "page", id: "home" })} />
          <LanguageToggle lang={lang} onChange={onLang} />
        </div>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", gap: 32, padding: "12px 0 14px",
          borderTop: "1px solid var(--border)"
        }}>
          {links.map((l) => renderLink(l, { underline: true }))}
        </div>
      </nav>);

  }

  // ---- SPLIT: logo left, links + lang right, no CTA button ----
  if (navStyle === "split") {
    return (
      <nav style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: 24
      }}>
        <Wordmark size={22} onClick={() => onNavigate({ kind: "page", id: "home" })} />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {links.map((l) => renderLink(l))}
          <div style={{ width: 1, height: 18, background: "var(--border)" }} />
          <LanguageToggle lang={lang} onChange={onLang} />
        </div>
      </nav>);

  }

  // ---- CLASSIC: logo left, links center, lang + CTA right ----
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 10,
      background: "rgba(255,255,255,0.88)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 32px",
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center",
      gap: 16
    }}>
      <div><Wordmark size={22} onClick={() => onNavigate({ kind: "page", id: "home" })} /></div>
      <div style={{ display: "flex", gap: 28, justifyContent: "center" }}>
        {links.map((l) => renderLink(l))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end" }}>
        <LanguageToggle lang={lang} onChange={onLang} />
        <button onClick={() => onNavigate({ kind: "page", id: "collab" })} style={{
          height: 34, padding: "0 14px", borderRadius: 8,
          background: "var(--fg-1)", color: "#fff", border: "none",
          fontSize: 13, fontWeight: 500, cursor: "pointer", letterSpacing: 0.1
        }}>{ui.cta.contact}</button>
      </div>
    </nav>);

}

// ----------------------------------------------------------------
// Footer — navy
// ----------------------------------------------------------------
function Footer({ ui, onNavigate }) {
  return (
    <footer style={{
      background: "var(--bg-dark-deep)", color: "rgba(255,255,255,0.7)",
      padding: "72px 32px 28px", marginTop: 96
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: 40
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
            fontSize: 28, color: "#fff", letterSpacing: "-0.5px", marginBottom: 14
          }}>
            created<span style={{ color: "var(--accent)" }}>.</span>bylina
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, maxWidth: 280, color: "rgba(255,255,255,0.6)" }}>
            {ui.footer.tagline}
          </p>
        </div>
        {ui.footer.cols.map((c, i) =>
        <div key={i}>
            <h4 style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.5px",
            textTransform: "uppercase", color: "#fff", margin: "0 0 16px"
          }}>{c.h}</h4>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.l.map((item, j) =>
            <li key={j}>
                  <a onClick={() => item.to.kind !== "ext" && onNavigate(item.to)}
              href={item.to.kind === "ext" ? item.to.url : undefined}
              target={item.to.kind === "ext" ? "_blank" : undefined}
              rel={item.to.kind === "ext" ? "noopener" : undefined}
              style={{
                color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 14,
                cursor: "pointer"
              }}>{item.t}</a>
                </li>
            )}
            </ul>
          </div>
        )}
      </div>
      <div style={{
        maxWidth: 1200, margin: "56px auto 0", paddingTop: 24,
        borderTop: "1px solid rgba(255,255,255,0.08)",
        fontSize: 12, color: "rgba(255,255,255,0.45)",
        display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap"
      }}>
        <span>{ui.footer.legal}</span>
        <span style={{ display: "flex", gap: 16 }}>
          <a href="https://www.instagram.com/created.bylina/" target="_blank" rel="noopener" style={{ color: "inherit", textDecoration: "none" }}>Instagram</a>
          <a onClick={() => onNavigate({ kind: "page", id: "collab" })} style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}>Contact</a>
        </span>
      </div>
    </footer>);

}

// ----------------------------------------------------------------
// AsiaMap — schematic SVG map of Asia, countries clickable
// Uses simplified path data (not geo-accurate, intentionally stylized).
// ----------------------------------------------------------------
function AsiaMap({ countries, onPick, ui, highlight }) {
  // Schematic shapes drawn on a 600×440 viewBox.
  // Each shape is a soft polygon — editorial, not cartographic.
  const SHAPES = {
    taiwan: { d: "M 432,222 q 12,-2 18,8 q 4,14 -2,28 q -4,12 -14,18 q -10,2 -14,-8 q -6,-18 -2,-32 q 2,-12 14,-14 z" },
    "thailand-n": { d: "M 240,210 q 16,-6 30,4 q 10,12 6,30 q -6,18 -22,22 q -16,-2 -22,-16 q -6,-22 8,-40 z" },
    "thailand-bkk": { d: "M 256,278 q 12,2 16,14 q 2,12 -8,18 q -12,4 -20,-4 q -6,-12 0,-22 q 4,-8 12,-6 z" },
    vietnam: { d: "M 312,178 q 16,-4 26,8 q 8,18 -2,40 q -8,22 -24,40 q -16,16 -28,8 q -10,-12 -2,-32 q 8,-26 18,-46 q 4,-14 12,-18 z" },
    philippines: { d: "M 416,290 q 14,-2 22,10 q 6,18 -4,32 q -10,16 -28,16 q -16,-2 -20,-18 q -2,-22 12,-32 q 8,-6 18,-8 z" },
    malaysia: { d: "M 286,348 q 30,-8 56,4 q 18,12 8,28 q -16,16 -42,12 q -28,-4 -36,-22 q -4,-14 14,-22 z" },
    okinawa: { d: "M 470,180 q 12,-2 16,8 q 2,12 -8,18 q -14,4 -20,-6 q -4,-12 12,-20 z" }
  };

  const findCountry = (id) => countries.find((c) => c.id === id);
  const tintFor = (id) => {
    const c = findCountry(id);
    return c ? TINT[c.tint] : "var(--bl-stone)";
  };
  const labelFor = (id) => {
    const c = findCountry(id);
    return c ? c[window.BL_DATA.UI ? "fr" : "fr"].name : id;
  };
  // we pass `lang` indirectly via countries[i].lang — but it's easier to receive name lookup
  // Instead: callers can pass `countries` already with `.label` localized — done inline:

  return (
    <div style={{ position: "relative", aspectRatio: "600/440", width: "100%" }}>
      <svg viewBox="0 0 600 440" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* Background — subtle ocean grid */}
        <rect x="0" y="0" width="600" height="440" fill="var(--bg-subtle)" />
        {/* hairline grid */}
        {[100, 200, 300, 400, 500].map((x) =>
        <line key={"v" + x} x1={x} y1="0" x2={x} y2="440" stroke="var(--border)" strokeWidth="0.5" />
        )}
        {[100, 200, 300].map((y) =>
        <line key={"h" + y} x1="0" y1={y} x2="600" y2={y} stroke="var(--border)" strokeWidth="0.5" />
        )}

        {/* faint reference outlines of nearby landmasses (not clickable) */}
        <path d="M 60,80 q 80,-30 160,-10 q 100,30 120,90 q 20,80 -60,90 q -80,10 -150,-30 q -90,-50 -70,-140 z"
        fill="#efece7" stroke="var(--border)" strokeWidth="1" />
        <path d="M 500,80 q 60,10 70,60 q -10,40 -50,40 q -40,-10 -30,-60 q 0,-30 10,-40 z"
        fill="#efece7" stroke="var(--border)" strokeWidth="1" />

        {/* Clickable country shapes */}
        {countries.filter((c) => SHAPES[c.id]).map((c) => {
          const isHi = highlight === c.id;
          return (
            <g key={c.id} style={{ cursor: "pointer" }}
            onClick={() => onPick && onPick(c)}>
              <path d={SHAPES[c.id].d}
              fill={TINT[c.tint] || "var(--bl-tint-mint)"}
              stroke={isHi ? "var(--accent)" : "var(--fg-1)"}
              strokeWidth={isHi ? 2.5 : 1.25}
              style={{ transition: "all 220ms var(--ease-out)" }} />
            </g>);

        })}

        {/* Country labels */}
        {countries.filter((c) => SHAPES[c.id]).map((c) => {
          // pick approximate centroid by averaging coords in path
          const centroids = {
            taiwan: [444, 248],
            "thailand-n": [254, 232],
            "thailand-bkk": [260, 296],
            vietnam: [320, 232],
            philippines: [424, 322],
            malaysia: [318, 366],
            okinawa: [478, 196]
          };
          const [cx, cy] = centroids[c.id];
          return (
            <text key={"l" + c.id} x={cx} y={cy}
            textAnchor="middle"
            style={{ pointerEvents: "none" }}
            fontFamily="Inter, sans-serif"
            fontSize="11"
            fontWeight="600"
            fill="var(--fg-1)">
              {c.label}
            </text>);

        })}

        {/* "Asia" wordmark, bottom-right corner */}
        <text x="572" y="420" textAnchor="end"
        fontFamily="Fraunces, serif" fontStyle="italic"
        fontSize="22" fill="var(--fg-4)" fontWeight="500">
          Asie
        </text>
      </svg>
    </div>);

}

// ----------------------------------------------------------------
// WorldMap — small schematic of visited continents
// ----------------------------------------------------------------
function WorldMap({ visitedContinents = ["asia"], onPick }) {
  // Continent rough shapes on 800×400 viewBox
  const SHAPES = [
  { id: "americas", d: "M 80,120 q 30,-40 60,-30 q 30,10 30,80 q 0,80 -20,120 q -30,40 -50,20 q -30,-30 -20,-100 q 0,-50 0,-90 z M 130,260 q 20,0 30,30 q 0,40 -30,40 q -20,-10 -10,-50 z" },
  { id: "europe", d: "M 360,140 q 30,-20 60,-10 q 20,10 20,40 q -10,30 -50,30 q -50,0 -50,-30 q 0,-20 20,-30 z" },
  { id: "africa", d: "M 380,200 q 40,-10 70,20 q 30,40 20,90 q -20,60 -60,70 q -40,0 -60,-40 q -20,-60 0,-110 q 10,-20 30,-30 z" },
  { id: "asia", d: "M 480,130 q 60,-30 130,-10 q 60,20 70,80 q 0,60 -40,90 q -50,30 -110,20 q -60,-10 -80,-60 q -10,-60 30,-120 z" }];

  return (
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
      <rect x="0" y="0" width="800" height="400" fill="var(--bg-subtle)" />
      {[100, 200, 300, 400, 500, 600, 700].map((x) =>
      <line key={"v" + x} x1={x} y1="0" x2={x} y2="400" stroke="var(--border)" strokeWidth="0.5" />
      )}
      {[100, 200, 300].map((y) =>
      <line key={"h" + y} x1="0" y1={y} x2="800" y2={y} stroke="var(--border)" strokeWidth="0.5" />
      )}
      {SHAPES.map((s) => {
        const visited = visitedContinents.includes(s.id);
        return (
          <path key={s.id} d={s.d}
          fill={visited ? "var(--accent)" : "#efece7"}
          stroke="var(--fg-1)"
          strokeWidth={visited ? 1.5 : 1}
          opacity={visited ? 0.92 : 1}
          style={{ cursor: onPick ? "pointer" : "default" }}
          onClick={() => onPick && onPick(s.id)} />);

      })}
      <text x="780" y="385" textAnchor="end"
      fontFamily="Fraunces, serif" fontStyle="italic"
      fontSize="22" fill="var(--fg-4)" fontWeight="500">
        the world
      </text>
    </svg>);

}

// ----------------------------------------------------------------
// Newsletter inline (used on home + about)
// ----------------------------------------------------------------
function NewsletterInline({ ui, dark = false }) {
  const [email, setEmail] = useStateChrome("");
  const [done, setDone] = useStateChrome(false);
  const submit = (e) => {e.preventDefault();if (email) setDone(true);};
  const bg = dark ? "var(--bg-dark)" : "var(--bg-subtle)";
  const txt = dark ? "#fff" : "var(--fg-1)";
  const sub = dark ? "rgba(255,255,255,0.7)" : "var(--fg-3)";
  return (
    <section style={{
      background: bg, color: txt, borderRadius: 20,
      padding: "48px 48px", display: "grid",
      gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center"
    }}>
      <div>
        <Kicker color={dark ? "var(--bl-tint-yellow-bold)" : "var(--accent)"} style={{ marginBottom: 12 }}>
          {ui.lang === "fr" ? "LETTRE MENSUELLE" : "MONTHLY LETTER"}
        </Kicker>
        <h2 style={{
          fontSize: 32, lineHeight: 1.15, fontWeight: 600, margin: "0 0 10px",
          letterSpacing: "-0.5px", color: txt
        }}>
          {ui.lang === "fr" ?
          "Une lettre par mois, depuis l'endroit o\u00f9 je suis." :
          "One letter a month, from wherever I am."}
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.5, color: sub, margin: 0, maxWidth: 440 }}>
          {ui.lang === "fr" ?
          "Le prochain carnet, ce que je lis, ce qui m'a fait douter. Pas de spam, pas d'affili\u00e9s." :
          "The next journal, what I'm reading, what made me hesitate. No spam, no affiliate links."}
        </p>
      </div>
      <div>
        {done ?
        <div style={{
          background: dark ? "rgba(255,255,255,0.10)" : "var(--bl-tint-mint)",
          padding: "20px 24px", borderRadius: 12,
          color: txt, fontSize: 16, fontWeight: 500
        }}>
            {ui.lang === "fr" ? "Merci, on se retrouve dans la bo\u00eete." : "Thanks — see you in the inbox."}
          </div> :

        <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder={ui.lang === "fr" ? "ton@email.com" : "your@email.com"}
            style={{
              flex: 1, height: 48, padding: "0 16px", borderRadius: 10,
              border: dark ? "1px solid rgba(255,255,255,0.20)" : "1px solid var(--border-strong)",
              background: dark ? "rgba(255,255,255,0.06)" : "#fff",
              color: txt,
              fontSize: 15, fontFamily: "var(--font-sans)", outline: "none"
            }} />
          
            <button type="submit" style={{
            height: 48, padding: "0 22px", borderRadius: 10,
            background: "var(--accent)", color: "#fff", border: "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer"
          }}>{ui.cta.subscribe}</button>
          </form>
        }
      </div>
    </section>);

}

// ----------------------------------------------------------------
// RotatingWord — cycles through a list of words with a soft fade/rise.
// Used in the home hero to scroll through destinations.
// ----------------------------------------------------------------
function RotatingWord({ words = [], interval = 2200, style = {} }) {
  const [i, setI] = useStateChrome(0);
  const [show, setShow] = useStateChrome(true);
  useEffectChrome(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setI((prev) => (prev + 1) % words.length);
        setShow(true);
      }, 320);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);
  return (
    <span style={{
      display: "inline-block",
      opacity: show ? 1 : 0,
      transform: show ? "translateY(0)" : "translateY(12px)",
      transition: "opacity 320ms var(--ease-out), transform 320ms var(--ease-out)",
      ...style
    }}>{words[i]}</span>);

}

// ----- export to window ----------
Object.assign(window, {
  PhotoTile, Kicker, PromoBanner, LanguageToggle, Wordmark, Nav, Footer,
  AsiaMap, WorldMap, NewsletterInline, RotatingWord, TINT
});