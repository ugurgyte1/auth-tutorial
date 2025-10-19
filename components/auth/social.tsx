"use client"

import {signIn} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

const Social = () => {

    const searchParams = useSearchParams();

    const callbackUrl = searchParams.get("callbackUrl");

    const onClick = (provider:"github" | "google") => {

        signIn(provider,{
            redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
        })
    }

  return (
    <div className="w-full flex gap-x-2">
        <Button
            className="w-1/2 cursor-pointer"
            variant={"outline"}
            size={"lg"}
            onClick={() => onClick("google")}
        >
            <FcGoogle/>
        </Button>
        <Button
            className="w-1/2 cursor-pointer"
            variant={"outline"}
            size={"lg"}
            onClick={() => onClick("github")}        
        >
            <FaGithub/>
        </Button>
    </div>
  )
}

export default Social;