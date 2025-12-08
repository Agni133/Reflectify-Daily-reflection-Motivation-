import { Button } from  "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero (){
 return(
   <section className="flex flex-col justify-center py-24 px-6 text-center items-center">
     
     <motion.div
      initial ={{opacity:0,y:-10}}
      animate ={{opacity:1,y:0}} 
      transition={{duration:0.6}}
      className="flex items-center justify-center text-center gap-2 px-4 py-2 rounded-full mb-6 bg-blue-500/10 border border-blue-500/20 text-sm "
     >
     <span className="text-gray-300">Your Personal space for Daily Reflection </span>
     </motion.div>

     <motion.h1
      initial ={{opacity:0,y:20}}  
      animate ={{opacity:1 ,y:0}}
      transition={{duration:0.8}}     
      className ="text-5xl font-bold md:text-7xl text-center items-center justify-center mb-6 max-w-4xl leading-tight "
     >
       <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">Reflectify Me</span>
     </motion.h1>
      
      <motion.p
      initial ={{opacity:0,y:20}}
      animate ={{opacity:1 ,y:0}}
       transition={{duration:1,delay:0.3}}
       className="text-xl md:text-2xl mb-4 text-gray-300 max-w-2xl leading-relaxed"
      >
         Feel lighter, think clearer and stay motivated— all in one calm app.
      </motion.p>
      
      <motion.p
       initial ={{opacity:0, y:20}}
       animate ={{opacity:1 ,y:0}}
       transition= {{duration:1,delay:0.4}}
       className="text-lg text-gray-400 max-w-xl mb-10"
      >
          Your private space for daily journaling, mood tracking, and building mindful habits that stick.
      </motion.p>

      {/* button and variation */}
        
        <motion.div
         initial = {{opacity:0 ,y:20}}
         animate ={{opacity:1,y:0}}
         transition={{duration:1, delay:0.6}}
          className="flex flex-col item-center gap-4 sm:flex-row justify-center"
        > 
           <Link to ="/login">
           <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg rounded-full  hover:shadow-blue-500/25 shadow-2xl transition-all duration-300 hover:scale-105">
           🌿Start Reflecting 
           <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </Button>  
           </Link>
        </motion.div>

        {/* trust factors */}
        <motion.div
         initial={{opacity:0,y:20}}
         animate ={{opacity:1,y:0}}
          transition={{duration :1 ,delay:0.8}}       
          className="flex flex-wrap text-sm text-gray-400 mt-12 justify-center items-center gap-6"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"> </div>
            <span>No credit card Required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"> </div>
            <span>Free of Cost</span>
          </div>
         
        </motion.div>
   {/* floating card and dashboard suggestion */}
       <motion.div
        initial={{opacity:0, y:40}}
        animate={{opacity:1,y:0}}
        transition={{duration:1.2,delay:1}}
        className="mt-16 relative"
       >
        <div className="relative bg-gradient-br from-blue-500/10 to-purple-500/10  rounded-2xl border border-blue-500/20 shadow-2xl p-8  backdrop-blur-sm max-w-2xl">
         <div className="absoulte -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-75" />
           <div className="relative">
            {/* grey box and trust signs */}
           <div className="flex  items-center gap-2  mb-4">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"> </div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
           </div>
             {/* box inside the box  */}
           <div className="bg-gray-800/50 rounded-lg p-6 text-left">
            <div className="mb-4">
              <h4 className="text-sm text-gray-400 mb-2">Quote of the day</h4>
               <p className="text-gray-300 text-base mb-2 italic ">"The way to get started is to quit talking and begin doing."</p>
               <p className="text-sm text-gray-400 italic">-Walt Disney</p>
                <div className="flex gap-2 mt-3">
                 <div className=" px-3 py-1 bg-blue-500  text-sm text-white rounded-full">Random quotes</div> 
                 <div className="px-3 py-1 bg-yellow-500 text-sm text-white rounded-full">Happy quotes </div>
                </div>
            </div>
            
            <div className="border-t border-gray-600 pt-4">  
                 <h4 className="text-sm text-gray-600 mb-2 ">Write your Thoughts</h4>
                <p className="italic text-base text-gray-300"> "Feeling motivated after reading that quote. Today I want to focus on taking action rather than just planning..."</p>
                 <div className="flex  items-center justify-between mt-3">
                  <span className="text-blue-300 text-sm">🧈Journal Entry</span>
                  <span className="text-gray-500 text-sm">Today</span>
                 </div>
            </div>
           </div>
           </div>
        </div>
       </motion.div>
        


   </section>
 );
}

