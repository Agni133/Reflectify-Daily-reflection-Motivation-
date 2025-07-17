import { Sparkles, Heart, PenLine } from "lucide-react";
import {motion}  from "framer-motion";

export function Features() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <motion.div
              initial={{opacity :0,y:20}}
             animate = {{opacity:1,y:0 }}
             transition={{duration:0.9}}
             className="max-w-5xl mx-auto text-center mb-12"
      >  
     <h2 className="text-black text-3xl font-semibold">Why Reflectify Me?</h2> <br />
      
      
      <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <PenLine className="w-8 h-8 mx-auto mb-4 text-amber-900" />
          <h3 className="text-xl font-semibold mb-2">Daily Journaling</h3>   
          <p className="text-gray-600">Pour your heart out, keep it safe & private.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-amber-900" />
          <h3 className="text-xl font-semibold mb-2">Mood & Random Quotes Boost</h3>
          <p className="text-gray-600">Save  random quotes that spark joy, track how you truly feel.</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow hover:shadow-md transition">
          <Heart className="w-8 h-8 mx-auto mb-4 text-amber-900" />
          <h3 className="text-xl font-semibold mb-2">Mindful Habits</h3>
          <p className="text-gray-600">Build a simple daily ritual that lifts your mind.</p>
        </div>
      </div>
      
      </motion.div>
    </section>
  );
}
