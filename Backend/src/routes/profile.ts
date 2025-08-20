import express from  "express";
import { updateProfilePic } from "../controller/profileController";
import { upload } from "../middleware/upload";

const router = express.Router();

router.post("/upload", upload.single("profilePic") ,updateProfilePic)
export default router;