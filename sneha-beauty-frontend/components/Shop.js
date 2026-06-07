import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export const productsList = [
  // HAIR
  {
    id: 1,
    name: "De Fabulous Reviver Hair Repair Shampoo 250ml",
    category: "HAIR",
    price: 1190,
    originalPrice: 1400,
    size: "250ml",
    image: "/services/shampoo.png",
    trending: true,
    isBestseller: true,
    discount: "15%"
  },
  {
    id: 2,
    name: "De Fabulous Reviver Hair Repair Conditioner 250ml",
    category: "HAIR",
    price: 1338,
    originalPrice: 1575,
    size: "250ml",
    image: "/services/conditioner.png",
    trending: true,
    isBestseller: true,
    discount: "15%"
  },
  {
    id: 3,
    name: "Organic Henna Mehandi (For Hair Coloring)",
    category: "HAIR",
    price: 180,
    originalPrice: 240,
    size: "200g",
    image: "/services/henna.png",
    trending: true,
    isBestseller: true,
    discount: "25%"
  },
  {
    id: 4,
    name: "Natural Herbal Black Hair Dye",
    category: "HAIR",
    price: 299,
    originalPrice: 399,
    size: "100ml",
    image: "/services/hair_dye.png",
    trending: true,
    isBestseller: false,
    discount: "25%"
  },
  {
    id: 5,
    name: "Schwarzkopf Professional Repair Rescue Shampoo 250ml",
    category: "HAIR",
    price: 867,
    originalPrice: 1020,
    size: "250ml",
    image: "/services/schwarzkopf.png",
    trending: false,
    isBestseller: true,
    discount: "15%"
  },
  
  // SKIN
  {
    id: 6,
    name: "Herbal Daily Protection Day Cream SPF 30",
    category: "SKIN",
    price: 399,
    originalPrice: 499,
    size: "50g",
    image: "/services/day_cream.png",
    trending: true,
    isBestseller: true,
    discount: "20%"
  },
  {
    id: 7,
    name: "Organic Glow Night Cream 50g",
    category: "SKIN",
    price: 450,
    originalPrice: 550,
    size: "50g",
    image: "/services/night_cream.png",
    trending: true,
    isBestseller: false,
    discount: "18%"
  },
  {
    id: 8,
    name: "Hydrating Facial Moisturizer with Aloe Vera",
    category: "SKIN",
    price: 450,
    originalPrice: 600,
    size: "100ml",
    image: "/services/moisturizer.png",
    trending: true,
    isBestseller: true,
    discount: "25%"
  },
  {
    id: 9,
    name: "Pure Herbal Rose Water Skin Toner 200ml",
    category: "SKIN",
    price: 180,
    originalPrice: 250,
    size: "200ml",
    image: "/services/rose_water.png",
    trending: true,
    isBestseller: true,
    discount: "28%"
  },
  {
    id: 10,
    name: "De-Tan Tan Removal Cream Pack",
    category: "SKIN",
    price: 320,
    originalPrice: 450,
    size: "100g",
    image: "/services/tan_removal.png",
    trending: true,
    isBestseller: true,
    discount: "28%"
  },

  // MAKEUP
  {
    id: 11,
    name: "Premium Matte Liquid Lipstick Longwear",
    category: "MAKEUP",
    price: 499,
    originalPrice: 699,
    size: "6ml",
    image: "/services/lipstick.png",
    trending: true,
    isBestseller: true,
    discount: "28%"
  },
  {
    id: 12,
    name: "HD Waterproof Liquid Foundation",
    category: "MAKEUP",
    price: 850,
    originalPrice: 1200,
    size: "30ml",
    image: "/services/foundation.png",
    trending: true,
    isBestseller: false,
    discount: "29%"
  },
  {
    id: 13,
    name: "Herbal Kajal & Waterproof Eyeliner Duo",
    category: "MAKEUP",
    price: 350,
    originalPrice: 450,
    size: "Pack",
    image: "/services/kajal.png",
    trending: true,
    isBestseller: true,
    discount: "22%"
  },
  {
    id: 14,
    name: "Imitation Golden Jewellery Set",
    category: "MAKEUP",
    price: 1200,
    originalPrice: 1600,
    size: "Set",
    image: "/services/jewellery.png",
    trending: false,
    isBestseller: true,
    discount: "25%"
  }
];

export default function Shop() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("TRENDING");
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter products based on selected tab
  const filteredProducts = activeTab === "TRENDING"
    ? productsList.filter(p => p.trending)
    : productsList.filter(p => p.category === activeTab);

  const handleNext = () => {
    if (startIndex + visibleCards < filteredProducts.length) {
      setStartIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    }
  };

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="shop">
      <div className="max-w-6xl mx-auto section-card rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Inner Golden Glow Spotlights */}
        <div className="absolute w-[300px] h-[300px] bg-gold-light/20 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
        <div className="absolute w-[250px] h-[250px] bg-primary-light/35 rounded-full blur-[70px] -bottom-20 -left-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

        <div className="relative z-10 w-full">
          {/* Section Title */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-5xl font-semibold text-primary-dark font-serif">
            Product Spotlight 🛍️
          </h3>
          <p className="mt-4 text-primary-dark/70 font-[Poppins] font-light text-xs md:text-sm">
            Discover our premium beauty products
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#EAF2F0]/80 backdrop-blur-md p-1.5 rounded-full flex gap-1 shadow-inner border border-gold-light/20 relative">
            {["TRENDING", "SKIN", "HAIR", "MAKEUP"].map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setStartIndex(0);
                  }}
                  className={`relative px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-primary-dark/70 hover:text-primary-dark"
                  }`}
                >
                  <span className="relative z-10">{tab}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabSpotlight"
                      className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary-medium rounded-full shadow-md border border-gold-primary/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Carousel Grid */}
        <div className="relative flex items-center gap-2 md:gap-4 overflow-hidden">
          
          {/* Left Scroll Button */}
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className={`w-10 h-10 shrink-0 rounded-full border border-gold-light/50 flex items-center justify-center bg-white shadow-sm hover:bg-gold-light/10 transition-all z-20 ${
              startIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:shadow-md active:scale-95 text-primary-dark"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Products Row */}
          <div className="overflow-hidden flex-1 w-full py-4">
            <motion.div
              animate={{ x: `calc(-${startIndex * 100}% / ${visibleCards} - ${startIndex * 16}px)` }}
              transition={{ type: "spring", stiffness: 170, damping: 24 }}
              className="flex gap-4 w-full"
            >
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)] shrink-0 bg-white/60 border border-gold-light/30 hover:border-gold-primary/50 rounded-2xl overflow-hidden relative flex flex-col shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:scale-[1.02] transition-all duration-300 group h-full luxury-shadow"
                >
                  {/* Image Area */}
                  <div className="h-60 w-full bg-white relative flex items-center justify-center p-6 border-b border-gray-100 rounded-t-2xl overflow-hidden">
                    
                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain rounded-2xl transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = "/hero-image.png"; }}
                    />

                    {/* Product Badges */}
                    <div className="absolute top-4 right-4 flex flex-col gap-1 items-end z-10">
                      {product.isBestseller && (
                        <span className="bg-primary-light text-primary-dark text-[8px] font-bold px-2 py-0.5 rounded tracking-widest uppercase border border-primary-medium/10">
                          BESTSELLER
                        </span>
                      )}
                      {product.discount && (
                        <span className="bg-gold-light text-gold-dark text-[8px] font-bold px-2 py-0.5 rounded tracking-wider border border-gold-medium/10">
                          {product.discount} OFF
                        </span>
                      )}
                    </div>

                    {/* Wishlist Heart Icon (Floats on top, clickable) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id);
                      }}
                      className={`absolute top-4 left-4 z-20 p-1.5 rounded-full bg-white/75 backdrop-blur-md shadow-sm hover:scale-110 active:scale-95 transition-all duration-300 ${
                        favorites.includes(product.id) ? "text-rose-500" : "text-primary-medium hover:text-primary-dark"
                      }`}
                    >
                      <svg className="w-4 h-4" fill={favorites.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Plus Button */}
                    <button className="absolute bottom-3 right-3 z-10 bg-primary-dark text-white w-6 h-6 flex items-center justify-center rounded font-bold text-sm hover:bg-primary-medium transition-colors">
                      +
                    </button>
                  </div>

                  {/* Body Card */}
                  <div className="p-4 bg-gradient-to-t from-sand/50 to-white/70 flex flex-col flex-1 text-left">
                    <h4 className="text-primary-dark text-xs md:text-sm font-medium font-[Poppins] leading-snug mb-2 line-clamp-2 h-10">
                      {product.name}
                    </h4>

                    {/* Size tag */}
                    <span className="inline-block bg-gold-light/35 text-gold-dark text-[9px] font-semibold px-3 py-1 rounded-full w-fit mb-4 tracking-wider font-[Poppins] border border-gold-medium/10">
                      {product.size}
                    </span>

                    {/* Price and Add to Cart */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-primary-dark font-bold text-sm md:text-base">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-400 line-through text-xs font-light">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>

                       <button className="w-full py-2.5 bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-full border border-gold-medium/10 active:scale-[0.98] transition-all duration-300 shadow-md">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={handleNext}
            disabled={startIndex + visibleCards >= filteredProducts.length}
            className={`w-10 h-10 shrink-0 rounded-full border border-gold-light/50 flex items-center justify-center bg-white shadow-sm hover:bg-gold-light/10 transition-all z-20 ${
              startIndex + visibleCards >= filteredProducts.length ? "opacity-30 cursor-not-allowed" : "hover:scale-105 hover:shadow-md active:scale-95 text-primary-dark"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => router.push("/shop")}
            className="bg-transparent border border-gold-primary text-gold-dark font-bold text-[10px] md:text-xs tracking-widest uppercase px-8 py-3 rounded-full shadow-lg hover:bg-gold-light/20 hover:scale-105 active:scale-98 transition-all duration-300"
          >
            View All Products
          </button>
        </div>

        </div>
      </div>
    </div>
  );
}
