import express from  "express";
import { getAvatar, updateAvatar, updateFont, updateProfilePic, updateTheme } from "../controller/profileController";
import { upload } from "../middleware/upload";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.put("/upload", upload.single("profilePic") ,updateProfilePic)
router.put("/profile/avatar",authenticateToken,updateAvatar);
router.put("/profile/theme",authenticateToken,updateTheme);
router.put("/profile/font",authenticateToken,updateFont);
router.get("/avatar",authenticateToken,getAvatar);


export default router;


