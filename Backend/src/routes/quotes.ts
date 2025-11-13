import express, { Router } from "express";

import { getSavedQuotes, getAnimeQuotes,saveQuote } from "../controller/quotesController";

import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/',getAnimeQuotes);
router.get('/saved-quotes',authenticateToken,getSavedQuotes);

router.post('/saved-quotes',authenticateToken,saveQuote);


export default router ;