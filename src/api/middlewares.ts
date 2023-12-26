import { Request, Response, NextFunction } from "express"
import { ThrownError } from "../helpers/types/errors"

export const handleError = (err: ThrownError,req: Request,res: Response,next: NextFunction) => res.status(err.code).send({
    success: false,
    payload: err.payload
})