import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const COOKIE_KEY = {
    ACCESS_TOKEN: "access_token",
    REFRESH_TOKEN: "refresh_token",
} as const;

export const cookie = {
    get<T = unknown>(key: string): T | undefined {
        return cookies.get(key);
    },

    set(key: string, value: unknown, options?: any) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 12);

        cookies.set(key, value, {
            path: "/",
            expires,
            ...options,
        });
    },

    remove(key: string, options?: any) {
        cookies.remove(key, { path: "/", ...options });
    },
};
