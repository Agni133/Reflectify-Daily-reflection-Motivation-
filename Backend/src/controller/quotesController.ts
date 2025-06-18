import axios from "axios";
import { Request, response, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

// Fallback quotes in case the API fails
const moodQuotes = {
  happy: [
    {
      anime: "LAZZRUS",
      character: "Axel",
      quote: "In order to fool your enemy, fool your friends first."
    }
  ],
  sad: [
    {
      anime: "Solo Leveling",
      character: "Jinwoo",
      quote: "I certainly got much stronger than before. But for some reason, I feel like something within me gets lost every time I get stronger."
    }
  ],
  anxious: [
    {
      anime: "Attack on Titan",
      character: "Eren Yeager",
      quote: "People who can’t throw something important away can never hope to change anything."
    }
  ]
};

export const getAnimeQuotes = async (req: Request, res: Response) => {
  const mood = req.query.mood as keyof typeof moodQuotes; // e.g., "happy", "sad", "anxious"
  try {
    // First, try fetching a random quote from the external API
    const response = await axios.get("https://yurippe.vercel.app/api/quotes?random=1");
      console.log("External api response",response.data);
    const { anime, character, quote } = response.data; 
    res.status(200).json({ anime, character, quote });
  } catch (err) {
    console.error("Failed to fetch from API, using fallback quotes:", err);

    //  If API fails, check if a valid mood was provided (e.g., ?mood=sad)
    if (mood && moodQuotes[mood]) {
      const quotesList = moodQuotes[mood];
      const randomQuote = quotesList[Math.floor(Math.random() * quotesList.length)];
      res.status(200).json(randomQuote);
    } else {
      //  If no valid mood, default to the first happy quote
      res.status(200).json(moodQuotes.happy[0]);
    }
  }
};

export const getSavedQuotes = async (req: Request, res: Response) => {
  const userId = (req as any).userId; 

  try {
    const quotes = await prisma.quotes.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    res.status(200).json(quotes);
  } catch (err) {
    console.error("Failed to fetch saved quotes:", err);
    res.status(500).json({ error: "Database error" });
  }
};