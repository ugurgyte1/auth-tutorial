import db from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email:string) => {

    try {
        
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: {
                email: email
            }
        })

        return twoFactorToken;

    } catch {
        
        return null;

    }
}

export const getTwoFactorTokenByToken = async (token:string) => {

    try {
        
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: {
                token: token
            }
        })

        return twoFactorToken;

    } catch {
        
        return null;

    }
}