import express from "express";
import * as authController from "../controller/authController";

// >>>>>>> Stashed changes
const router = express.Router();
router.post("/signup", authController.signup);

router.post("/signin", authController.login);
// <<<<<<< Updated upstream


export default router;

// >>>>>>> Stashed changes
