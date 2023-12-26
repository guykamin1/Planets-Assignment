import { Router } from "express";
import planetsRouter from './planets/router'

const router = Router()

router.use('/planets',planetsRouter)

export default router