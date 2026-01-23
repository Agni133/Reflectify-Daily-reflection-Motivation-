import type { ReactNode } from "react";


import { Navigate } from "react-router-dom";

interface Protectedrouteprops{
 children:ReactNode
}

export default function Protectedroute({children}:Protectedrouteprops){

    const token = localStorage.getItem("token");

    if(!token){
    return <Navigate to ="/login" replace/>
    }

    return <>{children}</>

}

