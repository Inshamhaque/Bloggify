import { useEffect } from "react";
import { LoaderOne } from "../components/ui/loader";

export function Loader() {
    useEffect(()=>{
        const token =  new URLSearchParams(location.search).get("token");
        if(token){
        localStorage.setItem("token",token)
        }
        window.location.href = '/blogs'
    },[])
  return <div className="h-screen bg-black flex items-center justify-center">
    <LoaderOne />;
    </div>
}
