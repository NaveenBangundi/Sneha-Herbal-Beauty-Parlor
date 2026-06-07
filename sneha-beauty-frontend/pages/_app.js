import "@/styles/globals.css";
import FloatingBooking from "../components/FloatingBooking";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FloatingBooking />
    </>
  );
}