import express from "express";
import authRoutes from  './routes/auth';
import journalRoutes from './routes/journal';
import quotesRoutes from  './routes/quotes';
import dotenv from 'dotenv'
import cors from "cors"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);

app.use('/api/journal',journalRoutes);

app.use('/api/quotes',quotesRoutes);
  
app.get("/",(_req,res)=>{
    res.send("Running reflectify me");
});

export default app;