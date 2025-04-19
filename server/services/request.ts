import axios, { type AxiosInstance } from 'axios';

import { WIKIPEDIA_API_URL } from '../configs/configs';
import type { GetPageViewsPayload, PageViewsRetrievedData } from '../types/get_views';
import { getFormattedDate } from '../utils/helpers';
import logger from './logger';

interface RequestHandler {
    getPageData(argsObj: GetPageViewsPayload): Promise<PageViewsRetrievedData | null>
}

class RequestHandler {
    static instance: RequestHandler | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const requestBaseUrl = WIKIPEDIA_API_URL;

        this.axiosInstance = axios.create({
            baseURL: requestBaseUrl,
        });

        console.log("Request class initialized with:", requestBaseUrl);
    }

    static getInstance(): RequestHandler {
        if (!RequestHandler.instance) {
            RequestHandler.instance = new RequestHandler();
        }
        return RequestHandler.instance;
    }

    async getPageData(
        argsObj: GetPageViewsPayload
    ): Promise<PageViewsRetrievedData | null> {
        try {
            const { name, period, granularity } = { ...argsObj };

            const currentDate = Date.now();
            const startDate = currentDate - period * 24 * 60 * 60 * 1000;

            const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;

            const result = await this.axiosInstance.get(url)

            return result.data;
        } catch (err) {

            return null;
        }

    }
}

export default RequestHandler.getInstance();