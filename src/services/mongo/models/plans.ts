import { Schema, model } from 'mongoose';
import { DbPlanet } from '../../../helpers/types/planets';

const planetsCollectionName = 'planets'

const planetSchema = new Schema<DbPlanet>({
  name:{
    type: String,
    required: true
  },
  confirmed:{
    type: Boolean,
    required: true
  },
  distance:{
    type: Number,
    required: true
  }
});
  
const PlanetsModel = model<DbPlanet>(planetsCollectionName, planetSchema);

export default PlanetsModel
  
