
import { Sparkles, Heart, PenLine } from "lucide-react";
import { motion } from "framer-motion";

export function Features() {
  return (
    <section className="py-16 px-6  from-indigo-800 via-purple-900/20 to-slate-900/20  text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-5xl mx-auto text-center mb-12"
      >
        <h2 className="text-3xl font-semibold mb-6">Why Reflectify Me?</h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="p-6 bg-blue-500/20 rounded-xl shadow hover:shadow-lg transition">
            <PenLine className="w-8 h-8 mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Daily Journaling</h3>
            <p className="text-gray-300">
              Pour your heart out, keep it safe & private.
            </p>
          </div>

          <div className="p-6 bg-blue-500/20 rounded-xl shadow hover:shadow-lg transition">
            <Sparkles className="w-8 h-8 mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">
              Mood & Random Quotes Boost
            </h3>
            <p className="text-gray-300">
              Save random quotes that spark joy, track how you truly feel.
            </p>
          </div>

          <div className="p-6 bg-blue-500/20 rounded-xl shadow hover:shadow-lg transition">
            <Heart className="w-8 h-8 mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Mindful Habits</h3>
            <p className="text-gray-300">
              Build a simple daily ritual that lifts your mind.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
