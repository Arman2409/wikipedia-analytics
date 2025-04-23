import axios, { type AxiosInstance } from 'axios';

import { WIKIPEDIA_API_URL } from '../constants/configs';
import type { PageViewsResponse } from '../types/global';


interface RequestHandler {
    getPageData(name: string, period: string): Promise<PageViewsResponse>;
    getPageSuggestions(query: string): Promise<string[]>;
}

class RequestHandler {
    static instance: RequestHandler | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: process.env.BASE_API_URL,
        });
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
    ): Promise<PageViewsResponse> {
        try {
            // Construct the query params 
            const getViewParams = new URLSearchParams();
            getViewParams.set("name", name);
            getViewParams.set("period", period);

            const result = await this.axiosInstance.get(`/get_views?${getViewParams}`)
            
            return result.data;
        } catch (error) {
            console.error('Error fetching page views:', error);

            return {
                current: {
                    labels: [],
                    views: []
                },
                previous: {
                    labels: [],
                    views: []
                }
            };
        }
    }

    async getPageSuggestions(
        query: string
    ): Promise<string[]> {
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

export default RequestHandler.getInstance();