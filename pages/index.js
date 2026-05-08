import { motion } from "framer-motion";

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
            <a href="#" className="hover:text-green-700 transition">Home</a>
            <a href="#about" className="hover:text-green-700 transition">About</a>
            <a href="#services" className="hover:text-green-700 transition">Services</a>
            <a href="#gallery" className="hover:text-green-700 transition">Gallery</a>
            <a href="#contact" className="hover:text-green-700 transition">Contact</a>

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
      <div className="pt-28 md:pt-32 flex justify-center px-4 md:px-6">

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

      {/* 💄 SERVICES */}
      <div className="mt-20 md:mt-24 px-6 md:px-20 lg:px-32" id="services">
        <h3 className="text-3xl md:text-5xl font-bold text-center text-gray-800">
          Our Services 💄
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 mt-10 md:mt-12">

          {[
            { name: "Hydra Facial", img: "/services/facial.png" },
            { name: "Bridal Makeup", img: "/services/bridal.jpg" },
            { name: "Mehandi", img: "/services/mehandi.jpg" },
            { name: "Manicure", img: "/services/manicure.jpg" },
            { name: "Pedicure", img: "/services/pedicure.png" },
            { name: "Eyebrow", img: "/services/eyebrow.jpg" },
            { name: "Haircut", img: "/services/haircut.jpeg" },
          ].map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="group bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-green-900/20 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">

                {/* IMAGE */}
                <div className="aspect-square max-h-[3100px] overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>
              </div>
              {/* CONTENT */}
              <div className="p-5">
                <h4 className="text-xl font-semibold text-green-800">
                  {service.name}
                </h4>
                <p className="mt-2 text-gray-600">
                  Professional {service.name.toLowerCase()} service.
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>

      {/* ⭐ REVIEWS */}
      <div className="mt-20 md:mt-32 px-6 text-center pb-20">
        <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
          Customer Reviews ⭐
        </h3>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-green-900/20 cursor-pointer"
          >
            <p>"Amazing service! Loved the facial."</p>
            <h4 className="mt-2 font-semibold">- Priya</h4>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/30 transition-shadow duration-300 hover:shadow-2xl hover:shadow-green-900/20 cursor-pointer"
          >
            <p>"Best bridal makeup in town ❤️"</p>
            <h4 className="mt-2 font-semibold">- Sneha</h4>
          </motion.div>
        </div>
      </div>

    </div>
  );
}