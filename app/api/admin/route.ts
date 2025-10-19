import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(){

    const role = await currentRole();

    if(role === UserRole.ADMIN){
        return NextResponse.json({success:"You are allowed to view this page"},{status:200});
    }

    return NextResponse.json({error:"You are not allowed to view this page"},{status:403});

}