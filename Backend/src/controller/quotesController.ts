import axios from "axios";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const moodQuotes = {
  happy: [
    {
      anime: "LAZZRUS",
      character: "Axel",
      quote: "In order to fool your enemy, fool your friends first."
    },
    {
      anime: "Dragon Ball Z",
      character: "Vegeta",
      quote:"You goona be best or u be nothing"
    }
  ],
  sad: [
    {
      anime: "Solo Leveling",
      character: "Jinwoo",
      quote:
        "I certainly got much stronger than before. But for some reason, I feel like something within me gets lost every time I get stronger."
    }
  ],
  anxious: [
    {
      anime: "Attack on Titan",
      character: "Eren Yeager",
      quote:
        "People who can’t throw something important away can never hope to change anything."
    }
  ],
  Random:[
   {
     anime : "Dragon ball z",
     character : "Goku",
     quote: "Even a lower class can beat an elite if he puts his mind and body into it"
   }
  ]
};

export const getAnimeQuotes = async (req: Request, res: Response) => {
  const mood = (req.query.mood as string)?.toLowerCase() as
    | keyof typeof moodQuotes
    | undefined;

  try {
    // Fetch from external API (returns an array)
    const response = await axios.get<
      { anime: string; character: string; quote: string }[]
    >("https://yurippe.vercel.app/api/quotes?random=1");

    console.log("External API response", response.data);

    // Pick the first quote (since it's an array)
    const animeQuote = response.data[0];

    res.status(200).json({
      anime: animeQuote.anime, 
      character: animeQuote.character,
       text: animeQuote.quote,
       mood:moodQuotes
    });
  } catch (err) {
    console.error("Failed to fetch from API, using fallback quotes:", err);

    if (mood && moodQuotes[mood]) {
      const quotesList = moodQuotes[mood];
      const randomQuote =
        quotesList[Math.floor(Math.random() * quotesList.length)];
      res.status(200).json(randomQuote);
    } else {
      res.status(200).json(moodQuotes.happy[0]);
    }
  }
};
 
  export const saveQuote = async (req:Request ,res:Response)=>{
    const userId = (req as any).userId;
     
       if(!userId){
        res.status(401).json({ error:"Unauthorized"});
       }

    const {anime,character,text,mood}= req.body;
     try{
       const newQuote = await prisma.quotes.create({
          data:{
          anime,
          character,
          text,
          mood,
          userId
          }
       });
       res.status(201).json(newQuote)
     }catch(err){
     console.error("Fetching error while saving quotes",err)
       res.status(500).json({error: "Database  error while fetching the quotes"})

     }

  }

  // end point to fetch the save quotes 
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
