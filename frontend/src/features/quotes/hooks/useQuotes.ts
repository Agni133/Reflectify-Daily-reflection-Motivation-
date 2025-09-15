import { useState, useEffect } from "react";
import axios from "@/lib/axios";

interface Quote {
  anime: string;
  character: string;
  quote: string;
}

interface SavedQuote extends Quote {
  id: number;
  savedAt: string;
}

export const useQuotes = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);

  const fetchQuote = async (mood?: string) => {
    try {
      const res = await axios.get(`/api/quotes${mood ? `?mood=${mood}` : ""}`);
      const data: Quote | Quote[] = res.data;

      if (Array.isArray(data) && data.length > 0) {
        setCurrentQuote(data[0]);
      } else if (!Array.isArray(data)) {
        setCurrentQuote(data);
      } else {
        setCurrentQuote(null);
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setCurrentQuote(null);
    }
  };

  const fetchSavedQuotes = async () => {
    try {
      const res = await axios.get("api/saved-quotes");
      setSavedQuotes(res.data.quotes || []);
    } catch (error) {
      console.error("Error fetching saved quotes:", error);
    }
  };

  const saveQuote = async (quote: Quote) => {
    try {
      await axios.post("/api/saved-quotes", {
        anime: quote.anime,
        character: quote.character,
        quote: quote.quote
      });
      await fetchSavedQuotes();
    } catch (error) {
      console.error("Error saving quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchSavedQuotes();
  }, []);

  return {
    currentQuote,
    savedQuotes,
    fetchQuote,
    saveQuote,
    fetchSavedQuotes
  };
};