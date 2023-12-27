import fs from 'fs/promises'
import csv from 'csv-parser'
import Env from '../../helpers/env'
import PlanetModel from './models/plans';
import { z, string } from "zod";
import {  CsvPlanet, DbPlanet } from '../../helpers/types/planets'

class _MongoHelper {
    
    private planetsFile!: fs.FileHandle
    private planetsReadStream: any //!Typescript problematic with this type...
    private dbPlanets: DbPlanet []

    constructor() {
        this.dbPlanets = []
    }

    async handlePlanetsReadStream(): Promise<void>{

        return new Promise(async (res,rej) => {
        
        try{
            this.planetsFile = await fs.open(Env.PLANETS_FILE_PATH,'r')
        }catch(err){
            return rej(err)
        }

         this.planetsReadStream = this.planetsFile.createReadStream().pipe(csv())

        .on('data',(csvPlanet: CsvPlanet) => this.onData(csvPlanet))

        .on('close',async () => {
             await this.planetsFile.close()
            res()
        })

        .on('error',async (err) => {
            await this.planetsFile.close()
            rej(err)
        })

        })

    }

    private async onData(csvPlanet: CsvPlanet): Promise<void>{

        let dbPlanet: DbPlanet 

        try{
            dbPlanet = this.csvToDbPlanet(csvPlanet)
        }catch(err){
            return this.planetsReadStream.emit('error',err)
        }

        this.dbPlanets.push(dbPlanet)

        if(this.dbPlanets.length >= Env.PLANETS_BATCH_SIZE){

            this.planetsReadStream.pause()

            try{
                await PlanetModel.insertMany(this.dbPlanets)
            }catch(err){
                return this.planetsReadStream.emit('error',err)
            }

            this.dbPlanets = []
            this.planetsReadStream.resume()

        }

    }

    private csvToDbPlanet(csvPlanet: CsvPlanet): DbPlanet{

        const validation = z.object({
            name: string(),
            confirmed: string().transform(val =>{

                switch(val.toLowerCase()){
        
                    case 'true':
                        return true
        
                    case 'false':
                        return false
        
                    default: throw new Error(`Invalid csv planet, confirmed: ${val}`)
                        
                }
            }),
            distance: string().transform(val => {
        
                const parsed = parseFloat(val)
        
                if(Number.isNaN(parsed)) throw new Error(`Invalid csv planet, distance: ${val}`)
        
                return parsed
        
            })
        })

        let dbPlanet: DbPlanet

        try{
            dbPlanet = validation.parse(csvPlanet)
        }catch(err){
            throw err
        }

        return dbPlanet
        
    }

}

const MongoHelper = new _MongoHelper()

export default MongoHelper