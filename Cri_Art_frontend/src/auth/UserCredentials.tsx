import { Api } from '../api/Api'

interface Token {
    token: string
}
 
export default class Credentials {
    private email?: string
    private password?: string
    public token?: Token
    public api?: Api

    setApi(api: Api) {
        this.api = api
    }

    async login(email: string, password: string, encode: boolean) {
        console.log("banana")
        this.email = email
        this.password = encode? btoa(password) : password

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        //Fetch to the API With these credentials
        const tokenPromise = this.api?.fetchFromAPI(
                'POST',
                '/auth/login',
                headers, 
                {
                    email: this.email,
                    password: this.password
                }
        )
        
        const token = await tokenPromise
        if (token.token !== undefined) this.token = token
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

    async signUp(username: string, password :string, email :string, type: string) {
        console.log(`From UserSession Studios:\nEmail: ${email} \nPassword: ${password} \nUsername: ${username}`)
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        const response = this.api?.fetchFromAPI(
            'POST',
            '/auth/signup',
            headers,
            {
                name: username,
                email: email,
                password: btoa(password),
                userType: type
            }
        )
        console.log(`Response: ${response}`)
        const result = await response
        console.log(`Result: ${result.message}`)

        if (result.message === "New user created successfully!") return this.login(email, password, true)
        return this
        

    }
}