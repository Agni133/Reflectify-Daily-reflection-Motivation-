import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/lib/axios";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuLabel 
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { User, LogOut,  ChevronDown } from "lucide-react";

export default function Header() {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
    
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const res = await api.get("/api/profile/profile/avatar");
        setAvatarUrl(res.data.avatarUrl);
      } catch (err) {
        console.error("error fetching avatar", err);
      }                
    };
    fetchAvatar();
  }, []);

  return (  
    <header className="w-full px-8 py-4 border-b border-slate-800 bg-slate-900/70 backdrop-blur-md">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-3xl italic text-center text-white font-semibold">
          Reflectify Me
        </div>
        
        <nav className="flex items-center gap-6 font-medium italic text-slate-300">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button className="flex items-center gap-2 outline-none group">
                <div className="relative">
                  <img
                    src={avatarUrl || "/default-avatar.png"}
                    alt="profile-pic"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-700 group-hover:ring-blue-500 transition-all duration-200"
                  />
                </div>
                <ChevronDown 
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`} 
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-56 bg-slate-900 border border-slate-800 rounded-lg shadow-2xl p-2 animate-in fade-in-0 zoom-in-95"
            >
              <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                My Account
              </DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-200 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer outline-none focus:bg-slate-800"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">Profile</span>
                </Link>
              </DropdownMenuItem>


              <DropdownMenuSeparator className="my-2 h-px bg-slate-800" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-red-400 hover:bg-red-950/50 hover:text-red-300 transition-colors cursor-pointer outline-none focus:bg-red-950/50"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}