import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { productsList } from "../components/Shop";

export default function ShopPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Group products by category
  const categories = {
    HAIR: productsList.filter((p) => p.category === "HAIR"),
    SKIN: productsList.filter((p) => p.category === "SKIN"),
    MAKEUP: productsList.filter((p) => p.category === "MAKEUP"),
  };

  return (
    <>
      <Head>
        <title>Sneha Herbal Boutique | Premium Herbal Products Catalog</title>
        <meta
          name="description"
          content="Browse our complete collection of 100% organic herbal skin care, hair repair shampoo, organic henna mehandi, natural dye, and premium longwear cosmetics."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen overflow-x-hidden bg-linen text-primary-dark pb-24">
        {/* 🌿 BACKGROUND IMAGE */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url('/bg.png')",
          }}
        ></div>

        {/* 🎨 OVERLAY */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-linen/60 via-sand/70 to-gold-light/35"></div>

        {/* ✨ PREMIUM GLOW */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-gold-light/25 rounded-full blur-[150px] top-[-200px] left-[-200px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-primary-light/30 rounded-full blur-[150px] bottom-[-200px] right-[-200px]"></div>
        </div>

        {/* 🔝 NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-linen/80 border-b border-gold-light/30 shadow-sm h-20 flex items-center">
          <div className="w-full px-4 md:px-10 flex items-center justify-between">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <img src="/sneha-logo.png" alt="logo" className="h-12 md:h-16 w-auto object-contain shrink-0 filter brightness-95" onError={(e) => { e.target.style.display = 'none'; }} />
              <h1 className="text-base md:text-lg lg:text-2xl font-semibold font-serif text-primary-dark tracking-wide leading-tight">
                Sneha Herbal <span className="text-gold-dark font-normal">Beauty Parlor</span>
              </h1>
            </div>
            
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300 border border-gold-medium/20 shadow-md uppercase tracking-wider text-[10px] md:text-xs font-bold"
            >
              ➔ Back to Home
            </button>
          </div>
        </nav>

        {/* HERO HEADER */}
        <div className="pt-36 px-4 md:px-6 max-w-6xl mx-auto mb-16">
          <div className="section-card rounded-[2rem] p-8 md:p-10 text-center relative overflow-hidden">
            <div className="absolute w-[200px] h-[200px] bg-gold-light/10 rounded-full blur-[60px] -top-10 -right-10 pointer-events-none z-0"></div>
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/40 border border-gold-medium/20 text-gold-dark text-[10px] md:text-xs font-bold tracking-widest uppercase font-[Poppins]">
                🛍️ Product Catalog
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-primary-dark mt-4 font-serif">
                Our Collection
              </h2>
              <p className="mt-4 text-primary-dark/70 font-[Poppins] font-light text-xs md:text-base max-w-lg mx-auto">
                Explore our certified organic herbal treatments, skin care solutions, and premium cosmetics.
              </p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-20">
          {Object.entries(categories).map(([categoryName, products]) => {
            let categoryTitle = "";
            let categoryEmoji = "";
            let categoryDescription = "";

            if (categoryName === "HAIR") {
              categoryTitle = "Hair Care & Coloring";
              categoryEmoji = "💇‍♀️";
              categoryDescription = "Revitalize your locks with organic henna, hair dye, and deep repair treatments.";
            } else if (categoryName === "SKIN") {
              categoryTitle = "Skin Care & Glow Elixirs";
              categoryEmoji = "🌸";
              categoryDescription = "Gentle day/night moisturization and protection for naturally radiant skin.";
            } else {
              categoryTitle = "Exquisite Makeup Essentials";
              categoryEmoji = "💄";
              categoryDescription = "Glam up with high-definition, longwear modern beauty essentials.";
            }

            return (
              <section key={categoryName} className="section-card rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden">
                {/* Inner Golden Glow Spotlights */}
                <div className="absolute w-[300px] h-[300px] bg-gold-light/10 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
                <div className="absolute w-[250px] h-[250px] bg-primary-light/20 rounded-full blur-[70px] -bottom-20 -left-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

                <div className="relative z-10 w-full space-y-8">
                  {/* Category Header */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gold-light/40 pb-4 gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-primary-dark font-serif flex items-center gap-2">
                        <span>{categoryEmoji}</span>
                        <span>{categoryTitle}</span>
                      </h3>
                      <p className="text-primary-dark/65 font-[Poppins] text-xs md:text-sm font-light mt-1">
                        {categoryDescription}
                      </p>
                    </div>
                    <span className="bg-gold-light/40 border border-gold-medium/10 text-gold-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-[Poppins]">
                      {products.length} Items
                    </span>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white/65 border border-gold-light/30 hover:border-gold-primary/50 rounded-2xl overflow-hidden relative flex flex-col shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:scale-[1.02] transition-all duration-300 group h-full luxury-shadow"
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

                          {/* Badges */}
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

                        {/* Card Body */}
                        <div className="p-4 bg-gradient-to-t from-sand/50 to-white/70 flex flex-col flex-1 text-left">
                          <h4 className="text-primary-dark text-xs md:text-sm font-medium font-[Poppins] leading-snug mb-2 line-clamp-2 h-10">
                            {product.name}
                          </h4>

                          <span className="inline-block bg-gold-light/35 text-gold-dark text-[9px] font-semibold px-3 py-1 rounded-full w-fit mb-4 tracking-wider border border-gold-medium/10 font-[Poppins]">
                            {product.size}
                          </span>

                          <div className="mt-auto">
                            <div className="flex items-baseline gap-2 mb-3">
                              <span className="text-primary-dark font-bold text-sm md:text-base font-[Poppins]">
                                ₹{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && (
                                <span className="text-gray-400 line-through text-xs font-light font-[Poppins]">
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
                  </div>
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </>
  );
}
