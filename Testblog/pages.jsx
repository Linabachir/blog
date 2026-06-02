/* =========================================================
   created.bylina — Page components
   HomePage, DestinationsPage, ContinentPage, CountryPage,
   ArticlePage, SoloPage, AboutPage, CollabPage.
   ========================================================= */

const { useState: usePageState, useEffect: usePageEffect, useMemo: usePageMemo } = React;

// ----------------------------------------------------------------
// Section helper — vertical rhythm wrapper
// ----------------------------------------------------------------
function Section({ children, pad = "96px 32px", bg, style = {} }) {
  return (
    <section style={{ padding: pad, background: bg, ...style }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>{children}</div>
    </section>);

}

// ----------------------------------------------------------------
// PostCard — used everywhere a journal entry is listed
// ----------------------------------------------------------------
function PostCard({ article, lang, onOpen, ui }) {
  const a = article[lang];
  return (
    <a onClick={() => onOpen(article.id)} style={{
      background: "#fff", border: "1px solid var(--border)",
      borderRadius: 12, overflow: "hidden", textDecoration: "none",
      display: "flex", flexDirection: "column", cursor: "pointer",
      transition: "all 220ms var(--ease-out)"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,15,15,0.08)";
      const img = e.currentTarget.querySelector("[data-img]");
      if (img) img.style.transform = "scale(1.03)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "none";
      const img = e.currentTarget.querySelector("[data-img]");
      if (img) img.style.transform = "scale(1)";
    }}>
      <div style={{ overflow: "hidden", aspectRatio: "16/10" }}>
        <div data-img style={{
          width: "100%", height: "100%",
          transition: "transform 600ms var(--ease-out)"
        }}>
          <PhotoTile which={article.img} aspect="16/10" radius={0} fill />
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px" }}>
        <Kicker color="var(--fg-3)" style={{ marginBottom: 10 }}>{a.kicker}</Kicker>
        <h3 style={{
          fontSize: 20, lineHeight: 1.3, fontWeight: 600,
          margin: "0 0 10px", color: "var(--fg-1)", letterSpacing: "-0.2px",
          textWrap: "pretty"
        }}>{a.title}</h3>
        <p style={{
          fontSize: 14, lineHeight: 1.55, color: "var(--fg-3)",
          margin: "0 0 16px", textWrap: "pretty"
        }}>{a.dek}</p>
        <div style={{
          display: "flex", gap: 14, fontSize: 12, color: "var(--fg-4)",
          paddingTop: 14, borderTop: "1px solid var(--border)"
        }}>
          <span>{ui.article.readMin(article.readMin)}</span>
          <span>·</span>
          <span>{new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { month: "short", year: "numeric" })}</span>
        </div>
      </div>
    </a>);

}

// ================================================================
// HOME PAGE
// ================================================================
function HomePage({ ui, lang, onNavigate, onOpenArticle, onShuffle }) {
  const { ARTICLES, COUNTRIES, CONTINENTS } = window.BL_DATA;
  const featured = ARTICLES.find((a) => a.featured);
  // Bouchra: latest order = Vietnam, Philippines, Taïwan
  const latestOrder = ["vietnam-solo", "philippines-palawan", "taiwan-first-solo"];
  const latest = latestOrder.
  map((id) => ARTICLES.find((a) => a.id === id)).
  filter(Boolean);
  // Bouchra: show ONE "Thaïlande" chip/marker for now (North + Bangkok merged)
  const visitedCountries = (() => {
    const out = [];let thai = false;
    COUNTRIES.filter((c) => c.hasArticles).forEach((c) => {
      if (c.id === "thailand-n" || c.id === "thailand-bkk") {
        if (!thai) {thai = true;out.push({ ...c, id: "thailand-n", label: lang === "fr" ? "Thaïlande" : "Thailand" });}
      } else {
        out.push({ ...c, label: c[lang].name });
      }
    });
    return out;
  })();

  return (
    <>
      {/* ============== HERO (navy band) ============== */}
      <section style={{
        background: "var(--bg-dark)", color: "#fff",
        padding: "88px 32px 120px", position: "relative", overflow: "hidden"
      }}>
        {/* decorative scribble */}
        <svg style={{ position: "absolute", top: 40, right: -40, opacity: 0.06 }} width="320" height="320" viewBox="0 0 320 320">
          <path d="M 40,200 Q 80,80 160,120 T 280,180 Q 240,260 140,240 T 30,200" fill="none" stroke="#fff" strokeWidth="2" />
        </svg>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 64, alignItems: "center"
        }}>
          <div>
            <Kicker color="var(--bl-tint-yellow-bold)" style={{ marginBottom: 20 }}>
              {ui.home.hero.kicker}
            </Kicker>
            <h1 className="t-hero-display" style={{
              color: "#fff", margin: "0 0 22px",
              fontFamily: "var(--font-sans)"
            }}>
              <span style={{ display: "block" }}>{ui.home.hero.titleLead}</span>
              <span style={{ display: "block", minHeight: "1.1em", whiteSpace: "nowrap" }}>
                <RotatingWord
                  words={ui.home.hero.rotating}
                  style={{
                    fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
                    color: "var(--bl-tint-yellow-bold)"
                  }} />
              </span>
            </h1>
            <p style={{
              fontSize: 18, lineHeight: 1.55, color: "rgba(255,255,255,0.78)",
              margin: "0 0 32px", maxWidth: 520
            }}>{ui.home.hero.sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={() => onOpenArticle(featured.id)} style={{
                height: 48, padding: "0 22px", borderRadius: 10,
                background: "#fff", color: "var(--fg-1)", border: "none",
                fontSize: 14, fontWeight: 600, cursor: "pointer"
              }}>{ui.home.hero.ctaPrimary}</button>
              <button onClick={() => onNavigate({ kind: "page", id: "destinations" })} style={{
                height: 48, padding: "0 22px", borderRadius: 10,
                background: "transparent", color: "#fff",
                border: "1px solid rgba(255,255,255,0.32)",
                fontSize: 14, fontWeight: 500, cursor: "pointer"
              }}>{ui.home.hero.ctaSecondary}</button>
            </div>
          </div>

          {/* Floating featured-post card, tilted */}
          <article onClick={() => onOpenArticle(featured.id)} style={{
            background: "#fff", color: "var(--fg-1)",
            borderRadius: 16,
            boxShadow: "0 32px 64px -12px rgba(0,0,0,0.55)",
            overflow: "hidden",
            transform: "rotate(-1.5deg)",
            cursor: "pointer",
            transition: "transform 360ms var(--ease-out)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(-0.5deg) translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(-1.5deg)"}>
            <PhotoTile which={featured.img} aspect="4/3" radius={0} big />
            <div style={{ padding: "20px 24px 24px" }}>
              <Kicker color="var(--fg-3)" style={{ marginBottom: 10 }}>{featured[lang].kicker}</Kicker>
              <h3 style={{
                fontSize: 22, lineHeight: 1.25, fontWeight: 600,
                margin: "0 0 10px", letterSpacing: "-0.3px", textWrap: "pretty"
              }}>{featured[lang].title}</h3>
              <div style={{ fontSize: 13, color: "var(--fg-4)" }}>
                {ui.article.byLina} · {ui.article.readMin(featured.readMin)}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ============== LATEST JOURNALS ============== */}
      <Section pad="96px 32px 32px">
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: 36, gap: 24, flexWrap: "wrap"
        }}>
          <div>
            <Kicker color="var(--accent)" style={{ marginBottom: 12 }}>{ui.home.latest.kicker}</Kicker>
            <h2 className="t-h2" style={{ margin: 0 }}>{ui.home.latest.title}</h2>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <button onClick={onShuffle} style={{
              background: "transparent", border: "1px solid var(--border-strong)",
              borderRadius: 9999, padding: "8px 16px",
              fontSize: 13, fontWeight: 500, color: "var(--fg-2)",
              cursor: "pointer", fontFamily: "var(--font-sans)"
            }}>{ui.article.shuffle}</button>
            <a onClick={() => onNavigate({ kind: "page", id: "destinations" })} style={{
              color: "var(--fg-1)", fontWeight: 500, fontSize: 14,
              textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer"
            }}>{ui.home.latest.cta}</a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {latest.map((a) => <PostCard key={a.id} article={a} lang={lang} onOpen={onOpenArticle} ui={ui} />)}
        </div>
      </Section>

      {/* ============== CATEGORY CARDS ============== */}
      <Section pad="64px 32px 32px">
        <div style={{ marginBottom: 36 }}>
          <Kicker color="var(--fg-3)" style={{ marginBottom: 12 }}>{ui.home.categories.kicker}</Kicker>
          <h2 className="t-h2" style={{ margin: "0 0 12px" }}>{ui.home.categories.title}</h2>
          <p className="t-subtitle" style={{ margin: 0, maxWidth: 540 }}>{ui.home.categories.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {ui.home.catCards.map((c, i) =>
          <a key={i} onClick={() => onNavigate(c.to)} style={{
            background: TINT[c.tint], borderRadius: 16,
            padding: "32px 28px 28px", minHeight: 220, textDecoration: "none",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
            cursor: "pointer",
            transition: "transform 220ms var(--ease-out)"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
              <div style={{ fontSize: 30, lineHeight: 1 }}>{c.emoji}</div>
              <div>
                <h3 style={{
                fontSize: 22, lineHeight: 1.3, fontWeight: 600,
                margin: "0 0 8px", color: "var(--fg-1)", letterSpacing: "-0.2px"
              }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.5, color: "var(--fg-2)", margin: 0, textWrap: "pretty" }}>{c.desc}</p>
              </div>
            </a>
          )}
        </div>
      </Section>

      {/* ============== ASIA MAP ============== */}
      <Section pad="80px 32px">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 56, alignItems: "center"
        }}>
          <div>
            <Kicker color="var(--accent)" style={{ marginBottom: 12 }}>{ui.home.mapKicker}</Kicker>
            <h2 className="t-h2" style={{ margin: "0 0 16px", letterSpacing: "-0.5px" }}>{ui.home.mapTitle}</h2>
            <p className="t-subtitle" style={{ margin: "0 0 28px" }}>{ui.home.mapSub}</p>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8
            }}>
              {visitedCountries.map((c) =>
              <button key={c.id} onClick={() => onNavigate({ kind: "country", id: c.id })} style={{
                background: "#fff", border: "1px solid var(--border)",
                borderRadius: 9999, padding: "8px 14px",
                fontSize: 13, fontWeight: 500, color: "var(--fg-1)",
                cursor: "pointer", fontFamily: "var(--font-sans)",
                display: "inline-flex", alignItems: "center", gap: 8
              }}>
                  <span style={{ width: 8, height: 8, borderRadius: 9999, background: TINT[c.tint], border: "1px solid var(--border)" }} />
                  {c.label || c[lang].name}
                </button>
              )}
            </div>
          </div>
          <div style={{
            background: "#fff", border: "1px solid var(--border)",
            borderRadius: 16, padding: 24
          }}>
            <AsiaMap
              countries={visitedCountries}
              onPick={(c) => onNavigate({ kind: "country", id: c.id })}
              ui={ui} />
            
          </div>
        </div>
      </Section>

      {/* ============== ABOUT TEASER ============== */}
      <Section pad="64px 32px">
        <div style={{
          display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center"
        }}>
          <div style={{ overflow: "hidden", borderRadius: 16 }}>
            <PhotoTile which="lina-portrait" aspect="4/5" radius={0} />
          </div>
          <div>
            <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{ui.home.about.kicker}</Kicker>
            <h2 className="t-h2" style={{ margin: "0 0 18px", letterSpacing: "-0.5px" }}>
              <span className="t-serif" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500 }}>{ui.home.about.title}</span>
            </h2>
            <p style={{
              fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 0 24px",
              maxWidth: 540, textWrap: "pretty"
            }}>{ui.home.about.body}</p>
            <a onClick={() => onNavigate({ kind: "page", id: "about" })} style={{
              color: "var(--accent)", fontWeight: 600, fontSize: 15,
              textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer"
            }}>{ui.home.about.cta}</a>
          </div>
        </div>
      </Section>

      {/* ============== BIG YELLOW BANNER ============== */}
      <Section pad="32px 32px 80px">
        <div style={{
          background: "var(--bl-tint-yellow-bold)",
          borderRadius: 20, padding: "44px 44px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 32, flexWrap: "wrap"
        }}>
          <h2 style={{
            fontSize: 30, lineHeight: 1.25, fontWeight: 600,
            margin: 0, color: "var(--fg-1)", letterSpacing: "-0.4px",
            maxWidth: 720, textWrap: "pretty"
          }}>{ui.home.bigBanner.title}</h2>
          <a onClick={() => onNavigate({ kind: "page", id: "collab" })} style={{
            fontSize: 15, fontWeight: 600, color: "var(--fg-1)", textDecoration: "none",
            borderBottom: "2px solid var(--fg-1)", paddingBottom: 2, cursor: "pointer"
          }}>{ui.home.bigBanner.link}</a>
        </div>
      </Section>

      {/* ============== NEWSLETTER ============== */}
      <Section pad="0 32px 64px">
        <NewsletterInline ui={{ ...ui, lang }} />
      </Section>
    </>);

}

// ================================================================
// DESTINATIONS PAGE — continents grid
// ================================================================
function DestinationsPage({ ui, lang, onNavigate }) {
  const { CONTINENTS, COUNTRIES } = window.BL_DATA;
  const visitedContinents = CONTINENTS.filter((c) => c.visited).map((c) => c.id);

  return (
    <>
      <Section pad="56px 32px 32px">
        <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{ui.destinations.kicker}</Kicker>
        <h1 className="t-h1" style={{ margin: "0 0 14px", maxWidth: 820, letterSpacing: "-0.5px" }}>
          {ui.destinations.title}
        </h1>
        <p className="t-subtitle" style={{ margin: 0, maxWidth: 620 }}>{ui.destinations.sub}</p>
      </Section>

      <Section pad="24px 32px 64px">
        <div style={{
          background: "#fff", border: "1px solid var(--border)",
          borderRadius: 20, padding: 32, marginBottom: 48
        }}>
          <WorldMap visitedContinents={visitedContinents} onPick={(id) => {
            if (visitedContinents.includes(id)) onNavigate({ kind: "continent", id });
          }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {CONTINENTS.map((c) => {
            const countriesIn = COUNTRIES.filter((co) => co.continent === c.id);
            const visited = countriesIn.filter((co) => co.hasArticles).length;
            return (
              <a key={c.id} onClick={() => c.visited && onNavigate({ kind: "continent", id: c.id })} style={{
                background: TINT[c.tint], borderRadius: 16,
                padding: "36px 36px", textDecoration: "none",
                display: "flex", flexDirection: "column", gap: 18,
                cursor: c.visited ? "pointer" : "default",
                opacity: c.visited ? 1 : 0.78,
                transition: "transform 220ms var(--ease-out)",
                minHeight: 220, position: "relative", overflow: "hidden"
              }}
              onMouseEnter={(e) => c.visited && (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{
                    background: "rgba(0,0,0,0.08)", color: "var(--fg-1)",
                    borderRadius: 9999, padding: "4px 10px",
                    fontSize: 11, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase"
                  }}>{c.visited ? ui.destinations.visitedLabel : ui.destinations.soonLabel}</span>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <h2 style={{
                    fontSize: 40, lineHeight: 1.05, fontWeight: 600,
                    margin: "0 0 8px", letterSpacing: "-1px",
                    fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
                    color: "var(--fg-1)"
                  }}>{c[lang].name}</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.55, color: "var(--fg-2)", margin: 0, maxWidth: 360, textWrap: "pretty" }}>
                    {c[lang].blurb}
                  </p>
                </div>
                {c.visited &&
                <div style={{
                  position: "absolute", bottom: 24, right: 28,
                  width: 44, height: 44, borderRadius: 9999,
                  background: "var(--fg-1)", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18
                }}>→</div>
                }
              </a>);

          })}
        </div>
      </Section>
    </>);

}

// ================================================================
// CONTINENT PAGE — list of countries in a continent
// ================================================================
function ContinentPage({ ui, lang, continentId, onNavigate, onOpenArticle }) {
  const { CONTINENTS, COUNTRIES, ARTICLES } = window.BL_DATA;
  const cont = CONTINENTS.find((c) => c.id === continentId);
  if (!cont) return null;
  const countries = COUNTRIES.filter((c) => c.continent === continentId);

  return (
    <>
      <Section pad="48px 32px 24px">
        <a onClick={() => onNavigate({ kind: "page", id: "destinations" })} style={{
          fontSize: 14, fontWeight: 500, color: "var(--fg-3)",
          textDecoration: "none", cursor: "pointer", display: "inline-block", marginBottom: 28
        }}>{ui.destinations.back}</a>
        <Kicker color="var(--accent)" style={{ marginBottom: 12 }}>
          {lang === "fr" ? "CONTINENT" : "CONTINENT"}
        </Kicker>
        <h1 style={{
          fontSize: 80, lineHeight: 1.0, fontWeight: 500,
          fontFamily: "var(--font-serif)", fontStyle: "italic",
          letterSpacing: "-2px", margin: "0 0 18px", color: "var(--fg-1)"
        }}>{cont[lang].name}</h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, color: "var(--fg-3)", margin: 0, maxWidth: 640, textWrap: "pretty" }}>
          {cont[lang].blurb}
        </p>
      </Section>

      {/* Asia-specific schematic map */}
      {continentId === "asia" &&
      <Section pad="32px 32px 48px">
          <div style={{
          background: "#fff", border: "1px solid var(--border)",
          borderRadius: 20, padding: 28
        }}>
            <AsiaMap
            countries={(() => {
              const out = [];let thai = false;
              countries.forEach((c) => {
                if (c.id === "thailand-n" || c.id === "thailand-bkk") {
                  if (!thai) {thai = true;out.push({ ...c, id: "thailand-n", label: lang === "fr" ? "Thaïlande" : "Thailand" });}
                } else {out.push({ ...c, label: c[lang].name });}
              });
              return out;
            })()}
            onPick={(c) => onNavigate({ kind: "country", id: c.id })}
            ui={ui} />
          
          </div>
        </Section>
      }

      <Section pad="32px 32px 64px">
        <div style={{ marginBottom: 28 }}>
          <h2 className="t-h3" style={{ margin: 0, letterSpacing: "-0.3px" }}>
            {lang === "fr" ? "Tous les pays" : "All countries"}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {countries.map((co) => {
            const cArticles = ARTICLES.filter((a) => a.country === co.id);
            return (
              <a key={co.id} onClick={() => onNavigate({ kind: "country", id: co.id })} style={{
                background: "#fff", border: "1px solid var(--border)",
                borderRadius: 12, overflow: "hidden",
                textDecoration: "none", cursor: "pointer",
                display: "flex", flexDirection: "column",
                transition: "all 220ms var(--ease-out)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 16px rgba(15,15,15,0.08)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
                <PhotoTile which={
                co.id === "taiwan" ? "taiwan-tea" :
                co.id === "vietnam" ? "vietnam-rice" :
                co.id === "philippines" ? "philippines-beach" :
                co.id === "thailand-n" ? "thailand-mountains" :
                co.id === "thailand-bkk" ? "thailand-bangkok" :
                co.id === "okinawa" ? "okinawa-water" :
                "malaysia-jungle"
                } aspect="4/3" label={co[lang].name} />
                <div style={{ padding: "20px 22px 22px" }}>
                  <p style={{
                    fontSize: 14, lineHeight: 1.55, color: "var(--fg-3)",
                    margin: "0 0 16px", textWrap: "pretty"
                  }}>{co[lang].blurb}</p>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    paddingTop: 14, borderTop: "1px solid var(--border)",
                    fontSize: 13, color: "var(--fg-4)"
                  }}>
                    <span>
                      {co.articleCount > 0 ?
                      `${co.articleCount} ${co.articleCount === 1 ? ui.destinations.articleSingular : ui.destinations.articlePlural}` :
                      ui.destinations.noArticlesYet}
                    </span>
                    {co.hasArticles && <span style={{ color: "var(--accent)", fontWeight: 600 }}>→</span>}
                  </div>
                </div>
              </a>);

          })}
        </div>
      </Section>
    </>);

}

// ================================================================
// COUNTRY PAGE — header + list of country's articles
// ================================================================
function CountryPage({ ui, lang, countryId, onNavigate, onOpenArticle }) {
  const { COUNTRIES, CONTINENTS, ARTICLES } = window.BL_DATA;
  const country = COUNTRIES.find((c) => c.id === countryId);
  if (!country) return null;
  const continent = CONTINENTS.find((c) => c.id === country.continent);
  const cArticles = ARTICLES.filter((a) => a.country === country.id);

  return (
    <>
      {/* full-bleed photo header */}
      <section style={{ position: "relative" }}>
        <div style={{ height: 480, overflow: "hidden", position: "relative" }}>
          <PhotoTile which={
          country.id === "taiwan" ? "taiwan-tea" :
          country.id === "vietnam" ? "vietnam-rice" :
          country.id === "philippines" ? "philippines-beach" :
          country.id === "thailand-n" ? "thailand-mountains" :
          country.id === "thailand-bkk" ? "thailand-bangkok" :
          country.id === "okinawa" ? "okinawa-water" :
          "malaysia-jungle"
          } overlay={false} fill />
          {/* vignette */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(10,21,48,0.20) 0%, rgba(10,21,48,0.10) 40%, rgba(10,21,48,0.70) 100%)"
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none",
            padding: "48px 32px"
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <a onClick={() => onNavigate({ kind: "continent", id: continent.id })} style={{
                fontSize: 13, fontWeight: 600, letterSpacing: 0.4, textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)", cursor: "pointer", textDecoration: "none", pointerEvents: "auto",
                display: "inline-block", marginBottom: 18
              }}>{ui.destinations.backToContinent(continent[lang].name)}</a>
              <h1 style={{
                fontSize: 88, lineHeight: 1.0, fontWeight: 500,
                fontFamily: "var(--font-serif)", fontStyle: "italic",
                letterSpacing: "-2px", margin: "0 0 14px", color: "#fff",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)"
              }}>{country[lang].name}</h1>
              <p style={{
                fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.92)",
                margin: 0, maxWidth: 640, textWrap: "pretty"
              }}>{country[lang].blurb}</p>
            </div>
          </div>
        </div>
      </section>

      {cArticles.length > 0 ?
      <Section pad="80px 32px 32px">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 24, flexWrap: "wrap" }}>
            <div>
              <Kicker color="var(--accent)" style={{ marginBottom: 12 }}>
                {lang === "fr" ? "CARNETS" : "JOURNALS"}
              </Kicker>
              <h2 className="t-h2" style={{ margin: 0 }}>
                {cArticles.length} {cArticles.length === 1 ? ui.destinations.articleSingular : ui.destinations.articlePlural}
              </h2>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {cArticles.map((a) => <PostCard key={a.id} article={a} lang={lang} onOpen={onOpenArticle} ui={ui} />)}
          </div>
        </Section> :

      <Section pad="80px 32px 32px">
          <div style={{
          background: "var(--bg-subtle)", borderRadius: 16, padding: "56px 40px",
          textAlign: "center"
        }}>
            <Kicker style={{ marginBottom: 12, justifyContent: "center" }}>
              {lang === "fr" ? "BIENTOT" : "SOON"}
            </Kicker>
            <h2 className="t-h3" style={{ margin: "0 0 14px" }}>
              {lang === "fr" ? "Le carnet n'est pas encore \u00e9crit." : "The journal isn't written yet."}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--fg-3)", margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
              {lang === "fr" ?
            "J'\u00e9cris encore mes notes. Abonne-toi \u00e0 la lettre pour \u00eatre pr\u00e9venu(e) quand il para\u00eet." :
            "Still writing my notes. Subscribe to the letter and you'll know when it's out."}
            </p>
          </div>
        </Section>
      }
    </>);

}

// ================================================================
// ARTICLE PAGE — long-form journal
// ================================================================
function ArticlePage({ ui, lang, articleId, onNavigate, onOpenArticle }) {
  const { ARTICLES, COUNTRIES } = window.BL_DATA;
  const article = ARTICLES.find((a) => a.id === articleId);
  if (!article) return null;
  const a = article[lang];
  const country = COUNTRIES.find((c) => c.id === article.country);

  // EN articles may not be translated yet — fall back to the FR body with a notice
  const otherLang = lang === "fr" ? "en" : "fr";
  const hasOwnBody = !!(a.body && a.body.length);
  const fallbackBody = article[otherLang] && article[otherLang].body;
  const showTranslationNotice = !hasOwnBody && !!fallbackBody;
  const activeBody = hasOwnBody ? a.body : fallbackBody || [{ kind: "p", text: a.dek }];

  // build a simple TOC from h-kind blocks
  const hHeadings = activeBody.filter((b) => b.kind === "h").map((b, i) => ({ ...b, idx: i }));

  // Next article (by date desc, excluding current)
  const sorted = [...ARTICLES].filter((x) => x.id !== article.id).
  sort((x, y) => new Date(y.date) - new Date(x.date));
  const next = sorted[0];

  // Reading progress
  const [progress, setProgress] = usePageState(0);
  usePageEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, scrolled / total * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [articleId]);

  // body to render (own language, or fallback)
  const body = activeBody;

  return (
    <>
      {/* Reading-progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 3,
        background: "transparent", zIndex: 50, pointerEvents: "none"
      }}>
        <div style={{
          height: "100%", width: `${progress}%`,
          background: "var(--accent)", transition: "width 80ms linear"
        }} />
      </div>

      {/* Hero image */}
      <section style={{ position: "relative" }}>
        <div style={{ height: 540, overflow: "hidden", position: "relative" }}>
          <PhotoTile which={article.img} overlay={false} fill src={article.id === "taiwan-first-solo" ? "uploads/pasted-1779904879303-0.png" : undefined} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "linear-gradient(180deg, rgba(10,21,48,0.25) 0%, rgba(10,21,48,0.10) 40%, rgba(10,21,48,0.65) 100%)"
          }} />
          <div style={{
            position: "absolute", left: 0, right: 0, bottom: 0, pointerEvents: "none",
            padding: "44px 32px"
          }}>
            <div style={{ maxWidth: 920, margin: "0 auto" }}>
              <a onClick={() => onNavigate({ kind: "country", id: country.id })} style={{
                fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase",
                color: "rgba(255,255,255,0.92)", cursor: "pointer", textDecoration: "none", pointerEvents: "auto",
                display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22,
                background: "rgba(255,255,255,0.16)", backdropFilter: "blur(8px)",
                padding: "6px 12px", borderRadius: 9999
              }}>{a.kicker}</a>
              <h1 style={{
                fontSize: 64, lineHeight: 1.1, fontWeight: 600, letterSpacing: "-1.2px",
                color: "#fff", margin: "0 0 18px",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
                maxWidth: 820, textWrap: "pretty"
              }}>{a.title}</h1>
              <p style={{
                fontSize: 19, lineHeight: 1.5, color: "rgba(255,255,255,0.92)",
                margin: 0, maxWidth: 640, fontStyle: "italic",
                fontFamily: "var(--font-serif)", fontWeight: 400
              }}>{a.dek}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meta row */}
      <Section pad="32px 32px 8px">
        <div style={{
          maxWidth: 920, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingBottom: 28, borderBottom: "1px solid var(--border)",
          fontSize: 13, color: "var(--fg-3)", gap: 16, flexWrap: "wrap"
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{
              width: 36, height: 36, borderRadius: 9999,
              background: "linear-gradient(135deg, #c4a888, #7a5a3a)",
              display: "inline-block"
            }} />
            <div>
              <div style={{ color: "var(--fg-1)", fontWeight: 600, fontSize: 14 }}>{ui.article.byLina}</div>
              <div style={{ fontSize: 12, color: "var(--fg-4)" }}>
                {new Date(article.date).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { day: "numeric", month: "long", year: "numeric" })}
                {" \u00b7 "}
                {ui.article.readMin(article.readMin)}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{
              height: 36, padding: "0 14px", borderRadius: 9999,
              background: "transparent", border: "1px solid var(--border-strong)",
              fontSize: 13, fontWeight: 500, color: "var(--fg-2)", cursor: "pointer",
              fontFamily: "var(--font-sans)"
            }}>{ui.article.bookmark}</button>
            <button style={{
              height: 36, padding: "0 14px", borderRadius: 9999,
              background: "transparent", border: "1px solid var(--border-strong)",
              fontSize: 13, fontWeight: 500, color: "var(--fg-2)", cursor: "pointer",
              fontFamily: "var(--font-sans)"
            }}>{ui.article.share}</button>
          </div>
        </div>
      </Section>

      {/* Body */}
      <Section pad="32px 32px 64px">
        <div style={{
          maxWidth: 920, margin: "0 auto",
          display: "grid", gridTemplateColumns: hHeadings.length > 0 ? "200px 1fr" : "1fr",
          gap: hHeadings.length > 0 ? 56 : 0
        }}>
          {hHeadings.length > 0 &&
          <aside style={{ alignSelf: "start", position: "sticky", top: 100 }}>
              <div style={{
              fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase",
              color: "var(--fg-4)", marginBottom: 14
            }}>{ui.article.tableOfContents}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {hHeadings.map((h, i) =>
              <li key={i} style={{ fontSize: 13, lineHeight: 1.4, color: "var(--fg-3)" }}>{h.text}</li>
              )}
              </ul>
            </aside>
          }

          <article style={{ maxWidth: 680 }}>
            {showTranslationNotice &&
            <div style={{
              background: "var(--bl-tint-cream)", borderRadius: 12,
              padding: "14px 18px", marginBottom: 32,
              fontSize: 14, lineHeight: 1.5, color: "var(--fg-2)",
              border: "1px solid var(--border)"
            }}>
                {lang === "fr" ?
              "Traduction fran\u00e7aise en cours. Voici la version originale en attendant." :
              "English translation in progress \u2014 here's the original French version for now."}
              </div>
            }
            {body.map((b, i) => {
              if (b.kind === "p") return (
                <p key={i} style={{
                  fontSize: 18, lineHeight: 1.7, color: "var(--fg-2)",
                  margin: "0 0 24px", textWrap: "pretty"
                }}>{b.text}</p>);

              if (b.kind === "h") return (
                <h2 key={i} style={{
                  fontSize: 28, lineHeight: 1.3, fontWeight: 600,
                  margin: "44px 0 16px", letterSpacing: "-0.3px", color: "var(--fg-1)",
                  textWrap: "pretty"
                }}>{b.text}</h2>);

              if (b.kind === "quote") return (
                <blockquote key={i} style={{
                  margin: "40px 0", padding: "0 0 0 32px",
                  borderLeft: "3px solid var(--accent)",
                  fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
                  fontSize: 26, lineHeight: 1.4, color: "var(--fg-1)",
                  letterSpacing: "-0.3px", textWrap: "pretty"
                }}>{b.text}</blockquote>);

              if (b.kind === "ul") return (
                <ul key={i} style={{
                  margin: "0 0 24px", padding: 0, listStyle: "none",
                  display: "flex", flexDirection: "column", gap: 12
                }}>
                  {b.items.map((it, k) =>
                  <li key={k} style={{
                    position: "relative", paddingLeft: 22,
                    fontSize: 17, lineHeight: 1.6, color: "var(--fg-2)", textWrap: "pretty"
                  }}>
                      <span style={{
                      position: "absolute", left: 0, top: 11,
                      width: 6, height: 6, borderRadius: 9999, background: "var(--accent)"
                    }} />
                      {it}
                    </li>
                  )}
                </ul>);

              return null;
            })}
          </article>
        </div>
      </Section>

      {/* Next article + back */}
      {next &&
      <Section pad="32px 32px 64px">
          <div style={{ maxWidth: 920, margin: "0 auto" }}>
            <Kicker color="var(--accent)" style={{ marginBottom: 16 }}>{ui.article.next}</Kicker>
            <PostCard article={next} lang={lang} onOpen={onOpenArticle} ui={ui} />
          </div>
        </Section>
      }
    </>);

}

// ================================================================
// SOLO PAGE
// ================================================================
function SoloPage({ ui, lang, onNavigate }) {
  const TINT_LIST = ["mint", "rose", "cream", "lavender", "sky", "peach"];
  return (
    <>
      <Section pad="56px 32px 32px">
        <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{ui.solo.kicker}</Kicker>
        <h1 className="t-h1" style={{
          margin: "0 0 18px", maxWidth: 820, letterSpacing: "-0.5px", textWrap: "pretty"
        }}>{ui.solo.title}</h1>
        <p className="t-subtitle" style={{ margin: 0, maxWidth: 640, textWrap: "pretty" }}>{ui.solo.sub}</p>
      </Section>

      <Section pad="32px 32px 64px">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {ui.solo.essays.map((e, i) =>
          <a key={i} style={{
            background: TINT[TINT_LIST[i % TINT_LIST.length]],
            borderRadius: 16, padding: "32px 28px",
            textDecoration: "none", cursor: "pointer", display: "block",
            minHeight: 240,
            transition: "transform 220ms var(--ease-out)"
          }}
          onMouseEnter={(ev) => ev.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={(ev) => ev.currentTarget.style.transform = "translateY(0)"}>
              <Kicker color="var(--fg-2)" style={{ marginBottom: 16 }}>{e.kicker}</Kicker>
              <h3 style={{
              fontSize: 24, lineHeight: 1.25, fontWeight: 600,
              margin: "0 0 12px", letterSpacing: "-0.3px", color: "var(--fg-1)",
              textWrap: "pretty"
            }}>{e.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: "var(--fg-2)", margin: 0, textWrap: "pretty" }}>
                {e.dek}
              </p>
            </a>
          )}
        </div>
      </Section>

      <Section pad="0 32px 32px">
        <div style={{
          background: "var(--bg-dark)", color: "#fff", borderRadius: 20,
          padding: "56px 56px", display: "grid",
          gridTemplateColumns: "1.1fr 1fr", gap: 48, alignItems: "center"
        }}>
          <div>
            <Kicker color="var(--bl-tint-yellow-bold)" style={{ marginBottom: 14 }}>
              {lang === "fr" ? "GUIDE GRATUIT" : "FREE GUIDE"}
            </Kicker>
            <h2 style={{
              fontSize: 36, lineHeight: 1.2, fontWeight: 600, letterSpacing: "-0.5px",
              margin: "0 0 12px", color: "#fff", textWrap: "pretty"
            }}>
              {lang === "fr" ?
              "La liste de packing, en PDF \u2014 65L \u00e0 40L." :
              "The packing list, as PDF \u2014 65L to 40L."}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.78)", margin: 0, maxWidth: 440 }}>
              {lang === "fr" ?
              "Tout ce que j'ai gard\u00e9, ce que j'ai jet\u00e9, et pourquoi. Mise \u00e0 jour apr\u00e8s chaque pays." :
              "Everything I kept, what I threw away, and why. Updated after every country."}
            </p>
          </div>
          <div>
            <button style={{
              height: 52, padding: "0 26px", borderRadius: 10,
              background: "#fff", color: "var(--fg-1)", border: "none",
              fontSize: 15, fontWeight: 600, cursor: "pointer", width: "auto"
            }}>{lang === "fr" ? "T\u00e9l\u00e9charger le PDF (3.2 Mo)" : "Download the PDF (3.2 MB)"}</button>
          </div>
        </div>
      </Section>
    </>);

}

// ================================================================
// ABOUT PAGE
// ================================================================
function AboutPage({ ui, lang, onNavigate }) {
  return (
    <>
      <Section pad="56px 32px 64px">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "start"
        }}>
          <div style={{
            position: "sticky", top: 100
          }}>
            <div style={{ overflow: "hidden", borderRadius: 16, marginBottom: 24 }}>
              <PhotoTile which="lina-portrait" aspect="4/5" radius={0} />
            </div>
            <div style={{
              background: "var(--bg-subtle)", borderRadius: 12, padding: "20px 22px"
            }}>
              <Kicker color="var(--fg-3)" style={{ marginBottom: 10 }}>
                {lang === "fr" ? "EN CE MOMENT" : "RIGHT NOW"}
              </Kicker>
              <div style={{ fontSize: 16, fontWeight: 600, color: "var(--fg-1)", marginBottom: 4 }}>
                {lang === "fr" ? "Taipei, Ta\u00efwan" : "Taipei, Taiwan"}
              </div>
              <div style={{ fontSize: 13, color: "var(--fg-3)" }}>
                {lang === "fr" ? "Prochain départ : l'Indonésie, été 2026" : "Next stop: Indonesia, summer 2026"}
              </div>
            </div>
          </div>

          <div>
            <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{ui.about.kicker}</Kicker>
            <h1 style={{
              fontSize: 56, lineHeight: 1.1, fontWeight: 500,
              fontFamily: "var(--font-serif)", fontStyle: "italic",
              margin: "0 0 28px", letterSpacing: "-1px", color: "var(--fg-1)"
            }}>{ui.about.title}</h1>
            <p style={{
              fontSize: 22, lineHeight: 1.5, color: "var(--fg-1)",
              fontWeight: 500, margin: "0 0 28px", textWrap: "pretty",
              letterSpacing: "-0.2px"
            }}>{ui.about.lead}</p>
            {ui.about.body.map((p, i) =>
            <p key={i} style={{
              fontSize: 17, lineHeight: 1.65, color: "var(--fg-2)",
              margin: "0 0 22px", textWrap: "pretty"
            }}>{p}</p>
            )}

            <blockquote style={{
              margin: "44px 0", padding: "0 0 0 28px",
              borderLeft: "3px solid var(--accent)",
              fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 500,
              fontSize: 26, lineHeight: 1.4, color: "var(--fg-1)",
              letterSpacing: "-0.3px", textWrap: "pretty"
            }}>{ui.about.pull}</blockquote>

            <div style={{
              background: "var(--bg-subtle)", borderRadius: 16, padding: "32px 32px",
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 24
            }}>
              {ui.about.stats.map((s, i) =>
              <div key={i}>
                  <div style={{
                  fontSize: 44, lineHeight: 1, fontWeight: 600,
                  color: "var(--fg-1)", letterSpacing: "-1.5px", marginBottom: 8,
                  fontFamily: "var(--font-serif)", fontStyle: "italic"
                }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "var(--fg-3)", lineHeight: 1.4 }}>{s.lbl}</div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 48 }}>
              <Kicker color="var(--accent)" style={{ marginBottom: 12 }}>{ui.about.contactKicker}</Kicker>
              <h2 className="t-h3" style={{ margin: "0 0 12px", letterSpacing: "-0.3px" }}>{ui.about.contactTitle}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: "var(--fg-3)", margin: "0 0 20px", textWrap: "pretty" }}>
                {ui.about.contactBody}
              </p>
              <a href="https://www.instagram.com/created.bylina/" target="_blank" rel="noopener" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                height: 44, padding: "0 18px", borderRadius: 9999,
                background: "var(--fg-1)", color: "#fff", textDecoration: "none",
                fontSize: 14, fontWeight: 500
              }}>@created.bylina <span style={{ opacity: 0.7 }}>↗</span></a>
            </div>
          </div>
        </div>
      </Section>
    </>);

}

// ================================================================
// COLLAB PAGE
// ================================================================
function CollabPage({ ui, lang, onNavigate }) {
  const [form, setForm] = usePageState({ name: "", email: "", type: ui.collab.form.types[0], msg: "" });
  const [done, setDone] = usePageState(false);
  const submit = (e) => {e.preventDefault();if (form.email && form.msg) setDone(true);};

  return (
    <>
      <Section pad="56px 32px 32px">
        <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{ui.collab.kicker}</Kicker>
        <h1 className="t-h1" style={{
          margin: "0 0 18px", maxWidth: 820, letterSpacing: "-0.5px", textWrap: "pretty"
        }}>{ui.collab.title}</h1>
        <p className="t-subtitle" style={{ margin: 0, maxWidth: 640, textWrap: "pretty" }}>{ui.collab.sub}</p>
      </Section>

      {/* Services grid */}
      <Section pad="32px 32px 64px">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {ui.collab.services.map((s, i) =>
          <div key={i} style={{
            background: "#fff", border: "1px solid var(--border)",
            borderRadius: 16, padding: "32px 32px"
          }}>
              <Kicker color="var(--accent)" style={{ marginBottom: 14 }}>{s.tag}</Kicker>
              <h3 style={{
              fontSize: 24, lineHeight: 1.3, fontWeight: 600,
              margin: "0 0 12px", letterSpacing: "-0.3px", color: "var(--fg-1)"
            }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--fg-3)", margin: 0, textWrap: "pretty" }}>
                {s.desc}
              </p>
            </div>
          )}
        </div>
      </Section>

      {/* Media kit numbers */}
      <Section pad="0 32px 64px">
        <div style={{ marginBottom: 28 }}>
          <h2 className="t-h3" style={{ margin: 0, letterSpacing: "-0.3px" }}>{ui.collab.kit.title}</h2>
        </div>
        <div style={{
          background: "var(--bl-tint-cream)", borderRadius: 16, padding: "40px 40px",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24
        }}>
          {ui.collab.kit.items.map((s, i) =>
          <div key={i}>
              <div style={{
              fontSize: 48, lineHeight: 1, fontWeight: 600,
              color: "var(--fg-1)", letterSpacing: "-1.5px", marginBottom: 8,
              fontFamily: "var(--font-serif)", fontStyle: "italic"
            }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "var(--fg-3)", lineHeight: 1.4 }}>{s.lbl}</div>
            </div>
          )}
        </div>
      </Section>

      {/* Form */}
      <Section pad="0 32px 32px">
        <div style={{
          background: "var(--bg-dark)", color: "#fff", borderRadius: 20,
          padding: "56px 56px",
          display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 56, alignItems: "start"
        }}>
          <div>
            <h2 style={{
              fontSize: 36, lineHeight: 1.15, fontWeight: 600,
              margin: "0 0 12px", letterSpacing: "-0.5px", color: "#fff"
            }}>{ui.collab.form.title}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(255,255,255,0.7)", margin: 0, maxWidth: 360, textWrap: "pretty" }}>
              {ui.collab.form.sub}
            </p>
          </div>
          {done ?
          <div style={{
            background: "rgba(255,255,255,0.10)", borderRadius: 12, padding: "32px 32px",
            fontSize: 17, lineHeight: 1.55, color: "#fff"
          }}>{ui.collab.form.thanks}</div> :

          <form onSubmit={submit} style={{ display: "grid", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input placeholder={ui.collab.form.name} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyleDark} />
                <input type="email" placeholder={ui.collab.form.email} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyleDark} />
              </div>
              <select value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={inputStyleDark}>
                {ui.collab.form.types.map((t) => <option key={t} value={t} style={{ color: "#000" }}>{t}</option>)}
              </select>
              <textarea placeholder={ui.collab.form.msgPh} value={form.msg}
            onChange={(e) => setForm({ ...form, msg: e.target.value })}
            rows={5}
            style={{ ...inputStyleDark, padding: "14px 16px", lineHeight: 1.5, resize: "vertical" }} />
              <button type="submit" style={{
              height: 48, borderRadius: 10, background: "var(--accent)",
              color: "#fff", border: "none", fontSize: 14, fontWeight: 600,
              cursor: "pointer", justifySelf: "start", padding: "0 26px"
            }}>{ui.collab.form.submit}</button>
            </form>
          }
        </div>
      </Section>
    </>);

}

const inputStyleDark = {
  height: 48, padding: "0 16px", borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "#fff",
  fontSize: 15, fontFamily: "var(--font-sans)", outline: "none",
  width: "100%"
};

// ----- export to window ----------
Object.assign(window, {
  HomePage, DestinationsPage, ContinentPage, CountryPage,
  ArticlePage, SoloPage, AboutPage, CollabPage,
  PostCard, Section
});