class _Error extends Error {

    code: number
    payload: any

    constructor(code: number, payload: any) {
        super()
        this.code = code
        this.payload= payload
    }
}

export class DBError extends _Error {

    constructor(collection: string, action: string) {
        super(500,`Error ${action} ${collection} with DB!`)
    }

}

export class ApiError extends _Error {

    constructor(collection: string, action: string) {
        super(500,`Error ${action} ${collection} with DB!`)
    }

}

export class ValidationError extends _Error {

    constructor(collection: string, action: string) {
        super(500,`Error ${action} ${collection} with DB!`)
    }

}