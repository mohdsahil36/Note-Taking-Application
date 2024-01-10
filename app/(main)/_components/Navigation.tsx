"use client"

import { ChevronsLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef,ElementRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

export default function Navigation(){
    const isMobile=useMediaQuery("(max-width:768px)");
    const pathname=usePathname();

    const isResizingRef=useRef(false);
    const sideBarRef=useRef<ElementRef<"aside">>(null);
    const navBarRef=useRef<ElementRef<"div">>(null);
    const [isResetting,setisResetting]=useState(false);
    const [isCollapsed,setisCollapsed]=useState(isMobile);
    return(
        <>
            <aside className={cn(
                "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"    
                )} ref={sideBarRef}>
                <div className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition">
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <p>Action items!</p>
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"/>
            </aside>
        </>
    )
}