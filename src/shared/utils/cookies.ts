import {Cookies} from "react-cookie";

export default class Cookie {
    cookies = new Cookies();

    constructor() {
    }

    getCookies(key: string) {
        return this.cookies.get(key);
    }

    setCookies(key: string, value: any, options?: any) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 12);
        const option = {
            path: "/",
            expires: expires,
            ...options
        }

        return this.cookies.set(key, value, {...option});
    }
}