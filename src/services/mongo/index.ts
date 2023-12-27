import { connect } from 'mongoose'
import Env from '../../helpers/env'

class _Mongo {

    constructor() {}

    async connect(): Promise<void>{

        try{
            await connect(Env.MONGO_URI+Env.MONGO_DB)
        }catch(err){
            throw err
        }

    }


    //!More methods related to mongo...


}

const Mongo = new _Mongo()

export default Mongo
