import { Router } from "express";
import * as planetsController from './controller'

const router = Router()

router.get('/',planetsController.handleGetPlanets)

export default router