import { useState } from "react";
 
import { Button } from "@/components/ui/button";

import { Card ,CardHeader,CardContent,CardTitle } from "@/components/ui/card";

interface JournalInputProps {
 onAddJournal:(content:string , mood:string)=>void;
  loading: boolean       // true or false  on true loader is enable and false it diabled and processing 
  initialContent?:string   // intial content is string  
}
   
 const mood =[
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😐", label: "Neutral", value: "neutral" },
  { emoji: "😢", label: "Sad", value: "sad" },
  { emoji: "😤", label: "Frustrated", value: "frustrated" },
  { emoji: "😴", label: "Tired", value: "tired" },
  { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
]

export default  function JournalInput({onAddJournal ,initialContent,loading}:JournalInputProps){
    
  const [newcontent, setNewContent] = useState(initialContent??""); // start with intialcontent or start with empty content 
  const [selectedmood, setSelectedMood] = useState<string>("");
    
  const handleSubmit = ()=>{
    if(!newcontent.trim())
      return;
    onAddJournal(newcontent,selectedmood);
      setNewContent("");
      setSelectedMood("");
  }
   
  return (
   <Card className="shadow-xl bg-slate-900/80  border border-slate-800"> 
    <CardHeader>
      <CardTitle className="text-lg italic text-slate-200">Write your Thoughts..💭</CardTitle>
    </CardHeader>
    <CardContent>
     {initialContent && (
      <p className="text-xs text-slate-200 italic mb-2">
         Continuing from your last journal...
      </p>
     )}
        <textarea value={newcontent} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>)=>setNewContent(e.target.value)} 
       placeholder="Write your thoughts..."  className=" w-full h-32 p-3 mb-4 border border-slate-700 rounded-md resize-none focus:ring focus:ring-blue-500 text-white bg-slate-800" /> 
     
      {/* mood selection part */}
    <div className="mb-4">
      <p className="text-sm text-slate-300 mb-2">How are u feeling?</p>
      <div className="grid grid-cols-6 gap-2">
      {mood.map((mood) => (
              <Button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`p-2 rounded-lg border transition-all ${
                  selectedmood === mood.value
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-slate-600 bg-slate-800 hover:bg-slate-700'
                }`}
                title={mood.label}>
                     <div className="text-xl">{mood.emoji}</div>
                </Button>
      ))}
      </div>
    </div>
     
     <Button onClick={handleSubmit} disabled={loading} className="w-full bg-gradient-to-br from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-500 text-white rounded-xl">
      {loading? "Saving.." : "Add journal"}
     </Button>

    </CardContent>
   </Card>
  ) ; 

   }
