"use server"

import { registerSchema } from "@/schemas";
import zod from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import db from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationTokenEmail } from "@/lib/mails";

export const register = async (values:zod.infer<typeof registerSchema>) => {

    const validatedFields = registerSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }

    const {name,email,password} = validatedFields.data;

    const user = await getUserByEmail(email);

    if(user){
        return {error:"Email already in use"};
    }

    const hashedPassword = await bcrypt.hash(password,10);

    await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    })

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationTokenEmail(
        verificationToken.email,
        verificationToken.token

    )

    return {success:"Verification token email sent"};
    
}