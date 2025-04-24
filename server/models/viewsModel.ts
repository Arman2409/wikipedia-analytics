import { PAGE_VIEW_CACHE_PREFIX } from "../constants/configs";
import { ErrorMessage, ViewsErrorMessages, StatusCode } from "../constants/response";
import RequestHandler from "../services/request";
import cache from "../services/cache";
import logger from "../services/logger";
import { transformPageViews } from "./utils/helpers";
import type { GetPageViewsDto } from "../types/views";
import type { ModelReturnResult } from "../types/global";


const viewsModel = async (
    validationResult: GetPageViewsDto,
): Promise<ModelReturnResult> => {
    try {
        const { name, period } = { ...validationResult };

        // Check the cache for requested data
        const cachedResult = await cache.get(name, PAGE_VIEW_CACHE_PREFIX, period);

        if (cachedResult) {
            return {
                status: StatusCode.OK,
                json: cachedResult
            }
        }

        // Retrieve the data from external API
        const result = await RequestHandler.getPageData(validationResult);

        if (!result?.items) {
            return {
                status: StatusCode.NOT_FOUND,
                json: {
                    error: ErrorMessage.RESOURCE_NOT_FOUND
                }
            }
        }

        // Transform the data
        const data = transformPageViews(result.items, validationResult.period);

        // Update cache if needed
        cache.set(name, data, PAGE_VIEW_CACHE_PREFIX, period);


        return {
            status: StatusCode.OK,
            json: data
        }
    } catch (err) {
        logger.error(`${ViewsErrorMessages.FAILED_TO_GET_VIEWS}: ${err}`);

        return {
            status: StatusCode.INTERNAL_SERVER_ERROR,
            json: {
                error: ViewsErrorMessages.FAILED_TO_GET_VIEWS
            }
        }
    }
}

export default viewsModel;