export class Api {
    //private readonly API_BASE_URL = 'https://cri-art-backend.herokuapp.com/api'
    private readonly API_BASE_URL = 'http://localhost:8080/api'

    async fetchFromAPI<T>(method?: string, path?: string, headers?: Headers, body?: T) : Promise<any>{
        const meth = method? method : 'GET'
        const pth = path? this.API_BASE_URL.concat(path) : this.API_BASE_URL
        const reqInfo = { 
            method: meth,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };
        
        console.log(`${meth} ${pth}\n`)
        console.log("Headers: ")
        headers?.forEach(console.log)
        console.log(`Body: ${JSON.stringify(body)}`)

        const response = await fetch(pth, reqInfo)
        return await response.json()
    }
}