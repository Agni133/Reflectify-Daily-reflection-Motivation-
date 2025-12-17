import { useEffect, useState } from "react";
import axios from "@/lib/axios";

interface Journal {
  id: number;
  content: string;
  mood?: string;
  createdAt: string;
}

export function useJournal() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch all journals
  const fetchJournals = async () => {
    try {
      const res = await axios.get("/api/journals");
      console.log(journals);
      setJournals(res.data.journals); 
     
    } catch (err) {
      console.error("Error fetching journals", err);
    }
  };

  // Add journal
  const addJournal = async (content: string, mood: string) => {
    try {
      setLoading(true);
      await axios.post("/api/journals/create", { content, mood });
      await fetchJournals();
      console.log(fetchJournals);
    } catch (err) {
      console.error("Error adding journal", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete journal
  const deleteJournal = async (id: number) => {
    try {
    
      await axios.delete(`/api/journals/${id}`,{
        method : "DELETE"
      });
       
      await fetchJournals();
    } catch (err) {
      console.error("Error deleting journal", err);
    }
  };

  // Calculate streak of consecutive days
  const calculateStreak = () => {
    if (journals.length === 0) return 0;

    const sortedEntries = journals
      .map((entry) => new Date(entry.createdAt))
      .filter(
        (date, index, arr) =>
          arr.findIndex((d) => d.toDateString() === date.toDateString()) === index
      )
      .sort((a, b) => b.getTime() - a.getTime());

    let streak = 0;
    for (let i = 0; i < sortedEntries.length; i++) {
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);

      if (sortedEntries[i].toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };
    
  // Get latest journal entry
  const getLatestJournal = () => {
    if (journals.length > 0) {
      return journals[journals.length - 1].content;
    }
    return "";
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return {
    journals,
    loading,
    addJournal,
    deleteJournal,
    calculateStreak,
    getLatestJournal,
    refetch: fetchJournals,
  };
}
