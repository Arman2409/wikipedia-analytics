import axios, { type AxiosInstance } from 'axios';

import type { PageViewsResponse } from '../types/global';
import { showSnackbar } from '../components/shared/snackbar';


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
    ): Promise<PageViewsResponse | null> {
        try {
            // Construct the query params 
            const getViewParams = new URLSearchParams();
            getViewParams.set("name", name);
            getViewParams.set("period", period);

            const result = await this.axiosInstance.get(`/get_views?${getViewParams}`)
           
            console.log("here");
            // showSnackbar("Hello World")

            return result.data;
        } catch (error) {
            console.error('Error fetching page views:', error);
            showSnackbar((error as Error)?.message || 'Error fetching page views', "error")

            return null;
        }
    }

    async getPageSuggestions(
        query: string
    ): Promise<string[] | null>{
        try {
            // Construct the query params 
            const getSuggestionsParams = new URLSearchParams();
            getSuggestionsParams.set("page", query);

            const response = await this.axiosInstance.get(`/get_suggestions?${getSuggestionsParams}`);

            return response.data;
        } catch (error) {
            showSnackbar((error as Error)?.message || 'Error fetching page views', "error")
            
            return null;
        }
    }
}

export default RequestHandler.getInstance();