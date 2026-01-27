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

app.use(cors({
  origin: [
    'https://reflectify-daily-reflection-motivat-seven.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  maxAge: 600,
}));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


export default app;