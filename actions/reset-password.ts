"use server"

import { resetPasswordSchema } from "@/schemas";
import zod from "zod";
import bcrypt from "bcryptjs";
import { getForgotPasswordTokenByToken } from "@/data/forgot-password-token";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";

export const resetPassword = async (values:zod.infer<typeof resetPasswordSchema>,token:string) => {

    const validatedFields = resetPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }

    const {password} = validatedFields.data;

    if(!token){
        return {error:"Missing token"};
    }

    const resetPasswordToken = await getForgotPasswordTokenByToken(token);

    if(!resetPasswordToken){
        return {error:"Token does not exist"};
    }

    const expiredToken = new Date(resetPasswordToken.expires) < new Date(new Date().getTime() + 3 * 3600 * 1000);

    if(expiredToken){
        return {error:"Token expired"};
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByEmail(resetPasswordToken.email);

    if(!existingUser){
        return {error:"Email does not exist"};
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword,
            email: resetPasswordToken.email
        }
    })

    await db.forgotPasswordToken.delete({
        where: {
            id: resetPasswordToken.id
        }
    })

    return {success:"Email changed"};

}