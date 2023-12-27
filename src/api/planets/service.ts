import { DBError } from "../../helpers/errors"
import { PlanetsModel } from "../../services/mongo/models/plans"
import { DBPlanet } from "../../helpers/types/planets"

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
        throw new DBError('planets','fetching')
    }

}


export const createPlanets = async (planets: DBPlanet []) => {
    try{
        await PlanetsModel.insertMany(planets)
    }catch(err){
        throw err
    }
}


