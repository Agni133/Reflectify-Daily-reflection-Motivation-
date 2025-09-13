import { useEffect, useState } from "react";
import axios from "@/lib/axios"

interface Quotes {
anime : string;
character:string;
quote:string;
}

 interface SavedQuotes extends Quotes{
  id: number;
  savedAt:string;
 }
//   divide into 3 section savedquotes fetchquotes and savedfetchquotes  

export default function useQuotes(){
const [currentquotes,setCurrentQuotes]= useState<Quotes| null>();
const [savedquotes,setSavedQuotes]=useState<SavedQuotes[]>([]);

 const fetchquotes = async(mood?:string)=>{ 
   try{
    const res = await axios.get("/api/mood/quotes",{params:{mood}})
     const data: Quotes | Quotes[] =res.data ; //  fetch single quotes or array of quotes send from the backend   
       if(Array.isArray(data) && data.length>0){     //if data is array and it contain at least one element return that first element 
         setCurrentQuotes(data[0]);
       }else if(!Array.isArray(data)){  // data here is quotes so if data is not a array may be its string or object set it directly 
         setCurrentQuotes(data);
       }else{
        setCurrentQuotes(null);  // if data is array and its empty length is zero so return null 
       }
   }catch(err){
    console.error("error fetching quotes",err);
   }   

      
}

const fetchSavedquotes = async()=>{
  try{
  const res = await axios.get("/api/saved-quotes");
    setSavedQuotes(res.data.quotes|| [])
  }catch(err){
    console.error("Error fetching Saved quotes",err);
   }
};

const SavedQuotes = async(quote:Quotes)=>{
    try{
    await axios.post("api/saved-quotes",{
      anime :quote.anime,
      character :quote.character,
      quote : quote.quote
     });
      await fetchSavedquotes();
    }catch(err){
   console.error("Error Saving quotes",err)
    }
}  
  useEffect(()=>{
    fetchquotes();
    fetchSavedquotes();
  },[]);

  return {
   currentquotes,
   savedquotes,
   fetchquotes,
   SavedQuotes,
   fetchSavedquotes
  }

}   
