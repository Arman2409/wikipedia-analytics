import type { Request, Response } from 'express';

import { ErrorMessages, StatusCodes } from '../constants/response';

const notFoundMiddleware = (
    _: Request,
    res: Response,
): void => {
    res.status(StatusCodes.NOT_FOUND).json({
        error: ErrorMessages.ROUTE_NOT_FOUND
    });
}

export default notFoundMiddleware