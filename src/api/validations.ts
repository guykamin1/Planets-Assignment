import { header } from "express-validator"

export const tokenRequired = () => [
    header('authorization')
    .notEmpty()
    .withMessage('The request must contain authorization header!')
    .custom((content: string) => {

        if(!content) return true

        const [kind,value] = content.split(' ') 
        
        if(kind !== 'Bearer') throw new Error('The authorization header must be of kind Bearer!')

        else if(!value) throw new Error('The token is missing!')

        return true
    })
]