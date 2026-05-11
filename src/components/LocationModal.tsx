import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocationModalProps {
  isOpen: boolean;
  location: { name: string; image: string; desc: string } | null;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, location, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors p-2 z-50 bg-black/50 rounded-full"
          >
            <X size={32} />
          </button>
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f141e] rounded-xl overflow-hidden shadow-2xl max-w-3xl w-full border border-slate-700/50"
          >
            <div className="relative h-64 md:h-80 w-full">
              <img src={location.image} alt={location.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f141e] to-transparent"></div>
              <h3 className="absolute bottom-6 left-8 text-3xl font-bold text-white tracking-widest">{location.name}</h3>
            </div>
            <div className="p-8">
              <p className="text-slate-300 leading-relaxed text-lg">{location.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
