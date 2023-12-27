import { NextFunction, Request, Response } from 'express'
import { success } from '../../helpers/responses'
import * as planetsService from './service'

export const handleGetPlanets = async (req: Request, res: Response, next: NextFunction) => {

    const planets = await planetsService.getPlanets()

    return res.send(success(planets))

}