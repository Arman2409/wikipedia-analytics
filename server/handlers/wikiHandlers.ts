import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";
import { RequestHandler } from "../utils/request";
import type { GetPageViewsPayload } from "../types/controllers";
import logger from "../services/logger";


export const getViewsHandler = async (
    validationResult: GetPageViewsPayload,
    res: Response
) => {
    try {
        const result = await RequestHandler.getInstance().getPageData(validationResult);

        res.status(StatusCode.OK).send(result);
    } catch (err) {
        logger.error(`${ErrorMessage.FAILED_TO_GET_VIEWS}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_GET_VIEWS);
    }
}