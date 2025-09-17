import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { journalSchema } from '../utils/validate';

const prisma = new PrismaClient();

export const createJournal = async (req: Request, res: Response):Promise<void> => {
  try {
    const userId = req.userId;   
    const { content, mood } = req.body;

    if (!content) {
     res.status(400).json({ error: "Journal content is required" });
     return;
    }
    
    if (typeof userId !== 'number') {
       res.status(401).json({ error: 'Unauthorized: userId missing' });
       return ;
    }
    const validation = journalSchema.safeParse({content});

    if(!validation.success){
       res.status(401).json({error:validation.error.errors[0].message})
        return;
    }

    const journal = await prisma.journal.create({
      data: {
        content,
        userId,
        mood: typeof mood === 'string' && mood.trim() !== '' ? mood : 'neutral',
      },
    }); 

    res.status(201).json({ message: 'Journal created', journal });
  } catch (err) {
    console.error(err);
     res.status(500).json({ error: 'Internal server error' });
  }
};


export const getuserJournal = async(req:Request, res: Response)=>{
   try{
   
    const userId = (req as any).userid;
     
    const journals =  await prisma.journal.findMany({
      where: {
         userId
      },
      orderBy:{
        createdAt : "desc"
      }

    })

    res.status(200).json({success:true ,journals});
   }catch(err){
     console.error("error while fetching journal",err)
    res.status(500).json({success:false,message:"Internal server error"})
   }

}

export const deleteJournal = async(req: Request,res:Response)=>{
  const journalId = parseInt(req.params.id);
  const userId = (req as any).userid;
  const journal = await prisma.journal.findUnique({
    where :{
      id : journalId
    }
  });
  
  if(!journal || journal.userId !==userId){
      res.status(404).json({
       error : "Journal not found or unauthorized"
     })
  };

  await prisma.journal.delete({
    where:{
      id : journalId
    }
  })
  res.status(200).json({
    msg: "Journal got deleted"
 })
};
