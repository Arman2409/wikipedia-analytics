import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";
import RequestHandler from "../services/request";
import redis from "../services/redis";
import logger from "../services/logger";
import { transformPageViews } from "./utils/helpers";
import type { GetPageViewsPayload } from "../types/getViews";

const getViewsModel = async (
    validationResult: GetPageViewsPayload,
    res: Response,
) => {
    try {
        const { name, period } = { ...validationResult };

        // Check the cache for requested data
        const cachedResult = await redis.get(name, period);

        if(cachedResult) {
            res.status(StatusCode.OK).json(cachedResult);
            return;
        }

        // Retrieve the data 
        const result = await RequestHandler.getPageData(validationResult);

        if (!result?.items) {
            res.status(StatusCode.NOT_FOUND).json({
                error: ErrorMessage.RESOURCE_NOT_FOUND
            });
            return;
        }

        // Update cache of needed
        const data = transformPageViews(result.items, validationResult.period);

        redis.set(name, data, period);


        res.status(StatusCode.OK).json(data);
    } catch (err) {
        logger.error(`${ErrorMessage.FAILED_TO_GET_VIEWS}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: ErrorMessage.FAILED_TO_GET_VIEWS
        });
    }
}

export default getViewsModel;