import 'express-async-errors'
import express from 'express'
import ENV from './helpers/env'
import { MONGO } from './services/mongo'
import { FS } from './helpers/fs'
import apiRouter from './api/router'
import * as middlewares from './api/middlewares'

(async () => {

    try{
        await MONGO.connect()
        await FS.handlePlanetsReadStream()
    }catch(err){
        console.log(err);
        return
    }

    const app = express()

    app.use(express.json())

    app.use('/api',apiRouter)

    app.use(middlewares.handleError)

    app.listen(ENV.SERVER_PORT, () => {
    console.log(`Example app listening on port ${ENV.SERVER_PORT}`)
    })

})()