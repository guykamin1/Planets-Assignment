import 'express-async-errors'
import express from 'express'
import ENV from './helpers/env'
import apiRouter from './api/router'
import { handleError } from './api/middlewares'
import { MONGO } from './services/mongo'
import { DBHELPER } from './services/mongo/helper'

(async () => {

    try{
        await MONGO.connect()
        await DBHELPER.handlePlanetsReadStream()
    }catch(err){
        return
    }

    const app = express()

    app.use(express.json())

    app.use('/api',apiRouter)

    app.use(handleError)

    app.listen(ENV.SERVER_PORT, () => {
    console.log(`Example app listening on port ${ENV.SERVER_PORT}`)
    })

})()