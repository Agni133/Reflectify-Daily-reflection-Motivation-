//  dedicated route for caluclation of chart of mood trend 
 import { Router } from "express";
  
 import { createJournal,deleteJournal,getuserJournal } from "../controller/journalController";

 import { authenticateToken } from "../middleware/authMiddleware";
  
  import { PrismaClient } from "@prisma/client";
  
   const prisma = new  PrismaClient();
   
   const router = Router();


  router.get("/mood",authenticateToken, async(req,res)=>{
  
    try{
    const userId = req.userId; 
    
    const mood = await prisma.journal.findMany({
       where:{
         userId
       },
       select:{
         mood:true,
         createdAt:true
       },
       orderBy:{
        createdAt:"asc"
       }
    })
     res.json(mood);
    }catch(err){
        res.status(500).json({error:"Failed to fetch moods"});
    }
  })