import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import axios from "axios";

const prisma = new PrismaClient();

export const updateProfilePic = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(401).json({ message: "No file Uploaded" });
      return;
    }

    const updateUser = await prisma.user.update({
      where: { id: req.userId },
      data: { profilePic: req.file.path },
    });

    res.json({ message: "Profile pic updated", user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err });
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { avatarId, avatarUrl, avatarName } = req.body;

    if (!avatarId) {
      res.status(400).json({ msg: "Avatar id is required" });
      return;
    }

    const updateuser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        avatarId: avatarId,
        avatarUrl: avatarUrl || null, // Store the image URL
        avatarName: avatarName || null, // Store the character/anime name
        profilePic: null,
      },
    });
    res.json({ msg: "Avatar updated", user: updateuser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};

 export const getProfileAvatar = async(req:Request ,res:Response)=>{
    
  try{
     const user = await  prisma.user.findUnique({
      where:{
        id: req.userId
      },
      select:{
        avatarId:true,
        avatarUrl:true,
        avatarName:true,
      }
     });

     if(!user){
      res.status(404).json({msg:"user not found"});
     }

    res.status(200).json(user);
    return
    
  }catch(err){
    res.status(500).json({msg:"Server error", error:err})
    
  }
 }

export const updateTheme = async (req: Request, res: Response) => {
  try {
    const { theme } = req.body;

    if (!theme) {
      res.status(400).json({
        msg: "Theme is missing",
      });
      return;
    }
    const updateUser = await prisma.user.update({
      where: {
        id: req.userId,
      },
      data: {
        theme: theme,
      },
    });
    res.json({ msg: "Theme is updated", user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};

export const updateFont = async (req: Request, res: Response) => {
  try {
    const { fontStyle } = req.body;

    if (!fontStyle) {
      res.status(400).json({ msg: "Font style is required" });
      return;
    }
    const updateUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        fontStyle: fontStyle,
      },
    });
    res.json({ msg: "Font updated", user: updateUser });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error", error: err });
  }
};

export const getAvatar = async (req: Request, res: Response) => {
  try {
    const { query, type = "character", page = "1" } = req.query;

    if (!query) {
      res.status(400).json({ msg: "Search query is required" });
      return;
    }

    let url = "";

    if (type === "character") {
      url = `https://api.jikan.moe/v4/characters?q=${query}&page=${page}&limit=12`;
    } else if (type === "anime") {
      url = `https://api.jikan.moe/v4/anime?q=${query}&page=${page}&limit=12`;
    } else {
      res.status(400).json({ msg: "Invalid type. Use 'character' or 'anime'" });
      return;
    }

    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    });

    const results = response.data.data.map((item: any) => ({
      id: item.mal_id,
      name: type === "character" ? item.name : item.title,
      image:
        type === "character"
          ? item.images?.jpg?.image_url
          : item.images?.jpg?.image_url,
      type,
    }));

      
    res.json({
      results,
      pagination: response.data.pagination,
    });
  } catch (err: any) {
    console.error("Jikan API Error:", err);

    // Handle specific errors
    if (err.response?.status === 429) {
      res.status(429).json({
        msg: "Rate limit exceeded. Please try again in a moment.",
      });
      return;
    }

    if (err.code === "ECONNABORTED") {
      res.status(504).json({ msg: "Request timeout. Please try again." });
      return;
    }

    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
