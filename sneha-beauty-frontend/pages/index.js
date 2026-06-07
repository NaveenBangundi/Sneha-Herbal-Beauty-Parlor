import { motion } from "framer-motion";
import Services from "../components/Services";
import Shop from "../components/Shop";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-linen text-primary-dark">

      {/* 🌿 BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      ></div>

      {/* 🎨 OVERLAY (for readability) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-linen/60 via-sand/70 to-gold-light/35"></div>

      {/* ✨ PREMIUM GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gold-light/30 rounded-full blur-[150px] top-[-200px] left-[-200px]"></div>
        <div className="absolute w-[600px] h-[600px] bg-primary-light/45 rounded-full blur-[150px] bottom-[-200px] right-[-200px]"></div>
        <div className="absolute w-[400px] h-[400px] bg-gold-extra-light/50 rounded-full blur-[120px] top-[30%] left-[40%]"></div>
      </div>

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-linen/80 border-b border-gold-light/30 shadow-sm h-20 flex items-center">
        <div className="w-full px-4 md:px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img src="/sneha-logo.png" alt="logo" className="h-12 md:h-16 w-auto object-contain shrink-0 filter brightness-95" onError={(e) => { e.target.style.display = 'none'; }} />
            <h1 className="text-base md:text-lg lg:text-2xl font-semibold font-serif text-primary-dark tracking-wide leading-tight shrink-0">
              Sneha Herbal<br className="lg:hidden" /> <span className="text-gold-dark font-normal">Beauty Parlor</span>
            </h1>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs lg:text-sm font-semibold tracking-wider uppercase shrink-0">
            <a href="#home" className="relative group text-primary-dark/80 transition-colors hover:text-primary-dark">
              Home
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="relative group text-primary-dark/80 transition-colors hover:text-primary-dark">
              Services
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#shop" className="relative group text-primary-dark/80 transition-colors hover:text-primary-dark">
              Shop
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#reviews" className="relative group text-primary-dark/80 transition-colors hover:text-primary-dark">
              Reviews
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group text-primary-dark/80 transition-colors hover:text-primary-dark">
              Contact
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
            </a>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/917406098184?text=Hi, I want to book an appointment"
                )
              }
              className="bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white px-5 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 border border-gold-medium/20 shadow-md whitespace-nowrap uppercase tracking-widest text-[10px]"
            >
              Book Now
            </button>
          </div>

          {/* MOBILE BOOK NOW */}
          <div className="md:hidden">
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/917406098184?text=Hi, I want to book an appointment"
                )
              }
              className="bg-gradient-to-r from-primary-dark to-primary-medium text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full shadow-md hover:scale-105 transition-all duration-300 border border-gold-medium/20"
            >
              Book
            </button>
          </div>

        </div>
      </nav>

      {/* 🌟 HERO SECTION */}
      <div className="pt-28 md:pt-36 flex justify-center px-4 md:px-6 scroll-mt-28" id="home">

        <div className="section-card rounded-[2.5rem] px-6 md:px-12 py-10 md:py-16 max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 md:gap-12">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/40 border border-gold-medium/20 text-gold-dark text-[10px] md:text-xs font-bold tracking-widest uppercase font-[Poppins]">
              🌿 100% Organic & Herbal Care
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-dark leading-[1.1] font-serif">
              Glow <span className="bg-gradient-to-r from-gold-medium to-gold-primary bg-clip-text text-transparent italic font-normal">Naturally</span>,
              <br /> Feel Beautiful ✨
            </h2>

            <p className="text-primary-dark/80 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-lg font-[Poppins]">
              Indulge in our exquisite range of herbal rituals and modern treatments crafted to revive your natural beauty and radiance.
            </p>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/917406098184?text=Hi, I want to book an appointment"
                )
              }
              className="bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:scale-105 hover:shadow-2xl transition-all duration-300 border border-gold-medium/20 shadow-xl"
            >
              Book Appointment 💬
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center relative">
            <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[380px] md:w-[350px] md:h-[450px] rounded-t-[12rem] rounded-b-3xl border-[5px] border-white shadow-2xl overflow-hidden bg-sand luxury-shadow">
              <img
                src="/hero-image.png"
                alt="Premium Beauty Treatment"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Elegant floating circular medal accent */}
            <div className="absolute -bottom-4 -left-4 bg-linen border border-gold-primary/30 w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg transform -rotate-12 pointer-events-none">
              <span className="text-[10px] font-bold text-gold-dark tracking-widest uppercase">Premium</span>
              <span className="text-[8px] text-primary-dark/60 font-semibold uppercase">Beauty</span>
            </div>
            {/* Floating gold ring background */}
            <div className="absolute -inset-4 border border-gold-primary/10 rounded-t-[13rem] rounded-b-[4rem] pointer-events-none -z-10 transform rotate-3 scale-102"></div>
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