

export enum HTTP_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD'
}


export class Api {

  private static readonly API_BASE_URL = process.env.NODE_ENV === "development"
                                                ? "http://localhost:8080/api"
                                                : "https://cri-art.herokuapp.com/api";


    public static fetchFromAPI(method: HTTP_METHOD, path: string, body?: any): Promise<any> {
    path = path ? Api.API_BASE_URL.concat(path) : Api.API_BASE_URL

    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }

    const request = {
      method: method,
      headers: headers,
      mode: 'cors',
      credentials: 'omit'
    } as any

    if(method !== HTTP_METHOD.GET && method !== HTTP_METHOD.HEAD) {
      request.body = JSON.stringify(body ?? {})
    }
    
    console.log('API Path: ' + path)
    console.log('API Request: ' + JSON.stringify(request))

    return fetch(path, request)
      .then(async response => {
        let result = {}

        const textResult = await response.text()
        try {
          if (textResult) {
            result = JSON.parse(textResult)
          }
        } catch(error) {
          console.error('Failed to parse JSON: ' + textResult)
        }

        if (response.status >= 200 && response.status < 300) {
          console.log('API Response: ' + textResult)
          return Promise.resolve(result)
        } else {
          //console.error('API Error: ' + textResult)
          return Promise.reject(result)
        }
      })
  }

  static async getUserName(user_id: string) {
    return await Api.fetchFromAPI(
        HTTP_METHOD.GET,
        `/public/user-name?userId=${user_id}`,
        null
    ).then(userName => {
      return userName
    }).catch(err => {
      return null
    })
  }
}