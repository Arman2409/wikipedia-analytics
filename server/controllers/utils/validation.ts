import type { Response } from "express";

import { ErrorMessage, StatusCode } from "../../constants/response";
import { isNonEmptyString, isPositiveInteger } from "../../utils/type-guards";
import { periodsMap } from "./periods";
import type { GetPageViewsPayload } from "../../types/controllers";


export const handleGetViewsQueryValidation = (
    query: Record<string, unknown>,
    res: Response): GetPageViewsPayload | undefined => {

    const { period, name } = { ...query };

    if (!period || !name) {
        res.status(StatusCode.BAD_REQUEST).send(ErrorMessage.MISSING_GET_VIEWS_QUERY_PARAMS);
        return;
    }

    if (!isPositiveInteger(period) || !isNonEmptyString(name)) {
        res.status(StatusCode.BAD_REQUEST).send(ErrorMessage.WRONG_GET_VIEWS_QUERY_PARAMS);
        return;
    }

    // TODO - remove String()
    const granularity = periodsMap.get(String(period));

    if (!granularity) {
        res.status(StatusCode.BAD_REQUEST).send(`Period not allowed. Allowed periods are: ${Array.from(periodsMap.keys()).join(", ")}`);
        return;
    }

    return { granularity, period, name };
}