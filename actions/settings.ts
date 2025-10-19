"use server"

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import db from "@/lib/db";
import { settingsSchema } from "@/schemas";
import zod from "zod";
import bcrypt from "bcryptjs";
import { sendVerificationTokenEmail } from "@/lib/mails";
import { generateVerificationToken } from "@/lib/tokens";

export const settings = async (values:zod.infer<typeof settingsSchema>) => {

    const user = await currentUser();

    if(!user || !user.id){
        return {error:"Unauthorized"};
    }

    const dbUser = await getUserById(user.id);

    if(!dbUser){
        return {error:"Unauthorized"};
    }

    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== dbUser.email){

        const existingUser = await getUserByEmail(values.email);

        if(existingUser){
            return {error:"Email already in use"};
        }

        const verificationToken = await generateVerificationToken(values.email);

        await sendVerificationTokenEmail(
            verificationToken.email,
            verificationToken.token
        )

        return {success:"Verification token email sent"};

    }

    if(values.password && values.newPassword){

        const matchedPasswords = await bcrypt.compare(values.password,dbUser.password!);

        if(!matchedPasswords){
            return {error:"Incorrect password"};
        }

        const hashedPassword = await bcrypt.hash(values.newPassword,10);

        values.password = hashedPassword;

        const  {newPassword,...others} = values;

        values = others;

    }

    await db.user.update({
        where: {
            id: dbUser.id
        },
        data: {
            ...values
        }
    })

    return {success:"Settings updated"};
    
}