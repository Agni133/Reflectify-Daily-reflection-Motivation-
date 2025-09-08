import { Button } from "@/components/ui/button";

import { Card ,CardTitle,CardContent,CardHeader } from "@/components/ui/card";


interface Journal{
 id: number;
 content:string;
 mood?:string;
 createdAt:string;
}

 interface JournalListProps {
  journals:Journal[]; // return the list of journals i have saved in the past
  ondelete:(id:number)=> void   // each journal entry have particular id and it return void type 
 } 

 const mood =[
 {emoji: "😊", label: "Happy", value: "happy"},
 {emoji: "😐", label: "Neutral", value: "neutral"},
 {emoji: "😢", label: "Sad", value: "sad"},
 {emoji: "😤", label: "Frustrated", value: "frustrated"},
 {emoji: "😴", label: "Tired", value: "tired"},
 {emoji: "🤔", label: "Thoughtful", value: "thoughtful"},
 ]

export default function JournalList({journals , ondelete}:JournalListProps){

    return(
    <Card className="bg-slate-900/80 border-slate-800 shadow-xl ">
    <CardHeader>
     <CardTitle className="text-lg text-center italic text-slate-200">Your Past Reflection 📝 </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
    {journals.length === 0 ? (
          <p className="text-slate-400 italic text-center">
            No entries yet. Write your thoughts above!
          </p>
        ) : (
          journals.map((entry) => (
            <div
              key={entry.id}
              className="bg-slate-800/60 p-4 rounded-xl border border-slate-700"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-white flex-1">{entry.content}</p>
                {entry.mood && (
                  <div className="ml-4 text-2xl" title={entry.mood}>
                    {mood.find(m => m.value === entry.mood)?.emoji}
                  </div>
                )}
              </div>
              <small className="text-slate-400 block mt-1">
                {new Date(entry.createdAt).toLocaleString()}
              </small>
              <Button
                size="sm"
                className="mt-3 bg-red-700 hover:bg-red-600 text-white rounded-lg"
                onClick={() => ondelete(entry.id)}
              >
                Delete
              </Button>
            </div>
              ))
            )}
    </CardContent>
    </Card>
    )
}
