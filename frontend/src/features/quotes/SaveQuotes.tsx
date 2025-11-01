import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

interface SavedQuote {
  id: number;
  quote: string;
  character: string;
  anime: string;
  savedAt: string;
  text: string;
}

interface SavedQuotesProps {
  savedQuotes: SavedQuote[];
}

export default function SavedQuotes({ savedQuotes }: SavedQuotesProps) {
  const [showSavedQuotes, setShowSavedQuotes] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setShowSavedQuotes(!showSavedQuotes)}
        className="w-full bg-slate-900/80 hover:bg-slate-800/80 backdrop-blur-xl border border-white/10 text-white py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-3 shadow-xl"
      >
        <Heart className="w-5 h-5 text-pink-400" />
        <span>{showSavedQuotes ? "Hide" : "Show"} Saved Quotes</span>
        <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300">
          {savedQuotes.length}
        </span>
      </motion.button>

      <AnimatePresence>
        {showSavedQuotes && savedQuotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl overflow-hidden"
          >
            {savedQuotes.map((quote, idx) => (
              <motion.div
                key={quote.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-800/50 p-5 rounded-xl border border-white/5 hover:border-white/10 transition-all"
              >
                <p className="text-white italic mb-3 leading-relaxed">
                  "{quote.quote || quote.text}"
                </p>
                <p className="text-slate-400 text-sm">
                  — {quote.character}{" "}
                  <span className="text-slate-500">
                    ({quote.anime || "Unknown"})
                  </span>
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}