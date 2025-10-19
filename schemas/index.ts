import { UserRole } from "@prisma/client";
import zod from "zod";

export const loginSchema = zod.object({
    email: zod.email({
        error: "Please provide a valid email"
    }),
    password: zod.string().min(6,{
        error: "Please provide a password at least 6 characters"
    })
})

export const registerSchema = zod.object({
    name: zod.string().min(6,{
        error: "Please provide a name at least 1 characters"
    }),
    email: zod.email({
        error: "Please provide a valid email"
    }),
    password: zod.string().min(6,{
        error: "Please provide a password at least 6 characters"
    })
})

export const forgotPasswordSchema = zod.object({
    email: zod.email({
        error: "Please provide a valid email"
    })
})

export const resetPasswordSchema = zod.object({    
    password: zod.string().min(6,{
        error: "Please provide a password at least 6 characters"
    })
})

export const twoFactorSchema = zod.object({    
    code: zod.string().min(6,{
        error: "Please provide a code at least 6 characters"
    })
})

const optionalString = zod.string().transform(e => (e === "" ? undefined : e)).optional();

export const settingsSchema = zod.object({
    name: zod.optional(zod.string().min(1,{
        error: "Please provide a name at least 1 character"
    })),
    email: zod.optional(zod.email({
        error: "Please provide a valid email"
    })),
    password: optionalString.pipe(zod.string().min(6,{
        error: "Please provide a password at least 6 characters"
    }).optional()),
    newPassword: optionalString.pipe(zod.string().min(6,{
        error: "Please provide a password at least 6 characters"
    }).optional()),
    role: zod.optional(zod.enum([UserRole.ADMIN,UserRole.USER])),
    isTwoFactorEnabled: zod.optional(zod.boolean())
}).refine((data) => {

    if(data.password && !data.newPassword){
        return false;
    }

    return true;

},{
    error: "Please provide a new password",
    path: ["newPassword"]
}).refine((data) => {

    if(!data.password && data.newPassword){
        return false;
    }

    return true;

},{
    error: "Please provide a password",
    path: ["password"]
})