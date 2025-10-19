import {Resend} from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseUrl = process.env.BASE_URL;

export const sendVerificationTokenEmail = async (email:string,token:string) => {

    const linkUrl = `${baseUrl}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your verification token is here",
        html: `<p>Click this <a href="${linkUrl}">link</a> to verify your email</p>`
    })
}

export const sendForgotPasswordTokenEmail = async (email:string,token:string) => {

    const linkUrl = `${baseUrl}/auth/reset-password?token=${token}`;

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your reset password token is here",
        html: `<p>Click this <a href="${linkUrl}">link</a> to reset your password</p>`
    })
}

export const sendTwoFactorTokenEmail = async (email:string,token:string) => {    

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your two factor token is here",
        html: `<p>Your two factor token is ${token}</p>`
    })
}