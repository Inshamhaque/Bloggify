import React, { useEffect } from "react";
import { LoaderOne } from "../components/ui/loader";
import { div } from "motion/react-client";

export function Loader2() {
    
  return <div className="h-screen bg-black flex items-center justify-center">
    <LoaderOne />;
    </div>
}
