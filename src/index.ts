import 'express-async-errors'
import express from 'express'
import Env from './helpers/env'
import Mongo from './services/mongo'
import MongoHelper from './services/mongo/helper'
import apiRouter from './api/router'
import { handleError } from './api/middlewares'

(async () => {

    try{
        await Mongo.connect()
        await MongoHelper.handlePlanetsReadStream()
    }catch(err){
        //!Maybe different behavior?
        console.log(err);
        process.exit(1)
    }

    const app = express()

    app.use(express.json())

    app.use('/api',apiRouter)

    app.use(handleError)

    app.listen(Env.SERVER_PORT, () => {
    console.log(`Example app listening on port ${Env.SERVER_PORT}`)
    })

})()