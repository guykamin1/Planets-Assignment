import { Router } from "express";
import { tokenRequired } from "./validations";
import planetsRouter from './planets/router'
import * as middlewares from "./middlewares";

const router = Router()

//!All routers will need authorization header and a valid token.
router.use(
    tokenRequired(),
    middlewares.validate,
    middlewares.authentication
)

router.use('/planets',planetsRouter)

export default router