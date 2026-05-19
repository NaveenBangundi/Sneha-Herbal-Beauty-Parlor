import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* 🌿 GLOBAL BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center opacity-90"
        style={{
          backgroundImage: "url('/bg.png')",
        }}
      ></div>

      {/* 🎨 GLOBAL OVERLAY (for readability) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-white/10 via-white/5 to-pink-100/70"></div>

      {/* ✨ GLOBAL PREMIUM GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-pink-400/60 rounded-full blur-[150px] top-[-200px] left-[-200px] animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-green-400/60 rounded-full blur-[150px] bottom-[-200px] right-[-200px] animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-yellow-300/40 rounded-full blur-[120px] top-[30%] left-[40%] animate-pulse"></div>
      </div>

      <Component {...pageProps} />
    </>
  );
}