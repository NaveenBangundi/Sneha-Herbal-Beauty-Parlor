import { motion } from "framer-motion";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🌿 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      ></div>

      {/* 🎨 OVERLAY (for readability) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-white/5 to-pink-100/70"></div>

      {/* ✨ PREMIUM GLOW */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[600px] h-[600px] bg-pink-400/60 rounded-full blur-[150px] top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-green-400/60 rounded-full blur-[150px] bottom-[-200px] right-[-200px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-yellow-300/40 rounded-full blur-[120px] top-[30%] left-[40%] animate-pulse"></div>
      </div>

      {/* 🔝 NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm h-20 flex items-center">
        <div className="w-full px-4 md:px-6 lg:px-10 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/sneha-logo.png" alt="logo" className="h-12 md:h-16 w-auto object-contain shrink-0" />
            <h1 className="text-sm md:text-base lg:text-xl font-bold text-green-900 leading-tight shrink-0 w-32 md:w-auto">
              Sneha Herbal<br className="lg:hidden" /> Beauty Parlor
            </h1>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8 text-sm lg:text-base text-gray-700 font-medium shrink-0">
            <a href="#home" className="relative group text-gray-800 transition-colors hover:text-green-800">
              Home
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#services" className="relative group text-gray-800 transition-colors hover:text-green-800">
              Services
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#reviews" className="relative group text-gray-800 transition-colors hover:text-green-800">
              Reviews
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#contact" className="relative group text-gray-800 transition-colors hover:text-green-800">
              Contact
              <span className="absolute left-0 bottom-[-4px] w-0 h-0.5 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/917406098184?text=Hi, I want to book an appointment"
                )
              }
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 lg:px-5 py-2 rounded-full hover:scale-105 transition shadow-md whitespace-nowrap"
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
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-4 py-2 text-sm rounded-full shadow-md"
            >
              Book
            </button>
          </div>

        </div>
      </nav>

      {/* 🌟 HERO SECTION */}
      <div className="pt-28 md:pt-32 flex justify-center px-4 md:px-6 scroll-mt-28" id="home">

        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 md:px-8 py-8 md:py-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-8 md:gap-10 shadow-lg">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-green-900 leading-tight font-[Playfair Display]">
              Glow <span className="bg-gradient-to-r from-green-600 to-pink-500 bg-clip-text text-transparent"> Naturally</span> ,
              <br /> Feel Beautiful ✨
            </h2>

            <p className="mt-4 text-gray-800 text-lg font-[Poppins]">
              Enhancing Beauty the Herbal Way
            </p>

            <button
              onClick={() =>
                window.open(
                  "https://wa.me/917406098184?text=Hi, I want to book an appointment"
                )
              }
              className="mt-6 bg-gradient-to-r from-green-600 to-green-800 text-white px-6 md:px-8 py-3 rounded-full text-base md:text-lg hover:scale-105 transition shadow-xl"
            >
              Book Appointment 💬
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center ">
            <img
              src="/hero-image.png"
              alt="beauty"
              className="max-w-[250px] sm:max-w-[300px] md:max-w-[360px] object-contain opacity-90 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
            />
          </div>

        </div>

      </div>

      <Services />

      <Reviews />
      <Contact />

    </div>
  );
}