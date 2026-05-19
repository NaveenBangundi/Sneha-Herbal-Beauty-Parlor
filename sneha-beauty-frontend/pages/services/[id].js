import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const fallbackServices = [
  { _id: "6a0c69f2e1c0da69d33a0b14", name: "Hydra Facial", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin.", price: 1500, durationInMinutes: 60 },
  { _id: "6a0c69f3e1c0da69d33a0b15", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert makeup to make you feel like a princess.", price: 5000, durationInMinutes: 120 },
  { _id: "6a0c69f3e1c0da69d33a0b16", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs.", price: 1000, durationInMinutes: 90 },
  { _id: "6a0c69f3e1c0da69d33a0b17", name: "Manicure", imageUrl: "/services/manicure.jpg", description: "Relaxing manicure sessions for elegant hands.", price: 800, durationInMinutes: 45 },
  { _id: "6a0c69f3e1c0da69d33a0b18", name: "Pedicure", imageUrl: "/services/pedicure.png", description: "Rejuvenating pedicure to soothe your feet.", price: 1000, durationInMinutes: 45 },
  { _id: "6a0c69f3e1c0da69d33a0b19", name: "Eyebrow", imageUrl: "/services/eyebrow.jpg", description: "Precision threading and shaping.", price: 150, durationInMinutes: 15 },
  { _id: "6a0c69f3e1c0da69d33a0b20", name: "Haircut", imageUrl: "/services/haircut.jpeg", description: "Trendy haircuts to match your style.", price: 500, durationInMinutes: 30 }
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
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:3001/services/${id}`);
        if (res.ok) {
          const data = await res.json();
          setService(data);
        } else {
          const fallback = fallbackServices.find(s => s._id === id);
          if (fallback) {
            setService(fallback);
          } else {
            console.error("Failed to fetch service and no fallback found");
          }
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        const fallback = fallbackServices.find(s => s._id === id);
        if (fallback) {
          setService(fallback);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const res = await fetch("http://localhost:3001/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          serviceId: id
        })
      });

      if (res.ok) {
        const data = await res.json();
        setConfirmedBooking(data);
        setBookingSuccess(true);
      } else {
        console.error("Booking failed");
        alert("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const handlePrintReceipt = () => {
    if (!confirmedBooking) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Booking Receipt - ${confirmedBooking.tokenNumber}</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              color: #1f2937;
              background-color: #f9fafb;
              padding: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
            }
            .receipt-card {
              background: white;
              border-radius: 24px;
              box-shadow: 0 10px 25px rgba(0,0,0,0.05);
              border: 1px solid #e5e7eb;
              padding: 40px;
              max-width: 480px;
              width: 100%;
              text-align: center;
            }
            .logo {
              font-family: 'Playfair Display', serif;
              font-size: 28px;
              color: #047857;
              font-weight: 700;
              margin-bottom: 4px;
            }
            .subtitle {
              font-size: 11px;
              color: #6b7280;
              letter-spacing: 0.08em;
              text-transform: uppercase;
              margin-bottom: 24px;
              font-weight: 500;
            }
            .success-icon {
              width: 52px;
              height: 52px;
              background: #d1fae5;
              color: #059669;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
              margin: 0 auto 16px;
            }
            .title {
              font-family: 'Playfair Display', serif;
              font-size: 22px;
              font-weight: 700;
              margin: 0 0 6px;
            }
            .msg {
              font-size: 12px;
              color: #6b7280;
              margin-bottom: 28px;
            }
            .token-box {
              background: linear-gradient(135deg, #059669, #047857);
              color: white;
              padding: 10px 24px;
              border-radius: 12px;
              font-family: monospace;
              font-size: 20px;
              font-weight: 700;
              display: inline-block;
              letter-spacing: 0.1em;
              margin-bottom: 20px;
              box-shadow: 0 4px 10px rgba(5, 150, 105, 0.2);
            }
            .wait-time {
              background: #fffbeb;
              border: 1px solid #fef3c7;
              color: #92400e;
              padding: 12px 16px;
              border-radius: 14px;
              font-size: 12px;
              font-weight: 600;
              margin-bottom: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
            }
            .grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              text-align: left;
              border-top: 1px dashed #e5e7eb;
              padding-top: 24px;
              margin-top: 20px;
            }
            .grid-item span:first-child {
              font-size: 10px;
              color: #9ca3af;
              display: block;
              margin-bottom: 2px;
              text-transform: uppercase;
              font-weight: 500;
              letter-spacing: 0.05em;
            }
            .grid-item span:last-child {
              font-size: 13px;
              color: #374151;
              font-weight: 600;
            }
            .footer {
              margin-top: 36px;
              font-size: 11px;
              color: #9ca3af;
              border-top: 1px solid #f3f4f6;
              padding-top: 20px;
            }
            @media print {
              body {
                padding: 0;
                background: white;
              }
              .receipt-card {
                box-shadow: none;
                border: none;
                padding: 20px;
                max-width: 100%;
              }
            }
          </style>
        </head>
        <body>
          <div class="receipt-card">
            <div class="logo">Sneha Herbal</div>
            <div class="subtitle">Beauty Parlor & Spa</div>
            <div class="success-icon">✓</div>
            <div class="title">Booking Confirmed</div>
            <div class="msg">Please present this ticket at the counter.</div>
            
            <div class="token-box">${confirmedBooking.tokenNumber || "TK-001"}</div>
            
            <div class="wait-time">
              <span>⏰</span>
              <span>${confirmedBooking.waitingTime || "Direct Entry (No queue)"}</span>
            </div>
            
            <div class="grid">
              <div class="grid-item">
                <span>Client Name</span>
                <span>${confirmedBooking.customerName}</span>
              </div>
              <div class="grid-item">
                <span>Service Type</span>
                <span>${service.name}</span>
              </div>
              <div class="grid-item">
                <span>Appt Date</span>
                <span>${confirmedBooking.appointmentDate}</span>
              </div>
              <div class="grid-item">
                <span>Appt Time</span>
                <span>${confirmedBooking.appointmentTime}</span>
              </div>
            </div>
            
            <div class="footer">
              Thank you for choosing organic care!
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent gap-4">
        <h1 className="text-2xl font-bold text-gray-800 font-[Playfair Display]">Service not found 🧐</h1>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/80 text-green-700 hover:text-green-900 hover:bg-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300 font-semibold">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent font-[Poppins]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/80 text-green-700 hover:text-green-900 hover:bg-white hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-300 font-semibold mb-8">
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7 7-7" />
          </svg>
          Back to Services
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/60"
        >
          <div className="relative h-[400px] w-full bg-gray-100">
            <img 
              src={service.imageUrl || "/services/facial.png"} 
              alt={service.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <h1 className="text-4xl font-bold text-white font-[Playfair Display] mb-2">
                {service.name}
              </h1>
              <span className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                Premium Service
              </span>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {service.durationInMinutes} Minutes
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v1m0 5v1m0-1c-1.11 0-2.08-.402-2.599-1M12 13v1m0-1v-1m0 5h1m-1 0h-1" />
                </svg>
                ₹{service.price}
              </div>
            </div>

            <div className="prose prose-green max-w-none">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-[Playfair Display]">About this Service</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-[Playfair Display]">What's Included</h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Consultation with our expert therapists
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Premium herbal products tailored to your skin type
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Relaxing and hygienic environment
                </li>
              </ul>
            </div>

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-lg shadow-green-200"
              >
                Book Now
              </button>
              <button className="px-8 bg-white border-2 border-green-600 text-green-600 py-4 rounded-xl font-bold hover:bg-green-50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                Share
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 font-[Playfair Display]">Book Appointment</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6L18 18" /></svg>
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mx-auto mb-3 shadow-inner">✓</div>
                  <h4 className="text-2xl font-bold text-gray-800 mb-1 font-[Playfair Display]">Booking Successful!</h4>
                  <p className="text-gray-500 text-xs font-light font-[Poppins] mb-5">Your slot is secured and verified.</p>
                  
                  {confirmedBooking && (
                    <div className="bg-green-50/50 rounded-2xl p-5 border border-green-100/50 text-left space-y-4 mb-6">
                      
                      {/* Token Badge */}
                      <div className="flex justify-between items-center pb-3 border-b border-green-100/30">
                        <span className="text-gray-500 text-xs font-medium font-[Poppins]">Queue Token:</span>
                        <span className="bg-gradient-to-r from-green-600 to-green-800 text-white font-mono font-bold px-4 py-1.5 rounded-lg text-sm tracking-wider shadow-md">
                          {confirmedBooking.tokenNumber || "TK-001"}
                        </span>
                      </div>

                      {/* Wait Time Indicator */}
                      <div className="space-y-1.5">
                        <span className="text-gray-500 text-xs font-medium font-[Poppins] block">Estimated Waiting Time:</span>
                        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/50 rounded-xl p-3 text-amber-900">
                          <span className="text-lg">⏰</span>
                          <span className="text-xs font-semibold font-[Poppins] leading-tight">
                            {confirmedBooking.waitingTime || "Direct Entry (No queue)"}
                          </span>
                        </div>
                      </div>

                      {/* Summary details */}
                      <div className="grid grid-cols-2 gap-3 text-[10px] sm:text-xs pt-1">
                        <div>
                          <span className="text-gray-400 block font-light">Client Name</span>
                          <span className="text-gray-700 font-medium font-[Poppins]">{confirmedBooking.customerName}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Service Type</span>
                          <span className="text-gray-700 font-medium font-[Poppins]">{service.name}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Appt Date</span>
                          <span className="text-gray-700 font-medium font-[Poppins]">{confirmedBooking.appointmentDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-light">Appt Time</span>
                          <span className="text-gray-700 font-medium font-[Poppins]">{confirmedBooking.appointmentTime}</span>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Download PDF Option */}
                  <div className="mb-4 font-[Poppins]">
                    <button
                      onClick={handlePrintReceipt}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-[1.02] shadow-md active:scale-[0.98]"
                    >
                      📥 Download PDF Receipt
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingSuccess(false);
                      setConfirmedBooking(null);
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white py-3.5 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md"
                  >
                    Got it, Close Receipt
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800"
                      value={formData.customerName}
                      onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input 
                        type="date" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800"
                        value={formData.appointmentDate}
                        onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input 
                        type="time" 
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-800"
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                      />
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 text-white py-4 rounded-xl font-bold hover:-translate-y-1 hover:shadow-xl transition-all duration-300 mt-6 flex items-center justify-center gap-2"
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
