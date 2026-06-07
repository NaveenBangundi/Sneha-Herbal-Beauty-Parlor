export default function Contact() {
  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 pb-24 scroll-mt-28" id="contact">
      <div className="max-w-5xl mx-auto section-card rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Inner Golden Glow Spotlights */}
        <div className="absolute w-[300px] h-[300px] bg-gold-light/20 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
        <div className="absolute w-[250px] h-[250px] bg-primary-light/35 rounded-full blur-[70px] -bottom-20 -left-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

        <div className="relative z-10 w-full">
          <h3 className="text-3xl md:text-5xl font-semibold text-center text-primary-dark font-serif">
          Visit Us 📍
        </h3>
        <p className="text-center text-primary-dark/80 mt-4 max-w-2xl mx-auto font-[Poppins] font-light">
          Ready for a transformation? We'd love to hear from you. Drop by or reach out to book your appointment.
        </p>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 mt-12 w-full">
          <div className="flex-1 w-full space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#EAF2F0] border border-gold-light/30 flex items-center justify-center text-primary-dark text-xl shrink-0">
                🏡
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary-dark">Address</h4>
                <p className="text-primary-dark/80 mt-1 font-[Poppins] font-light leading-relaxed">Shop No SS1, SV Housing complex,<br />near pampa garden, Manvi,<br />Dist Raichur, Karnataka 584123</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-light/45 border border-gold-light/30 flex items-center justify-center text-gold-dark text-xl shrink-0">
                ⏰
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary-dark">Working Hours</h4>
                <p className="text-primary-dark/80 mt-1 font-[Poppins] font-light">Everyday: 10:00 AM - 7:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gold-extra-light/50 border border-gold-light/30 flex items-center justify-center text-gold-dark text-xl shrink-0">
                📞
              </div>
              <div>
                <h4 className="text-xl font-bold text-primary-dark">Contact</h4>
                <p className="text-primary-dark/80 mt-1 font-[Poppins] font-light">Phone: +91 7406098184</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full">
              <button
                onClick={() => window.open("https://wa.me/917406098184?text=Hi, I have an inquiry")}
                className="bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white px-5 py-2.5 rounded-full text-sm md:text-base font-medium hover:scale-105 transition-all shadow-md hover:shadow-primary-medium/20 border border-gold-medium/10 w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Chat on WhatsApp 💬
              </button>
              
              <button
                onClick={() => {
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-transparent border border-gold-primary text-gold-dark px-5 py-2.5 rounded-full text-sm md:text-base font-medium hover:bg-gold-light/20 hover:scale-105 transition-all shadow-md w-full sm:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Navigate to Shop 🛍️
              </button>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[300px] lg:min-h-[400px] rounded-3xl overflow-hidden shadow-inner border border-gold-light/30 bg-sand relative luxury-shadow">
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
