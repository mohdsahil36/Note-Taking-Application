import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
  });

export default function Logo(){
    return(
        <div className="hidden md:flex items-center gap-x-2">
            <Image src="/NotionLightModeLogo.svg" alt="logo" width="40" height="40" className="dark:hidden"/>
            <Image src="/NotionDarkModeLogo.svg" alt="logo-dark" width="40" height="40" className="hidden dark:block"/>
            <p  className={cn("font-semibold mt-2", font.className)}>Notion</p>
        </div>
    )
}