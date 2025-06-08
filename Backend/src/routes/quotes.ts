import express from "express"
import { getAnimeQuotes,getsavedQuotes } from "../controller/quotesController"
import { authenticateToken } from "../middleware/authMiddleware";

const router  = express.Router();

router.get('/',getAnimeQuotes);
router.get('/saved',authenticateToken,getsavedQuotes);