import express from "express";
import authRoutes from  './routes/auth';
import journalRoutes from './routes/journal';
import quotesRoutes from  './routes/quotes';
import dotenv from 'dotenv'
import cors from "cors"
import profileRoutes from "./routes/profile"
import { getAvatar } from "./controller/profileController";
import path, { join } from "path";
import { dir } from "console";
import protectedRoutes from "./routes/protected";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use('/api/auth',authRoutes);

app.use('/api/journals',journalRoutes);

app.use('/api/quotes',quotesRoutes);

app.use('/api/profile',profileRoutes);

app.use('/api/profile/anime',profileRoutes);

app.use('/api/protected',protectedRoutes);
  
app.get("/",(_req,res)=>{
    res.send("Running reflectify me");
});

export default app;