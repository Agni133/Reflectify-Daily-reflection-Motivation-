import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "@/lib/axios"; // custom axios instance
import { useNavigate } from "react-router-dom";
import { Eye,EyeOff } from "lucide-react";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword,setShowPassword]=useState(false);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/signin", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" relative min-h-screen flex items-center justify-center bg-slate-900 overflow-hidden px-4">
       {/* background styling */}
       <div className=" absolute inset-0 z-0 bg-gradient-to-tr from-indigo-500/20 via-pink-500/20 to-purple-500/20 animate-pulse blur-3xl opacity-60  pointer-events-none min-h-screen w-full">

            <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-700 opacity-20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-1/2 left-[30%] w-[200px] h-[200px] bg-pink-700 opacity-10 rounded-full blur-2xl animate-pulse"></div>

       </div>
      <Card className="  relative z-10 w-full max-w-md p-6  bg-slate-800 text-white shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-5xl font-semibold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative space-y-1">
              <label >Username</label>
            <Input name="name" placeholder="Name" onChange={handleChange} required />
               </div>
               <div className="relative space-y-1">
              <label>Email</label>
            <Input name="email" placeholder="Email" type="email" onChange={handleChange} required />
              </div>
              <div className="relative space-y-1 ">
              <label>Password</label>
            <Input name="password" placeholder="Password" type={showPassword ? "text":"password"} onChange={handleChange} required />
                <span onClick={()=>setShowPassword(!showPassword)} className=" absolute right-3 top-8 cursor-pointer">
                   {showPassword? <EyeOff size={23}/>:<Eye size={23}/>}
                </span>
               </div>
            {error && <p className="text-sm text-red-500">{error}</p>} <br />
            <Button className="w-full  bg-blue-700 text-white" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
