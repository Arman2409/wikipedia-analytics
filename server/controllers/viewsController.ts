import type { Request, Response } from "express";

import { ViewsErrorMessages, StatusCode } from "../constants/response";
import logger from "../services/logger";
import viewsModel from "../models/viewsModel";
import { handleGetViewsQueryValidation } from "./utils/validation";


const viewsController = async (
    req: Request,
    res: Response) => {

    try {
        const validationResult = handleGetViewsQueryValidation(req.query, res);

        // Check if validation failed
        if (!validationResult) {
            return;
        }

        const {status, json} = await viewsModel(validationResult, res);

        res.status(status).json(json);
    } catch (err) {
        logger.error(ViewsErrorMessages.FAILED_TO_GET_VIEWS, err);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            error: ViewsErrorMessages.FAILED_TO_GET_VIEWS
        });
    }
}

export default viewsController;