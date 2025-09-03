import Hero from "@/components/Hero";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";

export default function Landing() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white overflow-x-hidden overflow-y-auto">
      
      {/* Blurred animated pulse layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900/80 to-slate-800 opacity-40 blur-2xl animate-pulse" />
       
      {/* Main content */}
      <div className="relative z-10">
        <Hero /> 
        <Features />
        <CTA />  
      </div>
    </div>
  );   
}


