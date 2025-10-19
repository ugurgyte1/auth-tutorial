import db from "@/lib/db";

export const getForgotPasswordTokenByEmail = async (email:string) => {

    try {
        
        const forgotPasswordToken = await db.forgotPasswordToken.findFirst({
            where: {
                email: email
            }
        })

        return forgotPasswordToken;

    } catch {
        
        return null;

    }
}

export const getForgotPasswordTokenByToken = async (token:string) => {

    try {
        
        const forgotPasswordToken = await db.forgotPasswordToken.findUnique({
            where: {
                token: token
            }
        })

        return forgotPasswordToken;

    } catch {
        
        return null;

    }
}