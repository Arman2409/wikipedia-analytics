import type { Request, Response } from "express";

import { SuggestionsErrorMessages, StatusCodes } from "../constants/response";
import logger from "../services/logger";
import suggestionsModel from "../models/suggestionsModel";
import { handleGetSuggestionsQueryValidation } from "./utils/validation";


const suggestionsController = async (
    req: Request,
    res: Response) => {

    try {
        const validationResult = handleGetSuggestionsQueryValidation(req.query, res);

        // Check if validation failed
        if (!validationResult) {
            return;
        }

        const { status, json } = await suggestionsModel(validationResult);

        res.status(status).json(json);
    } catch (err) {
        logger.error(SuggestionsErrorMessages.FAILED_TO_GET_SUGGESTIONS, err);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: SuggestionsErrorMessages.FAILED_TO_GET_SUGGESTIONS
        });
    }
}

export default suggestionsController;