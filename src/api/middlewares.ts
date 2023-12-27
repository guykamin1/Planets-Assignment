//!General middlewares for the different routers

import Env from "../helpers/env"
import { Request, Response, NextFunction } from "express"
import { ThrownError, ValidatorError } from "../helpers/types/errors"
import { validationResult } from "express-validator"
import { AuthenticationError, ValidationError } from "../helpers/errors"

export const handleError = (err: ThrownError,req: Request,res: Response,next: NextFunction) => res.status(err.code).send({
    success: false,
    payload: err.payload
})

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()){
        const errors = result.array()
        throw new ValidationError(errors as ValidatorError [])
    }
    next()
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization!
    const headerParts = authorizationHeader.split(' ')
    const token = headerParts[1]
    if(token !== Env.TOKEN) throw new AuthenticationError()
    next()  
}