import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "./db";
import { v4 as uuidv4 } from 'uuid';
import { getForgotPasswordTokenByEmail } from "@/data/forgot-password-token";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import Crypto from "crypto";

export const generateVerificationToken = async (email:string) => {

    const verificationToken = await getVerificationTokenByEmail(email);

    if(verificationToken){
        await db.verificationToken.delete({
            where: {
                id: verificationToken.id
            }
        })
    }

    const token = uuidv4();

    const newVerificationToken = await db.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: new Date(new Date().getTime() + 4 * 3600 * 1000)
        }
    })

    return newVerificationToken;

}

export const generateForgotPasswordToken = async (email:string) => {

    const forgotPasswordToken = await getForgotPasswordTokenByEmail(email);

    if(forgotPasswordToken){
        await db.forgotPasswordToken.delete({
            where: {
                id: forgotPasswordToken.id
            }
        })
    }

    const token = uuidv4();

    const newForgotPasswordToken = await db.forgotPasswordToken.create({
        data: {
            email: email,
            token: token,
            expires: new Date(new Date().getTime() + 4 * 3600 * 1000)
        }
    })

    return newForgotPasswordToken;

}

export const generateTwoFactorToken = async (email:string) => {

    const twoFactorToken = await getTwoFactorTokenByEmail(email);

    if(twoFactorToken){
        await db.twoFactorToken.delete({
            where: {
                id: twoFactorToken.id
            }
        })
    }

    const token = Crypto.randomInt(100_000,1_000_000).toString();

    const newTwoFactorToken = await db.twoFactorToken.create({
        data: {
            email: email,
            token: token,
            expires: new Date(new Date().getTime() + 3.1 * 3600 * 1000)
        }
    })

    return newTwoFactorToken;

}