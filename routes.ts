/**
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification"
]

/**
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/auth/two-factor"
]

/**
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";