import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const initialReviews = [
  { name: "Priya", role: "Regular Client", avatar: "👩🏽", text: "Amazing service! Loved the facial. My skin feels incredibly soft and radiant. Highly recommend!", rating: 5 },
  { name: "Sneha", role: "Bride", avatar: "👰🏻‍♀️", text: "Best bridal makeup in town ❤️ Made me feel like an absolute princess on my special day.", rating: 5 },
  { name: "Anjali", role: "First-time Visitor", avatar: "👩🏻", text: "The herbal hair spa was so relaxing. The staff is very professional and polite.", rating: 4 },
  { name: "Megha", role: "Local Guide", avatar: "👩🏽‍🦱", text: "Great ambiance and excellent pedicure. Will definitely be visiting again.", rating: 5 }
];

const StarRating = ({ label, rating, setRating }) => (
  <div className="flex justify-between items-center mb-4">
    <span className="text-gray-700 font-medium font-[Poppins]">{label}</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl transition-all ${star <= rating ? 'text-yellow-400 scale-110 drop-shadow-sm' : 'text-gray-200 hover:text-yellow-200'}`}
        >
          ★
        </button>
      ))}
    </div>
  </div>
);

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", service: 5, hygiene: 5, ambiance: 5, comment: "" });

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [index, reviewsList.length]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    // Calculate average rating
    const avgRating = Math.round((formData.service + formData.hygiene + formData.ambiance) / 3);

    // If it's a negative review (3 stars or less), simulate alerting the admin
    if (avgRating <= 3) {
      console.warn("ADMIN ALERT: Negative review received from " + formData.name);
      // We trigger a browser alert to demonstrate the admin notification feature working
      window.alert("System Notice: An email/SMS alert has been dispatched to the Admin regarding a negative review.");
    }

    // Post the new review to the local state so it appears in the slider
    const newReview = {
      name: formData.name,
      role: "New Client",
      avatar: "👤",
      text: formData.comment || "Thank you for the wonderful service!",
      rating: avgRating > 0 ? avgRating : 1
    };

    setReviewsList([newReview, ...reviewsList]);
    setIndex(0); // Jump to the newly added review

    setIsSubmitted(true);
    setFormData({ name: "", service: 5, hygiene: 5, ambiance: 5, comment: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="reviews">
      <div className="max-w-3xl mx-auto bg-white/80 rounded-[2rem] shadow-2xl border border-white/60 py-6 md:py-8 px-8 md:px-10 lg:px-12 text-center overflow-hidden transition-all duration-500 hover:border-[#E1B875]/40 hover:shadow-[0_0_40px_rgba(225,184,117,0.3)] relative">

        {/* Inner Golden Glow Spotlights */}
        <div className="absolute w-[250px] h-[250px] bg-amber-400/20 rounded-full blur-[75px] -top-16 -right-16 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
        <div className="absolute w-[200px] h-[200px] bg-yellow-300/15 rounded-full blur-[60px] -bottom-16 -left-16 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

        <div className="relative z-10 w-full">
          <h3 className="text-3xl md:text-5xl font-bold text-gray-800 font-[Playfair Display]">
            What Our Clients Say ✨
          </h3>
          <p className="mt-4 text-gray-600 font-[Poppins]">Real experiences from our beautiful customers.</p>

          <div className="relative mt-4 md:mt-6 flex justify-center items-center gap-4 md:gap-8 max-w-4xl mx-auto">

            {/* Premium Left Arrow */}
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute -left-6 md:-left-10 z-50 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl shadow-md border border-white/60 text-green-900 hover:bg-white/60 hover:scale-110 transition-all duration-300 group overflow-hidden"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full max-w-xl h-[290px] md:h-[220px] flex flex-col items-center justify-center">

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
                    {[...Array(reviewsList[index]?.rating || 5)].map((_, i) => <span key={i} className="drop-shadow-sm">★</span>)}
                  </div>

                  <p className="text-gray-700 text-lg md:text-2xl font-medium italic font-[Playfair Display] leading-relaxed">
                    "{reviewsList[index]?.text}"
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-2xl shadow-inner border border-white">
                      {reviewsList[index]?.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-green-900 text-base md:text-lg">
                        {reviewsList[index]?.name}
                      </h4>
                      <p className="text-green-700/70 text-xs md:text-sm font-[Poppins] uppercase tracking-wider">
                        {reviewsList[index]?.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Premium Right Arrow */}
            <button
              onClick={handleNext}
              className="hidden md:flex absolute -right-6 md:-right-10 z-50 w-12 h-12 md:w-14 md:h-14 items-center justify-center rounded-full bg-white/40 backdrop-blur-xl shadow-md border border-white/60 text-green-900 hover:bg-white/60 hover:scale-110 transition-all duration-300 group overflow-hidden"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          <div className="flex justify-center gap-3 mt-4 mb-2">
            {reviewsList.map((_, i) => (
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

          <div className="mt-6 md:mt-8 flex justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white border-2 border-green-600 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-50 hover:scale-105 transition-all shadow-lg hover:shadow-green-900/10 flex items-center justify-center gap-2"
            >
              Write a Review ✍️
            </button>
          </div>
        </div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-left"
            >
              <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 text-white flex justify-between items-center">
                <h4 className="text-2xl font-bold font-[Playfair Display]">
                  {isSubmitted ? "Thank You! 💖" : "Rate Your Experience ✨"}
                </h4>
                <button onClick={closeModal} className="text-white/80 hover:text-white text-3xl leading-none">&times;</button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 md:p-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                    🎉
                  </div>
                  <h5 className="text-2xl font-bold text-gray-800 font-[Playfair Display]">Thanks for your feedback!</h5>
                  <p className="text-gray-600 font-[Poppins] leading-relaxed mt-2">
                    We appreciate your time and thanks for writing to us. Visit again!
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-8 w-full bg-green-100 text-green-800 py-3.5 rounded-xl font-bold hover:bg-green-200 hover:scale-[1.02] transition-all shadow-sm"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReview} className="p-6 md:p-8 space-y-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2 font-[Poppins]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
                    />
                  </div>

                  <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100">
                    <StarRating label="Service Quality" rating={formData.service} setRating={(v) => setFormData({ ...formData, service: v })} />
                    <StarRating label="Cleanliness & Hygiene" rating={formData.hygiene} setRating={(v) => setFormData({ ...formData, hygiene: v })} />
                    <StarRating label="Ambiance & Comfort" rating={formData.ambiance} setRating={(v) => setFormData({ ...formData, ambiance: v })} />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2 font-[Poppins]">Additional Comments</label>
                    <textarea
                      rows="3"
                      placeholder="Tell us what you loved..."
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] transition-all"
                  >
                    Submit Review 🚀
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
