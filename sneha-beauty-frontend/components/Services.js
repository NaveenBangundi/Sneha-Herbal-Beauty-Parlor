import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const fallbackServices = [
  { _id: "1", name: "Hydra Facial", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin." },
  { _id: "2", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert makeup to make you feel like a princess." },
  { _id: "3", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs." },
  { _id: "4", name: "Manicure", imageUrl: "/services/manicure.jpg", description: "Relaxing manicure sessions for elegant hands." },
  { _id: "5", name: "Pedicure", imageUrl: "/services/pedicure.png", description: "Rejuvenating pedicure to soothe your feet." },
  { _id: "6", name: "Eyebrow", imageUrl: "/services/eyebrow.jpg", description: "Precision threading and shaping." },
  { _id: "7", name: "Haircut", imageUrl: "/services/haircut.jpeg", description: "Trendy haircuts to match your style." }
];

export default function Services() {
  const router = useRouter();
  const [servicesData, setServicesData] = useState(fallbackServices);
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

  // Fetch dynamic services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3001/services");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServicesData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  };

  // Helper to calculate wrapping circular offset
  const getOffset = (index) => {
    let diff = index - currentIndex;
    if (diff > servicesData.length / 2) diff -= servicesData.length;
    if (diff < -servicesData.length / 2) diff += servicesData.length;
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
            {servicesData.map((service, i) => {
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
                  className={`absolute w-[240px] md:w-[380px] aspect-[3/4] bg-white rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col will-change-transform transform-gpu ${isActive ? 'cursor-pointer ring-4 ring-green-400/50' : 'cursor-pointer'}`}
                  onClick={() => {
                    if (!isActive) {
                      setCurrentIndex(i);
                    } else if (service._id) {
                      router.push(`/services/${service._id}`);
                    }
                  }}
                  title={isActive ? "Click to view details" : ""}
                >
                  {/* IMAGE */}
                  <div className="absolute inset-0 w-full h-full bg-gray-100 overflow-hidden">
                    <img
                      src={service.imageUrl || service.img}
                      alt={service.name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                    {/* Shadow overlay for inactive cards */}
                    {!isActive && <div className="absolute inset-0 bg-black/30 transition-opacity duration-300"></div>}
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
                  </div>

                  {/* CONTENT */}
                  <div className="relative h-full p-4 md:p-6 flex flex-col justify-end items-center text-center z-10">
                    <h4 className="text-base md:text-2xl font-bold text-white font-[Playfair Display]">
                      {service.name}
                    </h4>
                    <p className="mt-1 md:mt-2 text-gray-200 font-[Poppins] text-xs md:text-sm leading-relaxed">
                      {service.description || service.desc}
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
        {servicesData.map((_, i) => (
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
