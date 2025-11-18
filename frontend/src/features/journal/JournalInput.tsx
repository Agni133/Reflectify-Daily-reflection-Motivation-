import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus } from "lucide-react";

interface JournalInputProps {
  onAddJournal: (content: string, mood: string) => void;
  loading: boolean;
  initialContent?: string;
}

const moods = [
  { emoji: "😊", label: "Happy", value: "happy", color: "from-yellow-400 to-orange-400" },
  { emoji: "😐", label: "Neutral", value: "neutral", color: "from-gray-400 to-gray-500" },
  { emoji: "😢", label: "Sad", value: "sad", color: "from-blue-400 to-blue-600" },
  { emoji: "😤", label: "Frustrated", value: "frustrated", color: "from-red-400 to-red-600" },
  { emoji: "😴", label: "Tired", value: "tired", color: "from-indigo-400 to-purple-500" },
  { emoji: "🤔", label: "Thoughtful", value: "thoughtful", color: "from-teal-400 to-cyan-500" },
  { emoji: "❤️", label: "Loved", value: "loved", color: "from-pink-400 to-rose-500" },
  { emoji: "🔥", label: "Burning Desire", value: "burning desire", color: "from-orange-400 to-red-500" },
];

export default function JournalInput({
  onAddJournal,
  initialContent,
  loading,
}: JournalInputProps) {
  const [newcontent, setNewContent] = useState(initialContent ?? "");
  const [selectedmood, setSelectedMood] = useState<string>("");

  const handleSubmit = () => {
    if (!newcontent.trim()) return;
    onAddJournal(newcontent, selectedmood);
    setNewContent("");
    setSelectedMood("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      className=" group relative bg-gradient-to-br  from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden  group-hover:opacity-100 blur-3 transition-opacity duration-500">
       
      {/* Animated border glow */}
      <div className="absolute -inset-0 pointer-events-none rounded-3xl bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
 
        <div className=" flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm text-slate-400 uppercase tracking-wider font-semibold">
            Personal Space
          </h3>
          <p className="text-white font-bold">Write Your Thoughts</p>
        </div>
      </div>

      {initialContent && (
        <p className="text-xs text-slate-400 italic mb-3">
          Continuing from your last journal...
        </p>
      )}

      <motion.textarea
        whileFocus={{ scale: 1.01 }}
        value={newcontent}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setNewContent(e.target.value)
        }
        placeholder="What's on your mind today? Share your thoughts, feelings, and experiences..."
        className="w-full h-80 p-5  bg-slate-800/50 border border-white/10 focus:border-blue-500/50 rounded-2xl resize-none focus:outline-none  text-white placeholder-slate-500 mb-6 transition-all font-medium leading-relaxed"
      />
       
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold flex items-center gap-2">
            <span>How are you feeling?</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }} 
            >
              💭
            </motion.span>
          </p>
          {selectedmood && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedMood("")}
              className="text-slate-400 hover:text-white transition-colors text-sm"
            >
              Clear
            </motion.button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {moods.map((mood) => (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.value)}
              className={`relative p-4 rounded-2xl transition-all ${
                selectedmood === mood.value
                  ? "bg-blue-500/20 border-2 border-blue-500 shadow-lg shadow-blue-500/50"
                  : "bg-slate-800/50 border border-white/10 hover:border-white/20 hover:bg-slate-700/50"
              }`}
              title={mood.label}
            >
              {selectedmood === mood.value && (
                <motion.div
                  layoutId="moodIndicator"
                  className={`absolute inset-0 bg-gradient-to-br ${mood.color} opacity-20 rounded-2xl`}
                />
              )}
              <div className="text-3xl relative z-10">{mood.emoji}</div>
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSubmit}
        disabled={!newcontent.trim() || loading}
        className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 disabled:from-slate-700 disabled:to-slate-800 disabled:border-slate-700 text-white py-5 rounded-2xl font-bold shadow-xl shadow-blue-500/50 disabled:shadow-none flex items-center justify-center gap-3 transition-all disabled:cursor-not-allowed border border-blue-500/50"
      >
        <Plus className="w-6 h-6" />
        <span className="text-lg">{loading ? "Saving..." : "Add Journal Entry"}</span>
      </motion.button>
     
    </motion.div>
  );
}