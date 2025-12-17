import { motion } from "framer-motion";
import Header from "@/components/common/Header";
import StatsCards from "@/components/common/StatsCards";
import JournalInput from "@/features/journal/JournalInput";
import JournalList from "@/features/journal/JournalList";
import MoodStats from "@/features/journal/MoodStats";
import QuoteCard from "@/features/quotes/QuoteCard";
import SavedQuotes from "@/features/quotes/SaveQuotes";
import MoodTrends from "@/features/journal/MoodTrends";
import { useJournal } from "@/features/journal/hooks/useJournal";
import { useQuotes } from "@/features/quotes/hooks/useQuotes";

export default function Dashboard() {
  const {
    journals,
    loading,
    addJournal,
    deleteJournal,
    calculateStreak,
    getLatestJournal
  } = useJournal();

  const {
    currentQuote,
    savedQuotes,
    fetchQuote,
    saveQuote
  } = useQuotes();

  const handleSaveQuote = () => {
    if (currentQuote) {
      saveQuote(currentQuote);
    }
  };

  const handleFetchRandomQuote = () => fetchQuote();
  const handleFetchHappyQuote = () => fetchQuote("Happy");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold italic">Start Your Reflection 💭</h1>
          
          {/* Stats Cards */}
          <StatsCards 
            streak={calculateStreak()} 
            totalEntries={journals.length} 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Quotes Section */}
            <QuoteCard
              quote={currentQuote}
              onSavedQuote ={handleSaveQuote}
              onFetchRandomQuote={handleFetchRandomQuote}
              onFetchHappyQuote={handleFetchHappyQuote}
            />
            
               <MoodTrends />
            
            {/* Saved Quotes Toggle */}
            <SavedQuotes savedQuotes={savedQuotes as any} />
            {/* Mood Stats */}
            <MoodStats journals={journals} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Journal Input */}
            <JournalInput
              onAddJournal={addJournal}
              loading={loading}
              initialContent={getLatestJournal()}
            />


          </div>
        </div>

        {/* Journal List */}
        <JournalList 
          journals={journals}
         
          onDelete={deleteJournal} 
        />
      </main>
    </motion.div>
  );
}