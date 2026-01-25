import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Protectedroute from "./components/common/Protectedroute";


function App(){
return (
     
    <Router>
     <Routes>
     <Route path="/" element ={<Landing />}/>
     <Route path ="/register" element={<Register/>}/>
     <Route path = "/login" element={<Login/>}/>
      <Route path ="/profile" element ={<Protectedroute> <Profile/></Protectedroute>}/>
      <Route path ="/dashboard" element ={<Protectedroute><Dashboard/></Protectedroute>}/>
     </Routes>
    </Router>

);
}

export default App;