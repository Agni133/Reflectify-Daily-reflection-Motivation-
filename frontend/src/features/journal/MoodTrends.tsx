import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "@/lib/axios"

export default function MoodTrends(){ 
   const [data,setData] = useState([]);

      useEffect(()=>{
     axios.get("/api/journal/mood").then(res=>{
      // Define moodScores mapping
      const moodScores: { [key: string]: number } = {
        happy: 5,
        good: 4,
        neutral: 3,
        sad: 2,
        angry: 1,
        // Add more moods as needed
      };

      const chartdata = res.data.map((m: any) => ({
        date: new Date(m.createdAt).toISOString().split("T")[0],
        score: moodScores[m.mood] || 0,
      }));
      setData(chartdata);
     })     
         .catch(err => console.error(err));
      },[])

    return(
  
      <div className="w-full h-69">
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 4 " />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    
    )

}

