import fs from 'fs/promises'
import csv from 'csv-parser'
import ENV from '../../helpers/env'
import { z, string } from "zod";
import { PlanetsModel } from './models/plans';
import { CSVPlanet, DBPlanet } from '../../helpers/types/planets'

class DBHelper {
    
    private planetsFile!: fs.FileHandle
    //!Typscript problematic with this type...
    private planetsReadStream: any
    private dbPlanets: DBPlanet []

    constructor() {
        this.dbPlanets = []
    }

    async handlePlanetsReadStream(): Promise<void>{

        return new Promise(async (res,rej) => {
        
        let planetsFile: fs.FileHandle 

        try{
            planetsFile = await fs.open(ENV.DATA_FILE_PATH,'r')
        }catch(err){
            return Promise.reject(err)
        }

        const readStream = planetsFile.createReadStream().pipe(csv())

        .on('data',(csvPlanet: CSVPlanet) => this.onData(csvPlanet))

        .on('close',async () => {
             await this.planetsFile.close()
            res()
        })

        .on('error',async (err) => {
            await this.planetsFile.close()
            rej(err)
        })

        this.planetsFile = planetsFile
        this.planetsReadStream = readStream

        })

    }

    private async onData(csvPlanet: CSVPlanet): Promise<void>{

        let dbPlanet: DBPlanet 

        try{
            dbPlanet = this.convertCsvToDbPlanet(csvPlanet)
        }catch(err){
            return this.planetsReadStream.emit('error',err)
        }

        this.dbPlanets.push(dbPlanet)

        if(this.dbPlanets.length >= ENV.PLANETS_BATCH_SIZE){

            this.planetsReadStream.pause()

            try{
                await PlanetsModel.insertMany(this.dbPlanets)
            }catch(err){
                return this.planetsReadStream.emit('error',err)
            }

            this.dbPlanets = []
            this.planetsReadStream.resume()

        }

    }

    private convertCsvToDbPlanet(csvPlanet: CSVPlanet): DBPlanet{

        const validation = z.object({
            name: string(),
            confirmed: string().transform(val =>{

                switch(val.toLowerCase()){
        
                    case 'true':
                        return true
        
                    case 'false':
                        return false
        
                    default: throw new Error(`Invalid csv planet confirmed: ${val}`)
                        
                }
            }),
            distance: string().transform(val => {
        
                const parsed = parseFloat(val)
        
                if(Number.isNaN(parsed)) throw new Error(`Invalid csv planet distance: ${val}`)
        
                return parsed
        
            })
        })

        let dbPlanet: DBPlanet

        try{
            dbPlanet = validation.parse(csvPlanet)
        }catch(err){
            throw err
        }

        return dbPlanet
        
    }

}

export const DBHELPER = new DBHelper()