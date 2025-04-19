import axios, { type AxiosInstance } from 'axios';

import { BASE_API_URL, WIKIPEDIA_API_URL } from '../configs/configs';

interface Request {
    getPageData(name: string, period: string): Promise<unknown[]>;
    getPageSuggestions(query: string): Promise<string[]>;
}

class Request {
    static instance: Request | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: BASE_API_URL,
        });

        console.log(this.axiosInstance.interceptors.response);
        
        console.log("Request class initialized with:", BASE_API_URL);
    }

    static getInstance(): Request {
        if (!Request.instance) {
            Request.instance = new Request();
        }
        return Request.instance;
    }

    async getPageData(
        name: string, 
        period: string
    ) {
        try {
            const getViewParams = new URLSearchParams();
            getViewParams.set("name", name);
            getViewParams.set("period", period)

            const response = await this.axiosInstance.get(`/get_views?${getViewParams}`)

            return [];
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

export default Request.getInstance();