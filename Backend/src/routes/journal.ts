import { Router } from "express";

import { createJournal, deleteJournal, getuserJournal } from "../controller/journalController";

import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

 router.post('/create',authenticateToken, createJournal);
 router.get('/',authenticateToken,getuserJournal);
 router.delete('/:id',authenticateToken,deleteJournal)
     
export default router;
