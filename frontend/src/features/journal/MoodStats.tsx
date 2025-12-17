import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface Journal {
  id: number;
  content: string;
  mood?: string;
  createdAt: string;
}

interface MoodStatProps {
  journals: Journal[];
}

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😤", label: "Frustrated", value: "frustrated" },
  { emoji: "😴", label: "Tired", value: "tired" },
  { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
  { emoji: "❤️", label: "Loved", value: "loved" },
  { emoji: "🔥", label: "Burning Desire", value: "burning desire" },
];

export default function MoodStats({ journals }: MoodStatProps) {
  const getMoodStats = () => {
    // Calculate mood counts
    const moodCounts = journals.reduce((acc, journal) => {
      if (journal.mood) {
        acc[journal.mood] = (acc[journal.mood] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    // Convert moodCounts object to an array of { mood, count } objects
    return Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      emoji: moods.find((m) => m.value === mood)?.emoji || "😊",
    }));
  };

  const moodStats = getMoodStats();
  if (!moodStats || moodStats.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
            Analytics
          </h3>
          <p className="text-white font-bold">Your Mood Trends</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {moodStats.slice(0, 6).map(({ mood, count, emoji }) => (
          <motion.div
            key={mood}
            whileHover={{ scale: 1.05, y: -4 }}
            className="bg-slate-800/50 border border-white/5 hover:border-white/10 rounded-2xl p-5 text-center transition-all cursor-pointer"
          >
            <motion.div
              className="text-4xl mb-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
            >
              {emoji}
            </motion.div>
            <div className="text-white text-sm capitalize font-medium mb-1">
              {mood}
            </div>
            <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {count}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}