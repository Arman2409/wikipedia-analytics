import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../../constants/response";
import { isNonEmptyString, isPositiveInteger } from "../../utils/type-guards";
import { periodsMap } from "./periods";
import type { GetPageViewsPayload } from "../../types/get_views";


export const handleGetViewsQueryValidation = (
    query: Record<string, unknown>,
    res: Response): GetPageViewsPayload | undefined => {

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

    const granularity = periodsMap.get(period);

    if (!granularity) {
        res.status(StatusCode.BAD_REQUEST).send(
            { error: `Period not allowed. Allowed periods are: ${Array.from(periodsMap.keys()).join(", ")}` }
        );
        return;
    }

    return { granularity, period, name };
}