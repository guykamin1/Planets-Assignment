import { NextFunction, Request, Response } from 'express'
import * as planetsService from './service'

export const handleGetPlanets = async (req: Request, res: Response, next: NextFunction) => {

    const planets = await planetsService.getPlanets()

    return res.send({
        success: true,
        payload: planets
    })

}