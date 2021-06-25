import { Api } from '../api/Api'

const api = new Api()

interface Token {
    token: string
}
 
export default class Credentials {
    private email?: string
    private password?: string
    public token?: Token
    private api?: Api

    setApi(api: Api) {
        this.api = api
    }

    async login(email: string, password: string) {
        this.email = email
        this.password = btoa(password)

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        
        //Fetch to the API With these credentials
        const tokenPromise = api.fetchFromAPI(
                'POST',
                '/auth/login',
                headers, 
                {
                    email: this.email,
                    password: this.password
                }
        )
        
        const token = await tokenPromise
        if (token.token != undefined) this.token = token
        console.log(this)
        return this
    }

    async getToken() {
        return this.token
    }

    hasToken() {
        return this.token? true:false
    }

    async logout() {
        this.email = undefined
        this.password = undefined
        this.token = undefined
    }
}