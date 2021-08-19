

export enum HTTP_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD'
}


export class Api {
  //private static readonly API_BASE_URL = 'https://cri-art.herokuapp.com/api'

  private static readonly API_BASE_URL = 'http://localhost:8080/api'

  public static fetchFromAPI(method: HTTP_METHOD, path: string, body?: any): Promise<any> {
    path = path ? Api.API_BASE_URL.concat(path) : Api.API_BASE_URL

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    const request = {
      method: method,
      headers: headers,
      mode: 'cors'
    } as any

    if(method !== HTTP_METHOD.GET && method !== HTTP_METHOD.HEAD) {
      request.body = JSON.stringify(body ?? {})
    }
    
    console.log('API Path: ' + path)
    console.log('API Request: ' + JSON.stringify(request))

    return fetch(path, request)
      .then(async response => {
        const result = response.json()

        result.catch(error => console.error('Response Error: ' + error))

        if (response.status >= 200 && response.status < 300) {
          result.then(res => console.log('API Response: ' + JSON.parse(res)))
          return Promise.resolve(result)
        } else {
          result.then(res => console.log('API Error: ' + JSON.parse(res)))
          return Promise.reject(await result)
        }
      })
  }
}