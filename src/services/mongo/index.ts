import { connect } from 'mongoose'
import ENV from '../../helpers/env'

class Mongo {

    constructor() {}

    async connect(): Promise<void>{

        try{
            await connect(ENV.MONGO_URI)
        }catch(err){
            throw err
        }

    }

}

export const MONGO = new Mongo()
