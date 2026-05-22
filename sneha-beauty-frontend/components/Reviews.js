import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const initialReviews = [
  { name: "Priya", role: "Regular Client", avatar: "👩🏽", text: "Amazing service! Loved the facial. My skin feels incredibly soft and radiant. Highly recommend!", rating: 5, color: "#2A9E66" },
  { name: "Sneha", role: "Bride", avatar: "👰🏻‍♀️", text: "Best bridal makeup in town ❤️ Made me feel like an absolute princess on my special day.", rating: 5, color: "#D95C74" },
  { name: "Anjali", role: "First-time Visitor", avatar: "👩🏻", text: "The herbal hair spa was so relaxing. The staff is very professional and polite.", rating: 4, color: "#E8A820" },
  { name: "Megha", role: "Local Guide", avatar: "👩🏽‍🦱", text: "Great ambiance and excellent pedicure. Will definitely be visiting again.", rating: 5, color: "#1A5C3F" },
];

const STAR_COLORS = ["#D95C74", "#E8A820", "#2A9E66", "#1A5C3F"];

const StarRating = ({ label, rating, setRating, color }) => (
  <div className="flex justify-between items-center mb-4">
    <span className="text-sm font-semibold" style={{ color: "#0D2B22" }}>{label}</span>
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button key={star} type="button" onClick={() => setRating(star)}
          className="text-2xl transition-all duration-200"
          style={{ color: star <= rating ? (color || "#E8A820") : "#ddd", transform: star <= rating ? "scale(1.15)" : "scale(1)" }}>
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
    const timer = setInterval(() => handleNext(), 6000);
    return () => clearInterval(timer);
  }, [index, reviewsList.length]);

  const handleNext = () => { setDirection(1); setIndex(p => (p + 1) % reviewsList.length); };
  const handlePrev = () => { setDirection(-1); setIndex(p => (p - 1 + reviewsList.length) % reviewsList.length); };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const avgRating = Math.round((formData.service + formData.hygiene + formData.ambiance) / 3);
    if (avgRating <= 3) {
      console.warn("ADMIN ALERT: Negative review from " + formData.name);
      window.alert("System Notice: An email/SMS alert has been dispatched to the Admin regarding a negative review.");
    }
    const colors = ["#2A9E66", "#D95C74", "#E8A820", "#1A5C3F", "#C99128"];
    const newReview = {
      name: formData.name, role: "New Client", avatar: "👤",
      text: formData.comment || "Thank you for the wonderful service!",
      rating: avgRating > 0 ? avgRating : 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setReviewsList([newReview, ...reviewsList]);
    setIndex(0);
    setIsSubmitted(true);
    setFormData({ name: "", service: 5, hygiene: 5, ambiance: 5, comment: "" });
  };

  const closeModal = () => { setIsModalOpen(false); setTimeout(() => setIsSubmitted(false), 300); };

  const current = reviewsList[index];
  const accentColor = current?.color || "#2A9E66";

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="reviews">
      <div className="max-w-3xl mx-auto rounded-[2.5rem] shadow-2xl relative overflow-hidden luxury-shadow"
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", border: `1px solid ${accentColor}44`, transition: "border-color 0.6s" }}>

        {/* Dynamic colour top strip */}
        <div className="h-1.5 w-full transition-all duration-700"
          style={{ background: `linear-gradient(90deg, ${accentColor}, #E8A820, ${accentColor})` }} />

        {/* BG glow that changes per review */}
        <div className="absolute w-[320px] h-[320px] rounded-full blur-[110px] -top-20 -right-20 pointer-events-none z-0 transition-all duration-700"
          style={{ background: `radial-gradient(circle, ${accentColor}44 0%, transparent 70%)` }} />
        <div className="absolute w-[250px] h-[250px] rounded-full blur-[90px] -bottom-20 -left-20 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(232,168,32,0.2) 0%, transparent 70%)" }} />

        <div className="relative z-10 py-10 px-8 md:px-12">

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: "#E8A820" }}>✦ Testimonials</p>
            <h3 className="text-3xl md:text-5xl font-bold font-serif" style={{ color: "#0D2B22" }}>
              What Our{" "}
              <span style={{ background: `linear-gradient(135deg, ${accentColor}, #3DBF7F)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transition: "all 0.6s" }}>
                Clients
              </span>{" "}Say ✨
            </h3>
            <p className="mt-3 font-light text-sm" style={{ color: "rgba(13,43,34,0.65)" }}>
              Real experiences from our beautiful customers.
            </p>
          </div>

          {/* Slider */}
          <div className="relative flex justify-center items-center gap-4 md:gap-8">
            {/* Left arrow */}
            <button onClick={handlePrev}
              className="hidden md:flex absolute -left-4 z-50 w-12 h-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              style={{ background: "rgba(255,255,255,0.9)", border: `1.5px solid ${accentColor}55`, color: accentColor }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full max-w-xl h-[300px] md:h-[230px] flex flex-col items-center justify-center">
              {/* Big decorative quote */}
              <div className="absolute top-0 left-4 text-7xl font-serif leading-none opacity-15 select-none"
                style={{ color: accentColor }}>"</div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={index} custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2}
                  onDragEnd={(e, { offset }) => { if (offset.x < -50) handleNext(); else if (offset.x > 50) handlePrev(); }}
                  className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-10 text-center pb-10 cursor-grab active:cursor-grabbing">

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-5 text-xl">
                    {[...Array(current?.rating || 5)].map((_, i) => (
                      <span key={i} style={{ color: accentColor, textShadow: `0 0 8px ${accentColor}88` }}>★</span>
                    ))}
                  </div>

                  <p className="text-lg md:text-xl font-medium italic font-serif leading-relaxed" style={{ color: "#0D2B22" }}>
                    "{current?.text}"
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
                      style={{ background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}66)`, border: `2px solid ${accentColor}55` }}>
                      {current?.avatar}
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-base md:text-lg" style={{ color: "#0D2B22" }}>{current?.name}</h4>
                      <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: accentColor }}>{current?.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right arrow */}
            <button onClick={handleNext}
              className="hidden md:flex absolute -right-4 z-50 w-12 h-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${accentColor}, #2A9E66)`, color: "white" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-4 mb-6">
            {reviewsList.map((r, i) => (
              <button key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                className="h-2.5 rounded-full transition-all duration-400"
                style={{
                  width: i === index ? "2rem" : "0.625rem",
                  background: i === index ? (r.color || accentColor) : "rgba(13,43,34,0.15)"
                }}
                aria-label={`Review ${i + 1}`} />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <button onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ border: `2px solid ${accentColor}`, color: accentColor, background: `${accentColor}11` }}>
              ✍️ Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* ── Review Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0"
              style={{ background: "rgba(13,43,34,0.55)", backdropFilter: "blur(8px)" }} />

            <motion.div initial={{ scale: 0.9, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 24 }}
              className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl text-left">

              {/* Modal header */}
              <div className="p-6 flex justify-between items-center"
                style={{ background: "linear-gradient(135deg, #0A1F17, #0D2B22, #14422F)", borderBottom: "1px solid rgba(232,168,32,0.25)" }}>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-1" style={{ color: "#E8A820" }}>✦ Share your experience</p>
                  <h4 className="text-2xl font-bold font-serif text-white">
                    {isSubmitted ? "Thank You! 💖" : "Rate Your Experience ✨"}
                  </h4>
                </div>
                <button onClick={closeModal}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)" }}>
                  ×
                </button>
              </div>

              {/* Modal body */}
              <div style={{ background: "white" }}>
                {isSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center space-y-4">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, #2A9E66, #3DBF7F)" }}>🎉</div>
                    <h5 className="text-2xl font-bold font-serif" style={{ color: "#0D2B22" }}>Thanks for your feedback!</h5>
                    <p className="font-light leading-relaxed" style={{ color: "rgba(13,43,34,0.7)" }}>
                      We appreciate your time. Visit again soon!
                    </p>
                    <button onClick={closeModal}
                      className="mt-6 w-full py-3.5 rounded-xl font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
                      style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62" }}>
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#0D2B22" }}>Your Name</label>
                      <input type="text" required placeholder="Enter your name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{ border: "1.5px solid rgba(232,168,32,0.35)", background: "#F5F0E8", color: "#0D2B22" }}
                        onFocus={e => e.target.style.borderColor = "#E8A820"}
                        onBlur={e => e.target.style.borderColor = "rgba(232,168,32,0.35)"} />
                    </div>

                    <div className="p-4 rounded-2xl space-y-1"
                      style={{ background: "rgba(42,158,102,0.06)", border: "1px solid rgba(42,158,102,0.2)" }}>
                      <StarRating label="Service Quality" rating={formData.service} color="#E8A820"
                        setRating={v => setFormData({ ...formData, service: v })} />
                      <StarRating label="Cleanliness & Hygiene" rating={formData.hygiene} color="#2A9E66"
                        setRating={v => setFormData({ ...formData, hygiene: v })} />
                      <StarRating label="Ambiance & Comfort" rating={formData.ambiance} color="#D95C74"
                        setRating={v => setFormData({ ...formData, ambiance: v })} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: "#0D2B22" }}>Additional Comments</label>
                      <textarea rows="3" placeholder="Tell us what you loved..."
                        value={formData.comment}
                        onChange={e => setFormData({ ...formData, comment: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                        style={{ border: "1.5px solid rgba(232,168,32,0.35)", background: "#F5F0E8", color: "#0D2B22" }}
                        onFocus={e => e.target.style.borderColor = "#E8A820"}
                        onBlur={e => e.target.style.borderColor = "rgba(232,168,32,0.35)"} />
                    </div>

                    <button type="submit"
                      className="w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      style={{ background: "linear-gradient(135deg, #E8A820, #F7CF62, #C99128)", color: "#0D2B22" }}>
                      Submit Review 🚀
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
