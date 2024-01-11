"use client"
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {toast} from "sonner";

export default function DocumentsPage(){
    const {user}=useUser();
    const create=useMutation(api.documents.create);

    const onCreate=()=>{
        const promise=create({
            title:"Untitled"
        });
        toast.promise(promise,{
            loading:"Creating a new note...",
            success:"Note created successfully",
            error:"Failed to create a note"
        })
    }

    return(
        <div className="h-full flex flex-col items-center justify-center space y-4">
            <Image
            src="/empty.png"
            height="300"
            width="300"
            alt="empty"
            className="dark:hidden"
            />
            <Image
            src="/empty-dark.png"
            height="300"
            width="300"
            alt="empty"
            className="hidden dark:block"
            />

            <h2 className="text-large font-medium">Welcome to {user?.fullName}&apos;s Notion</h2>
            <Button className="mt-3" onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Create a note
            </Button>
        </div>
    )
}