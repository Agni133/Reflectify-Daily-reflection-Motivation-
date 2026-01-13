
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";
import axios from "@/lib/axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export  default function Login() {
  const navigate = useNavigate();
   const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const HandlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const HandlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/signin", form);
       const token = res.data?.token;
      if(!token){
        throw new Error("token is missing")

      }
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-indigo-500/20 via-pink-500/20 to-purple-500/20 animate-pulse blur-3xl opacity-60">
        
        <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-700 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-[30%] w-[200px] h-[200px] bg-pink-700 opacity-10 rounded-full blur-2xl animate-pulse"></div>
        
      </div>

      {/* Login Card */}
      <Card className="relative z-10 w-full max-w-md p-6 bg-slate-800 text-white shadow-xl rounded-2xl">
        <form onSubmit={HandlerSubmit} className="space-y-4">
        <CardContent>
          <h1 className="text-4xl font-bold text-center mb-6">Login</h1>
          
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-2">
      
                <label>Email</label>
              <Input id="email" name="email" type="email" placeholder="Enter your email"  onChange={HandlerChange} required/>
            </div>

            <div className="flex flex-col space-y-2 relative">
             <label >Password</label>
              <Input id="password"  name="password"  placeholder="Enter your Password" type={showPassword?"text":"password"} onChange={HandlerChange} required/>
             <span onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-8 cursor-pointer hover:text-white transition"> 
              {showPassword ? <EyeOff size={22}/>:<Eye size={22}/>}
             </span>
            </div>
              {typeof error === "string" && (
               <p className="text-sm text-red-400">{error}</p>
                       )}
            <Button  type ="submit" className="w-full bg-blue-800 hover:bg-indigo-700 mt-3" disabled ={loading}>
               {loading?"Signing in...":"Sign in"}
            </Button>

            <p className="text-sm text-gray-400 mt-4 text-center">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}   
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </div>
        </CardContent>
        </form>
      </Card>
    </div>
  );
}
