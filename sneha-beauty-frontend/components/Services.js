import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const fallbackServices = [
  { _id: "1", name: "Face Rituals", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin." },
  { _id: "2", name: "Head Rituals", imageUrl: "/services/haircut.jpeg", description: "Rejuvenating head treatments." },
  { _id: "3", name: "Bridal Makeup", imageUrl: "/services/bridal.jpg", description: "Expert bridal makeup for your special day." },
  { _id: "4", name: "Mehandi", imageUrl: "/services/mehandi.jpg", description: "Beautiful and intricate mehandi designs." },
  { _id: "5", name: "Glass Shine Hair", imageUrl: "/services/manicure.jpg", description: "Premium hair care for ultimate shine." }
];

const CARD_COLORS = [
  { badge: "linear-gradient(135deg, #E8A820, #F7CF62)", badgeText: "#7A5210" },
  { badge: "linear-gradient(135deg, #2A9E66, #3DBF7F)", badgeText: "#0D2B22" },
  { badge: "linear-gradient(135deg, #D95C74, #F07A90)", badgeText: "#5C0A1A" },
  { badge: "linear-gradient(135deg, #C99128, #F2BE3A)", badgeText: "#5C3D0A" },
  { badge: "linear-gradient(135deg, #1A5C3F, #2A9E66)", badgeText: "#fff" },
];

export default function Services() {
  const router = useRouter();
  const [servicesData, setServicesData] = useState(fallbackServices);
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("http://localhost:3001/services").catch(() => null);
      if (res && res.ok) {
        const data = await res.json().catch(() => null);
        if (data && data.length > 0) setServicesData(data);
      }
    };
    fetchServices();
  }, []);

  const displayedServices = servicesData.slice(0, 5);

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="services">
      <div className="max-w-6xl mx-auto rounded-[2.5rem] shadow-2xl overflow-hidden relative luxury-shadow"
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(232,168,32,0.25)" }}>

        {/* ── Colourful top bar strip ── */}
        <div className="h-1.5 w-full" style={{ background: "linear-gradient(90deg, #0D2B22, #2A9E66, #E8A820, #F7CF62, #D95C74, #2A9E66, #0D2B22)" }} />

        {/* ── Background glows ── */}
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[100px] -top-24 -right-24 pointer-events-none z-0 opacity-60"
          style={{ background: "radial-gradient(circle, rgba(242,190,58,0.3) 0%, transparent 70%)" }} />
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[90px] -bottom-24 -left-24 pointer-events-none z-0 opacity-50"
          style={{ background: "radial-gradient(circle, rgba(42,158,102,0.3) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-8 md:p-10 lg:p-12">

          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: "#E8A820" }}>✦ Our Offerings</p>
              <h3 className="text-3xl md:text-5xl font-bold font-serif" style={{ color: "#0D2B22" }}>
                Signature{" "}
                <span style={{ background: "linear-gradient(135deg, #2A9E66, #3DBF7F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Rituals
                </span>{" "}✨
              </h3>
            </div>
            <button
              onClick={() => router.push("/services")}
              className="whitespace-nowrap px-7 py-3 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62", border: "1px solid rgba(232,168,32,0.3)" }}>
              All Services ➔
            </button>
          </div>

          {/* ── Accordion Slider ── */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-[500px] md:h-[460px] w-full">
            {displayedServices.map((service, index) => {
              const isActive = currentIndex === index;
              const color = CARD_COLORS[index % CARD_COLORS.length];

              return (
                <div
                  key={service._id || index}
                  className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${isActive ? "flex-[5]" : "flex-[1]"}`}
                  onMouseEnter={() => !isMobile && setCurrentIndex(index)}
                  onClick={() => { if (isMobile) setCurrentIndex(index); }}
                  style={{ boxShadow: isActive ? "0 12px 40px -8px rgba(13,43,34,0.4), 0 0 0 2px rgba(232,168,32,0.3)" : "none" }}>

                  {/* Background Image */}
                  <img src={service.imageUrl || service.img || "/placeholder.jpg"} alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
                    style={{ transform: isActive ? "scale(1.05)" : "scale(1)" }} />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 transition-opacity duration-700"
                    style={{ background: isActive
                      ? "linear-gradient(to top, rgba(13,43,34,0.88) 0%, rgba(13,43,34,0.2) 60%, transparent 100%)"
                      : "linear-gradient(to top, rgba(13,43,34,0.75) 0%, rgba(13,43,34,0.5) 100%)" }} />

                  {/* Active colour accent stripe */}
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: color.badge }} />
                  )}

                  {/* Content */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    {isActive ? (
                      <div className="animate-fadeIn flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          {/* Colour badge */}
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
                            style={{ background: color.badge, color: color.badgeText }}>
                            Premium
                          </span>
                          <h4 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wider drop-shadow-md font-serif">
                            {service.name}
                          </h4>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); router.push(`/services/${service._id}`); }}
                          className="whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
                          style={{ background: color.badge, color: color.badgeText, border: "1px solid rgba(255,255,255,0.2)" }}>
                          Explore ➔
                        </button>
                      </div>
                    ) : (
                      <div className="h-full flex items-end justify-center pb-2">
                        <h4 className="text-white text-sm font-bold uppercase tracking-[0.15em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
                          {service.name}
                        </h4>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
