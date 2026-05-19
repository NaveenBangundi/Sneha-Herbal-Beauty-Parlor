export default function Contact() {
  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 pb-24 scroll-mt-28" id="contact">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-[2rem] shadow-2xl border border-white/60 p-8 md:p-10 lg:p-12 transition-all duration-500 hover:border-[#E1B875]/40 hover:shadow-[0_0_40px_rgba(225,184,117,0.3)] relative overflow-hidden">
        
        {/* Inner Golden Glow Spotlights */}
        <div className="absolute w-[300px] h-[300px] bg-amber-400/20 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
        <div className="absolute w-[250px] h-[250px] bg-yellow-300/15 rounded-full blur-[70px] -bottom-20 -left-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

        <div className="relative z-10 w-full">
          <h3 className="text-3xl md:text-5xl font-bold text-center text-gray-800 font-[Playfair Display]">
          Visit Us 📍
        </h3>
        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto font-[Poppins]">
          Ready for a transformation? We'd love to hear from you. Drop by or reach out to book your appointment.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mt-12 w-full">
          <div className="flex-1 w-full space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xl shrink-0">
                🏡
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Address</h4>
                <p className="text-gray-600 mt-1 font-[Poppins]">Shop No SS1, SV Housing complex,<br />near pampa garden, Manvi,<br />Dist Raichur, Karnataka 584123</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 text-xl shrink-0">
                ⏰
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Working Hours</h4>
                <p className="text-gray-600 mt-1 font-[Poppins]">Everyday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl shrink-0">
                📞
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">Contact</h4>
                <p className="text-gray-600 mt-1 font-[Poppins]">Phone: +91 7406098184</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
              <button
                onClick={() => window.open("https://wa.me/917406098184?text=Hi, I have an inquiry")}
                className="bg-gradient-to-r from-green-500 to-green-700 text-white px-5 py-2.5 rounded-full text-sm md:text-base font-medium hover:scale-105 transition-all shadow-md hover:shadow-green-900/30 w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Chat on WhatsApp 💬
              </button>
              
              <button
                onClick={() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-green-50 hover:scale-105 transition-all shadow-md hover:shadow-green-900/10 w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Navigate to Shop 🛍️
              </button>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px] lg:min-h-[400px] rounded-3xl overflow-hidden shadow-inner border border-white/50 bg-gray-200 relative">
            <iframe
              src="https://maps.google.com/maps?q=SV+Housing+complex,+near+pampa+garden,+Manvi,+Karnataka+584123&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="absolute top-0 left-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
