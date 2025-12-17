import { motion } from "framer-motion";
import { BookOpen, Calendar, Trash2 } from "lucide-react";

interface Journal {
  id: number;
  content: string;
  mood?: string;
  createdAt: string;
}

interface JournalListProps {
  journals: Journal[];
  onDelete: (id: number) => void;
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

export default function JournalList({ journals, onDelete }: JournalListProps) {
  if (journals.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
            History
          </h3>
          <p className="text-white font-bold">Your Past Reflections</p>
        </div>
      </div>

      <div className="space-y-4">
        {journals.map((entry, index) => {
          const moodData = moods.find((m) => m.value === entry.mood);
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              className="group bg-slate-800/40 hover:bg-slate-800/60 border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1 min-w-0">
                  <p className="text-white leading-relaxed mb-4 font-medium">
                    {entry.content}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(entry.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {entry.mood && (
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="text-4xl"
                      title={moodData?.label}
                    >
                      {moodData?.emoji}
                    </motion.div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => { 
                       console.log("entry object",entry);
                       console.log("Entry ID",entry.id) 
                      onDelete(entry.id)}}
                    className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl transition-all group/btn"
                  >
                    <Trash2 className="w-4 h-4 text-red-400 group-hover/btn:text-red-300" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}