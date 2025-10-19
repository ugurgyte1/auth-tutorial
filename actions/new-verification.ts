"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import db from "@/lib/db";

export const newVerification = async (token:string) => {

    if(!token){
        return {error:"Missing token"};
    }

    const existingVerificationToken = await getVerificationTokenByToken(token);

    if(!existingVerificationToken){
        return {error:"Token does not exist"};
    }

    const expiredToken = new Date(existingVerificationToken.expires) < new Date(new Date().getTime() + 3 * 3600 * 1000);

    if(expiredToken){
        return {error:"Token expired"};
    }

    const existingUser = await getUserByEmail(existingVerificationToken.email);

    if(!existingUser){
        return {error:"Email does not exist"};
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            email: existingVerificationToken.email,
            emailVerified: new Date(new Date().getTime() + 3 * 3600 * 1000)
        }
    })

    await db.verificationToken.delete({
        where: {
            id: existingVerificationToken.id
        }
    })

    return {success:"Email successfully verified"};
    
}