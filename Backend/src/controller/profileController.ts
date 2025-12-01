import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();
 
export const updateProfilePic = async (req : Request, res: Response )=>{
 try{
   
    if(!req.file){
       res.status(401).json({message:"No file Uploaded"})
       return;  
    }
     
    const  updateUser = await prisma.user.update({
     where : {id: req.userId},
     data : {profilePic:req.file.path},
    })

      res.json({message : "Profile pic updated" , user:updateProfilePic})
 }catch(err){
   console.log(err);
    res.status(500).json({message: "Server Error ",error :err })
 };
}

export const  updateAvatar = async(req:Request,res:Response) => {
     try{
   const {avatarId} = req.body;
    
       if(!avatarId){
         res.status(400).json({msg:"Avatar id is required"})
         return;
       }        
         
       const updateuser  = await prisma.user.update({
         where :{id:req.userId},
           data:{
             avatarId:avatarId,
             profilePic:null
           }
       });
       res.json({msg:"avatar updated",user: updateuser})
     }catch(err){
      console.log(err);
      res.status(500).json({msg:"Server error",error:err})
     }
}

export const updateTheme  =  async(req:Request ,res:Response)=>{
    try{
  const {theme}= req.body;
    
  if(!theme){
    res.status(400).json({
      msg:"theme is missing"
    });
    return;
  }
   const updateUser = await prisma.user.update({
      where:{
        id :req.userId,
      },
      data:{
       theme:theme,
      }
   })
   res.json({msg:"Theme is updated",user:updateUser})
}catch(err){
  console.log(err);
  res.status(500).json({msg:"server error",error:err});
}
}

export const updateFont = async(req:Request,res:Response)=>{
    try{
  const{fontStyle} = req.body;
     
  if(!fontStyle){
     res.status(400).json({msg:"font style is required"})
     return;
  }
     const updateUser = await prisma.user.update({
      where :{id :req.userId},
       data:{ 
        fontStyle:fontStyle,
       }
     })
     res.json({msg:"font updated",user:updateUser})
    }catch(err){
    console.log(err);
    res.status(500).json({msg:"server error",error:err})
    }
  
}

export const getAvatar = async(req:Request,res:Response)=>{
  try{
   const avatar = [
    { id: "naruto", name: "Naruto", imageUrl: "/avatars/naruto.png" },
    { id: "sasuke", name: "Sasuke", imageUrl: "/avatars/sasuke.png" },
    { id: "itachi", name: "Itachi", imageUrl: "/avatars/itachi.png" },
    { id: "madara", name: "Madara", imageUrl: "/avatars/madara.png" },
    { id: "obito", name: "Obito", imageUrl: "/avatars/obito.png" },
    { id: "jinwoo", name: "Sung Jinwoo", imageUrl: "/avatars/jinwoo.png" },
    { id: "hinata", name: "Hinata", imageUrl: "/avatars/hinata.png"},
    { id: "sakura", name: "Sakura", imageUrl: "/avatars/sakura.png" },
    { id: "luffy", name: "luffy", imageUrl: "/avatars/luffy.png" },
    { id: "nami", name: "nami", imageUrl: "/avatars/nami.png" },
    { id: "ASta", name: "Asta", imageUrl: "/avatars/asta.png" },
    { id: "Rikka", name: "rikka", imageUrl: "/avatars/rikka.png" },
    { id: "gojo", name: "gojo", imageUrl: "/avatars/gojo.png" },
    { id: "geto", name: "geto", imageUrl: "/avatars/geto.png" },
    { id: "hikigaya", name: "hikigaya", imageUrl: "/avatars/hikigaya.png" },
    { id: "hyouka", name: "hyouka", imageUrl: "/avatars/hyouka.png" },
    { id: "jiraya", name: "jiraya", imageUrl: "/avatars/jiraya.png" },
    { id: "nezko", name: "nezko", imageUrl: "/avatars/nezko.png" },
    { id: "tanjiro", name: "tanjiro", imageUrl: "/avatars/tanjiro.png" },
    { id: "toji", name: "toji", imageUrl: "/avatars/toji.png" },
    { id: "toji2", name: "toji2", imageUrl: "/avatars/toji2.png" },
    { id: "makima", name: "makima", imageUrl: "/avatars/makima.png" },
    { id: "denji", name: "denji", imageUrl: "/avatars/denji.png" },
    { id: "bulma", name: "bulma", imageUrl: "/avatars/bulma.png" },
    { id: "horikita", name: "horikita", imageUrl: "/avatars/horikita.png" },
    { id: "boruto", name: "boruto", imageUrl: "/avatars/boruto.png" },
    { id: "sarada", name: "sarada", imageUrl: "/avatars/sarada.png" },
    { id: "ayanakoji", name: "ayanakoji", imageUrl: "/avatars/ayanakoji.png" },
    { id: "goku", name: "goku", imageUrl: "/avatars/goku.png" },
    { id: "vegeta", name: "vegeta", imageUrl: "/avatars/vegeta.png" },
    
  ];
    res.json({avatar});
  
  }catch(err){
    console.log(err);
    res.status(500).json({msg:"Server error",error:err})

  }

}

