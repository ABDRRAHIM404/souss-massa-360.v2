import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FadeSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [threshold]);
  return scrolled;
}

function useFadeIn(ref: React.RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current as HTMLElement;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
}

function FadeSection({ children, delay = 0, className = "" }: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref, delay);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,252,248,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(231,111,81,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, #E76F51, #C05C39)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "white", fontWeight: 800, boxShadow: "0 4px 12px rgba(231,111,81,0.35)" }}>ⵣ</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Souss Massa <span style={{ color: "#E76F51" }}>360</span>
            </div>
            <div style={{ fontSize: 10, color: "#9a8a7a", letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 1 }}>Southern Morocco</div>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }} className="hide-mobile">
          {[["Social Souk", "#souk"], ["Safety Net", "#safety"], ["Adventures", "#adventures"], ["Amazigh Stays", "#stays"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 14, fontWeight: 500, color: "#4a3f35", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#E76F51")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4a3f35")}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="hide-mobile">
          <button style={{ fontSize: 14, fontWeight: 500, color: "#4a3f35", background: "none", border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 50 }}>Log in</button>
          <button style={{ fontSize: 14, fontWeight: 600, color: "white", background: "linear-gradient(135deg, #E76F51, #C05C39)", border: "none", cursor: "pointer", padding: "10px 22px", borderRadius: 50, boxShadow: "0 4px 14px rgba(231,111,81,0.4)", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
            Sign up free
          </button>
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }} className="show-mobile">
          <div style={{ width: 22, display: "flex", flexDirection: "column", gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", height: 2, background: "#4a3f35", borderRadius: 2, transition: "all 0.3s",
                transform: open && i === 0 ? "rotate(45deg) translateY(7px)" : open && i === 2 ? "rotate(-45deg) translateY(-7px)" : "",
                opacity: open && i === 1 ? 0 : 1 }} />
            ))}
          </div>
        </button>
      </div>

      <div style={{ maxHeight: open ? 320 : 0, overflow: "hidden", transition: "max-height 0.3s ease", background: "rgba(255,252,248,0.98)" }}>
        <div style={{ padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 16, borderTop: "1px solid #f0e8e0" }}>
          {[["Social Souk", "#souk"], ["Safety Net", "#safety"], ["Adventures", "#adventures"], ["Amazigh Stays", "#stays"]].map(([label, href]) => (
            <a key={label} href={href} style={{ fontSize: 15, fontWeight: 500, color: "#4a3f35", textDecoration: "none" }} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button style={{ flex: 1, padding: "10px", borderRadius: 50, border: "1px solid #e0d5cb", background: "none", fontSize: 14, fontWeight: 500, color: "#4a3f35", cursor: "pointer" }}>Log in</button>
            <button style={{ flex: 1, padding: "10px", borderRadius: 50, background: "#E76F51", border: "none", fontSize: 14, fontWeight: 600, color: "white", cursor: "pointer" }}>Sign up</button>
          </div>
        </div>
      </div>

      <style>{`
        .hide-mobile { display: flex !important; }
        .show-mobile { display: none !important; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [where, setWhere] = useState("");
  const [pillar, setPillar] = useState("");

  return (
    <section style={{ minHeight: "100vh", background: "#FFFCF8", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,111,81,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0%", left: "-8%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,157,143,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #E76F51 0%, #E9C46A 50%, #2A9D8F 100%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 24px 80px", width: "100%" }}>
        <FadeSection>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 50, background: "#FFF3EE", border: "1px solid rgba(231,111,81,0.25)", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E76F51", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#C05C39", letterSpacing: "0.02em" }}>The Digital Gateway to Authentic Morocco</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 6vw, 76px)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.04em", color: "#1a1008", marginBottom: 24, fontFamily: "'Playfair Display', Georgia, serif", maxWidth: 820 }}>
            Experience Morocco<br /><span style={{ color: "#E76F51" }}>Beyond the Resort.</span>
          </h1>

          <p style={{ fontSize: "clamp(16px, 2vw, 20px)", color: "#6b5a4e", lineHeight: 1.65, marginBottom: 40, maxWidth: 580, fontWeight: 400 }}>
            Your conscious travel companion for Souss-Massa. Shop from Berber cooperatives, navigate like a local, discover hidden festivals, and sleep in authentic Amazigh homes.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", background: "white", borderRadius: 20, boxShadow: "0 12px 48px rgba(0,0,0,0.10), 0 2px 8px rgba(231,111,81,0.08)", border: "1px solid rgba(231,111,81,0.12)", overflow: "hidden", maxWidth: 720, marginBottom: 48 }}>
            <div style={{ flex: "1 1 200px", padding: "18px 24px", borderRight: "1px solid #f0e8e0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C05C39", marginBottom: 6 }}>Destination</div>
              <input value={where} onChange={e => setWhere(e.target.value)} placeholder="Agadir, Taghazout, Taroudant…"
                style={{ fontSize: 14, fontWeight: 500, color: "#1a1008", border: "none", outline: "none", background: "transparent", width: "100%" }} />
            </div>
            <div style={{ flex: "1 1 160px", padding: "18px 24px", borderRight: "1px solid #f0e8e0" }}>
              <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#C05C39", marginBottom: 6 }}>Experience</div>
              <select value={pillar} onChange={e => setPillar(e.target.value)}
                style={{ fontSize: 14, fontWeight: 500, color: pillar ? "#1a1008" : "#b0a090", border: "none", outline: "none", background: "transparent", width: "100%", cursor: "pointer" }}>
                <option value="">All pillars</option>
                <option value="souk">Social Souk</option>
                <option value="safety">Safety Net</option>
                <option value="adventures">Adventures</option>
                <option value="stays">Amazigh Stays</option>
              </select>
            </div>
            <div style={{ padding: "12px", display: "flex", alignItems: "center" }}>
              <button style={{ padding: "14px 28px", borderRadius: 14, background: "linear-gradient(135deg, #E76F51, #C05C39)", border: "none", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 16px rgba(231,111,81,0.45)", transition: "all 0.2s", whiteSpace: "nowrap" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}>
                Explore →
              </button>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 48px" }}>
            {[{ v: "4 Pillars", l: "of conscious travel" }, { v: "48+", l: "Berber villages" }, { v: "100%", l: "Direct to families" }, { v: "Zero", l: "Tourist-tax anxiety" }].map(s => (
              <div key={s.l}>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1008", letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}>{s.v}</div>
                <div style={{ fontSize: 13, color: "#9a8a7a", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 11, color: "#b0a090", letterSpacing: "0.1em", textTransform: "uppercase" }}>Discover</span>
        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #E76F51, transparent)" }} />
      </div>
    </section>
  );
}

// ─── Pillars Overview ─────────────────────────────────────────────────────────
function Pillars() {
  const pillars = [
    { id: "souk", icon: "🛒", number: "1", title: "The Social Souk", subtitle: "Buy direct from rural cooperatives at fixed fair-trade prices. No haggling, no tourist markup.", color: "#E76F51", tint: "#FFF3EE", items: ["Live profiles for cooperatives & artisans", "Fixed fair-trade pricing — zero haggling", "Photo-review system by real travellers", "100% proceeds go directly to producers"], cta: "Explore the Souk" },
    { id: "safety", icon: "🛡️", number: "2", title: "The Safety Net", subtitle: "Navigate like a local. Know exactly what to pay for Grand Taxis, InDrive, and buses.", color: "#2A9D8F", tint: "#E8F7F5", items: ["Transport calculator — real-time price estimates", "Visual vehicle guide to spot the right taxi", "GPS markers for Grand Taxi hubs", "Phrase cards in Darija & Tamazight"], cta: "Plan transport" },
    { id: "adventures", icon: "🏄", number: "3", title: "Live Adventures", subtitle: "Real-time surf reports, hidden festival alerts, and direct booking with local guides.", color: "#E9A020", tint: "#FDF8E8", items: ["Live swell & tide for Taghazout to Imsouane", "Moussem calendar — not on Google", "Weekly village souk alerts", "Direct contact with guides at verified rates"], cta: "See what's on" },
    { id: "stays", icon: "🏠", number: "4", title: "The Amazigh Stay", subtitle: "Budget-friendly Berber auberges. Host stories, home-cooked tagines, real hospitality.", color: "#6B48A0", tint: "#F2EDFA", items: ["Exclusively family-run guesthouses", "Host story front and centre", "Meals included: tagine, tafarnout, Berber tea", "100% of fee goes to the family"], cta: "Find a stay" },
  ];

  return (
    <section style={{ padding: "100px 0", background: "#FFFCF8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#E76F51", marginBottom: 12 }}>Four Pillars · One Mission</div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Everything a Conscious Traveller Needs
            </h2>
            <p style={{ fontSize: 17, color: "#7a6a5e", maxWidth: 540, margin: "0 auto", lineHeight: 1.6 }}>
              We replace the resort bubble with four interlocking tools for deep, fair, and stress-free cultural immersion.
            </p>
          </div>
        </FadeSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: 24 }}>
          {pillars.map((p, idx) => (
            <FadeSection key={p.id} delay={idx * 90}>
              <div style={{ background: "white", borderRadius: 24, padding: "36px 32px", border: `1px solid ${p.tint}`, position: "relative", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", transition: "all 0.3s ease", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 56px rgba(0,0,0,0.10), 0 0 0 2px ${p.color}25`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)"; }}>
                <div style={{ position: "absolute", top: -10, right: 20, fontSize: 100, fontWeight: 900, color: p.tint, lineHeight: 1, pointerEvents: "none", fontFamily: "'Playfair Display', Georgia, serif", userSelect: "none" }}>{p.number}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: p.tint, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 18 }}>{p.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: p.color, marginBottom: 8 }}>Pillar {p.number}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1a1008", marginBottom: 8, letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.2 }}>{p.title}</h3>
                <p style={{ fontSize: 13.5, color: "#7a6a5e", lineHeight: 1.6, marginBottom: 22 }}>{p.subtitle}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px", display: "flex", flexDirection: "column", gap: 9 }}>
                  {p.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#4a3f35", lineHeight: 1.5 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: p.tint, border: `1.5px solid ${p.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke={p.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <button style={{ padding: "10px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: "pointer", background: p.tint, border: `1.5px solid ${p.color}40`, color: p.color, transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = p.tint; e.currentTarget.style.color = p.color; }}>
                  {p.cta} →
                </button>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Souk Preview ──────────────────────────────────────────────────────
function SoukPreview() {
  const products = [
    { name: "Argan Oil — Cold Pressed", coop: "Coopérative Tifaout, Taroudant", price: "85 MAD", img: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80", tag: "Fair Trade ✓" },
    { name: "Handwoven Berber Carpet", coop: "Women's Coop Tafraout", price: "420 MAD", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80", tag: "Artisan Made ✓" },
    { name: "Saffron — Taliouine Reserve", coop: "Taliouine Saffron Guild", price: "120 MAD /g", img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80", tag: "Origin Verified ✓" },
    { name: "Argan Amlou Spread", coop: "Imi n'Tlit Cooperative", price: "65 MAD", img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80", tag: "No Middlemen ✓" },
  ];

  return (
    <section id="souk" style={{ padding: "100px 0", background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 48 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "#FFF3EE", border: "1px solid rgba(231,111,81,0.2)", marginBottom: 14 }}>
                <span style={{ fontSize: 13 }}>🛒</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#E76F51", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pillar 1 — Social Souk</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 10, fontFamily: "'Playfair Display', Georgia, serif" }}>Buy Direct. Pay Fair. Impact Real.</h2>
              <p style={{ fontSize: 15, color: "#7a6a5e", maxWidth: 480, lineHeight: 1.6 }}>Every product is listed by the cooperative that made it, at a fixed transparent price. No haggling, no tourist markup — ever.</p>
            </div>
            <button style={{ padding: "12px 24px", borderRadius: 50, background: "#FFF3EE", border: "1.5px solid rgba(231,111,81,0.3)", color: "#E76F51", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>Browse all products →</button>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
          {products.map((p, i) => (
            <FadeSection key={p.name} delay={i * 80}>
              <div style={{ background: "#FFFCF8", borderRadius: 20, overflow: "hidden", border: "1px solid #f0e8e0", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#2A9D8F", marginBottom: 6 }}>{p.tag}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1008", marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#9a8a7a", marginBottom: 14 }}>{p.coop}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#E76F51" }}>{p.price}</span>
                    <button style={{ padding: "7px 16px", borderRadius: 50, background: "#E76F51", border: "none", color: "white", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Buy direct</button>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Safety Net ───────────────────────────────────────────────────────────────
function SafetyNet() {
  const routes = [
    { from: "Agadir Inezgane Hub", to: "Taghazout", taxi: "15 MAD/seat", indrive: "~40 MAD", bus: "8 MAD", time: "30 min" },
    { from: "Agadir Inezgane Hub", to: "Tiznit", taxi: "25 MAD/seat", indrive: "~70 MAD", bus: "15 MAD", time: "1h 10min" },
    { from: "Agadir City", to: "Taroudant", taxi: "35 MAD/seat", indrive: "~90 MAD", bus: "20 MAD", time: "1h 30min" },
  ];

  return (
    <section id="safety" style={{ padding: "100px 0", background: "#F5FBF9" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 56, alignItems: "center" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "#E8F7F5", border: "1px solid rgba(42,157,143,0.2)", marginBottom: 14 }}>
                <span style={{ fontSize: 13 }}>🛡️</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#2A9D8F", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pillar 2 — Safety Net</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif" }}>
                Navigate Like a Local.<br />Pay What Locals Pay.
              </h2>
              <p style={{ fontSize: 15, color: "#7a6a5e", lineHeight: 1.65, marginBottom: 28 }}>
                Our Transport Calculator gives you real-time price estimates for every route in Souss-Massa. Know before you go — no more tourist-tax anxiety.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ icon: "🚕", text: "Visual guide to identify the right taxi type" }, { icon: "📍", text: "GPS markers for Grand Taxi hubs by direction" }, { icon: "💬", text: "Phrase cards in Darija & Tamazight" }].map(f => (
                  <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#4a3f35" }}>
                    <span style={{ width: 36, height: 36, borderRadius: 10, background: "white", border: "1px solid #c5e8e4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                    {f.text}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: "1 1 340px" }}>
              <div style={{ background: "white", borderRadius: 24, padding: "28px", boxShadow: "0 8px 40px rgba(42,157,143,0.12)", border: "1px solid rgba(42,157,143,0.15)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1008", marginBottom: 4 }}>🧮 Transport Calculator</div>
                <div style={{ fontSize: 12, color: "#9a8a7a", marginBottom: 20 }}>Real prices · No surprises</div>
                {routes.map((r, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: i < routes.length - 1 ? "1px solid #f0e8e0" : "none" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1008", marginBottom: 4 }}>{r.from} → {r.to}</div>
                    <div style={{ fontSize: 11, color: "#9a8a7a", marginBottom: 8 }}>⏱ {r.time}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[{ label: "Grand Taxi", val: r.taxi, color: "#E76F51" }, { label: "InDrive", val: r.indrive, color: "#2A9D8F" }, { label: "Bus", val: r.bus, color: "#E9A020" }].map(t => (
                        <div key={t.label} style={{ padding: "4px 10px", borderRadius: 20, background: `${t.color}15`, border: `1px solid ${t.color}30` }}>
                          <span style={{ fontSize: 10, color: t.color, fontWeight: 600 }}>{t.label}: </span>
                          <span style={{ fontSize: 11, color: "#1a1008", fontWeight: 700 }}>{t.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Adventures ───────────────────────────────────────────────────────────────
function Adventures() {
  const events = [
    { icon: "🌸", title: "Almond Blossom Festival", loc: "Tafraout", date: "Feb 15–17", type: "Moussem", color: "#E76F51" },
    { icon: "🏄", title: "Surf Swell Alert", loc: "Taghazout — Anchor Point", date: "Today · 4–6ft", type: "Live Surf", color: "#2A9D8F" },
    { icon: "🍯", title: "Honey Souk — Imouzzer", loc: "Imouzzer Ida Outanane", date: "Every Sunday", type: "Village Souk", color: "#E9A020" },
    { icon: "🌵", title: "Camel Trek — Massa Dunes", loc: "Souss Massa", date: "Daily · 6am", type: "Activity", color: "#6B48A0" },
    { icon: "🌾", title: "Saffron Harvest Festival", loc: "Taliouine", date: "Nov 1–3", type: "Moussem", color: "#E76F51" },
    { icon: "🚵", title: "ATV Anti-Atlas Tour", loc: "Taroudant Foothills", date: "Book 24h ahead", type: "Activity", color: "#2A9D8F" },
  ];

  return (
    <section id="adventures" style={{ padding: "100px 0", background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "#FDF8E8", border: "1px solid rgba(233,160,32,0.25)", marginBottom: 14 }}>
              <span style={{ fontSize: 13 }}>🏄</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#E9A020", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pillar 3 — Live Adventures</span>
            </div>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>
              Hidden Events. Live Conditions.<br />Real Local Guides.
            </h2>
            <p style={{ fontSize: 15, color: "#7a6a5e", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
              Festivals, village souks, and surf reports that never appear on Google — delivered in real time.
            </p>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 18 }}>
          {events.map((e, i) => (
            <FadeSection key={e.title} delay={i * 70}>
              <div style={{ background: "#FFFCF8", borderRadius: 18, padding: "22px", border: "1px solid #f0e8e0", transition: "all 0.25s", cursor: "pointer" }}
                onMouseEnter={el => { el.currentTarget.style.boxShadow = `0 8px 32px ${e.color}20`; el.currentTarget.style.borderColor = `${e.color}40`; el.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={el => { el.currentTarget.style.boxShadow = "none"; el.currentTarget.style.borderColor = "#f0e8e0"; el.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 28 }}>{e.icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "3px 10px", borderRadius: 20, background: `${e.color}15`, color: e.color }}>{e.type}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1a1008", marginBottom: 5, lineHeight: 1.3 }}>{e.title}</div>
                <div style={{ fontSize: 12, color: "#9a8a7a", marginBottom: 4 }}>📍 {e.loc}</div>
                <div style={{ fontSize: 12, color: e.color, fontWeight: 600 }}>📅 {e.date}</div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Amazigh Stays ────────────────────────────────────────────────────────────
function Stays() {
  const stays = [
    { name: "Riad Itto — Tiznit Medina", host: "Fatima & Hassan", story: "Third-generation family home. Fatima's grandmother built this riad in 1962. The tagine recipe is older.", img: "https://images.unsplash.com/photo-1539020140153-e479b8e278f8?w=600&q=80", price: 290, meal: true, loc: "Tiznit" },
    { name: "Tafraout Mountain Refuge", host: "Mohamed Aït Baha", story: "A shepherd's home converted with love. Wakes up to painted Anti-Atlas rock views every morning.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", price: 210, meal: true, loc: "Tafraout" },
    { name: "Taghazout Surf Auberge", host: "Youssef El Baz", story: "Born here, surfed here all his life. The most trusted local surf guide on the Atlantic coast.", img: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=600&q=80", price: 340, meal: false, loc: "Taghazout" },
  ];

  return (
    <section id="stays" style={{ padding: "100px 0", background: "#F8F4FF" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 48 }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 50, background: "#F2EDFA", border: "1px solid rgba(107,72,160,0.2)", marginBottom: 14 }}>
                <span style={{ fontSize: 13 }}>🏠</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#6B48A0", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pillar 4 — Amazigh Stays</span>
              </div>
              <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 10, fontFamily: "'Playfair Display', Georgia, serif" }}>Sleep in a Story, Not a Hotel.</h2>
              <p style={{ fontSize: 15, color: "#7a6a5e", maxWidth: 480, lineHeight: 1.6 }}>Every dirham of your booking goes directly to the family. No chains, no hidden commissions beyond our transparent 12%.</p>
            </div>
            <button style={{ padding: "12px 24px", borderRadius: 50, background: "#F2EDFA", border: "1.5px solid rgba(107,72,160,0.3)", color: "#6B48A0", fontWeight: 600, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>See all auberges →</button>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {stays.map((s, i) => (
            <FadeSection key={s.name} delay={i * 100}>
              <div style={{ background: "white", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(107,72,160,0.1)", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(107,72,160,0.14)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ aspectRatio: "16/10", overflow: "hidden", position: "relative" }}>
                  <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
                  {s.meal && <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.92)", fontSize: 11, fontWeight: 700, color: "#6B48A0" }}>🍽 Meals included</div>}
                </div>
                <div style={{ padding: "22px" }}>
                  <div style={{ fontSize: 11, color: "#9a8a7a", marginBottom: 6 }}>📍 {s.loc}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1008", marginBottom: 8, lineHeight: 1.25, fontFamily: "'Playfair Display', Georgia, serif" }}>{s.name}</div>
                  <div style={{ fontSize: 13, color: "#7a6a5e", lineHeight: 1.55, marginBottom: 16, fontStyle: "italic" }}>"{s.story}"</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid #f0e0ff" }}>
                    <div>
                      <span style={{ fontSize: 20, fontWeight: 800, color: "#6B48A0" }}>{s.price} MAD</span>
                      <span style={{ fontSize: 12, color: "#9a8a7a", marginLeft: 4 }}>/night</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg, #6B48A0, #9B78D0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white" }}>{s.host[0]}</div>
                      <span style={{ fontSize: 12, color: "#4a3f35", fontWeight: 500 }}>{s.host}</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const testimonials = [
    { name: "Sarah Lefebvre", country: "🇫🇷 France", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", quote: "The transport calculator alone saved me from being overcharged three times. I finally felt like I was travelling Morocco on my own terms, not as a tourist target.", pillar: "Safety Net" },
    { name: "Marco Bernardi", country: "🇮🇹 Italy", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", quote: "I found a saffron souk through the moussem calendar that wasn't in any guidebook. The experience was priceless — and I bought directly from the farmers.", pillar: "Live Adventures" },
    { name: "Aisha Al Mansoori", country: "🇦🇪 UAE", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", quote: "Staying with Fatima's family in Tiznit felt like being adopted for a week. The home-cooked tagine, the henna evening, the rooftop sunrise — real Morocco.", pillar: "Amazigh Stay" },
  ];

  return (
    <section style={{ padding: "100px 0", background: "white" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <FadeSection>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 800, color: "#1a1008", letterSpacing: "-0.04em", marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>Conscious Travellers, Real Stories</h2>
            <p style={{ fontSize: 15, color: "#7a6a5e" }}>From guests who experienced Morocco beyond the resort bubble</p>
          </div>
        </FadeSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {testimonials.map((t, i) => (
            <FadeSection key={t.name} delay={i * 100}>
              <div style={{ background: "#FFFCF8", borderRadius: 22, padding: "30px", border: "1px solid #f0e8e0", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.25s", boxSizing: "border-box" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ display: "flex", gap: 1, marginBottom: 16 }}>{"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#E9A020", fontSize: 15 }}>{s}</span>)}</div>
                <div style={{ display: "inline-block", padding: "3px 10px", borderRadius: 20, background: "#FFF3EE", fontSize: 11, fontWeight: 600, color: "#E76F51", marginBottom: 14, width: "fit-content" }}>via {t.pillar}</div>
                <p style={{ fontSize: 14, color: "#4a3f35", lineHeight: 1.65, flex: 1, marginBottom: 24, fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img src={t.photo} alt={t.name} style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover", border: "2px solid #f0e8e0" }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1a1008" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "#9a8a7a" }}>{t.country}</div>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section style={{ padding: "100px 0", background: "#1a1008", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(231,111,81,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(42,157,143,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
        <FadeSection>
          <div style={{ fontSize: 36, marginBottom: 16 }}>ⵣ</div>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 44px)", fontWeight: 800, color: "white", letterSpacing: "-0.04em", marginBottom: 16, fontFamily: "'Playfair Display', Georgia, serif" }}>Get 10% Off Your First Stay</h2>
          <p style={{ fontSize: 16, color: "#b0a090", lineHeight: 1.6, marginBottom: 36 }}>Subscribe for Berber culture guides, hidden festival alerts, and exclusive offers from Souss-Massa cooperatives.</p>
          {done ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "18px 28px", borderRadius: 16, background: "rgba(42,157,143,0.15)", border: "1px solid rgba(42,157,143,0.3)", color: "#2A9D8F" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              <span style={{ fontWeight: 600, fontSize: 15 }}>You're in! Check your inbox for your 10% code. 🎉</span>
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === "Enter" && email && setDone(true)}
                style={{ flex: "1 1 220px", padding: "15px 22px", borderRadius: 50, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.07)", color: "white", fontSize: 14, outline: "none" }} />
              <button onClick={() => email && setDone(true)} style={{ padding: "15px 28px", borderRadius: 50, background: "linear-gradient(135deg, #E76F51, #C05C39)", border: "none", color: "white", fontWeight: 700, fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe →</button>
            </div>
          )}
          <p style={{ fontSize: 12, color: "#6b5a4e", marginTop: 16 }}>No spam. Unsubscribe anytime.</p>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#FFFCF8", borderTop: "1px solid #f0e8e0", padding: "56px 0 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 36, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #E76F51, #C05C39)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "white", fontWeight: 800 }}>ⵣ</div>
              <span style={{ fontSize: 15, fontWeight: 800, color: "#1a1008", fontFamily: "'Playfair Display', Georgia, serif" }}>Souss Massa <span style={{ color: "#E76F51" }}>360</span></span>
            </div>
            <p style={{ fontSize: 13, color: "#9a8a7a", lineHeight: 1.6, marginBottom: 18 }}>The digital gateway to authentic Morocco — for the conscious traveller.</p>
            <div style={{ display: "flex", gap: 8 }}>
              {["Ig", "𝕏", "Fb", "Yt"].map(s => (
                <a key={s} href="#" style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #e8ddd5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#9a8a7a", textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#E76F51"; e.currentTarget.style.color = "#E76F51"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#e8ddd5"; e.currentTarget.style.color = "#9a8a7a"; }}>{s}</a>
              ))}
            </div>
          </div>
          {[
            { title: "Explore", links: ["Social Souk", "Safety Net", "Adventures", "Amazigh Stays"] },
            { title: "Support", links: ["Help Centre", "Safety Info", "Cancellation Policy", "Contact us"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Settings"] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a1008", marginBottom: 16 }}>{col.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontSize: 13, color: "#9a8a7a", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.color = "#E76F51"; }}
                    onMouseLeave={e => { e.currentTarget.style.color = "#9a8a7a"; }}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ paddingTop: 20, borderTop: "1px solid #f0e8e0", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#b0a090" }}>© 2025 Souss Massa 360 · Made with ♡ in Agadir, Morocco 🇲🇦</p>
          <p style={{ fontSize: 12, color: "#b0a090" }}>ⵣ Proudly Amazigh · Celebrating Berber Heritage</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&display=swap";
    document.head.appendChild(link);
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1a1008", background: "#FFFCF8" }}>
      <Navbar />
      <Hero />
      <Pillars />
      <SoukPreview />
      <SafetyNet />
      <Adventures />
      <Stays />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}