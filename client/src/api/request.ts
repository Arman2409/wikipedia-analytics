import axios, { type AxiosInstance } from 'axios';

import { BASE_API_URL, WIKIPEDIA_API_URL } from '../configs/configs';

export interface Request {
    getPageData(): Promise<unknown[]>;
    getPageSuggestions(query: string): Promise<string[]>;
}

export class Request {
    static instance: Request | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const requestBaseUrl = BASE_API_URL;

        this.axiosInstance = axios.create({
            baseURL: requestBaseUrl,
        });

        console.log("Request class initialized with:", requestBaseUrl);
    }

    static getInstance(): Request {
        if (!Request.instance) {
            Request.instance = new Request();
        }
        return Request.instance;
    }

    async getPageData() {
        return await this.axiosInstance.get(`/get_views`)
            .then(({ data }) => data)
            .catch(err => {
                console.error("Failed to get random quote", err);
                return []
            })
    }

    // Wikipedia API for page suggestions
    async getPageSuggestions(query: string): Promise<string[]> {
        try {
            const response = await axios.get(
                WIKIPEDIA_API_URL + `?action=opensearch&search=${encodeURIComponent(query)}&limit=10&namespace=0&format=json&origin=*`
            );

            return response.data[1]; // Array of page titles
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            return [];
        }
    }
}