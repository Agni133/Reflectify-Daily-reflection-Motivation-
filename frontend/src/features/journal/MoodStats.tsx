import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";

interface Journal{
 id : number;
 content:string;
 mood?:string;
 createdAt:string;
}

interface MoodStatProps{
 journals: Journal[]   // returning  all the journal list 
}

const moods = [
    { emoji: "😊", label: "Happy", value: "happy" },
    { emoji: "😐", label: "Neutral", value: "neutral" },
    { emoji: "😢", label: "Sad", value: "sad" },
    { emoji: "😤", label: "Frustrated", value: "frustrated" },
    { emoji: "😴", label: "Tired", value: "tired" },
    { emoji: "🤔", label: "Thoughtful", value: "thoughtful" },
    { emoji: "❤️", label: "Loved", value: "loved" },
    { emoji: "🔥", label: "Burning Desire", value: "burning desire" },
  ];
  

export default function MoodStats({journals}:MoodStatProps){
   const getMoodStats =()=>{
   // Calculate mood counts
   const moodCounts = journals.reduce((acc, journal) => {
     if (journal.mood) {
       acc[journal.mood] = (acc[journal.mood] || 0) + 1;
     }
     return acc;
   }, {} as Record<string, number>);

   // Convert moodCounts object to an array of { mood, count } objects
    return  Object.entries(moodCounts).map(([mood, count]) => ({
      mood,
      count,
      emoji:moods.find(m=>m.value === mood )?.emoji || "😊"
   }));
  };
    const moodStats= getMoodStats();
        if( !moodStats ||moodStats.length===0)
          return null;

     return (
       <Card className="bg-slate-900/80 border border-slate-800 shadow-xl">
       <CardHeader>
        <CardTitle className="text-slate-200 text-lg text-center">Your Mood trends</CardTitle>
       </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
  
        {moodStats.slice(0, 7).map(({ mood, count, emoji }) => (
          // start with mood object search through each mood and assign each box to { mood ,count, emoji}
         <div key={mood} className="rounded-lg text-center p-3 bg-slate-800/60 " >
          <div className="text-2xl mb-1">{emoji}</div>
          <div className="text-sm text-slate-300 capitalize">{mood}</div>
          <div className="text-lg font-semibold text-blue-400">{count}</div>
         </div>
        ))}
         </div>
      </CardContent>
       </Card>
     );

}