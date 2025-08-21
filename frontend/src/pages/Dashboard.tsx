import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "@/lib/axios";
import {motion} from "framer-motion"
 


 interface Journals{
  id: number;
 content:string;
 createdAt: string;
  }
    //    journal interface act as object and quotes interface too 
 interface Quotes{
 anime : string;
 character:string;
 quote:string;
     }
   

export default function Dashboard (){
 const [journal,setJournal]=useState<Journals[]>([]); // storing all the journal entry which is  fetched from the backend 
 const [quotes,setQuotes] =useState<Quotes|null>(null); // store single quote or null intiailly until it is fecthed form backend 
 const [loading,setLoading]=useState(false);       // laoder when submited the journal 
 const [newContent,setnewContent]=useState(""); //  tracking the new content adding to the jorunal 
   
  useEffect(()=>{
   fetchJournal();
   fetchQuote();
  },[])   // only render for first time 
    
  const fetchJournal = async()=>{
     const res =await axios.get("api/journal");
    setJournal(res.data.journal);
//  if user wants to write the existing journal 
     if(res.data.journal.length >0){
   const latest = res.data.journal[res.data.length-1];
      setnewContent(latest.content);
     }
  }
  

 const fetchQuote = async(mood?:string)=>{ 
const res = await axios.get(`/api/quotes${mood ? `?mood=${mood}` : ''}`);
    setQuotes(res.data);
 } 


 const handleAddJournal =async()=>{
    if(!newContent.trim())   
        return;      
    setLoading(true);  // make the spinner disable 
    
    await axios.post("/api/journal",{
      content: newContent,
    });
     setnewContent("");
     setLoading(false);
     fetchJournal();
 }
 
 const handleDelete = async(id:number)=>{
 await axios.delete(`/api/journal${id}`);
  fetchJournal(); // fetch the journal after delete the journal of paritcular id 
 }

 return (
     <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-x-hidden"
  >

   <header className="w-full px-6 py-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white z-10 =shadow-md">
    <div className="flex items-center justify-between">
 
    {/* Title */}
    <div className="text-2xl font-extrabold italic text-gray-300">Reflectify Me</div>

    {/* Nav links */}
    <nav className="space-x-8 gap-7 text-gray-300 ">
      <Link to="/" className="hover:text-blue-500 font-bold italic">Home</Link>
      <Link to="/profile" className="hover:text-blue-500 font-bold italic">Profile</Link>
    </nav>
  </div>
</header>

    {/* Background  */}
    <div className="absolute inset-0 -z-10 bg-gradient-to-br  from-slate-950 via-slate-900  bg-slate-800 opacity-40 blur-2xl animate-pulse" />
     {/* main content */}
     <main className="w-full max-w-4xl mx-auto px-6 py-12 z-10 relative">
      <h1 className="text-4xl font-extrabold mb-8 text-center italic">Start your Reflection💭</h1>

               {/* Quotes section */}
               <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-10">
                { quotes && (
               <>
                <p className="text-lg font-medium mb-1">"{quotes.quote}"</p>
              <small className="text-sm text-gray-300">— {quotes.character} ({quotes.anime})</small>
               </>
                )}

                <div className="space-x-5 mt-4 text-center">
                  <Button className="text-gray-400 hover:bg-slate-500 " onClick={()=>fetchQuote()}>

                    New Random Quotes 
                  </Button>
                   <Button className="text-gray-400 hover:bg-slate-500"onClick={()=>fetchQuote("Happy")}>
                    Happy Quotes
                   </Button> 
                </div>
               </div>
                   {newContent &&(
                     <p className="text-sm text-gray-400 italic">
                      Continuing with the previous journal 
                     </p>
 
                   )}
               {/* journal content  */}
               <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl space-x-5">
                 <textarea  value={newContent} onChange={(e)=>setnewContent(e.target.value)} placeholder="Write your thoughts....." className="w-full resize-none  h-60 p-3 rounded-md mb-4 text-black border border-slate-600 bg-slate-300 "/>
                  <Button className="text-center text-gray-400 rounded-md px-6 py-2 font-semibold italic hover:bg-slate-300 " onClick={handleAddJournal} disabled={loading}>
                      {loading? "Saving...":"Add Journal"}
                  </Button>
               </div>
                 
                 {/* journal saved  */}
                <div className="mt-10 space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">📝 Your Past Reflections</h2>

        {journal.length === 0 ? (
    <p className="text-gray-400 text-center italic">No entries yet. Write your thoughts above!</p>
  ) : (
    journal.map((entry) => (
      <div key={entry.id} className="bg-white/10 p-4 rounded-lg">
        <p className="text-white">{entry.content}</p>
        <small className="text-gray-400 block mt-1">
          {new Date(entry.createdAt).toLocaleString()}
        </small>
            <Button className="mt-2 text-gray-400 hover:bg-red-700 text-center" onClick={ ()=>handleDelete(entry.id)}>
                     Delete Journal
           </Button>
      </div>
    ))
  )}
</div>

     </main> 
  </motion.div>
);
}