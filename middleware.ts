import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./routes";

const {auth} = NextAuth(authConfig);

export const runtime = "nodejs";
 
export default auth((req) => {

    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
      return null;
    }

    if(isAuthRoute){

      if(isLoggedIn){
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl));
      }

      return null;

    }

    if(!isLoggedIn && !isPublicRoute){

      let callbackUrl = nextUrl.pathname;

      if(nextUrl.search){
          callbackUrl += nextUrl.search;
      }

      const enncodedCallbackUrl = encodeURIComponent(callbackUrl); 

      return Response.redirect(new URL(
        `/auth/login?callbackUrl=${enncodedCallbackUrl}`,
        nextUrl
      ));

    }

    return null;

}) 

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}