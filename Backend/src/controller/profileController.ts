import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
 
export const updateProfilePic = async (req : Request, res: Response )=>{
 try{
   
    if(!req.file){
       return res.status(401).json({message:"No file Uploaded"})
    }
     
    const  updateUser = await prisma.user.update({
     where : {id: req.userId},
     data : {profilePic:req.file.path},
    })

      res.json({message : "Profile pic updated" , user:updateProfilePic})
 }catch(err){
   console.log(err);
   return res.status(500).json({message: "Server Error ",error :err })
 };
}