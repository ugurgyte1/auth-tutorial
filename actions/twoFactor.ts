"use server"

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import { getTwoFactorTokenByToken } from "@/data/twoFactorToken";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { twoFactorSchema } from "@/schemas";
import { AuthError } from "next-auth";
import zod from "zod";

export const twoFactor = async (values:zod.infer<typeof twoFactorSchema>,email:string,password:string) => {

    const validatedFields = twoFactorSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }

    const {code} = validatedFields.data;

    if(!code){
        return {error:"Missing code"};
    }

    const existingTwoFactorToken = await getTwoFactorTokenByToken(code);

    if(!existingTwoFactorToken){
        return {error:"Token does not exist"};
    }

    if(existingTwoFactorToken.token !== code){
        return {error:"Invalid code"};
    }

    const expiredToken = new Date(existingTwoFactorToken.expires) < new Date(new Date().getTime() + 3 * 3600 * 1000);

    if(expiredToken){
        return {error:"Token expired"};
    }

    const existingUser = await getUserByEmail(existingTwoFactorToken.email);

    if(!existingUser){
        return {error:"Email does not exist"};
    }

    const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

    if(existingTwoFactorConfirmation){
        await db.twoFactorConfirmation.delete({
            where: {
                id: existingTwoFactorConfirmation.id
            }
        })
    }

    await db.twoFactorConfirmation.create({
        data :{
            userId: existingUser.id
        }
    })

    await db.twoFactorToken.delete({
        where: {
            id: existingTwoFactorToken.id
        }
    })

    try {
        
        await signIn("credentials",{
            email: email,
            password: password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })

        return {success:""};

    } catch (error) {
        
        if(error instanceof AuthError){
            switch (error.name) {
                case "CredentialsSignin":
                    
                    return {error:"Invalid credentials"};
            
                default:
                    return {error:"Something went wrong"};
            }
        }

        throw error;
    }    

}