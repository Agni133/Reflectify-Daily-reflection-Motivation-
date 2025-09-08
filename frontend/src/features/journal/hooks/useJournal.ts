import { useEffect, useState } from "react";

import axios from "@/lib/axios";


interface Journal {
  id: number;
  content:string;
  mood?:string;
  createdAt:string; 

}

export function useJournal(){

const [journals,setJournals]= useState<Journal[]>([]);  // returing the all the journal list interface have id content mood and time 
 const [loading,setLoading]=useState(false);

 const fetchJournals = async()=>{
   try{
   const res = await axios.get("api/journal");
     setJournals(res.data.journal)
   }catch(err){
    console.error("error fetching journals",err)
   }
 }
  const addJournal= async(content:string ,mood:string)=>{
    try{
    await axios.post("/api/journal", {
     content,
     mood,
    });
     await fetchJournals(); // getting the api from the db and await for few minuttes after adding the journal 
    }catch(err){  
   console.error("Error fetching addJournal",err)
    }finally{
        setLoading(false);
    }
  
  }
  
  const deleteJournal = async(id:number)=>{
     try{
    await axios.delete(`/api/journal/${id}`)
    await fetchJournals();
     }catch(err){
      console.error("Error deleting user journal",err)
     }
  };
    
      const calculateStreak = ()=>{
      // no journal exist then streak is count as zero  
      if(journals.length===0)
    return 0;
       //  Convert journal dates into readable date strings (ignoring time)
  //  Remove duplicate dates so we only count unique days  
      // desc the  entries date from newest to oldest 
   const sortedEntries = journals.map(entry=> new Date(entry.createdAt.toString())).filter((Date,index,arr)=>arr.indexOf(Date)===index).sort((a,b)=> new Date(b).getTime() - new Date(a).getTime());
      // 1 2 3 4 5 6 1 1 it filter the value and returns 1 2 3 4 5 6 
      let streak =0;
     
      for(let i=0;i<sortedEntries.length;i++){
        const exceptedDate = new Date();
        exceptedDate.setDate(exceptedDate.getDate()-i);
         
        if(sortedEntries[i].toDateString()===exceptedDate.toDateString()){
         streak++;
        }else{
          break;
        }
      }
       return streak;
      }
    //  returning journal entry if u havnt finished the journal yet 
   const getLatestJournal =()=>{
    
    if(journals.length >0){
      return journals[journals.length-1].content;  //  journal length is more than 0 means something is written 

    }
  return "";  // if no journal or entry written give an empty  nothing is store 
   }  

   useEffect(()=>{
    fetchJournals();
   },[]);

   return {
    journals,
    loading,
    addJournal,
    deleteJournal,
    calculateStreak,
    getLatestJournal,
    refetch: fetchJournals 

   };

}