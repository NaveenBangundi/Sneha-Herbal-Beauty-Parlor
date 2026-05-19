import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const productsList = [
  { id: 1, name: "Henna Hair Mehendi", category: "Hair Care", price: 250, image: "/services/mehandi.jpg" },
  { id: 2, name: "Nail Polish", category: "Cosmetics", price: 150, image: "/services/manicure.jpg" },
  { id: 3, name: "Lipstick", category: "Cosmetics", price: 450, image: "/services/bridal.jpg" },
  { id: 4, name: "Mehandi Cone", category: "Body Art", price: 50, image: "/services/mehandi.jpg" },
  { id: 5, name: "Imitation Jewellery", category: "Accessories", price: 1200, image: "/services/bridal.jpg" },
  { id: 6, name: "Moisturizer", category: "Skin Care", price: 350, image: "/services/facial.png" },
  { id: 7, name: "Rose Water", category: "Skin Care", price: 120, image: "/services/facial.png" },
  { id: 8, name: "Day Cream", category: "Skin Care", price: 400, image: "/services/facial.png" },
  { id: 9, name: "Night Cream", category: "Skin Care", price: 450, image: "/services/facial.png" },
  { id: 10, name: "Skin Care Kit", category: "Skin Care", price: 1500, image: "/services/facial.png" }
];

export default function Shop() {
  const [showAll, setShowAll] = useState(false);

  const displayedProducts = showAll ? productsList : productsList.slice(0, 4);

  return (
    <div className="mt-20 md:mt-24 px-4 md:px-6 scroll-mt-28 mb-20" id="shop">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-[2rem] shadow-2xl border border-white/60 p-8 md:p-10 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 font-[Playfair Display]">
              Our Shop 🛍️
            </h3>
            <p className="text-gray-600 mt-2 font-[Poppins]">
              Discover our premium beauty products.
            </p>
          </div>
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-6 md:mt-0 bg-white border border-green-600 text-green-600 px-6 py-3 rounded-full font-bold hover:bg-green-50 hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-sm"
          >
            {showAll ? "Show Less" : "View all products"}
          </button>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <AnimatePresence>
            {displayedProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={product.id}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-green-400/50 transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="h-56 w-full bg-gray-100 relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => { e.target.src = "/hero-image.png"; }}
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 bg-gradient-to-t from-green-50/50 to-white">
                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1 font-[Poppins]">
                    {product.category}
                  </span>
                  <h4 className="text-lg font-bold text-gray-800 font-[Playfair Display] mb-2 leading-tight">
                    {product.name}
                  </h4>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold text-green-800">
                      ₹{product.price}
                    </span>
                    <button className="bg-green-100 text-green-700 p-2 rounded-full group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
