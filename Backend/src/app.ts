import express from "express";
import authRoutes from  './routes/auth';
import journalRoutes from './routes/journal';
import quotesRoutes from  './routes/quotes';
import dotenv from 'dotenv'
import cors from "cors"
import profileRoutes from "./routes/profile"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);

app.use('/api/journal',journalRoutes);
 
app.use('/api/journal/mood',journalRoutes)

app.use('/api/quotes',quotesRoutes);

app.use('api/profile',profileRoutes);
  
app.get("/",(_req,res)=>{
    res.send("Running reflectify me");
});

export default app;