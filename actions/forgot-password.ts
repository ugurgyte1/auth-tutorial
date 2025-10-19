"use server"

import { getUserByEmail } from "@/data/user";
import { sendForgotPasswordTokenEmail } from "@/lib/mails";
import { generateForgotPasswordToken } from "@/lib/tokens";
import { forgotPasswordSchema } from "@/schemas";
import zod from "zod";

export const forgotPassword = async (values:zod.infer<typeof forgotPasswordSchema>) => {

    const validatedFields = forgotPasswordSchema.safeParse(values);

    if(!validatedFields.success){
        return {error:"Invalid fields"};
    }

    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if(!existingUser || !existingUser.email){
        return {error:"Email does not exist"};
    }

    const forgotPasswordToken = await generateForgotPasswordToken(existingUser.email);

    await sendForgotPasswordTokenEmail(
        forgotPasswordToken.email,
        forgotPasswordToken.token
    )

    return {success:"Reset password token email sent"};

}