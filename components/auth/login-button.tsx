"use client"

import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import LoginForm from "./login-form";

interface LoginButtonProps {
    children: React.ReactNode
    mode?: "redirect" | "modal"
    asChild?: boolean
}

const LoginButton = ({
    children,
    mode,
    asChild
}:LoginButtonProps) => {

    const router = useRouter();

    const onClick = () => {
        router.push("/auth/login");
    }

    if(mode === "modal"){
        return (
            <Dialog>                
                <DialogTrigger asChild={asChild}>
                    {children}
                </DialogTrigger>
                <DialogContent 
                    className="p-0 bg-transparent border-none w-auto"
                    onPointerDownOutside={(e) => {
                        e.preventDefault();
                    }}
                    onEscapeKeyDown={(e) => {
                        e.preventDefault();
                    }}
                >                    
                    <LoginForm/>
                    <DialogTitle></DialogTitle>
                </DialogContent>
            </Dialog>
        )
    }

  return (
    <span onClick={onClick}>
        {children}
    </span>
  )
}

export default LoginButton;