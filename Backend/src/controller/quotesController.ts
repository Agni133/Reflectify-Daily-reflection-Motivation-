 import axios from "axios";
import { Request,Response } from "express";
 import { Prisma, PrismaClient } from "@prisma/client";

 const prisma = new PrismaClient();
  // fallback quotes in case of fetching failure 
 const moodQuotes = {
   happy:[
    {
   anime:  " LAZZRUS",
   character : "Axel",
   quotes : "In order to fool ur enemy fool ur friends first"
    }
   ],
   sad :[
    {
    anime :"Solo leveling" ,
    character: "Jinwoo",
    quotes :"“I certainly got much more stronger than before. But for some reason, I feel like something within me get lost everytime I get stronger"
    },
   ],
   anixous :[
    {
    anime : "Attack on titan",
    character:"EREN YEGER ",
    quotes:" People who can’t throw something important away, can never hope to change anything." 
    },
   ],
 }
 export const getAnimeQuotes = async(req:Request,res:Response)=>{
   type mood = keyof typeof moodQuotes;
   
  const mood = req.query.mood as mood;

    if (mood && moodQuotes[mood]){
   const quotelist = moodQuotes[mood];
     const randomQuotes = quotelist[Math.floor(Math.random()* quotelist.length)]
      res.status(200).json({randomQuotes});
      return ;

    }
   
     try{
     const response = await axios.get("https://animechan.xyz/api/random");
     const {anime,character,quotes} = response.data;
      res.status(200).json({anime,character,quotes});
      return;
     }catch(err){
      console.error("Anime error fetching data",err);
      //fallback quotes
      const fallback = moodQuotes.happy[0];
      res.status(200).json(fallback);
     }
 }

 export  const getsavedQuotes = async(req:Request,res:Response)=>{
 const userId = (req as any).userId;
  const quotes = await prisma.quotes.findMany({
   where:{
     userId

   },
   orderBy :{
    createdAt:"desc"
   }
  });
  res.status(200).json(quotes);
 }