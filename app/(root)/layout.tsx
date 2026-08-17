import React from "react";
import {Metadata} from "next"
import Header from "@/modules/home/header";
import Footer from "@/modules/home/footer";

export const metadata: Metadata = {
    title: {
        template: "VibeCode - Editor",
        default: "Code Editor for vibeCoders - Vibeo",
    }
}


export default function HomeLayout({children}:{children:React.ReactNode}){
     return(
        <>
        <div
          className="fixed inset-0 pointer-events-none dark:bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)]"
          style={{ backgroundSize: "60px 60px" }}
        />
        <Header />
        <main className="z-20 relative w-full pt-0">
          {children}
        </main>

        <Footer/>
        </>
     )
}