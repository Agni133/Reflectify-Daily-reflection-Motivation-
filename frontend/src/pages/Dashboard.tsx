import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "@/lib/axios";
import { motion } from "framer-motion";

interface Journals {
  id: number;
  content: string;
  createdAt: string;
}

interface Quotes {
  anime: string;
  character: string;
  quote: string;
}

export default function Dashboard() {
  const [journal, setJournal] = useState<Journals[]>([]);
  const [quotes, setQuotes] = useState<Quotes | null>(null);
  const [loading, setLoading] = useState(false);
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchJournal();
    fetchQuote();
  }, []);

  const fetchJournal = async () => {
    const res = await axios.get("api/journal");
    setJournal(res.data.journal);

    if (res.data.journal.length > 0) {
      const latest = res.data.journal[res.data.journal.length - 1];
      setNewContent(latest.content);
    }
  };

  const fetchQuote = async (mood?: string) => {
    try {
      const res = await axios.get(`/api/quotes${mood ? `?mood=${mood}` : ""}`);
      const data: Quotes | Quotes[] = res.data;

      if (Array.isArray(data) && data.length > 0) {
        setQuotes(data[0]);
      } else if (!Array.isArray(data)) {
        setQuotes(data);
      } else {
        setQuotes(null);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setQuotes(null);
    }
  };

  const handleAddJournal = async () => {
    if (!newContent.trim()) return;
    setLoading(true);

    await axios.post("/api/journal", {
      content: newContent,
    });

    setNewContent("");
    setLoading(false);
    fetchJournal();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/journal/${id}`);
    fetchJournal();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
    >
      {/* Header */}
      <header className="w-full px-8 py-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-3xl font-bold text-white text-center italic">Reflectify</div>
          <nav className="space-x-8 text-slate-300 font-medium">
            <Link to="/" className="hover:text-blue-400 ">
              Home
            </Link>
            <Link to="/profile" className="hover:text-blue-400 ">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-4xl font-extrabold text-center mb-6">
          Start Your Reflection 💭
        </h1>

        {/* Quotes Section */}
        <Card className="bg-slate-900/80 border border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 text-center">Quote of the Day</CardTitle>
          </CardHeader>
          <CardContent>
            {quotes ? (
              <>
                <p className="text-lg font-medium mb-2">"{quotes.quote}"</p>
                <small className="text-sm text-slate-400">
                  — {quotes.character} ({quotes.anime})
                </small>
              </>
            ) : (
              <p className="text-slate-400 italic text-center">No quote available</p>
            )}

            <div className="flex justify-center gap-4 mt-6">
              <Button
                className="bg-gradient-to-br from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-500 text-white rounded-xl"
                onClick={() => fetchQuote()}
              >
                Random Quote
              </Button>
              <Button
                className="bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black rounded-xl"
                onClick={() => fetchQuote("Happy")}
              >
                Happy Quote
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Journal Input */}
        <Card className="bg-slate-900/80 border border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 italic">Write Your Thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            {newContent && (
              <p className="text-xs text-slate-400 italic mb-2">
                Continuing from your last journal...
              </p>
            )}
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write your thoughts..."
              className="w-full h-40 resize-none p-3 rounded-md mb-4 text-white border border-slate-700 bg-slate-800 focus:ring focus:ring-blue-500"
            />
            <Button
              onClick={handleAddJournal}
              disabled={loading}
              className="w-full bg-gradient-to-br from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-500 text-white rounded-xl"
            >
              {loading ? "Saving..." : "Add Journal"}
            </Button>
          </CardContent>
        </Card>

        {/* Journal List */}
        <Card className="bg-slate-900/80 border border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-lg text-slate-200 text-center">
              📝 Your Past Reflections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {journal.length === 0 ? (
              <p className="text-slate-400 italic text-center">
                No entries yet. Write your thoughts above!
              </p>
            ) : (
              journal.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-slate-800/60 p-4 rounded-xl border border-slate-700"
                >
                  <p className="text-white">{entry.content}</p>
                  <small className="text-slate-400 block mt-1">
                    {new Date(entry.createdAt).toLocaleString()}
                  </small>
                  <Button
                    className="mt-3 bg-red-700 hover:bg-red-600 text-white rounded-lg"
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </motion.div>
  );
}
