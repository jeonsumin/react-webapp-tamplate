import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

class AxiosClient {
    private static instance: AxiosClient;
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VIATE_APP_API_URL || "http://localhost:8080",
            timeout: 5000,
            headers: {"Content-Type": "application/json"},
        })

        this.setupInterceptors();
    }

    public static getinstance(): AxiosClient {
        if (!AxiosClient.instance){
            AxiosClient.instance = new AxiosClient();
        }
        return AxiosClient.instance;
    }
    private setupInterceptors(): void {
        this.axiosInstance.interceptors.request.use(config => {

            return config;
        })

        this.axiosInstance.interceptors.response.use(config => {

            return config;
        })
    }

    /**
     * 타입 안전한 GET 요청
     */
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const data = await this.axiosInstance.get(url, config);
        return data as T;
    }

    /**
     * 타입 안전한 POST 요청
     */
    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const result = await this.axiosInstance.post(url, data, config);
        return result as T;
    }

    /**
     * 타입 안전한 PUT 요청
     */
    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const result = await this.axiosInstance.put(url, data, config);
        return result as T;
    }

    /**
     * 타입 안전한 PATCH 요청
     */
    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const result = await this.axiosInstance.patch(url, data, config);
        return result as T;
    }

    /**
     * 타입 안전한 DELETE 요청
     */
    async delete<T = void>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const result = await this.axiosInstance.delete(url, config);
        return result as T;
    }


}

export const $axios = AxiosClient.getinstance();

export default $axios;