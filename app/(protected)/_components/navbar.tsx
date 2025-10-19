"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserButton from "./user-button";

const Navbar = () => {

    const pathName = usePathname();

  return (
    <div className="bg-white p-3 rounded-lg w-[600px] flex items-center justify-between">
        <div className="flex gap-x-2">
            <Button
                variant={pathName === "/server" ? "default" : "outline"}
            >
                <Link href={"/server"}>
                    Server
                </Link>
            </Button>
            <Button
                variant={pathName === "/client" ? "default" : "outline"}
            >
                <Link href={"/client"}>
                    Client
                </Link>
            </Button>
            <Button
                variant={pathName === "/admin" ? "default" : "outline"}
            >
                <Link href={"/admin"}>
                    Admin
                </Link>
            </Button>
            <Button
                variant={pathName === "/settings" ? "default" : "outline"}
            >
                <Link href={"/settings"}>
                    Settings
                </Link>
            </Button>
        </div>
        <UserButton/>

    </div>
  )
}

export default Navbar;