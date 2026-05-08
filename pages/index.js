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
        <div className="w-full px-10 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img src="/sneha-logo.png" alt="logo" className="h-16 w-auto object-contain" />
            <h1 className="text-xl font-bold text-green-900">
              Sneha Herbal Beauty Parlor
            </h1>
          </div>

          {/* MENU */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
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
              className="bg-gradient-to-r from-green-600 to-green-800 text-white px-5 py-2 rounded-full hover:scale-105 transition shadow-md"
            >
              Book Now
            </button>
          </div>

        </div>
      </nav>

      {/* 🌟 HERO SECTION */}
      <div className="pt-32 flex justify-center px-6">

        <div className="bg-white/20 backdrop-blur-md rounded-2xl px-8 py-10 max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 shadow-lg">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-green-900 leading-tight font-[Playfair Display]">
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
              className="mt-6 bg-gradient-to-r from-green-600 to-green-800 text-white px-8 py-3 rounded-full text-lg hover:scale-105 transition shadow-xl"
            >
              Book Appointment 💬
            </button>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center ">
            <img
              src="/hero-image.png"
              alt="beauty"
              className="max-w-[360px] md:max-w-[320px] object-contain opacity-90 drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
            />
          </div>

        </div>

      </div>

      {/* 💄 SERVICES */}
      <div className="mt-22 px-50" id="services">
  <h3 className="text-5xl font-bold text-center text-gray-800">
    Our Services 💄
  </h3>

  <div className="grid md:grid-cols-3 gap-10 mt-12">

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
        whileHover={{ scale: 1.05 }}
        className="bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 overflow-hidden"
      >
      <div className="aspect-square overflow-hidden">

        {/* IMAGE */}
        <div className="aspect-square max-h-[3100px] overflow-hidden">
          <img
            src={service.img}
            alt={service.name}
            className="w-full h-full object-cover transition duration-300 hover:scale-110"
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
      <div className="mt-32 px-6 text-center pb-20">
        <h3 className="text-4xl font-bold text-gray-800">
          Customer Reviews ⭐
        </h3>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/30"
          >
            <p>"Amazing service! Loved the facial."</p>
            <h4 className="mt-2 font-semibold">- Priya</h4>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white/50 backdrop-blur-lg p-6 rounded-xl shadow-xl border border-white/30"
          >
            <p>"Best bridal makeup in town ❤️"</p>
            <h4 className="mt-2 font-semibold">- Sneha</h4>
          </motion.div>
        </div>
      </div>

    </div>
  );
}