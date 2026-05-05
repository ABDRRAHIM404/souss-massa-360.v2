import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== STICKY NAVBAR ===== */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">ⵣ</span>
            </div>
            <span className={`font-bold text-xl ${scrolled ? 'text-gray-800' : 'text-white'}`}>
              Souss Massa 360
            </span>
          </div>
          <div className="hidden md:flex gap-8">
            {['Homestays', 'Guides', 'Marketplace', 'Experiences'].map(item => (
              <a key={item} href="#" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-orange-500 transition`}>
                {item}
              </a>
            ))}
          </div>
          <button className="bg-white/20 backdrop-blur-sm hover:bg-orange-500 text-white px-5 py-2 rounded-full transition-all hover:scale-105">
            Sign In
          </button>
        </div>
      </nav>

      {/* ===== HERO SECTION with VIDEO BACKGROUND ===== */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600" 
            alt="Atlas Mountains Morocco"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-6">
            ✨ Welcome to Authentic Morocco
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover the{' '}
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Berber Soul
            </span>
            <br />
            of Southern Morocco
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
            Stay with local families • Learn traditional crafts • Surf Atlantic waves
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-2">
              <input 
                type="text" 
                placeholder="📍 Where to? (Agadir, Taghazout...)" 
                className="flex-1 px-5 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none"
              />
              <input 
                type="date" 
                className="px-5 py-4 rounded-xl text-gray-800 border-l border-gray-200 focus:outline-none"
              />
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition-all">
                🔍 Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16">
            {[
              { number: '500+', label: 'Berber Families' },
              { number: '50+', label: 'Argan Co-ops' },
              { number: '4.95', label: 'Rating' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold tracking-wide">EXPLORE BY CATEGORY</span>
            <h2 className="text-4xl font-bold mt-2 mb-4">Find Your Perfect Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From mountain treks to argan oil workshops — authentic encounters await
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Homestays', color: 'from-blue-500 to-cyan-500', count: '156 listings' },
              { icon: '🥾', title: 'Mountain Guides', color: 'from-emerald-500 to-teal-500', count: '48 guides' },
              { icon: '🏄', title: 'Surf Camps', color: 'from-cyan-500 to-blue-500', count: '23 camps' },
              { icon: '🎨', title: 'Artisans', color: 'from-orange-500 to-red-500', count: '89 artisans' }
            ].map(cat => (
              <div key={cat.title} className="group cursor-pointer">
                <div className={`bg-gradient-to-br ${cat.color} rounded-2xl p-8 text-center text-white transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`}>
                  <div className="text-5xl mb-3">{cat.icon}</div>
                  <h3 className="font-bold text-lg">{cat.title}</h3>
                  <p className="text-sm text-white/80">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED HOMESTAYS with HOVER EFFECTS ===== */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <span className="text-orange-500 font-semibold">✨ HAND-PICKED STAYS</span>
              <h2 className="text-4xl font-bold mt-2">Authentic Berber Homestays</h2>
            </div>
            <button className="text-orange-500 font-semibold hover:text-orange-600 transition flex items-center gap-2">
              View All → 
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Amazigh Heritage Stay',
                location: 'Paradise Valley',
                price: '250',
                image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800',
                rating: 4.9,
                reviews: 128,
                tags: ['🔥 Family-Run', '🍲 Breakfast Included']
              },
              {
                name: 'Taghazout Surf Lodge',
                location: 'Taghazout Beach',
                price: '350',
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                rating: 4.8,
                reviews: 94,
                tags: ['🏄 Surf Spot', '🌅 Ocean View']
              },
              {
                name: 'Argan Garden Retreat',
                location: 'Taroudant',
                price: '200',
                image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
                rating: 4.95,
                reviews: 203,
                tags: ['🌿 Argan Tour', '👩‍🍳 Cooking Class']
              }
            ].map((stay, i) => (
              <div key={i} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={stay.image} 
                    alt={stay.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-orange-600">
                    ⭐ {stay.rating} · {stay.reviews} reviews
                  </div>
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                    Verified ✅
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition">
                      {stay.name}
                    </h3>
                    <span className="text-2xl font-bold text-gray-800">{stay.price}<span className="text-sm text-gray-500"> MAD</span></span>
                  </div>
                  <p className="text-gray-500 mb-3">📍 {stay.location}</p>
                  <div className="flex gap-2 mb-4">
                    {stay.tags.map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">{tag}</span>
                    ))}
                  </div>
                  <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-orange-500 transition-all duration-300">
                    Book Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPERIENCES SECTION (Horizontal Scroll) ===== */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold">🕌 UNIQUE EXPERIENCES</span>
            <h2 className="text-4xl font-bold mt-2">Don't Just Visit — Live It</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Berber Cooking Class', icon: '🍲', desc: 'Learn tagine & bread making', duration: '3 hours', price: '350 MAD' },
              { title: 'Argan Oil Workshop', icon: '🌿', desc: 'Press your own argan oil', duration: '2 hours', price: '250 MAD' },
              { title: 'Atlas Trekking', icon: '⛰️', desc: 'Guided mountain hike', duration: 'Full day', price: '600 MAD' }
            ].map(exp => (
              <div key={exp.title} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                <div className="text-5xl mb-4">{exp.icon}</div>
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-gray-600 mb-3">{exp.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">{exp.price}</span>
                  <span className="text-sm text-gray-400">{exp.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-orange-500 font-semibold">❤️ TRAVELER LOVE</span>
            <h2 className="text-4xl font-bold mt-2">What Our Guests Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah from France', text: 'The most authentic experience of my life. Hassan\'s family treated me like their own daughter!', rating: 5, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
              { name: 'Marco from Italy', text: 'Surfing in Taghazout + staying with locals = perfect trip. Will come back!', rating: 5, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
              { name: 'Aisha from UAE', text: 'The argan oil workshop was incredible. I bought so much for my family!', rating: 5, image: 'https://randomuser.me/api/portraits/women/3.jpg' }
            ].map(testimonial => (
              <div key={testimonial.name} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <div className="text-yellow-500">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA NEWSLETTER ===== */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Moroccan Adventure?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 5,000+ travelers who discovered the real Morocco through Souss Massa 360
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-5 py-3 rounded-full text-gray-800"
            />
            <button className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
              Get Updates →
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">ⵣ</span>
                </div>
                <span className="text-white font-bold">Souss Massa 360</span>
              </div>
              <p className="text-sm">Discover the authentic Berber soul of Southern Morocco</p>
            </div>
            {[
              { title: 'Explore', links: ['Homestays', 'Guides', 'Marketplace', 'Experiences'] },
              { title: 'Support', links: ['Help Center', 'Safety', 'Contact Us', 'FAQ'] },
              { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Booking Policy'] }
            ].map(section => (
              <div key={section.title}>
                <h4 className="text-white font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map(link => (
                    <li key={link}><a href="#" className="hover:text-orange-500 transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 Souss Massa 360 — Empowering Berber communities through sustainable tourism</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;