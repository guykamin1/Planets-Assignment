import { ValidatorError } from "./types/errors"

class _Error extends Error {

    code: number
    payload: any

    constructor(code: number, payload: any) {
        super()
        this.code = code
        this.payload= payload
    }
}

export class DbError extends _Error {

    constructor(collection: string, action: string) {
        super(500,[`Error ${action} ${collection} with DB!`])
    }

}
export class ValidationError extends _Error {

    constructor(errors: ValidatorError []) {
        super(400,errors.map(err => err.msg))
    }

}
export class AuthenticationError extends _Error {

    constructor() {
        super(403,['It seems that the token provided is incorrect!'])
    }

}

