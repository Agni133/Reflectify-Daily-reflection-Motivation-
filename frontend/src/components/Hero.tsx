import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";


export default function Hero(){

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 overflow-hidden">

    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120%] h-[120%] bg-teal-100 rounded-full blur-3xl opacity-30 -z-10"/>

     <motion.h1 
     initial={{opacity :0,y:20}}
     animate = {{opacity:1,y:0 }}
     transition={{duration:0.8}}
       className="text-7xl font-bold mb-6 max-w-3xl"
       >
         Reflectify Me 
       </motion.h1>
    
     <motion.p  
      initial ={{opacity:0,y:20}}
      animate ={{opacity:1,y:0}}
      transition={{duration:1,delay:0.3}}
      className="text-2xl text-gray-700 mb-10 max-w-2xl"
>
 Feel lighter, think clearer, and stay motivated— all in one calm app.
</motion.p>
     
        <motion.div
          initial ={{opacity:0,scale:0.95}}
          animate={{opacity:1,scale:1}}
          transition={{duration:1,delay:0.6}}
        >
        <Link to = "/register" >
        <Button className="bg-yellow-500 hover:bg-gray-500 text-black px-8 py-4 text-lg rounded-full shadow-lg transition" >
           🌿 Start reflecting
        </Button>
        </Link>          
        </motion.div>
    </section>
  );
}