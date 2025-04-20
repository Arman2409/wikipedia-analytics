import axios, { type AxiosInstance } from 'axios';

import { BASE_API_URL, WIKIPEDIA_API_URL } from '../configs/configs';

interface RequestHandler {
    getPageData(name: string, period: string): Promise<unknown[]>;
    getPageSuggestions(query: string): Promise<string[]>;
}

class RequestHandler {
    static instance: RequestHandler | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_API_URL,
        });

        this.axiosInstance.defaults.maxRedirects = 0;

        console.log(this.axiosInstance.interceptors.response);
        
        console.log("Request class initialized with:", BASE_API_URL);
    }

    static getInstance(): RequestHandler {
        if (!RequestHandler.instance) {
            RequestHandler.instance = new RequestHandler();
        }
        return RequestHandler.instance;
    }

    async getPageData(
        name: string, 
        period: string
    ): Promise<any> {
        try {
            const getViewParams = new URLSearchParams();
            getViewParams.set("name", name);
            getViewParams.set("period", period)

            const result = await this.axiosInstance.get(`http://localhost:3030/get_views?${getViewParams}`)

            return result.data;
        } catch (error) {
            console.log('Error fetching page views:', error);
            return [];
        }
    }

    // Wikipedia API for page suggestions
    async getPageSuggestions(query: string): Promise<string[]> {
        try {
            const response = await axios.get(
                WIKIPEDIA_API_URL + `?action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json&origin=*`
            );

            return response.data[1]; // Array of page titles
        } catch (error) {
            console.log('Error fetching suggestions:', error);
            return [];
        }
    }
}

export default RequestHandler.getInstance();