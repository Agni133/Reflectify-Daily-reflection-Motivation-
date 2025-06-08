import { env } from 'process';
import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const Port = process.env.Port || 3000;

app.listen(Port,()=>{
  
    console.log(`Server running on https://localhost:${Port}`);
    
}); 


