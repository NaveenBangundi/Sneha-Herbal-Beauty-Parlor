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
    <div className="mt-16 md:mt-24 px-4 md:px-8 mb-20 scroll-mt-28" id="services">
      <div className="max-w-7xl mx-auto bg-white/80 rounded-[2rem] shadow-2xl border border-white/60 p-8 md:p-10 lg:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <h3 className="text-2xl md:text-3xl text-gray-900 uppercase tracking-[0.2em] font-light text-center md:text-left">
            Innovation Services
          </h3>
          <button
            onClick={() => router.push("/services")}
            className="whitespace-nowrap px-6 py-2.5 rounded shadow-lg text-black font-semibold text-xs md:text-sm uppercase tracking-wider bg-gradient-to-r from-[#F6E1B6] via-[#E1B875] to-[#F6E1B6] hover:scale-105 hover:shadow-[#E1B875]/50 hover:shadow-xl hover:brightness-110 transition-all duration-300"
          >
            More Services
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
                // On mobile, maybe tapping again navigates?
                // For now, let the Explore Now button handle navigation.
              }}
            >
              {/* Background Image */}
              <img
                src={service.imageUrl || service.img || "/placeholder.jpg"}
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out hover:scale-105"
              />
              
              {/* Gradient Overlay for text readability */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-60 md:opacity-40' : 'opacity-80'}`}></div>

              {/* Content Container */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                {isActive ? (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fadeIn transition-opacity duration-500 delay-300">
                    <h4 className="text-white text-xl md:text-2xl font-semibold uppercase tracking-wider drop-shadow-md">
                      {service.name}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/services/${service._id}`);
                      }}
                      className="whitespace-nowrap px-6 py-2 rounded shadow-lg text-black font-semibold text-xs md:text-sm uppercase tracking-wider bg-gradient-to-r from-[#F6E1B6] via-[#E1B875] to-[#F6E1B6] hover:scale-105 hover:shadow-[#E1B875]/50 hover:shadow-xl hover:brightness-110 transition-all duration-300"
                    >
                      Explore Now
                    </button>
                  </div>
                ) : (
                  <div className="h-full w-full flex items-end justify-center pb-2 opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-sm md:text-base font-bold uppercase tracking-[0.15em] whitespace-nowrap [writing-mode:vertical-rl] rotate-180 drop-shadow-md">
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
  );
}
