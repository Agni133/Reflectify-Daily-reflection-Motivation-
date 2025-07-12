import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

 export function CTA(){
   return (
     <footer className="py-16 bg-blue-50 text-center px-6">
      <h3 className="text-3xl font-bold mb-4">
         Ready to feel lighter & more focused?
      </h3>
         <Link to="/login">
          <Button className="mt-4 bg-slate-800 hover:bg-teal-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
            Join now <ArrowRight className="ml-2 w-5 h-5"/>
          </Button> 
         </Link>
     </footer>
   );
  
}
