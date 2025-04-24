import type { Request, Response } from "express";

import { StatusCodes } from "../constants/response";


const healthCheckController = (
    _: Request,
    res: Response) => {

    res.status(StatusCodes.OK).json({
        info: "Server running!"
    })
}

export default healthCheckController;