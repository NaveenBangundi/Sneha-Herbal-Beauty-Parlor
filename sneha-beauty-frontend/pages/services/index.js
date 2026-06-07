import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fallbackServices = [
  { _id: "1", name: "Hydra Facial", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin.", price: 1500, durationInMinutes: 60 },
  { _id: "2", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert makeup to make you feel like a princess.", price: 5000, durationInMinutes: 120 },
  { _id: "3", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs.", price: 1000, durationInMinutes: 90 },
  { _id: "4", name: "Manicure", imageUrl: "/services/manicure.jpg", description: "Relaxing manicure sessions for elegant hands.", price: 800, durationInMinutes: 45 },
  { _id: "5", name: "Pedicure", imageUrl: "/services/pedicure.png", description: "Rejuvenating pedicure to soothe your feet.", price: 1000, durationInMinutes: 45 },
  { _id: "6", name: "Eyebrow", imageUrl: "/services/eyebrow.jpg", description: "Precision threading and shaping.", price: 150, durationInMinutes: 15 },
  { _id: "7", name: "Haircut", imageUrl: "/services/haircut.jpeg", description: "Trendy haircuts to match your style.", price: 500, durationInMinutes: 30 }
];

const categorizeService = (name) => {
  const n = name.toLowerCase();
  if (n.includes("hair") || n.includes("cut") || n.includes("head") || n.includes("spa")) {
    return "HAIR";
  }
  if (n.includes("facial") || n.includes("skin") || n.includes("pigmentation") || n.includes("face") || n.includes("renewal")) {
    return "SKIN";
  }
  if (n.includes("bridal") || n.includes("makeup") || n.includes("mehandi")) {
    return "BRIDAL";
  }
  return "GROOMING";
};

export default function ServicesPage() {
  const router = useRouter();
  const [servicesData, setServicesData] = useState(fallbackServices);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    appointmentDate: "",
    appointmentTime: ""
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3001/services");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setServicesData(data);
          }
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  // Group services
  const categories = {
    SKIN: servicesData.filter((s) => categorizeService(s.name) === "SKIN"),
    HAIR: servicesData.filter((s) => categorizeService(s.name) === "HAIR"),
    BRIDAL: servicesData.filter((s) => categorizeService(s.name) === "BRIDAL"),
    GROOMING: servicesData.filter((s) => categorizeService(s.name) === "GROOMING"),
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedService) return;
    setBookingLoading(true);
    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          serviceId: selectedService._id
        })
      });

      if (res.ok) {
        setBookingSuccess(true);
      } else {
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const openBookingModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setBookingSuccess(false);
    setFormData({
      customerName: "",
      customerPhone: "",
      appointmentDate: "",
      appointmentTime: ""
    });
  };

  return (
    <>
      <Head>
        <title>Sneha Herbal Boutique | Signature Rituals & Services</title>
        <meta
          name="description"
          content="Explore our complete range of professional herbal skin rituals, haircut and head therapies, premium bridal makeover packages, and grooming treatments."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="relative min-h-screen overflow-x-hidden bg-linen text-primary-dark pb-24">
        {/* BACKGROUND IMAGE */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center opacity-40 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: "url('/bg.png')",
          }}
        ></div>

        {/* OVERLAY */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-linen/60 via-sand/70 to-gold-light/35"></div>

        {/* PREMIUM GLOW */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-[600px] h-[600px] bg-gold-light/25 rounded-full blur-[150px] top-[-200px] left-[-200px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-primary-light/30 rounded-full blur-[150px] bottom-[-200px] right-[-200px]"></div>
        </div>

        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-linen/80 border-b border-gold-light/30 shadow-sm h-20 flex items-center">
          <div className="w-full px-4 md:px-10 flex items-center justify-between">
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

        {/* HERO HEADER - WRAPPED IN A CARD */}
        <div className="pt-36 px-4 md:px-6 max-w-6xl mx-auto mb-16">
          <div className="section-card rounded-[2rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute w-[300px] h-[300px] bg-gold-light/10 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0"></div>
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold-light/40 border border-gold-medium/20 text-gold-dark text-[10px] md:text-xs font-bold tracking-widest uppercase font-[Poppins]">
                ✨ Signature Rituals
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold text-primary-dark mt-4 font-serif">
                Our Services Catalog
              </h2>
              <p className="mt-4 text-primary-dark/70 font-[Poppins] font-light text-xs md:text-base max-w-lg mx-auto">
                Discover our certified organic facials, therapeutic hair design, custom bridal packages, and relaxing body rituals.
              </p>
            </div>
          </div>
        </div>

        {/* Category Sections */}
        <main className="max-w-6xl mx-auto px-4 md:px-6 space-y-20">
          {Object.entries(categories).map(([categoryName, services]) => {
            if (services.length === 0) return null;

            let categoryTitle = "";
            let categoryEmoji = "";
            let categoryDescription = "";

            if (categoryName === "HAIR") {
              categoryTitle = "Hair Care & Styling";
              categoryEmoji = "💇‍♀️";
              categoryDescription = "Revitalizing hair spas, cuts, coloring and repair rituals.";
            } else if (categoryName === "SKIN") {
              categoryTitle = "Skin Care & Facials";
              categoryEmoji = "🌸";
              categoryDescription = "Hydrating facials and organic skin renewal treatments.";
            } else if (categoryName === "BRIDAL") {
              categoryTitle = "Bridal & Occasion Makeup";
              categoryEmoji = "👰‍♀️";
              categoryDescription = "Beautiful mehandi and bridal grooming for your special events.";
            } else {
              categoryTitle = "Threading & Grooming Essentials";
              categoryEmoji = "✨";
              categoryDescription = "Precision eyebrows, manicures, pedicures and everyday care.";
            }

            return (
              <section key={categoryName} className="section-card rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden">
                {/* Glow Spotlights */}
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
                      {services.length} Rituals
                    </span>
                  </div>

                  {/* Services Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                      <div
                        key={service._id}
                        className="bg-white/65 border border-gold-light/30 hover:border-gold-primary/50 rounded-2xl overflow-hidden relative flex flex-col shadow-sm hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:scale-[1.02] transition-all duration-300 group h-full luxury-shadow"
                      >
                        {/* Image Area */}
                        <div className="h-48 w-full bg-sand relative overflow-hidden border-b border-gray-100 rounded-t-2xl">
                          <img
                            src={service.imageUrl || "/placeholder.jpg"}
                            alt={service.name}
                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => { e.target.src = "/services/facial.png"; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-65 group-hover:opacity-50 transition-opacity"></div>
                        </div>

                        {/* Card Body */}
                        <div className="p-4 bg-gradient-to-t from-sand/50 to-white/70 flex flex-col flex-1 text-left">
                          <h4 className="text-primary-dark text-base font-semibold font-serif mb-2 line-clamp-1">
                            {service.name}
                          </h4>
                          
                          <p className="text-primary-dark/70 text-xs font-light font-[Poppins] line-clamp-3 mb-4 h-12">
                            {service.description}
                          </p>

                          <div className="mt-auto space-y-4">
                            <div className="flex justify-between items-center text-xs font-[Poppins] border-t border-gold-light/25 pt-3">
                              <span className="text-gray-500 flex items-center gap-1">
                                ⏱️ {service.durationInMinutes} mins
                              </span>
                              <span className="text-primary-dark font-bold text-sm">
                                ₹{service.price.toLocaleString()}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => router.push(`/services/${service._id}`)}
                                className="py-2.5 bg-transparent border border-gold-primary text-gold-dark hover:bg-gold-light/20 font-bold text-[9px] md:text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 text-center"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => openBookingModal(service)}
                                className="py-2.5 bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white font-bold text-[9px] md:text-[10px] uppercase tracking-widest rounded-full border border-gold-medium/10 active:scale-[0.98] transition-all duration-300 shadow-md text-center"
                              >
                                Book
                              </button>
                            </div>
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

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 bg-[#0B2B24]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-primary-dark font-serif">Book Service</h3>
                  <p className="text-xs text-gold-dark font-[Poppins] mt-1">{selectedService.name}</p>
                </div>
                <button onClick={closeModal} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6L18 18" /></svg>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary-light text-primary-dark rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-gold-primary/10">✓</div>
                  <h4 className="text-xl font-bold text-primary-dark mb-2 font-serif">Booking Successful!</h4>
                  <p className="text-primary-dark/80 text-sm">We will contact you shortly to confirm.</p>
                  <button 
                    onClick={closeModal}
                    className="mt-6 w-full bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gold-medium/10"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1 text-left">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1 text-left">Phone</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-dark mb-1 text-left">Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-dark mb-1 text-left">Time</label>
                      <input 
                        type="time" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-6 flex items-center justify-center gap-2 border border-gold-medium/10"
                  >
                    {bookingLoading ? (
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                    ) : 'Confirm Booking'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
