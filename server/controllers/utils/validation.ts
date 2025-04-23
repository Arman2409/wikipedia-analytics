import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../../constants/response";
import { isNonEmptyString, isPositiveInteger } from "../../utils/typeGuards";
import { periodsMap } from "./data";
import type { GetPageViewsDto, Period } from "../../types/getViews";


export const handleGetViewsQueryValidation = (
    query: Record<string, unknown>,
    res: Response): GetPageViewsDto | undefined => {

    let { period, name } = { ...query };
    period = Number(period);

    if (!period || !name) {
        res.status(StatusCode.BAD_REQUEST).json({
            error: ErrorMessage.MISSING_GET_VIEWS_QUERY_PARAMS
        });
        return;
    }

    if (!isPositiveInteger(period) || !isNonEmptyString(name)) {
        res.status(StatusCode.BAD_REQUEST).json(
            { error: ErrorMessage.WRONG_GET_VIEWS_QUERY_PARAMS }
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