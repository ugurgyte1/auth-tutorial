"use client"

import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-radial from-blue-400 to-blue-800 gap-y-6 text-white">
      <h1 className={cn(
        "text-6xl font-semibold drop-shadow-2xl text-center",
        font.className
        )}>
        🔐Auth
      </h1>
      <p className="text-lg text-center">
        Simple authentication service
      </p>
      <LoginButton asChild>
          <Button
            className="cursor-pointer"
            variant={"secondary"}
            size={"lg"}
          >
            Sign In
          </Button>
      </LoginButton>
    </main>
  );
}
