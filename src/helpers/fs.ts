import { CSVPlanet, DBPlanet } from './types/planets'
import { dataObject } from './types/general'
import * as planetsService from '../api/planets/service'
import fs from 'fs/promises'
import csv from 'csv-parser'
import ENV from './env'

class Fs {
    
    private dbPlanets: DBPlanet []
    private file!: fs.FileHandle
    private readStream: any

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

        .on('data',this.onData.bind(this))

        .on('close',async () => {
             await this.file.close()
            res()
        })

        .on('error',async (err) => {
            await this.file.close()
            rej(err)
        })

        this.file = planetsFile
        this.readStream = readStream

        })

    }

    private async onData(planet: CSVPlanet){

        const validCsvPlanet = this.csvToDBPlanet(planet)

        if(validCsvPlanet){

             this.dbPlanets.push(validCsvPlanet)

            if(this.dbPlanets.length >= ENV.PLANETS_BATCH_SIZE){

                this.readStream.pause()

                try{
                    await planetsService.createPlanets(this.dbPlanets)
                }catch(err){
                    return this.readStream.emit('error',err)
                }

                this.dbPlanets = []
                this.readStream.resume()

            }

        }
    }

    private csvToDBPlanet(planet: CSVPlanet): DBPlanet | null {

        const dbPlanet: dataObject = {}

        for(const [key,val] of Object.entries(planet)){

            switch(key){

                case 'name':
                    //!Validaitons needed
                    dbPlanet[key] = val
                    break

                case 'confirmed':
                    //!Validaitons needed
                    dbPlanet[key] = val
                break

                case 'distance':
                    //!Validaitons needed
                    dbPlanet[key] = val
                break

            }

        }

        return dbPlanet as DBPlanet

    }

}

export const FS = new Fs()