import { Button } from "@/components/ui/button";

import { Card,CardContent,CardTitle,CardHeader } from "@/components/ui/card";

import { Heart } from "lucide-react";
  
 interface Quote {
  anime: string
  character: string 
  quote: string
 }

 interface QuoteCardProps {
   quote :Quote |null;
    onSavedQuote:()=>void;
    onFetchRandomQuote: ()=> void;
    onFetchHappyQuote:()=>void;
 }  

export default function QuoteCard({quote,onSavedQuote,onFetchHappyQuote,onFetchRandomQuote}:QuoteCardProps){
  
return (
  <Card className="bg-slate-900/80 border-slate-800 shadow-xl">
   <CardHeader>
   <CardTitle className="text-lg text-slate-200 text-center">QUOTE OF THE DAY</CardTitle>
   </CardHeader>
   <CardContent>
   {quote ?(
  <>
   <p className="text-lg font-medium mb-2 italic text-slate-200">{quote.quote}</p>
   <small className="text-sm text-slate-200 italic">
    -{quote.character} ({quote.anime})
   </small>
   <div className="flex justify-center gap-2 mt-4">
     <Button size="sm" className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white rounded-lg" onClick={onSavedQuote}>
      <Heart className="w-4 h-4 mr-1">
        Save quotes
      </Heart>
     </Button>
   </div>
  </>

   ):(
   <p className="text-center italic text-slate-400">No Quotes Avaiable</p>
   )}

   <div className="flex justify-center gap-4 mt-6">
     <Button  className="bg-gradient-to-br from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-500 text-white rounded-xl"  onClick={onFetchRandomQuote}>
      Random Quotes 
     </Button>
     <Button  className="bg-gradient-to-br from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-white rounded-xl" onClick={onFetchHappyQuote}>
      Happy Quotes
     </Button>
   </div>
   </CardContent>
  </Card>
)  
}