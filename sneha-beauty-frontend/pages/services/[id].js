import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const fallbackServices = [
  { _id: "1", name: "Hydra Facial", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin.", price: 1500, durationInMinutes: 60 },
  { _id: "2", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert makeup to make you feel like a princess.", price: 5000, durationInMinutes: 120 },
  { _id: "3", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs.", price: 1000, durationInMinutes: 90 },
  { _id: "4", name: "Manicure", imageUrl: "/services/manicure.jpg", description: "Relaxing manicure sessions for elegant hands.", price: 800, durationInMinutes: 45 },
  { _id: "5", name: "Pedicure", imageUrl: "/services/pedicure.png", description: "Rejuvenating pedicure to soothe your feet.", price: 1000, durationInMinutes: 45 },
  { _id: "6", name: "Eyebrow", imageUrl: "/services/eyebrow.jpg", description: "Precision threading and shaping.", price: 150, durationInMinutes: 15 },
  { _id: "7", name: "Haircut", imageUrl: "/services/haircut.jpeg", description: "Trendy haircuts to match your style.", price: 500, durationInMinutes: 30 }
];

export default function ServiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    appointmentDate: '',
    appointmentTime: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      const res = await fetch(`http://localhost:3001/services/${id}`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data) {
          setService(data);
          setLoading(false);
          return;
        }
      }
      const fallback = fallbackServices.find(s => s._id === id);
      if (fallback) {
        setService(fallback);
      }
      setLoading(false);
    };

    fetchService();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);

    const res = await fetch("http://localhost:3001/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        serviceId: id
      })
    }).catch(() => null);

    if (res && res.ok) {
      setBookingSuccess(true);
    } else {
      console.error("Booking failed");
      alert("Booking failed. Server is currently offline. Please try booking via WhatsApp directly!");
    }
    setBookingLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-linen via-sand to-gold-light/20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-linen via-sand to-gold-light/20">
        <h1 className="text-2xl font-bold text-primary-dark">Service not found</h1>
        <Link href="/" className="mt-4 text-gold-dark hover:text-gold-medium font-medium">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-linen via-sand to-gold-light/20 font-[Poppins]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gold-dark hover:text-gold-medium font-medium mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/60 rounded-3xl shadow-2xl overflow-hidden border border-gold-light/30 luxury-shadow"
        >
          <div className="relative h-[400px] w-full bg-gray-100">
            <img
              src={service.imageUrl || "/services/facial.png"}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white font-serif mb-2">
                {service.name}
              </h1>
              <span className="bg-primary-dark text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg border border-gold-primary/25">
                Premium Service
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-primary-dark/80">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.durationInMinutes} Minutes
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 5v1m0-1c-1.11 0-2.08-.402-2.599-1M12 13v1m0-1v-1m0 5h1m-1 0h-1" />
                </svg>
                ₹{service.price}
              </div>
            </div>

            <div className="prose prose-stone max-w-none">
              <h2 className="text-2xl font-bold text-primary-dark mb-4 font-serif">About this Service</h2>
              <p className="text-primary-dark/80 leading-relaxed mb-6">
                {service.description}
              </p>

              <h2 className="text-2xl font-bold text-primary-dark mb-4 font-serif">What's Included</h2>
              <ul className="space-y-3 text-primary-dark/80">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Consultation with our expert therapists
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Premium herbal products tailored to your skin type
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-gold-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Relaxing and hygienic environment
                </li>
              </ul>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-lg shadow-primary-light/50 border border-gold-medium/10"
              >
                Book Now
              </button>
              <button className="px-8 bg-transparent border border-gold-primary text-gold-dark py-4 rounded-xl font-bold hover:bg-gold-light/20 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#0B2B24]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-primary-dark font-serif">Book Appointment</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6L18 18" /></svg>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-primary-light text-primary-dark rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-gold-primary/10">✓</div>
                  <h4 className="text-xl font-bold text-primary-dark mb-2 font-serif">Booking Successful!</h4>
                  <p className="text-primary-dark/80 text-sm">We will contact you shortly to confirm.</p>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingSuccess(false);
                    }}
                    className="mt-6 w-full bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark text-white py-3 rounded-xl font-bold hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border border-gold-medium/10"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1">Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-dark mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-dark mb-1">Date</label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-dark mb-1">Time</label>
                      <input
                        type="time"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gold-light focus:ring-2 focus:ring-gold-primary focus:border-transparent outline-none transition-all text-primary-dark bg-linen"
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
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
    </div>
  );
}
