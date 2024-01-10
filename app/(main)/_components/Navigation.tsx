"use client"

import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef,ElementRef, useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import UserItem from "./UserItem";

export default function Navigation(){
    const isMobile=useMediaQuery("(max-width:768px)");
    const pathname=usePathname();

    const isResizingRef=useRef(false);
    const sideBarRef=useRef<ElementRef<"aside">>(null);
    const navBarRef=useRef<ElementRef<"div">>(null);
    const [isResetting,setisResetting]=useState(false);
    const [isCollapsed,setisCollapsed]=useState(isMobile);

    useEffect(()=>{
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }
    },[isMobile])

    useEffect(()=>{
        if(isMobile){
            collapse();
        }
    },[pathname,isMobile])

    const handleMouseDown=(
        event:React.MouseEvent<HTMLDivElement,MouseEvent>
    )=>{
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current=true;
        document.addEventListener("mousemove",handleMouseMove);
        document.addEventListener("mouseup",handleMouseUp);
    }

    const handleMouseMove=(event:MouseEvent)=>{
        if(!isResizingRef.current) return;
        let newWidth=event.clientX;

        if(newWidth<240) newWidth=240; //sidebar lower move parameter
        if(newWidth>480) newWidth=480;  //sidebar upper move parameter

        if(sideBarRef.current && navBarRef.current){
            sideBarRef.current.style.width=`${newWidth}px`;
            navBarRef.current.style.setProperty("left",`${newWidth}px`);
            navBarRef.current.style.setProperty("width",`calc(100%-${newWidth}px)`);
        }
    }

    const handleMouseUp=()=>{
        isResizingRef.current=false;
        document.removeEventListener("mousemove",handleMouseMove);
        document.removeEventListener("mouseup",handleMouseUp);
    }

    const resetWidth=()=>{
        if(sideBarRef.current && navBarRef.current){
            setisCollapsed(false);
            setisResetting(true);

            sideBarRef.current.style.width=isMobile? "100% ":"240px";
            navBarRef.current.style.setProperty(
                "width",
                isMobile ? "0":"calc(100%-240px)"
            );
            navBarRef.current.style.setProperty(
                "left",
                isMobile? "100%":"240px"
            )
            setTimeout(()=>setisResetting(false),300);
        }
    }

    const collapse=()=>{
        if(sideBarRef.current && navBarRef.current){
            setisCollapsed(true);
            setisResetting(true);

            sideBarRef.current.style.width="0";
            navBarRef.current.style.setProperty("width","100%");
            navBarRef.current.style.setProperty("left","0");

            setTimeout(()=>setisResetting(false),300);
        }
    }

    return(
        <>
            <aside className={cn(
                "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
                isResetting && "transition-all ease-in-out duration-300",
                isMobile && "w-0"    
                )} ref={sideBarRef}
                >
                <div className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",isMobile && "opacity-100")} role="button" onClick={collapse}>
                    <ChevronsLeft className="h-6 w-6"/>
                </div>
                <div>
                    <UserItem/>
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
                onMouseDown={handleMouseDown}
                onClick={resetWidth}
                />
            </aside>
            <div
            ref={navBarRef}
            className={cn("absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]", isResetting && "transition-all ease-in-out duration-300", isMobile && "left-0 w-4")}
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    {isCollapsed && <MenuIcon role="button" onClick={resetWidth} className="h-6 w-6 text-muted-foreground"/>}
                </nav>
            </div>
        </>
    )
}