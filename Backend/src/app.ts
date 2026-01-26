import express from "express";
import authRoutes from  './routes/auth';
import journalRoutes from './routes/journal';
import quotesRoutes from  './routes/quotes';
import dotenv from 'dotenv'
import cors from "cors"
import profileRoutes from "./routes/profile"
import { getAvatar } from "./controller/profileController";
import path from "path";
import protectedRoutes from "./routes/protected";

dotenv.config();
const app = express();  

// CORS - Keep it simple
app.use(cors({
  origin: [
    'https://reflectify-daily-reflection-motivat-seven.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.options('*', cors());
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