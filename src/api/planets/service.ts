import { DbError } from "../../helpers/errors"
import PlanetsModel from "../../services/mongo/models/plans"

export const getPlanets = async () => {

    try{
        const planets = await PlanetsModel.find({
            //!No specific reason...
            confirmed: true,
            distance:{
                $gte: 5000
            }
        })
        return planets
    }catch(err){
        throw new DbError('planets','fetching')
    }

}



