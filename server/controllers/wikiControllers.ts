import type { Request, Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";
import { handleGetViewsQueryValidation } from "./utils/validation";
import { getViewsHandler } from "../handlers/wikiHandlers";

export const getViewsController = async (
    req: Request,
    res: Response) => {

    try {
        const validationResult = handleGetViewsQueryValidation(req.query, res);

        // Check if validation failed
        if (!validationResult) {
            return;
        }

        getViewsHandler(validationResult, res);
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_GET_VIEWS}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_GET_VIEWS);
    }
}