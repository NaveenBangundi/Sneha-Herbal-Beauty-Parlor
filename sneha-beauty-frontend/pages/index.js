import { motion } from "framer-motion";
import Services from "../components/Services";
import Shop from "../components/Shop";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden" style={{ background: "linear-gradient(160deg, #F5F0E8 0%, #EDE6D6 40%, #E8F5EE 100%)" }}>

      {/* ─── ANIMATED BACKGROUND BLOBS ─── */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] rounded-full blur-[160px] -top-48 -left-48 opacity-40"
          style={{ background: "radial-gradient(circle, #3DBF7F 0%, #1A5C3F 60%, transparent 100%)" }} />
        <div className="absolute w-[600px] h-[600px] rounded-full blur-[140px] -bottom-40 -right-40 opacity-35"
          style={{ background: "radial-gradient(circle, #F2BE3A 0%, #E8A820 60%, transparent 100%)" }} />
        <div className="absolute w-[450px] h-[450px] rounded-full blur-[120px] top-1/2 left-1/3 opacity-20"
          style={{ background: "radial-gradient(circle, #D95C74 0%, transparent 70%)" }} />
        <div className="absolute w-[500px] h-[500px] rounded-full blur-[130px] top-1/4 right-1/4 opacity-20"
          style={{ background: "radial-gradient(circle, #2A9E66 0%, transparent 70%)" }} />
      </div>

      {/* ─── NAVBAR ─── */}
      <nav className="fixed top-0 left-0 w-full z-50 h-20 flex items-center"
        style={{ background: "rgba(13, 43, 34, 0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(232, 168, 32, 0.25)" }}>
        <div className="w-full px-4 md:px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src="/sneha-logo.png" alt="logo"
              className="h-12 md:h-14 w-auto object-contain shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }} />
            <div>
              <h1 className="text-lg md:text-xl font-bold font-serif leading-tight"
                style={{ background: "linear-gradient(135deg, #F7CF62, #E8A820)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Sneha Herbal
              </h1>
              <p className="text-[10px] md:text-xs font-light tracking-[0.2em] uppercase"
                style={{ color: "#A8E6C4" }}>
                Beauty Parlor
              </p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs lg:text-sm font-semibold tracking-wider uppercase">
            {["Home", "Services", "Shop", "Reviews", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="relative group transition-colors"
                style={{ color: "rgba(212, 245, 229, 0.85)" }}>
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #E8A820, #F7CF62)" }} />
              </a>
            ))}
            <button
              onClick={() => window.open("https://wa.me/917406098184?text=Hi, I want to book an appointment")}
              className="px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse-gold"
              style={{ background: "linear-gradient(135deg, #E8A820, #F2BE3A, #C99128)", color: "#0D2B22", border: "1px solid rgba(247, 207, 98, 0.4)" }}>
              Book Now ✨
            </button>
          </div>

          {/* MOBILE BOOK NOW */}
          <div className="md:hidden">
            <button
              onClick={() => window.open("https://wa.me/917406098184?text=Hi, I want to book an appointment")}
              className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #E8A820, #F2BE3A)", color: "#0D2B22" }}>
              Book
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <div className="pt-28 md:pt-36 flex justify-center px-4 md:px-6 scroll-mt-28" id="home">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-12 rounded-[2.5rem] p-8 md:p-12 lg:p-16 relative overflow-hidden luxury-shadow"
          style={{ background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", border: "1px solid rgba(232, 168, 32, 0.3)" }}>

          {/* Decorative inner glows */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(242, 190, 58, 0.35) 0%, transparent 70%)" }} />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[100px] pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(61, 191, 127, 0.3) 0%, transparent 70%)" }} />

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left space-y-6 relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase"
              style={{ background: "linear-gradient(135deg, rgba(232,168,32,0.2), rgba(242,190,58,0.15))", border: "1px solid rgba(232,168,32,0.4)", color: "#A3711A" }}>
              🌿 100% Organic &amp; Herbal Care
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] font-serif"
              style={{ color: "#0D2B22" }}>
              Glow{" "}
              <span style={{ background: "linear-gradient(135deg, #E8A820, #F7CF62, #C99128)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Naturally
              </span>
              ,<br />Feel{" "}
              <span style={{ background: "linear-gradient(135deg, #1A5C3F, #2A9E66, #3DBF7F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Beautiful
              </span>{" "}✨
            </h2>

            <p className="text-base md:text-lg font-light leading-relaxed max-w-lg" style={{ color: "rgba(13,43,34,0.75)" }}>
              Indulge in our exquisite range of herbal rituals and modern treatments crafted to revive your natural beauty and radiance.
            </p>

            {/* Stats Row */}
            <div className="flex gap-6 justify-center md:justify-start">
              {[["500+", "Happy Clients"], ["7+", "Services"], ["5★", "Rated"]].map(([num, label]) => (
                <div key={label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold font-serif"
                    style={{ background: "linear-gradient(135deg, #E8A820, #C99128)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {num}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: "rgba(13,43,34,0.6)" }}>{label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => window.open("https://wa.me/917406098184?text=Hi, I want to book an appointment")}
                className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl shimmer-gold"
                style={{ color: "#0D2B22", border: "1px solid rgba(247,207,98,0.5)" }}>
                Book Appointment 💬
              </button>
              <a href="#services"
                className="px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 text-center"
                style={{ border: "2px solid #1A5C3F", color: "#1A5C3F", background: "transparent" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1A5C3F"; e.currentTarget.style.color = "white"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#1A5C3F"; }}>
                Our Services ➔
              </a>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center relative z-10">
            <div className="relative">
              {/* Glowing ring behind image */}
              <div className="absolute inset-0 rounded-t-[10rem] rounded-b-3xl blur-xl scale-110 opacity-60"
                style={{ background: "linear-gradient(135deg, #E8A820, #2A9E66, #F7CF62)" }} />
              <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] md:w-[340px] md:h-[440px] rounded-t-[10rem] rounded-b-3xl overflow-hidden shadow-2xl"
                style={{ border: "4px solid rgba(232,168,32,0.5)" }}>
                <img src="/hero-image.png" alt="Premium Beauty Treatment"
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(13,43,34,0.3) 0%, transparent 60%)" }} />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}
                className="absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl shadow-xl text-center"
                style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", border: "1px solid rgba(232,168,32,0.4)" }}>
                <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#F7CF62" }}>Premium</div>
                <div className="text-[8px] tracking-wider uppercase mt-0.5" style={{ color: "rgba(168,230,196,0.8)" }}>Beauty</div>
              </motion.div>

              {/* Floating star */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                className="absolute -top-4 -right-4 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg"
                style={{ background: "linear-gradient(135deg, #F2BE3A, #E8A820)" }}>
                ✨
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Services />
      <Shop />
      <Reviews />
      <Contact />

    </div>
  );
}