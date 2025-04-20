import type { Request, Response } from "express";

import { StatusCode } from "../constants/response";

const healthCheckController = (
    _: Request,
    res: Response) => {

    res.status(StatusCode.OK).json({
        info: "Server running!"
    })
}

export default healthCheckController;