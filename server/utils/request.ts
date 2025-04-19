import axios, { type AxiosInstance } from 'axios';

import { WIKIPEDIA_API_URL } from '../configs/configs';
import type { GetPageViewsPayload } from '../types/controllers';
import { getFormattedDate } from './helpers';

export interface RequestHandler {
    getPageData(argsObj: GetPageViewsPayload): Promise<unknown[]>
}

export class RequestHandler {
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
    ): Promise<unknown[]> {
        const { name, period, granularity } = { ...argsObj };

        const currentDate = Date.now();
        const startDate = currentDate - period * 24 * 60 * 60 * 1000;

        const url = `/${name}/${granularity}/${getFormattedDate(startDate)}/${getFormattedDate(currentDate)}`;

        return await this.axiosInstance.get(url)
            .then(({ data }) => data)
            .catch(err => {
                return []
            })
    }
}