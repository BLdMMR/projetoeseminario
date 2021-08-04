export enum HTTP_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export class Api {
  //private static readonly API_BASE_URL = 'https://cri-art.herokuapp.com/api'

  private static readonly API_BASE_URL = 'http://localhost:8080/api'

  public static fetchFromAPI<T>(method: HTTP_METHOD, path: string, headers: Headers = new Headers(), body?: T): Promise<any> {
    path = path ? Api.API_BASE_URL.concat(path) : Api.API_BASE_URL
    headers.set('Content-Type', 'application/json')

    const request = {
      method: method,
      headers: headers,
      body: JSON.stringify(body)
    }

    console.log('Request: ' + JSON.stringify(request))

    return fetch(path, request)
      .then(response => {
        console.log('Response: ' + JSON.stringify(response))
        return response?.json()
      })
      .catch(error => {
        console.log("Error:" + JSON.stringify(error))
        throw(error)
      })

  }
}