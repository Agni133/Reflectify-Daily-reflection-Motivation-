import { Router } from "express";
import { authenticateToken } from "../middleware/authMiddleware";


const router = Router();
router.get("/dashboard",authenticateToken,(req,res)=>{
   try{
    res.json({
      message: "Welcome to the dashboard",
      user :req.user
      })
   }catch(err){
     res.status(500).json({msg:"Server error",err})
   }
})
  
router.get("/profile",authenticateToken,(req,res)=>{
  try{
   res.json({
     message:"profile",
    user: req.user
   })

  }catch(err){
    res.status(500).json({msg:"Server error",err})
  }
})

export default  router;