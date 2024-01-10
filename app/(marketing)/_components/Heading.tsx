"use client"
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button"
import { useConvexAuth } from "convex/react"
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/clerk-react";

export default function Heading(){
    const {isAuthenticated,isLoading}=useConvexAuth();
    return(
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold">Your Ideas, Documents & Plans . Unified. Welcome to <span className="underline underline-offset-4">Notion</span></h1>
            <h3 className="text-base sm:text-xl sm:text-2xm font-medium">Notion is the connected workspace where better , faster work happens</h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg"/>
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter Notion
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>                      
                        Get Notion Today
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}