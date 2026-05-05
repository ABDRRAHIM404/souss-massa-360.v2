import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Stays", "Experiences", "Guides", "Marketplace"];

const CATEGORIES = [
  { icon: "🏖️", label: "Beachfront", count: 24 },
  { icon: "⛰️", label: "Mountains", count: 18 },
  { icon: "🏄", label: "Surf Camps", count: 11 },
  { icon: "🌿", label: "Argan Tours", count: 9 },
  { icon: "🏡", label: "Family Stays", count: 31 },
  { icon: "🌵", label: "Desert Edge", count: 15 },
];

const HOMESTAYS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1539020140153-e479b8e278f8?w=800&q=80",
    title: "Riad Itto — Berber Family Home",
    location: "Tiznit, Souss Valley",
    price: 290,
    rating: 4.97,
    reviews: 143,
    host: "Fatima & Hassan",
    badge: "Guest Favourite",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1582610116397-edb72e62f820?w=800&q=80",
    title: "Tafraout Mountain Refuge",
    location: "Anti-Atlas, Tafraout",
    price: 210,
    rating: 4.92,
    reviews: 87,
    host: "Mohamed Aït Baha",
    badge: null,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800&q=80",
    title: "Surf & Soul — Agadir Coast",
    location: "Taghazout, Agadir",
    price: 340,
    rating: 4.88,
    reviews: 211,
    host: "Youssef El Baz",
    badge: "Top Rated",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    title: "Argan Grove Farmhouse",
    location: "Taroudant, Souss",
    price: 185,
    rating: 4.95,
    reviews: 64,
    host: "Khadija Amazigh",
    badge: null,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&q=80",
    title: "Sidi Ifni Atlantic Guesthouse",
    location: "Sidi Ifni, Guelmim-Oued Noun",
    price: 220,
    rating: 4.91,
    reviews: 99,
    host: "Omar & Zineb",
    badge: null,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1554102645-3c5f9e3f3c91?w=800&q=80",
    title: "Erg Chegaga Desert Camp",
    location: "Massa Dunes, Souss Massa",
    price: 450,
    rating: 5.0,
    reviews: 42,
    host: "Brahim N'Hadi",
    badge: "Rare Find",
  },
];

const STEPS = [
  {
    num: "01",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Choose your homestay",
    desc: "Browse curated Berber family homes across Souss Massa. Filter by region, price, and vibe — mountains, coast, or desert.",
  },
  {
    num: "02",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: "Book directly",
    desc: "Pay securely with no hidden fees. Every dirham goes to the host family — we take a transparent 12% platform fee.",
  },
  {
    num: "03",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Stay with locals",
    desc: "Share mint tea, learn to bake msemen, and hear stories under the stars. This is Morocco as it was meant to be experienced.",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Lefebvre",
    country: "France",
    flag: "🇫🇷",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    quote:
      "Staying with Fatima's family in Tiznit was the highlight of our entire Morocco trip. The couscous on Friday, the henna evening, the rooftop sunrise — I still think about it every day.",
    rating: 5,
  },
  {
    name: "Marco Bernardi",
    country: "Italy",
    flag: "🇮🇹",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    quote:
      "Souss Massa 360 made it incredibly easy to find an authentic experience. No tourist traps, no overpriced hotels. Just a real family, real food, and the most beautiful Anti-Atlas views.",
    rating: 5,
  },
  {
    name: "Aisha Al Mansoori",
    country: "UAE",
    flag: "🇦🇪",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    quote:
      "As a solo traveller, I was nervous — but the host family treated me like their own daughter. The platform is safe, transparent, and genuinely supports local communities.",
    rating: 5,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-sm leading-none">
      {"★".repeat(Math.round(count))}
    </span>
  );
}

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useFadeIn(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);
}

// ─── Components ──────────────────────────────────────────────────────────────

function FadeSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────

function Navbar() {
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #e9ecef" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span
            className="text-2xl font-bold transition-colors duration-200"
            style={{ color: "#E76F51", fontFamily: "'Tifinagh', serif" }}
          >
            ⵣ
          </span>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "#212529", letterSpacing: "-0.03em" }}
          >
            Souss Massa<span style={{ color: "#E76F51" }}>360</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
              style={{ color: "#212529" }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:bg-gray-100"
            style={{ color: "#212529" }}
          >
            Log in
          </button>
          <button
            className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95"
            style={{ background: "#E76F51" }}
          >
            Sign up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className="block h-0.5 bg-gray-700 transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(45deg) translateY(7px)" : "" }}
            />
            <span
              className="block h-0.5 bg-gray-700 transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <span
              className="block h-0.5 bg-gray-700 transition-all duration-300 origin-center"
              style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-7px)" : "" }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: mobileOpen ? "320px" : "0",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="px-6 pt-2 pb-6 flex flex-col gap-4 border-t border-gray-100">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-sm font-medium text-gray-700">
              {l}
            </a>
          ))}
          <div className="flex gap-3 mt-2">
            <button className="flex-1 text-sm font-medium py-2 rounded-full border border-gray-200 text-gray-700">
              Log in
            </button>
            <button
              className="flex-1 text-sm font-semibold py-2 rounded-full text-white"
              style={{ background: "#E76F51" }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#F8F9FA" }}
    >
      {/* Subtle decorative shapes */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.07] pointer-events-none"
        style={{ background: "#E76F51" }}
      />
      <div
        className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: "#2A9D8F" }}
      />
      {/* Tifinagh pattern strip */}
      <div
        className="absolute top-0 inset-x-0 h-1"
        style={{ background: "linear-gradient(90deg, #E76F51, #E9C46A, #2A9D8F)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <FadeSection>
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 border"
              style={{ background: "#FFF3EE", borderColor: "#F4C3A8", color: "#C05C39" }}>
              <span className="w-2 h-2 rounded-full bg-current inline-block animate-pulse" />
              Now open for Summer 2025 bookings
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.06] mb-6"
              style={{
                color: "#212529",
                letterSpacing: "-0.04em",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Stay with Berber Families in{" "}
              <span style={{ color: "#E76F51" }}>Southern Morocco</span>
            </h1>

            <p
              className="text-xl sm:text-2xl mb-10 leading-relaxed"
              style={{ color: "#6c757d", fontWeight: 400 }}
            >
              Not hotels. Not hostels.{" "}
              <span style={{ color: "#212529", fontWeight: 500 }}>Real homes. Real people. Real Morocco.</span>
            </p>

            {/* Search bar */}
            <SearchBar />
          </div>
        </FadeSection>

        {/* Trust stats */}
        <FadeSection delay={150}>
          <div className="flex flex-wrap gap-8 mt-14">
            {[
              { value: "2,400+", label: "Verified homestays" },
              { value: "48", label: "Villages covered" },
              { value: "4.96", label: "Average rating" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-2xl font-bold"
                  style={{ color: "#212529", letterSpacing: "-0.03em" }}
                >
                  {s.value}
                </div>
                <div className="text-sm mt-0.5" style={{ color: "#6c757d" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

function SearchBar() {
  const [where, setWhere] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div
      className="flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl sm:rounded-full bg-white shadow-lg border border-gray-100 overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
    >
      {/* Where */}
      <div className="flex-1 flex flex-col px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Where to?
        </span>
        <input
          className="text-sm font-medium text-gray-800 outline-none bg-transparent placeholder-gray-300"
          placeholder="Agadir, Taghazout, Tiznit…"
          value={where}
          onChange={(e) => setWhere(e.target.value)}
        />
      </div>
      {/* Dates */}
      <div className="flex-1 flex flex-col px-6 py-4 border-b sm:border-b-0 sm:border-r border-gray-100">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Dates
        </span>
        <input
          type="text"
          className="text-sm font-medium text-gray-800 outline-none bg-transparent placeholder-gray-300"
          placeholder="Add dates"
          value={dates}
          onChange={(e) => setDates(e.target.value)}
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
        />
      </div>
      {/* Guests */}
      <div className="flex-1 flex flex-col px-6 py-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Guests
        </span>
        <select
          className="text-sm font-medium text-gray-800 outline-none bg-transparent"
          style={{ color: guests ? "#212529" : "#adb5bd" }}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        >
          <option value="">Add guests</option>
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
          <option value="5">5+ guests</option>
        </select>
      </div>
      {/* Search button */}
      <div className="px-3 py-3 flex items-center justify-center">
        <button
          className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.03] active:scale-95 whitespace-nowrap"
          style={{ background: "#E76F51" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Explore stays
        </button>
      </div>
    </div>
  );
}

// ── Categories ────────────────────────────────────────────────────────────────

function Categories() {
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref);

  return (
    <section className="py-20 bg-white" id="stays">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.65s ease, transform 0.65s ease" }}
      >
        <h2
          className="text-2xl font-bold mb-2"
          style={{ color: "#212529", letterSpacing: "-0.03em" }}
        >
          Explore by type
        </h2>
        <p className="text-sm mb-8" style={{ color: "#6c757d" }}>
          Every landscape, every rhythm of life in southern Morocco
        </p>

        {/* Scrollable row */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => setActive(i === active ? null : i)}
              className="flex flex-col items-center gap-3 px-6 py-5 rounded-2xl border transition-all duration-200 min-w-[130px] snap-start shrink-0"
              style={{
                background: active === i ? "#FFF3EE" : "#F8F9FA",
                borderColor: active === i ? "#E76F51" : "#e9ecef",
                color: active === i ? "#E76F51" : "#495057",
                transform: active === i ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div className="text-center">
                <div className="text-sm font-semibold">{cat.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "#adb5bd" }}>
                  {cat.count} stays
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Featured Homestays ────────────────────────────────────────────────────────

function HomestayCard({ stay, delay = 0 }: { stay: typeof HOMESTAYS[0]; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref);

  return (
    <div
      ref={ref}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms, box-shadow 0.25s ease, translate 0.25s ease`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={stay.image}
          alt={stay.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {stay.badge && (
          <div
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: "white", color: "#212529" }}
          >
            {stay.badge}
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:scale-110">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#212529" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-sm font-semibold leading-snug" style={{ color: "#212529" }}>
            {stay.title}
          </h3>
        </div>
        <p className="text-xs mb-3" style={{ color: "#adb5bd" }}>
          {stay.location}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-base font-bold" style={{ color: "#212529" }}>
              {stay.price} MAD
            </span>
            <span className="text-xs ml-1" style={{ color: "#adb5bd" }}>
              /night
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Stars count={stay.rating} />
            <span className="text-xs font-medium" style={{ color: "#495057" }}>
              {stay.rating} ({stay.reviews})
            </span>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
            style={{ background: "#2A9D8F" }}
          >
            {stay.host.split(" ")[0][0]}
          </div>
          <span className="text-xs" style={{ color: "#6c757d" }}>
            Hosted by <span className="font-medium text-gray-700">{stay.host}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function FeaturedStays() {
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref);

  return (
    <section className="py-20" style={{ background: "#F8F9FA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.65s ease, transform 0.65s ease" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2
                className="text-3xl font-bold mb-2"
                style={{ color: "#212529", letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Featured Berber Homestays
              </h2>
              <p className="text-sm" style={{ color: "#6c757d" }}>
                Directly from local families, verified by us
              </p>
            </div>
            <button
              className="self-start sm:self-auto text-sm font-semibold px-5 py-2.5 rounded-full border transition-all duration-200 hover:bg-gray-900 hover:text-white whitespace-nowrap"
              style={{ borderColor: "#212529", color: "#212529" }}
            >
              View all stays →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HOMESTAYS.map((stay, i) => (
            <HomestayCard key={stay.id} stay={stay} delay={i * 70} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null!);
  useFadeIn(ref);

  return (
    <section className="py-24 bg-white" id="experiences">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          style={{ opacity: 0, transform: "translateY(28px)", transition: "opacity 0.65s ease, transform 0.65s ease" }}
        >
          <div className="text-center mb-16">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#212529", letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Simple as it should be
            </h2>
            <p style={{ color: "#6c757d" }}>Three steps to your most memorable trip</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connector line (desktop) */}
            <div
              className="hidden md:block absolute top-12 left-[calc(33%+2rem)] right-[calc(33%+2rem)] h-px"
              style={{ background: "linear-gradient(90deg, #E9C46A, #2A9D8F)" }}
            />

            {STEPS.map((step, i) => (
              <FadeSection key={step.num} delay={i * 100}>
                <div className="flex flex-col items-start md:items-center md:text-center">
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shrink-0"
                    style={{ background: i === 0 ? "#FFF3EE" : i === 1 ? "#E8F7F5" : "#FDF8E8", color: i === 0 ? "#E76F51" : i === 1 ? "#2A9D8F" : "#C9A227" }}
                  >
                    {step.icon}
                    <span
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                      style={{ background: i === 0 ? "#E76F51" : i === 1 ? "#2A9D8F" : "#E9C46A", color: i === 2 ? "#212529" : "white" }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#212529" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#6c757d" }}>
                    {step.desc}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <section className="py-24" style={{ background: "#F8F9FA" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeSection>
          <div className="text-center mb-14">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "#212529", letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              What travellers are saying
            </h2>
            <p style={{ color: "#6c757d" }}>From guests who made real connections</p>
          </div>
        </FadeSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeSection key={t.name} delay={i * 100}>
              <div
                className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: "#495057" }}>
                  "{t.quote}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "#212529" }}>
                      {t.name}
                    </div>
                    <div className="text-xs" style={{ color: "#adb5bd" }}>
                      {t.flag} {t.country}
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

// ── Newsletter CTA ────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: "#212529" }}
    >
      {/* Decorative */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full opacity-[0.08]" style={{ background: "#E76F51" }} />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-[0.06]" style={{ background: "#2A9D8F" }} />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <FadeSection>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: "rgba(233,196,106,0.1)", borderColor: "rgba(233,196,106,0.3)", color: "#E9C46A" }}
          >
            Exclusive offer
          </div>

          <h2
            className="text-3xl sm:text-4xl font-bold mb-4 text-white"
            style={{ letterSpacing: "-0.03em", fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Get 10% off your first stay
          </h2>
          <p className="mb-10" style={{ color: "#adb5bd" }}>
            Subscribe for Morocco travel guides, Berber culture insights, and exclusive offers.
          </p>

          {submitted ? (
            <div
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl"
              style={{ background: "rgba(42,157,143,0.15)", color: "#2A9D8F" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-semibold">You're in! Check your inbox for your 10% code.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-full text-sm outline-none border"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.12)",
                  color: "white",
                }}
                onKeyDown={(e) => e.key === "Enter" && email && setSubmitted(true)}
              />
              <button
                onClick={() => email && setSubmitted(true)}
                className="px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 whitespace-nowrap"
                style={{ background: "#E76F51", color: "white" }}
              >
                Subscribe →
              </button>
            </div>
          )}

          <p className="mt-4 text-xs" style={{ color: "#6c757d" }}>
            No spam, ever. Unsubscribe anytime.
          </p>
        </FadeSection>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: "Explore",
      links: ["Berber Homestays", "Surf Camps", "Argan Experiences", "Guided Treks", "Desert Edge Stays"],
    },
    {
      title: "Support",
      links: ["Help Centre", "Safety Info", "Cancellation Policy", "Report a problem", "Contact us"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Settings", "Accessibility"],
    },
  ];

  const socials = [
    { label: "Instagram", href: "#" },
    { label: "Twitter / X", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold" style={{ color: "#E76F51" }}>ⵣ</span>
              <span className="text-lg font-semibold" style={{ color: "#212529", letterSpacing: "-0.03em" }}>
                Souss Massa<span style={{ color: "#E76F51" }}>360</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#6c757d" }}>
              Discover the Authentic Berber Soul of Southern Morocco.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-xs font-semibold transition-all duration-200 hover:border-gray-400 hover:bg-gray-50"
                  style={{ color: "#6c757d" }}
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#212529" }}>
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-gray-900"
                      style={{ color: "#6c757d" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-xs" style={{ color: "#adb5bd" }}>
            © 2025 Souss Massa 360 · All rights reserved · Made with ♡ in Agadir, Morocco
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Sitemap"].map((l) => (
              <a key={l} href="#" className="text-xs hover:text-gray-700" style={{ color: "#adb5bd" }}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap";
    document.head.appendChild(link);
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif", color: "#212529" }}>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedStays />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}