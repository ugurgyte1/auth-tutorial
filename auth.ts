import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import {PrismaAdapter} from "@auth/prisma-adapter";
import db from "./lib/db";

declare module "next-auth" {

  interface Session {
    user: {
      
      role: "ADMIN" | "USER"
      isTwoFactorEnabled: boolean
      isOAuth: boolean      

    } & DefaultSession["user"]
  }
}

import { JWT } from "next-auth/jwt"
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";
 
declare module "next-auth/jwt" {
  
  interface JWT {
    
    role: "ADMIN" | "USER"
    isTwoFactorEnabled: boolean
    isOAuth: boolean    

  }
}
 
export const { 
    auth, 
    handlers, 
    signIn, 
    signOut 
} = NextAuth({
    callbacks: {        
        async signIn({account,user}){

            if(!account){
                return true;
            }

            if(account.provider !== "credentials"){
                return true;
            }

            if(!user.id){
                return true;
            }

            const existingUser = await getUserById(user.id);

            if(!existingUser || !existingUser.password || !existingUser.email || !existingUser.emailVerified){
                return false;
            }

            if(existingUser.isTwoFactorEnabled){

                const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if(!existingTwoFactorConfirmation){
                    return false;
                }

                await db.twoFactorConfirmation.delete({
                    where :{
                        id: existingTwoFactorConfirmation.id
                    }
                })
            }

            return true;

        },
        async session({session,token}){

            if(session.user && token.sub){
                session.user.id = token.sub;
            }
            
            if(session.user && token.role){
                session.user.role = token.role;
            }

            if(session.user && token.isTwoFactorEnabled){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
            }

            if(session.user && token.name){
                session.user.name = token.name;
            }

            if(session.user && token.email){
                session.user.email = token.email;
            }

            if(session.user && token.isOAuth){
                session.user.isOAuth = token.isOAuth;
            }

            return session;

        },
        async jwt({token}){

            if(!token.sub){
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if(!existingUser){
                return token;
            } 
            
            const existingAccount = await getAccountByUserId(existingUser.id);

            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled; 
            
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.isOAuth = !!existingAccount;

            return token;

        }
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {
                    id: user.id
                },
                data: {
                    emailVerified: new Date(new Date().getTime() + 3 * 3600 * 1000)
                }
            })
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },    
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    }
})