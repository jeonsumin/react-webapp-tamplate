import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export default class BaseAPI {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: import.meta.env.VIATE_APP_API_URL || "http://localhost:8080",
            timeout: 5000,
            headers: {"Content-Type": "application/json"},
        })

        this.initialize();
    }

    private initialize() {
        this.instance.interceptors.request.use(config => {

            return config;
        })

        this.instance.interceptors.response.use(config => {

            return config;
        })
    }

    public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.get(url, config).then(res => res.data);
    }

    public post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.post(url, data, config).then(res => res.data);
    }

    public put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.put(url, data, config).then((res) => res.data);
    }

    public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.instance.delete(url, config).then((res) => res.data);
    }

}