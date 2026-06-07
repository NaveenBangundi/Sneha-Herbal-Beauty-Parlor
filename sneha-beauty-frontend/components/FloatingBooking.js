import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingBooking() {
  const [showPill, setShowPill] = useState(false);
  const whatsappUrl = "https://wa.me/917406098184?text=Hi,%20I%20want%20to%20book%20an%20appointment";

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    if (!showPill) {
      setShowPill(true);
    } else {
      window.open(whatsappUrl, "_blank");
    }
  };

  const handlePillClick = () => {
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Pill Button Container */}
      <AnimatePresence>
        {showPill && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="relative flex items-center"
          >
            {/* Pill Button */}
            <button
              onClick={handlePillClick}
              className="bg-white border-2 border-black text-black font-bold px-6 py-3 rounded-full shadow-[4px_4px_0px_#00E676] hover:shadow-[2px_2px_0px_#00E676] hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-150 text-xs md:text-sm uppercase tracking-wider whitespace-nowrap font-[Poppins]"
            >
              Book your appointment
            </button>

            {/* Dismiss Button */}
            <button
              onClick={() => setShowPill(false)}
              className="absolute -top-1.5 -right-1.5 bg-black text-white hover:bg-neutral-800 w-5 h-5 rounded-full flex items-center justify-center border border-white text-xs font-black shadow-md hover:scale-105 transition-transform"
              aria-label="Dismiss booking reminder"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Icon Button */}
      <button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 bg-[#00E676] hover:bg-[#00c868] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 relative shrink-0 group"
        aria-label="Contact on WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 2C6.492 2 2 6.484 2 12.016c0 1.81.478 3.518 1.314 5.006L2 22l5.127-1.305c1.435.783 3.064 1.22 4.887 1.22C17.555 21.915 22 17.431 22 11.902 22 6.387 17.551 2 12.031 2zm0 18.062c-1.612 0-3.14-.424-4.485-1.168l-.322-.176-3.324.847.865-3.189-.2-.31c-.815-1.286-1.246-2.778-1.246-4.32C3.32 7.215 7.23 3.32 12.031 3.32c4.801 0 8.71 3.895 8.71 8.696.001 4.801-3.907 8.11-8.71 8.11zm4.845-6.046c-.266-.133-1.571-.774-1.813-.86-.242-.086-.419-.133-.596.133-.176.265-.684.86-.838 1.036-.154.177-.308.2-.574.067-.266-.133-1.12-.413-2.133-1.314-.789-.702-1.32-1.57-1.474-1.837-.154-.265-.016-.409.117-.542.121-.12.266-.31.4-.464.133-.155.176-.265.266-.441.09-.176.044-.331-.022-.464-.067-.132-.596-1.437-.816-1.967-.215-.518-.432-.446-.596-.454-.154-.007-.33-.007-.507-.007-.176 0-.463.067-.706.331-.242.265-.927.906-.927 2.207 0 1.302.948 2.562 1.08 2.739.133.177 1.86 2.84 4.505 3.987.629.272 1.12.435 1.503.557.632.2 1.208.172 1.662.105.508-.075 1.57-.641 1.791-1.26.221-.617.221-1.147.155-1.26-.067-.113-.243-.18-.51-.313z" />
        </svg>
      </button>
    </div>
  );
}
