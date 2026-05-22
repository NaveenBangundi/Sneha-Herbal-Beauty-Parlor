import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productsList = [
  { id: 1, name: "De Fabulous Reviver Hair Repair Shampoo 250ml", category: "HAIR", price: 1190, originalPrice: 1400, size: "250ml", image: "/services/haircut.jpeg", trending: true, isBestseller: true, discount: "15%" },
  { id: 2, name: "De Fabulous Reviver Hair Repair Conditioner 250ml", category: "HAIR", price: 1338, originalPrice: 1575, size: "250ml", image: "/services/haircut.jpeg", trending: true, isBestseller: true, discount: "15%" },
  { id: 3, name: "Schwarzkopf Professional Repair Rescue Shampoo 250ml", category: "HAIR", price: 867, originalPrice: 1020, size: "250ml", image: "/services/haircut.jpeg", trending: true, isBestseller: true, discount: "15%" },
  { id: 4, name: "De Fabulous Hair Repair Shampoo + Conditioner Kit", category: "HAIR", price: 2678, originalPrice: 3150, size: "Kit", image: "/services/haircut.jpeg", trending: true, isBestseller: true, discount: "15%" },
  { id: 5, name: "Hydrating Facial Moisturizer with Aloe Vera", category: "SKIN", price: 450, originalPrice: 600, size: "100ml", image: "/services/facial.png", trending: true, isBestseller: true, discount: "25%" },
  { id: 6, name: "Herbal Rose Water Skin Toner 200ml", category: "SKIN", price: 180, originalPrice: 250, size: "200ml", image: "/services/facial.png", trending: false, isBestseller: true, discount: "28%" },
  { id: 7, name: "Organic Glow Night Cream 50g", category: "SKIN", price: 450, originalPrice: 550, size: "50g", image: "/services/facial.png", trending: true, isBestseller: false, discount: "18%" },
  { id: 8, name: "Skin Care Brightening Kit", category: "SKIN", price: 1500, originalPrice: 1800, size: "Kit", image: "/services/facial.png", trending: false, isBestseller: true, discount: "16%" },
  { id: 9, name: "Premium Matte Liquid Lipstick Longwear", category: "MAKEUP", price: 499, originalPrice: 699, size: "6ml", image: "/services/bridal.jpg", trending: true, isBestseller: true, discount: "28%" },
  { id: 10, name: "HD Waterproof Liquid Foundation", category: "MAKEUP", price: 850, originalPrice: 1200, size: "30ml", image: "/services/bridal.jpg", trending: true, isBestseller: false, discount: "29%" },
  { id: 11, name: "Imitation Golden Jewellery Set", category: "MAKEUP", price: 1200, originalPrice: 1600, size: "Set", image: "/services/bridal.jpg", trending: false, isBestseller: true, discount: "25%" },
];

const TABS = [
  { id: "TRENDING", label: "🔥 Trending", color: "#D95C74", bg: "linear-gradient(135deg, #D95C74, #F07A90)" },
  { id: "SKIN",     label: "✨ Skin",     color: "#C99128", bg: "linear-gradient(135deg, #E8A820, #F7CF62)" },
  { id: "HAIR",     label: "💇 Hair",     color: "#1A5C3F", bg: "linear-gradient(135deg, #1A5C3F, #2A9E66)" },
  { id: "MAKEUP",   label: "💄 Makeup",   color: "#7A5210", bg: "linear-gradient(135deg, #C99128, #F2BE3A)" },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState("TRENDING");
  const [startIndex, setStartIndex] = useState(0);

  const filteredProducts = activeTab === "TRENDING"
    ? productsList.filter(p => p.trending)
    : productsList.filter(p => p.category === activeTab);
  const displayedProducts = filteredProducts.slice(startIndex, startIndex + 4);
  const activeTabData = TABS.find(t => t.id === activeTab);

  const handleNext = () => { if (startIndex + 4 < filteredProducts.length) setStartIndex(p => p + 1); };
  const handlePrev = () => { if (startIndex > 0) setStartIndex(p => p - 1); };

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="shop">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] shadow-2xl relative overflow-hidden luxury-shadow"
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(232,168,32,0.25)" }}>

        {/* Rainbow top strip */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg,#D95C74,#E8A820,#2A9E66,#F7CF62,#3DBF7F,#D95C74)" }} />

        {/* Background glows */}
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] -top-24 -right-24 pointer-events-none z-0"
          style={{ background: `radial-gradient(circle, ${activeTabData?.color}55 0%, transparent 70%)`, transition: "background 0.5s" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[90px] -bottom-24 -left-24 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(42,158,102,0.25) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-8 md:p-10 lg:p-12">

          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: "#E8A820" }}>✦ Our Collection</p>
            <h3 className="text-3xl md:text-5xl font-bold font-serif" style={{ color: "#0D2B22" }}>
              Product{" "}
              <span style={{ background: "linear-gradient(135deg, #E8A820, #F7CF62, #C99128)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Spotlight
              </span>{" "}🛍️
            </h3>
            <p className="mt-3 font-light text-sm" style={{ color: "rgba(13,43,34,0.65)" }}>
              Discover our premium beauty products
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-2 p-1.5 rounded-full shadow-inner"
              style={{ background: "rgba(13,43,34,0.06)", border: "1px solid rgba(232,168,32,0.2)" }}>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setStartIndex(0); }}
                    className="px-4 md:px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-all duration-300"
                    style={isActive
                      ? { background: tab.bg, color: "#fff", boxShadow: `0 4px 16px ${tab.color}55`, transform: "scale(1.07)" }
                      : { color: "rgba(13,43,34,0.6)", background: "transparent" }}>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Carousel */}
          <div className="relative flex items-center gap-2 md:gap-4">
            {/* Left Arrow */}
            <button onClick={handlePrev} disabled={startIndex === 0}
              className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
              style={startIndex === 0
                ? { background: "#f0f0f0", opacity: 0.35, cursor: "not-allowed" }
                : { background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62", boxShadow: "0 4px 16px rgba(13,43,34,0.3)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-1">
              <AnimatePresence>
                {displayedProducts.map((product, i) => (
                  <motion.div key={product.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="group flex flex-col rounded-2xl overflow-hidden card-hover"
                    style={{ background: "white", border: "1px solid rgba(232,168,32,0.15)", boxShadow: "0 4px 20px rgba(13,43,34,0.07)" }}>

                    {/* Image area */}
                    <div className="h-52 w-full relative flex items-center justify-center p-5 overflow-hidden"
                      style={{ background: "linear-gradient(135deg, #F5F0E8 0%, #EDE6D6 100%)" }}>

                      {/* Badges */}
                      <div className="absolute top-3 right-3 flex flex-col gap-1 items-end z-10">
                        {product.isBestseller && (
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
                            style={{ background: "linear-gradient(135deg, #2A9E66, #3DBF7F)", color: "white" }}>
                            BESTSELLER
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wider"
                            style={{ background: "linear-gradient(135deg, #E8A820, #F7CF62)", color: "#5C3D0A" }}>
                            {product.discount} OFF
                          </span>
                        )}
                      </div>

                      {/* Wishlist */}
                      <button className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                        style={{ background: "rgba(255,255,255,0.9)", color: "#D95C74" }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      <img src={product.image} alt={product.name}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = "/hero-image.png"; }} />

                      {/* Quick add */}
                      <button className="absolute bottom-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg font-bold text-sm transition-all duration-300 hover:scale-110"
                        style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62" }}>
                        +
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-xs md:text-sm font-semibold leading-snug mb-2 line-clamp-2"
                        style={{ color: "#0D2B22" }}>
                        {product.name}
                      </h4>

                      <span className="inline-block text-[9px] font-bold px-2.5 py-1 rounded-full w-fit mb-3 tracking-wider"
                        style={{ background: "rgba(232,168,32,0.12)", color: "#A3711A", border: "1px solid rgba(232,168,32,0.25)" }}>
                        {product.size}
                      </span>

                      <div className="mt-auto">
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className="font-bold text-base" style={{ color: "#0D2B22" }}>
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="line-through text-xs" style={{ color: "rgba(13,43,34,0.4)" }}>
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <button className="w-full py-2.5 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                          style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62", border: "1px solid rgba(232,168,32,0.3)" }}>
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button onClick={handleNext} disabled={startIndex + 4 >= filteredProducts.length}
              className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 shadow-md"
              style={startIndex + 4 >= filteredProducts.length
                ? { background: "#f0f0f0", opacity: 0.35, cursor: "not-allowed" }
                : { background: "linear-gradient(135deg, #E8A820, #F7CF62)", color: "#0D2B22", boxShadow: "0 4px 16px rgba(232,168,32,0.4)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* View All */}
          <div className="flex justify-center mt-10">
            <button className="px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ border: "2px solid #E8A820", color: "#A3711A", background: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg,#E8A820,#F7CF62)"; e.currentTarget.style.color = "#0D2B22"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#A3711A"; }}>
              View All Products ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
