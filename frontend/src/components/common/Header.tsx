import { Link } from "react-router-dom";

export default function Header(){

return (  
  <header className="w-full px-8 py-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
   <div className="flex items-center justify-between max-w-6xl mx-auto">
    <div className="text-3xl italic text-center text-white font-semibold ">Reflectify Me</div>
     <nav className="font-medium italic text-slate-300 space-x-8">
     <Link to= "/" className="hover:text-blue-400">Home</Link>
      <Link to= "/profile">Profile</Link> 

     </nav>
   </div>
  </header>
);

}