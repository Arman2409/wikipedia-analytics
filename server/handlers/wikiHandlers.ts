import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";
import RequestHandler from "../services/request";
import logger from "../services/logger";
import type { GetPageViewsPayload } from "../types/get_views";
import { transformPageViews } from "./utils/helpers";


export const getViewsHandler = async (
    validationResult: GetPageViewsPayload,
    res: Response
) => {
    try {
        const result = await RequestHandler.getPageData(validationResult);

        if (!result?.items) {
            res.status(StatusCode.NOT_FOUND).json({
                error: ErrorMessage.RESOURCE_NOT_FOUND
            });
            return;
        }

        const data = transformPageViews(result.items, validationResult.period)

        res.status(StatusCode.OK).json(data);
    } catch (err) {
        logger.error(`${ErrorMessage.FAILED_TO_GET_VIEWS}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: ErrorMessage.FAILED_TO_GET_VIEWS
        });
    }
}