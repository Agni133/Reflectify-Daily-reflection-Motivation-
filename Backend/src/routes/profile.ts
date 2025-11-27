import express from  "express";
import { getAvatar, updateAvatar, updateFont, updateProfilePic, updateTheme } from "../controller/profileController";
import { upload } from "../middleware/upload";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/upload", upload.single("profilePic") ,updateProfilePic)

router.put("/profile/avatar",authenticateToken,updateAvatar);
router.put("/proile/theme",authenticateToken,updateTheme);
router.put("/profile/font",authenticateToken,updateFont);
router.get("/avatar",getAvatar);
export default router;

