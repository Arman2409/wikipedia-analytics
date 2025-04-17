import type { Request, Response } from "express";

import { ErrorMessage, StatusCode } from "../constants/response";

export const getView = async (
    _: Request,
    res: Response) => {
        
    try {
        const view = {};

        res.status(StatusCode.OK).send(view);
    } catch (err) {
        console.warn(`${ErrorMessage.FAILED_TO_GET_VIEW}: ${err}`);

        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(ErrorMessage.FAILED_TO_GET_VIEW);
    }
}