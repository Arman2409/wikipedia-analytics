import axios, { type AxiosInstance } from 'axios';

import { WIKIPEDIA_METRICS_API_URL, WIKIPEDIA_SUGGESTIONS_API_URL } from '../constants/configs';
import { RequestMessages } from '../constants/services';
import { getFormattedDate } from '../utils/helpers';
import logger from './logger';
import type { GetPageViewsDto, PageViewsRetrievedData } from '../types/views';
import type { GetSuggestionsDto } from '../types/suggestions';


interface RequestHandler {
    getPageData(argsObj: GetPageViewsDto): Promise<PageViewsRetrievedData | null>
}

class RequestHandler {
    static instance: RequestHandler | null = null;
    private axiosInstance: AxiosInstance;

    private constructor() {
        const requestBaseUrl = WIKIPEDIA_METRICS_API_URL;

        this.axiosInstance = axios.create({
            baseURL: requestBaseUrl,
        });
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
            const startDate = currentDate - (period * 24 * 60 * 60 * 1000 * 2);

            if (granularity === "weekly") granularity = "daily";

            const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;

            const result = await this.axiosInstance.get(url)

        
            return result.data;
        } catch (err) {
            logger.error(RequestMessages.FAILED_TO_RETRIEVE_DATA, err)

            return null;
        }

    }

    async getSuggestions(
        argsObj: GetSuggestionsDto
    ): Promise<PageViewsRetrievedData | null> {
        try {
            let { page } = { ...argsObj };

            const url = `?action=opensearch&search=${encodeURIComponent(page)}&limit=10&namespace=0&format=json&origin=*`

            const result = await axios.get(WIKIPEDIA_SUGGESTIONS_API_URL + url)
        
            return result.data[1];
        } catch (err) {
            logger.error(RequestMessages.FAILED_TO_RETRIEVE_DATA, err)

            return null;
        }

    }
}

export default RequestHandler.getInstance();