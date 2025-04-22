import type { Request, Response } from 'express';

import { ErrorMessage, StatusCode } from '../constants/response';

const notFoundMiddleware = (
    _: Request,
    res: Response,
): void => {
    res.status(StatusCode.NOT_FOUND).json({
        error: ErrorMessage.ROUTE_NOT_FOUND
    });
}

export default notFoundMiddleware