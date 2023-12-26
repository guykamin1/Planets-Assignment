import express from 'express'
import ENV from './helpers/env'
import apiRouter from './api/router'

(async () => {

    const app = express()

    app.use('/api',apiRouter)

    app.listen(ENV.SERVER_PORT, () => {
    console.log(`Example app listening on port ${ENV.SERVER_PORT}`)
    })

})()