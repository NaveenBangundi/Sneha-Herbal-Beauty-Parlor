import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const fallbackServices = [
  { _id: "1", name: "Face Rituals", imageUrl: "/services/facial.png", description: "Deep cleansing and hydration for glowing skin." },
  { _id: "2", name: "Head Rituals", imageUrl: "/services/haircut.jpeg", description: "Rejuvenating head treatments." },
  { _id: "3", name: "Pigmentation Treatment", imageUrl: "/services/bridal.jpg", description: "Advanced skin care solutions." },
  { _id: "4", name: "Skin Renewal", imageUrl: "/services/mehandi.jpg", description: "Complete skin renewal therapy." },
  { _id: "5", name: "Glass Shine Hair", imageUrl: "/services/manicure.jpg", description: "Premium hair care for shine." }
];

export default function Services() {
  const router = useRouter();
  const [servicesData, setServicesData] = useState(fallbackServices);
  const [currentIndex, setCurrentIndex] = useState(2); // Start with middle active
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Display only first 5 services to maintain the accordion layout aesthetic
  const displayedServices = servicesData.slice(0, 5);
  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 scroll-mt-28" id="services">
      <div className="max-w-6xl mx-auto bg-white/40 rounded-[2rem] shadow-2xl border border-white/70 p-8 md:p-10 lg:p-12 transition-all duration-500 hover:border-gold-primary/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] relative overflow-hidden luxury-shadow">
        
        {/* Inner Golden Glow Spotlights */}
        <div className="absolute w-[300px] h-[300px] bg-gold-light/20 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "6s" }}></div >
        <div className="absolute w-[250px] h-[250px] bg-primary-light/35 rounded-full blur-[70px] -bottom-20 -left-20 pointer-events-none z-0 animate-pulse" style={{ animationDuration: "8s" }}></div >

        <div className="relative z-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <h3 className="text-3xl md:text-5xl font-semibold text-primary-dark font-serif text-center md:text-left">
              Signature Rituals ✨
            </h3>
            <button
              onClick={() => router.push("/services")}
              className="whitespace-nowrap px-6 py-2.5 rounded-full border border-gold-primary text-gold-dark font-semibold text-xs md:text-sm uppercase tracking-wider bg-transparent hover:bg-gold-light/20 hover:scale-105 active:scale-98 transition-all duration-300 shadow-sm"
            >
              More Services ➔
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 h-[500px] md:h-[450px] w-full">
            {displayedServices.map((service, index) => {
              const isActive = currentIndex === index;

              return (
                <div
                  key={service._id || index}
                  className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
                    isActive ? "flex-[4] md:flex-[5]" : "flex-[1]"
                  }`}
                  onMouseEnter={() => !isMobile && setCurrentIndex(index)}
                  onClick={() => {
                    if (isMobile) setCurrentIndex(index);
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={service.imageUrl || service.img || "/placeholder.jpg"}
                    alt={service.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
                  />
                  
                  {/* Gradient Overlay for text readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-65 md:opacity-45' : 'opacity-80'}`}></div>

                  {/* Content Container */}
                  <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                    {isActive ? (
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn transition-opacity duration-500 delay-300">
                        <h4 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wider drop-shadow-md font-serif">
                          {service.name}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/services/${service._id}`);
                          }}
                          className="whitespace-nowrap px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-dark to-primary-medium hover:from-primary-medium hover:to-primary-dark border border-gold-primary/20 text-white font-semibold text-xs md:text-sm uppercase tracking-wider hover:scale-105 active:scale-98 transition-all duration-300 shadow-md"
                        >
                          Explore Now ➔
                        </button>
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-end justify-center pb-2 opacity-100 transition-opacity duration-300">
                        <h4 className="text-white text-sm md:text-base font-semibold uppercase tracking-[0.15em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
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
