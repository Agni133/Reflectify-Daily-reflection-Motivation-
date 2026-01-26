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

// IMPORTANT: CORS MUST BE FIRST - BEFORE ANY OTHER MIDDLEWARE
const allowedOrigins = [
  'https://reflectify-daily-reflection-motivat-seven.vercel.app',
  'http://localhost:5173', // for local development
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight for 10 minutes
}));

// Handle preflight requests
app.options('*', cors());
  
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

export default app;