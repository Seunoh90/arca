import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuoteCarouselProps {
  quotes: string[];
}

const STAGE_EMOJIS = ['🤍', '🩷', '💖', '💔'];

export const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuote = () => {
    setCurrentIndex((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="relative mt-4 bg-slate-900/50 p-6 rounded-lg border border-slate-700/50 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm text-slate-400 font-medium tracking-wider uppercase">Voice Logs</h4>
        <div className="flex gap-2 text-sm">
          {STAGE_EMOJIS.map((emoji, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-opacity transition-transform ${
                idx === currentIndex ? 'opacity-100 scale-125' : 'opacity-30 hover:opacity-60 scale-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div className="relative min-h-[6rem] py-4 flex items-center justify-center text-center px-8">
        <button
          onClick={prevQuote}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-white font-serif italic text-base md:text-lg leading-relaxed break-keep"
          >
            "{quotes[currentIndex]}"
          </motion.p>
        </AnimatePresence>

        <button
          onClick={nextQuote}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
