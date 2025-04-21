import axios, { type AxiosInstance } from 'axios';

import { WIKIPEDIA_API_URL } from '../constants/configs';
import { getFormattedDate } from '../utils/helpers';
import type { GetPageViewsDto, PageViewsRetrievedData } from '../types/getViews';

interface RequestHandler {
    getPageData(argsObj: GetPageViewsDto): Promise<PageViewsRetrievedData | null>
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
        argsObj: GetPageViewsDto
    ): Promise<PageViewsRetrievedData | null> {
        try {
            let { name, period, granularity } = { ...argsObj };

            const currentDate = Date.now();
            const startDate = currentDate - period * 24 * 60 * 60 * 1000;

            if(granularity === "weekly") granularity = "daily";

            const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;

            const result = await this.axiosInstance.get(url)

            return result.data;
        } catch (err) {

            return null;
        }

    }
}

export default RequestHandler.getInstance();