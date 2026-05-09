import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Hydra Facial", img: "/services/facial.png", desc: "Deep cleansing and hydration for glowing skin." },
  { name: "Bridal Makeup", img: "/services/bridal.jpg", desc: "Expert makeup to make you feel like a princess." },
  { name: "Mehandi", img: "/services/mehandi.jpg", desc: "Beautiful and intricate mehandi designs." },
  { name: "Manicure", img: "/services/manicure.jpg", desc: "Relaxing manicure sessions for elegant hands." },
  { name: "Pedicure", img: "/services/pedicure.png", desc: "Rejuvenating pedicure to soothe your feet." },
  { name: "Eyebrow", img: "/services/eyebrow.jpg", desc: "Precision threading and shaping." },
  { name: "Haircut", img: "/services/haircut.jpeg", desc: "Trendy haircuts to match your style." }
];

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    setIsMobile(window.innerWidth < 768);
    
    // Resize listener
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  // Helper to calculate wrapping circular offset
  const getOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > services.length / 2) diff -= services.length;
    if (diff < -services.length / 2) diff += services.length;
    return diff;
  };

  return (
    <div className="mt-20 md:mt-24 px-4 md:px-6 scroll-mt-28 overflow-hidden" id="services">
      <h3 className="text-3xl md:text-5xl font-bold text-center text-gray-800 font-[Playfair Display]">
        Our Services 💄
      </h3>
      <p className="text-center text-gray-600 mt-4 font-[Poppins]">
        Explore our premium herbal treatments.
      </p>

      <div className="relative mt-12 md:mt-20 max-w-[1400px] mx-auto h-[400px] md:h-[550px] flex items-center justify-center">
        
        {/* Premium Left Arrow */}
        <button 
          onClick={handlePrev} 
          className="absolute left-2 md:left-4 lg:left-10 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 text-green-900 hover:bg-white/40 hover:scale-110 transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 3D Container */}
        <div className="relative w-full h-full flex items-center justify-center perspective-[1200px]">
          <AnimatePresence mode="popLayout">
            {services.map((service, i) => {
              const offset = getOffset(i);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;

              // Don't render cards that are too far back
              if (absOffset > 2) return null;

              // Dynamic offsets for buttery smooth JS math instead of CSS calc
              const xShift = isMobile ? offset * 90 : offset * 280;
              const yShift = isMobile ? absOffset * 10 : 0; // slight push down on mobile

              return (
                <motion.div
                  key={i}
                  initial={false}
                  animate={{
                    x: xShift,
                    y: yShift,
                    scale: 1 - absOffset * (isMobile ? 0.2 : 0.15),
                    zIndex: 10 - absOffset,
                    opacity: 1 - absOffset * 0.4,
                    rotateY: offset * -15
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 250, 
                    damping: 25, 
                    mass: 0.8 
                  }}
                  className={`absolute w-[240px] md:w-[380px] aspect-[3/4] bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col will-change-transform transform-gpu ${isActive ? 'cursor-default ring-4 ring-green-400/50' : 'cursor-pointer'}`}
                  onClick={() => {
                    if (!isActive) setCurrentIndex(i);
                  }}
                >
                  {/* IMAGE */}
                  <div className="w-full h-[60%] relative bg-gray-100 overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    {/* Shadow overlay for inactive cards */}
                    {!isActive && <div className="absolute inset-0 bg-black/15 transition-opacity duration-300"></div>}
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 md:p-6 bg-gradient-to-t from-green-50 to-white flex-1 flex flex-col justify-center items-center text-center">
                    <h4 className="text-base md:text-2xl font-bold text-green-900 font-[Playfair Display]">
                      {service.name}
                    </h4>
                    <p className="mt-1 md:mt-2 text-gray-600 font-[Poppins] text-xs md:text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Premium Right Arrow */}
        <button 
          onClick={handleNext} 
          className="absolute right-2 md:right-4 lg:right-10 z-50 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 text-green-900 hover:bg-white/40 hover:scale-110 transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4 md:mt-8">
        {services.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm ${i === currentIndex ? "bg-green-600 w-6" : "bg-green-200 hover:bg-green-400"}`} 
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
