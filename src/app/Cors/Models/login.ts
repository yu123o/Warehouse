export class LoginRequest {
    username?: string
    password?: string

    constructor() {

        this.username = ''
        this.password = ''

    }
}

export class LoginResponse {
    id: number
    fullName: string
    userType: string
    constructor() {

        this.id = 0
        this.fullName = ''
        this.userType = ''
    }
}