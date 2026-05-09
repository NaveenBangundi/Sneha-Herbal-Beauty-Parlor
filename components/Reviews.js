import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const reviews = [
  { name: "Priya", role: "Regular Client", avatar: "👩🏽", text: "Amazing service! Loved the facial. My skin feels incredibly soft and radiant. Highly recommend!", rating: 5 },
  { name: "Sneha", role: "Bride", avatar: "👰🏻‍♀️", text: "Best bridal makeup in town ❤️ Made me feel like an absolute princess on my special day.", rating: 5 },
  { name: "Anjali", role: "First-time Visitor", avatar: "👩🏻", text: "The herbal hair spa was so relaxing. The staff is very professional and polite.", rating: 4 },
  { name: "Megha", role: "Local Guide", avatar: "👩🏽‍🦱", text: "Great ambiance and excellent pedicure. Will definitely be visiting again.", rating: 5 }
];

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="mt-20 md:mt-32 px-4 md:px-6 text-center pb-20 overflow-hidden scroll-mt-28" id="reviews">
      <h3 className="text-3xl md:text-5xl font-bold text-gray-800 font-[Playfair Display]">
        What Our Clients Say ✨
      </h3>
      <p className="mt-4 text-gray-600 font-[Poppins]">Real experiences from our beautiful customers.</p>
      
      <div className="relative mt-12 flex justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">
        
        {/* Premium Left Arrow */}
        <button 
          onClick={handlePrev} 
          className="hidden md:flex absolute -left-6 md:-left-10 z-50 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 text-green-900 hover:bg-white/40 hover:scale-110 transition-all duration-300 group overflow-hidden"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="relative w-full max-w-2xl h-[400px] md:h-[350px] bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white p-8 flex flex-col items-center justify-center">
          
          {/* Quote Icon */}
          <div className="absolute top-6 left-8 text-6xl text-green-200 opacity-50 font-serif leading-none">
            "
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) handleNext();
                else if (swipe > 50) handlePrev();
              }}
              className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-12 text-center pb-10 cursor-grab active:cursor-grabbing"
            >
              <div className="flex justify-center gap-1 mb-6 text-yellow-400 text-xl">
                {[...Array(reviews[index].rating)].map((_, i) => <span key={i} className="drop-shadow-sm">★</span>)}
              </div>
              
              <p className="text-gray-700 text-lg md:text-2xl font-medium italic font-[Playfair Display] leading-relaxed">
                "{reviews[index].text}"
              </p>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl shadow-inner border border-white">
                  {reviews[index].avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-green-900 text-base md:text-lg">
                    {reviews[index].name}
                  </h4>
                  <p className="text-green-700/70 text-xs md:text-sm font-[Poppins] uppercase tracking-wider">
                    {reviews[index].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <div className="absolute bottom-6 flex gap-3">
            {reviews.map((_, i) => (
              <button 
                key={i} 
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? "bg-green-600 w-8" : "bg-gray-300 hover:bg-green-400"}`} 
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Premium Right Arrow */}
        <button 
          onClick={handleNext} 
          className="hidden md:flex absolute -right-6 md:-right-10 z-50 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] border border-white/50 text-green-900 hover:bg-white/40 hover:scale-110 transition-all duration-300 group overflow-hidden"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

      </div>
    </div>
  );
}
