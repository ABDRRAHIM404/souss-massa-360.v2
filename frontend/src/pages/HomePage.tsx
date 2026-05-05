import React, { useState, useEffect, useRef } from 'react';

const HomePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const listings = [
    {
      id: 1,
      name: 'Amazigh Heritage Stay',
      location: 'Paradise Valley',
      price: 250,
      image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
      rating: 4.9,
      reviews: 128,
      host: 'Fatima & Family',
      badges: ['✨ Superhost', '🏡 Family-Run'],
      coordinates: { lat: 30.5, lng: -9.2 }
    },
    {
      id: 2,
      name: 'Taghazout Surf Lodge',
      location: 'Taghazout',
      price: 350,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
      rating: 4.8,
      reviews: 94,
      host: 'Youssef',
      badges: ['🏄 Surf Haven', '🌅 Ocean View'],
      coordinates: { lat: 30.53, lng: -9.7 }
    },
    {
      id: 3,
      name: 'Argan Garden Retreat',
      location: 'Taroudant',
      price: 200,
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      rating: 4.95,
      reviews: 203,
      host: 'Aisha',
      badges: ['🌿 Eco-Friendly', '🍲 Cooking Included'],
      coordinates: { lat: 30.47, lng: -8.87 }
    },
    {
      id: 4,
      name: 'Atlas Mountain View',
      location: 'Immouzer',
      price: 300,
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
      rating: 4.7,
      reviews: 67,
      host: 'Mohamed',
      badges: ['⛰️ Mountain Views', '🔥 Fireplace'],
      coordinates: { lat: 30.84, lng: -9.48 }
    },
    {
      id: 5,
      name: 'Tafraoute Rock Stay',
      location: 'Tafraoute',
      price: 180,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      rating: 4.6,
      reviews: 45,
      host: 'Ibrahim',
      badges: ['🎨 Artist Retreat', '🥾 Hiking'],
      coordinates: { lat: 29.72, lng: -8.97 }
    },
    {
      id: 6,
      name: 'Souss Valley Farm',
      location: 'Agadir',
      price: 220,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      rating: 4.85,
      reviews: 112,
      host: 'Rachid',
      badges: ['🚜 Working Farm', '🥚 Fresh Eggs'],
      coordinates: { lat: 30.42, lng: -9.6 }
    }
  ];

  return (
    <div className="bg-black text-white">
      {/* ===== STICKY NAVBAR - GLASS MORPHISM ===== */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
              <span className="text-white font-bold text-xl">ⵣ</span>
            </div>
            <span className="font-bold text-xl tracking-tight">souss massa 360</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            {['Stays', 'Experiences', 'Guides', 'Marketplace'].map(item => (
              <a key={item} href="#" className="text-white/70 hover:text-white transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="text-white/70 hover:text-white transition px-4 py-2 text-sm">Log in</button>
            <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-white/90 transition-all hover:scale-105">
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO - SPLIT SCREEN MODERN ===== */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background Video/Gradient */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-orange-950/30 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600"
            className="w-full h-full object-cover scale-110 animate-slow-zoom"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium">Live Bookings Available</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1] mb-6">
              Stay with
              <span className="block bg-gradient-to-r from-orange-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
                Berber Families
              </span>
            </h1>
            
            <p className="text-lg text-white/60 mb-10 max-w-xl">
              Not hotels. Not hostels. Real homes. Real people. Real Morocco.
            </p>

            {/* Modern Search Bar */}
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-2 max-w-2xl">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 px-5 py-3">
                  <div className="text-xs text-white/40 uppercase tracking-wide">Where</div>
                  <input type="text" placeholder="Search destinations..." className="bg-transparent w-full text-white placeholder-white/30 focus:outline-none text-sm" />
                </div>
                <div className="border-l border-white/20" />
                <div className="flex-1 px-5 py-3">
                  <div className="text-xs text-white/40 uppercase tracking-wide">When</div>
                  <input type="text" placeholder="Select dates" className="bg-transparent w-full text-white placeholder-white/30 focus:outline-none text-sm" />
                </div>
                <div className="border-l border-white/20" />
                <div className="flex-1 px-5 py-3">
                  <div className="text-xs text-white/40 uppercase tracking-wide">Who</div>
                  <input type="text" placeholder="2 guests" className="bg-transparent w-full text-white placeholder-white/30 focus:outline-none text-sm" />
                </div>
                <button className="bg-white text-black px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-all">
                  Search →
                </button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex gap-8 mt-12">
              {[
                { value: '500+', label: 'Local Families' },
                { value: '50+', label: 'Argan Co-ops' },
                { value: '4.95', label: 'Rating' }
              ].map(stat => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-white/40">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK FILTERS - HORIZONTAL SCROLL ===== */}
      <section className="sticky top-20 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {['All Stays', 'Surf Access', 'Mountain View', 'Family Friendly', 'Argan Tours', 'Cooking Class', 'Hiking'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className={`px-5 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat.toLowerCase()
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LISTINGS GRID - MODERN CARDS ===== */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured stays</h2>
              <p className="text-white/40 mt-2">Directly from Berber families, no middlemen</p>
            </div>
            <button className="hidden md:flex text-white/60 hover:text-white text-sm gap-1 items-center">
              View all <span>→</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {listings.map((listing, idx) => (
              <div 
                key={listing.id}
                className="group relative"
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/5">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={listing.image}
                      alt={listing.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Price Tag */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-sm font-semibold">
                    {listing.price} MAD
                    <span className="text-white/40 text-xs">/night</span>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/60 backdrop-blur-md rounded-full px-2 py-1 text-xs">
                    <span className="text-yellow-400">★</span>
                    <span>{listing.rating}</span>
                    <span className="text-white/40">({listing.reviews})</span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-semibold mb-1">{listing.name}</h3>
                    <p className="text-white/50 text-sm mb-2">{listing.location}</p>
                    <div className="flex gap-2 flex-wrap">
                      {listing.badges.map(badge => (
                        <span key={badge} className="text-xs bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US - 3 COLUMN ICON GRID ===== */}
      <section className="py-20 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Souss Massa 360?</h2>
            <p className="text-white/40 mt-3">Because tourism should benefit the people, not just corporations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: '🏠', title: '100% Local Families', desc: 'Every homestay is a real Berber family home. No hotels. No corporations.' },
              { icon: '💰', title: 'Fair Pricing', desc: '90% of what you pay goes directly to your host. We take just 10%.' },
              { icon: '✅', title: 'Verified Quality', desc: 'We personally visit and photograph every listing before it goes live.' },
              { icon: '🌿', title: 'Eco-Friendly', desc: 'Sustainable tourism that preserves Amazigh culture and environment.' },
              { icon: '🛡️', title: '24/7 Support', desc: 'WhatsApp support in English, French, Arabic, and Tamazight.' },
              { icon: '🎁', title: 'Unique Experiences', desc: 'Argan workshops, bread baking, guided treks - real memories.' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className="text-4xl mb-4 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - BOLD STATEMENT ===== */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=1600" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-rose-600/20" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <div className="text-8xl mb-6">🇲🇦</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready for the <span className="text-orange-400">real Morocco</span>?
          </h2>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto">
            Stop overpaying for tourist traps. Start staying with families who've been welcoming guests for generations.
          </p>
          <button className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all hover:scale-105 inline-flex items-center gap-2">
            Explore homestays
            <span>→</span>
          </button>
        </div>
      </section>

      {/* ===== FOOTER - MINIMAL ===== */}
      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">ⵣ</span>
              </div>
              <span className="text-sm tracking-tight">souss massa 360</span>
            </div>
            <div className="flex gap-8 text-sm text-white/40">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Contact</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
            <div className="text-sm text-white/40">
              © 2025 — empowering Berber communities
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default HomePage;