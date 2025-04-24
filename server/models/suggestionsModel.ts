import type { Response } from "express";

import { SUGGESTIONS_CACHE_PREFIX } from "../constants/configs";
import { ErrorMessage, GetSuggestionsErrorMessages, StatusCode } from "../constants/response";
import RequestHandler from "../services/request";
import cache from "../services/cache";
import logger from "../services/logger";
import type { GetSuggestionsDto } from "../types/suggestions";
import type { ModelReturnResult } from "../types/global";


const getSuggestionsModel = async (
    getSuggestionsDto: GetSuggestionsDto,
): Promise<ModelReturnResult> => {
    try {
        const { page } = getSuggestionsDto;

        // Check the cache for requested data
        const cachedResult = await cache.get(getSuggestionsDto.page, SUGGESTIONS_CACHE_PREFIX);

        if (cachedResult) {
            return {
                status: StatusCode.OK,
                json: cachedResult,
            };
        }

        // Retrieve the data from external API
        const result = await RequestHandler.getSuggestions(getSuggestionsDto);

        if (!result) {
            return {
                status: StatusCode.NOT_FOUND,
                json: {
                    error: ErrorMessage.RESOURCE_NOT_FOUND
                }
            };
        }

        // Update cache if needed
        cache.set(page, result, SUGGESTIONS_CACHE_PREFIX);


        return {
            status: StatusCode.OK,
            json: result
        }
    } catch (err) {
        logger.error(`${GetSuggestionsErrorMessages.FAILED_TO_GET_SUGGESTIONS}: ${err}`);

        return {
            status: StatusCode.INTERNAL_SERVER_ERROR,
            json: {
                error: GetSuggestionsErrorMessages.FAILED_TO_GET_SUGGESTIONS
            }
        }
    }
}

export default getSuggestionsModel;