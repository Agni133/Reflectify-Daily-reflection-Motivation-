import { TrendingUp, Calendar } from "lucide-react";

interface StatsCardsProps {
  streak: number;
  totalEntries: number;
}

export default function StatCards({ streak, totalEntries }: StatsCardsProps) {
  return (
    <div className="flex justify-center items-center text-lg gap-6">
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full border border-slate-500/30 px-4 py-2">
        <Calendar className="w-5 h-5 text-blue-400" />
        <span>Streaks: {streak} days</span>
      </div>

      <div className="flex items-center gap-2 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-full border border-slate-500/30 px-4 py-2">
        <TrendingUp className="w-5 h-5 text-green-400" />
        <span>Total entries: {totalEntries}</span>
      </div>
    </div>
  );
}



