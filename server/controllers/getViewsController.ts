import type { Request, Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";
import logger from "../services/logger";
import getViewsModel from "../models/getViewsModel";
import { handleGetViewsQueryValidation } from "./utils/validation";



const getViewsController = async (
    req: Request,
    res: Response) => {

    try {
        const validationResult = handleGetViewsQueryValidation(req.query, res);

        // Check if validation failed
        if (!validationResult) {
            return;
        }

        getViewsModel(validationResult, res);
    } catch (err) {
        logger.error(ErrorMessage.FAILED_TO_GET_VIEWS, err);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: ErrorMessage.FAILED_TO_GET_VIEWS
        });
    }
}

export default getViewsController;