export default function Contact() {
  const info = [
    {
      icon: "🏡",
      title: "Address",
      content: "Shop No SS1, SV Housing complex,\nnear pampa garden, Manvi,\nDist Raichur, Karnataka 584123",
      accent: "#2A9E66",
      bg: "linear-gradient(135deg, rgba(42,158,102,0.12), rgba(61,191,127,0.08))",
      border: "rgba(42,158,102,0.25)",
    },
    {
      icon: "⏰",
      title: "Working Hours",
      content: "Everyday: 10:00 AM – 7:00 PM",
      accent: "#E8A820",
      bg: "linear-gradient(135deg, rgba(232,168,32,0.12), rgba(242,190,58,0.08))",
      border: "rgba(232,168,32,0.25)",
    },
    {
      icon: "📞",
      title: "Contact",
      content: "+91 7406098184",
      accent: "#D95C74",
      bg: "linear-gradient(135deg, rgba(217,92,116,0.12), rgba(240,122,144,0.08))",
      border: "rgba(217,92,116,0.25)",
    },
  ];

  return (
    <div className="mt-16 md:mt-24 px-4 md:px-6 pb-24 scroll-mt-28" id="contact">
      <div className="max-w-5xl mx-auto rounded-[2.5rem] shadow-2xl relative overflow-hidden luxury-shadow"
        style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(232,168,32,0.25)" }}>

        {/* Rainbow top strip */}
        <div className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg,#2A9E66,#E8A820,#D95C74,#1A5C3F,#F7CF62,#D95C74)" }} />

        {/* BG Glows */}
        <div className="absolute w-[350px] h-[350px] rounded-full blur-[110px] -top-24 -right-24 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(232,168,32,0.25) 0%, transparent 70%)" }} />
        <div className="absolute w-[280px] h-[280px] rounded-full blur-[90px] -bottom-20 -left-20 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(42,158,102,0.2) 0%, transparent 70%)" }} />
        <div className="absolute w-[200px] h-[200px] rounded-full blur-[70px] top-1/2 right-1/4 pointer-events-none z-0"
          style={{ background: "radial-gradient(circle, rgba(217,92,116,0.15) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-8 md:p-10 lg:p-12">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-2" style={{ color: "#E8A820" }}>✦ Find Us</p>
            <h3 className="text-3xl md:text-5xl font-bold font-serif" style={{ color: "#0D2B22" }}>
              Visit{" "}
              <span style={{ background: "linear-gradient(135deg, #2A9E66, #3DBF7F)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Us
              </span>{" "}📍
            </h3>
            <p className="mt-3 font-light text-sm max-w-xl mx-auto" style={{ color: "rgba(13,43,34,0.65)" }}>
              Ready for a transformation? We'd love to hear from you. Drop by or reach out to book your appointment.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

            {/* Left: Info cards + buttons */}
            <div className="flex-1 w-full space-y-5">

              {info.map((item) => (
                <div key={item.title}
                  className="flex items-start gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: item.bg, border: `1px solid ${item.border}` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 shadow-md"
                    style={{ background: `linear-gradient(135deg, ${item.accent}22, ${item.accent}44)`, border: `1.5px solid ${item.accent}44` }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-base mb-1" style={{ color: "#0D2B22" }}>{item.title}</h4>
                    <p className="font-light text-sm leading-relaxed whitespace-pre-line" style={{ color: "rgba(13,43,34,0.75)" }}>
                      {item.content}
                    </p>
                  </div>
                  {/* Accent dot */}
                  <div className="ml-auto shrink-0 w-2 h-2 rounded-full mt-1.5"
                    style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}` }} />
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => window.open("https://wa.me/917406098184?text=Hi, I have an inquiry")}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  style={{ background: "linear-gradient(135deg, #0D2B22, #1A5C3F)", color: "#F7CF62", border: "1px solid rgba(232,168,32,0.3)", boxShadow: "0 6px 20px rgba(13,43,34,0.3)" }}>
                  💬 Chat on WhatsApp
                </button>
                <button
                  onClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105"
                  style={{ border: "2px solid #E8A820", color: "#A3711A", background: "linear-gradient(135deg, rgba(232,168,32,0.08), rgba(242,190,58,0.12))" }}>
                  🛍️ Navigate to Shop
                </button>
              </div>

              {/* Social / Hours badge */}
              <div className="flex items-center gap-3 mt-2 p-3 rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(42,158,102,0.08), rgba(61,191,127,0.05))", border: "1px solid rgba(42,158,102,0.2)" }}>
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#2A9E66", boxShadow: "0 0 8px #2A9E66" }} />
                <span className="text-xs font-semibold" style={{ color: "#1A5C3F" }}>Open Now · Closes at 7:00 PM</span>
              </div>
            </div>

            {/* Right: Map */}
            <div className="flex-1 w-full min-h-[320px] lg:min-h-[420px] rounded-3xl overflow-hidden shadow-xl relative"
              style={{ border: "2px solid rgba(232,168,32,0.3)", boxShadow: "0 12px 40px rgba(13,43,34,0.2), 0 0 0 1px rgba(232,168,32,0.1)" }}>

              {/* Map label badge */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg"
                style={{ background: "rgba(13,43,34,0.9)", color: "#F7CF62", border: "1px solid rgba(232,168,32,0.3)" }}>
                📍 Manvi, Karnataka
              </div>

              <iframe
                src="https://maps.google.com/maps?q=SV+Housing+complex,+near+pampa+garden,+Manvi,+Karnataka+584123&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="absolute top-0 left-0 w-full h-full"
                style={{ border: 0, filter: "saturate(1.1) contrast(1.05)" }}
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
