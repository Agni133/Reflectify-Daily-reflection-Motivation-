import { motion } from "framer-motion";
import { Heart, Zap, Star } from "lucide-react";

interface Quote {
  anime: string;
  character: string;
  quote: string;
}

interface QuoteCardProps {
  quote: Quote | null;
  onSavedQuote: () => void;
  onFetchRandomQuote: () => void;
  onFetchHappyQuote: () => void;
}

export default function QuoteCard({
  quote,
  onSavedQuote,
  onFetchHappyQuote,
  onFetchRandomQuote,
}: QuoteCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      className="group relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

      <div className="relative z-10 text-center">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
            <Star className="w-5 h-5 text-white text-center items-center" />
          </div>
          <div>
            <h3 className="text-sm text-center items-center text-slate-400 uppercase tracking-wider font-semibold">
              Daily Inspiration
            </h3>
            <p className="text-white  text-center items-center font-bold italic">Quote of the Day</p>
          </div>
        </div>

        {quote ? (
          <motion.div
            key={quote.quote}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 mb-4">
              <p className="text-xl text-white leading-relaxed font-medium mb-4">
                "{quote.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {quote.character[0]}
                </div>
                <div>
                  <p className="text-white font-semibold">{quote.character}</p>
                  <p className="text-slate-400 text-sm">{quote.anime}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-white/5 mb-4 text-center">
            <p className="text-slate-400 italic">Loading quote...</p>
          </div>
        )}

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSavedQuote}
            disabled={!quote}
            className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:via-rose-600 hover:to-red-600 disabled:from-slate-700 disabled:to-slate-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-pink-500/50 disabled:shadow-none flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Save to Collection
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onFetchRandomQuote}
              className="bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Random
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onFetchHappyQuote}
              className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-500/30 text-yellow-300 py-3 rounded-xl font-semibold transition-all"
            >
              😊 Happy
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}