"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import LogoutButton from "./logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

const UserButton = () => {

    const [isClient,setIsClient] = useState(false);

    const user = useCurrentUser();

    useEffect(() => {
        setIsClient(true);
    },[setIsClient])

    if(!isClient){
        return null;
    }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar className="cursor-pointer">
                <AvatarImage src={`${user?.image}`}/>
                <AvatarFallback className="bg-sky-500 text-white">
                    <FaUser/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
            <LogoutButton>
                <DropdownMenuItem className="cursor-pointer">
                    <ExitIcon/>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton;