import { Schema, model } from 'mongoose';
import { DBPlanet } from '../../../helpers/types/planets';

const planetsCollectionName = 'planets'

const PlanetSchema = new Schema<DBPlanet>({
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
  
export const PlanetsModel = model<DBPlanet>(planetsCollectionName, PlanetSchema);
  
