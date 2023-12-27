export interface ThrownError {
    code: number
    payload: any
}

export interface ValidatorError {
   type: string
   msg: string
   path: string
   location: string
}