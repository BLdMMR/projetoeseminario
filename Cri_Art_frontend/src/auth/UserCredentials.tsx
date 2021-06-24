export default class Credentials {
    private email: string
    private password: string
    private token?: string

    constructor(email: string, password: string) {
        this.email = email;
        this.password = btoa(password)
    }

    async login() {
        
    }

    async logout() {

    }
}