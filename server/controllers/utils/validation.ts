import type { Response } from "express";

import { SuggestionsErrorMessages, ViewsErrorMessages, StatusCode } from "../../constants/response";
import { isNonEmptyString, isPositiveInteger } from "../../utils/typeGuards";
import { periodsMap } from "./data";
import type { GetPageViewsDto, Period } from "../../types/views";
import type { GetSuggestionsDto } from "../../types/suggestions";


export const handleGetViewsQueryValidation = (
    query: Record<string, unknown>,
    res: Response): GetPageViewsDto | undefined => {

    let { period, name } = { ...query };
    period = Number(period);

    if (!period || !name) {
        res.status(StatusCode.BAD_REQUEST).json({
            error: ViewsErrorMessages.MISSING_GET_VIEWS_QUERY_PARAMS
        });
        return;
    }

    if (!isPositiveInteger(period) || !isNonEmptyString(name)) {
        res.status(StatusCode.BAD_REQUEST).json(
            { error: ViewsErrorMessages.WRONG_GET_VIEWS_QUERY_PARAMS }
        );
        return;
    }

    // Get granularity by the period 
    const granularity = periodsMap.get(period as Period);

    if (!granularity) {
        res.status(StatusCode.BAD_REQUEST).json(
            { error: `Period not allowed. Allowed periods are: ${Array.from(periodsMap.keys()).join(", ")}` }
        );
        return;
    }

    return { granularity, period: period as Period, name };
}

export const handleGetSuggestionsQueryValidation = (
    query: Record<string, unknown>,
    res: Response): GetSuggestionsDto | undefined => {

    const { page } = query;
     console.log([{page}]);
     

    if (!page) {
        res.status(StatusCode.BAD_REQUEST).json({
            error: SuggestionsErrorMessages.MISSING_GET_SUGGESTION_QUERY_PARAMS
        });
        return;
    }

    if (!isNonEmptyString(page)) {
        res.status(StatusCode.BAD_REQUEST).json({
            error: SuggestionsErrorMessages.WRONG_GET_SUGGESTIONS_QUERY_PARAMS
        });
        return;
    }

    return { page };
}
